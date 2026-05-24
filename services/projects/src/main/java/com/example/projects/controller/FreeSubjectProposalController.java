package com.example.projects.controller;

import com.example.projects.dto.FreeSubjectProposalRequest;
import com.example.projects.dto.FreeSubjectProposalResponse;
import com.example.projects.entity.Company;
import com.example.projects.entity.CompanyStatus;
import com.example.projects.entity.FreeSubjectProposal;
import com.example.projects.entity.FreeSubjectProposalStatus;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectMember;
import com.example.projects.entity.ProjectMemberRole;
import com.example.projects.entity.ProjectPhase;
import com.example.projects.entity.ProjectStatus;
import com.example.projects.entity.ProjectSupervisor;
import com.example.projects.entity.ProjectSupervisorRole;
import com.example.projects.entity.ProjectType;
import com.example.projects.exception.BadRequestException;
import com.example.projects.repository.CompanyRepository;
import com.example.projects.repository.FreeSubjectProposalRepository;
import com.example.projects.repository.ProjectMemberRepository;
import com.example.projects.repository.ProjectRepository;
import com.example.projects.repository.ProjectSupervisorRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping({"/api/free-subjects", "/api/projects/free-subjects"})
@RequiredArgsConstructor
public class FreeSubjectProposalController {

    private final FreeSubjectProposalRepository repository;
    private final CompanyRepository companyRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectSupervisorRepository projectSupervisorRepository;

    @GetMapping("/by-supervisor/{supervisorId}")
    public ResponseEntity<List<FreeSubjectProposalResponse>> getBySupervisor(@PathVariable String supervisorId) {
        return ResponseEntity.ok(
            repository.findByPreferredSupervisorId(supervisorId).stream().map(this::toDto).toList()
        );
    }

    @GetMapping
    public ResponseEntity<List<FreeSubjectProposalResponse>> getAll(
            @RequestParam(required = false) FreeSubjectProposalStatus status) {
        List<FreeSubjectProposal> proposals = status != null ? repository.findByStatus(status) : repository.findAll();
        return ResponseEntity.ok(proposals.stream().map(this::toDto).toList());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FreeSubjectProposalResponse>> getByStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(repository.findByStudentId(studentId).stream().map(this::toDto).toList());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<FreeSubjectProposalResponse> create(
            @Valid @RequestBody FreeSubjectProposalRequest request,
            @RequestParam(required = false) String studentId) {
        String resolvedStudentId = request.getStudentId() != null && !request.getStudentId().isBlank()
                ? request.getStudentId()
                : (studentId != null && !studentId.isBlank() ? studentId : "anonymous-student");

        boolean blacklisted = companyRepository.findByName(request.getCompanyName())
                .map(company -> company.getStatus() == CompanyStatus.BLACKLISTED)
                .orElse(false);

        if (!blacklisted && repository.existsByStudentIdAndStatusIn(
                resolvedStudentId,
                List.of(FreeSubjectProposalStatus.PENDING, FreeSubjectProposalStatus.UNDER_REVIEW))) {
            throw new BadRequestException("Student already has an active external subject proposal.");
        }

        if (!blacklisted && request.getPreferredSupervisorId() != null && !request.getPreferredSupervisorId().isBlank()) {
            long activeLoad = projectSupervisorRepository.countByTeacherIdAndProject_StatusIn(
                    request.getPreferredSupervisorId(),
                    Set.of(ProjectStatus.PENDING, ProjectStatus.APPROVED, ProjectStatus.IN_PROGRESS));
            if (activeLoad >= 5) {
                throw new BadRequestException("Preferred supervisor has reached the supervision limit.");
            }
        }

        FreeSubjectProposal proposal = FreeSubjectProposal.builder()
                .studentId(resolvedStudentId)
                .title(request.getTitle())
                .description(request.getDescription())
                .companyName(request.getCompanyName())
                .technologies(request.getTechnologies() != null ? request.getTechnologies() : new HashSet<>())
                .preferredSupervisorId(request.getPreferredSupervisorId())
                .status(blacklisted ? FreeSubjectProposalStatus.AUTO_REJECTED : FreeSubjectProposalStatus.PENDING)
                .academicYear(normalizeAcademicYear(request.getAcademicYear()))
                .build();
        return new ResponseEntity<>(toDto(repository.save(proposal)), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/accept")
    @Transactional
    public ResponseEntity<FreeSubjectProposalResponse> accept(
            @PathVariable UUID id,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        requireRole(userRole, "COORDINATOR", "Only a coordinator can validate an external subject proposal.");
        FreeSubjectProposal proposal = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Free subject proposal not found: " + id));
        if (proposal.getStatus() != FreeSubjectProposalStatus.UNDER_REVIEW) {
            throw new BadRequestException("Proposal must be accepted by the teacher before final validation.");
        }
        if (proposal.getProject() == null) {
            proposal.setProject(createProjectFromProposal(proposal));
        }
        proposal.setStatus(FreeSubjectProposalStatus.ACCEPTED);
        return ResponseEntity.ok(toDto(repository.save(proposal)));
    }

    @PutMapping("/{id}/teacher-accept")
    @Transactional
    public ResponseEntity<FreeSubjectProposalResponse> teacherAccept(
            @PathVariable UUID id,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        requireRole(userRole, "TEACHER", "Only a teacher can accept an external subject proposal for review.");
        FreeSubjectProposal proposal = getProposalOrThrow(id);
        if (proposal.getStatus() != FreeSubjectProposalStatus.PENDING) {
            throw new BadRequestException("Only pending proposals can be accepted by a teacher.");
        }
        proposal.setStatus(FreeSubjectProposalStatus.UNDER_REVIEW);
        return ResponseEntity.ok(toDto(repository.save(proposal)));
    }

    @PutMapping("/{id}/reject")
    @Transactional
    public ResponseEntity<FreeSubjectProposalResponse> reject(
            @PathVariable UUID id,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        if (!"TEACHER".equalsIgnoreCase(userRole) && !"COORDINATOR".equalsIgnoreCase(userRole)) {
            throw new BadRequestException("Only a teacher or coordinator can reject an external subject proposal.");
        }
        FreeSubjectProposal proposal = getProposalOrThrow(id);
        if (proposal.getStatus() == FreeSubjectProposalStatus.ACCEPTED
                || proposal.getStatus() == FreeSubjectProposalStatus.AUTO_REJECTED) {
            throw new BadRequestException("Finalized proposals cannot be rejected manually.");
        }
        proposal.setStatus(FreeSubjectProposalStatus.REJECTED);
        return ResponseEntity.ok(toDto(repository.save(proposal)));
    }

    private FreeSubjectProposalResponse toDto(FreeSubjectProposal proposal) {
        return FreeSubjectProposalResponse.builder()
                .id(proposal.getId())
                .studentId(proposal.getStudentId())
                .title(proposal.getTitle())
                .description(proposal.getDescription())
                .companyName(proposal.getCompanyName())
                .technologies(proposal.getTechnologies())
                .preferredSupervisorId(proposal.getPreferredSupervisorId())
                .status(proposal.getStatus())
                .academicYear(proposal.getAcademicYear())
                .projectId(proposal.getProject() != null ? proposal.getProject().getId() : null)
                .createdAt(proposal.getCreatedAt())
                .updatedAt(proposal.getUpdatedAt())
                .build();
    }

    private Project createProjectFromProposal(FreeSubjectProposal proposal) {
        Project project = Project.builder()
                .title(proposal.getTitle())
                .description(proposal.getDescription())
                .type(ProjectType.EXTERNAL)
                .company(resolveCompanyForProject(proposal.getCompanyName()))
                .status(ProjectStatus.APPROVED)
                .phase(ProjectPhase.PROPOSAL)
                .progress(0)
                .academicYear(proposal.getAcademicYear())
                .requiredSkills(proposal.getTechnologies() != null ? proposal.getTechnologies() : new HashSet<>())
                .build();

        Project saved = projectRepository.save(project);

        projectMemberRepository.save(ProjectMember.builder()
                .project(saved)
                .studentId(proposal.getStudentId())
                .role(ProjectMemberRole.MEMBER)
                .build());

        if (proposal.getPreferredSupervisorId() != null && !proposal.getPreferredSupervisorId().isBlank()) {
            projectSupervisorRepository.save(ProjectSupervisor.builder()
                    .project(saved)
                    .teacherId(proposal.getPreferredSupervisorId())
                    .role(ProjectSupervisorRole.MAIN_SUPERVISOR)
                    .build());
        }

        return saved;
    }

    private FreeSubjectProposal getProposalOrThrow(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Free subject proposal not found: " + id));
    }

    private Company resolveCompanyForProject(String companyName) {
        return companyRepository.findByName(companyName)
                .orElseGet(() -> companyRepository.save(Company.builder()
                        .name(companyName)
                        .email("unknown@example.local")
                        .phone("N/A")
                        .status(CompanyStatus.PENDING)
                        .build()));
    }

    private void requireRole(String userRole, String expectedRole, String message) {
        if (!expectedRole.equalsIgnoreCase(userRole)) {
            throw new BadRequestException(message);
        }
    }

    private String normalizeAcademicYear(String academicYear) {
        if (academicYear != null && !academicYear.isBlank()) {
            return academicYear;
        }
        int year = Year.now().getValue();
        return year + "-" + (year + 1);
    }
}
