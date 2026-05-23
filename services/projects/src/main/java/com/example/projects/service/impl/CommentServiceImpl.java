package com.example.projects.service.impl;

import com.example.projects.dto.CommentRequest;
import com.example.projects.dto.CommentResponse;
import com.example.projects.entity.Comment;
import com.example.projects.entity.Project;
import com.example.projects.repository.CommentRepository;
import com.example.projects.repository.ProjectRepository;
import com.example.projects.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public CommentResponse addComment(CommentRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Comment parent = null;
        if (request.getParentId() != null) {
            parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
        }

        Comment comment = Comment.builder()
                .content(request.getContent())
                .authorId(request.getAuthorId())
                .project(project)
                .parent(parent)
                .replies(new ArrayList<>())
                .build();

        return mapToResponse(commentRepository.save(comment));
    }

    @Override
    public CommentResponse getCommentById(UUID id) {
        return commentRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @Override
    public List<CommentResponse> getCommentsByProject(UUID projectId) {
        return commentRepository.findByProjectIdAndParentIsNullOrderByCreatedAtDesc(projectId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteComment(UUID id) {
        commentRepository.deleteById(id);
    }

    private CommentResponse mapToResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .authorId(comment.getAuthorId())
                .createdAt(comment.getCreatedAt())
                .projectId(comment.getProject().getId())
                .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .replies(comment.getReplies() != null ? 
                        comment.getReplies().stream().map(this::mapToResponse).collect(Collectors.toList()) : 
                        new ArrayList<>())
                .build();
    }
}
