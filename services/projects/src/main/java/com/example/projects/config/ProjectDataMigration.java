package com.example.projects.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProjectDataMigration implements ApplicationRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(ApplicationArguments args) {
        dropProjectStatusConstraint();
        dropFreeSubjectProposalStatusConstraint();
        migrateLegacyStatuses();
        recreateProjectStatusConstraint();
        recreateFreeSubjectProposalStatusConstraint();
        migrateLegacySupervisors();
        migrateLegacyMembers();
        removeLegacyProjectState();
        removeOutOfBoundaryTables();
        log.info("Project service legacy data migration completed");
    }

    private void migrateLegacyStatuses() {
        jdbcTemplate.update("""
                UPDATE projects
                SET status = CASE status
                    WHEN 'PROPOSED' THEN 'PENDING'
                    WHEN 'ASSIGNED' THEN 'IN_PROGRESS'
                    WHEN 'SUBMITTED' THEN 'IN_PROGRESS'
                    WHEN 'COMPLETED' THEN 'DEFENDED'
                    WHEN 'CANCELLED' THEN 'REJECTED'
                    ELSE status
                END
                WHERE status IN ('PROPOSED', 'ASSIGNED', 'SUBMITTED', 'COMPLETED', 'CANCELLED')
                """);
    }

    private void dropProjectStatusConstraint() {
        if (!tableExists("projects")) {
            return;
        }
        jdbcTemplate.execute("ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check");
    }

    private void recreateProjectStatusConstraint() {
        if (!tableExists("projects")) {
            return;
        }
        jdbcTemplate.execute("""
                ALTER TABLE projects
                ADD CONSTRAINT projects_status_check
                CHECK (status IN ('PENDING', 'APPROVED', 'IN_PROGRESS', 'DEFENDED', 'REJECTED', 'ARCHIVED'))
                """);
    }

    private void dropFreeSubjectProposalStatusConstraint() {
        if (!tableExists("free_subject_proposals")) {
            return;
        }
        jdbcTemplate.execute("ALTER TABLE free_subject_proposals DROP CONSTRAINT IF EXISTS free_subject_proposals_status_check");
    }

    private void recreateFreeSubjectProposalStatusConstraint() {
        if (!tableExists("free_subject_proposals")) {
            return;
        }
        jdbcTemplate.execute("""
                ALTER TABLE free_subject_proposals
                ADD CONSTRAINT free_subject_proposals_status_check
                CHECK (status IN ('PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'AUTO_REJECTED'))
                """);
    }

    private void migrateLegacySupervisors() {
        if (!columnExists("projects", "supervisor_id")) {
            return;
        }

        List<Map<String, Object>> rows = jdbcTemplate.queryForList("""
                SELECT id::text AS project_id, supervisor_id
                FROM projects
                WHERE supervisor_id IS NOT NULL AND supervisor_id <> ''
                """);

        for (Map<String, Object> row : rows) {
            String projectId = (String) row.get("project_id");
            String teacherId = (String) row.get("supervisor_id");
            jdbcTemplate.update("""
                    INSERT INTO project_supervisors (id, project_id, teacher_id, role)
                    SELECT ?::uuid, ?::uuid, ?, 'MAIN_SUPERVISOR'
                    WHERE NOT EXISTS (
                        SELECT 1 FROM project_supervisors
                        WHERE project_id = ?::uuid AND teacher_id = ?
                    )
                    """, UUID.randomUUID().toString(), projectId, teacherId, projectId, teacherId);
        }
    }

    private void migrateLegacyMembers() {
        if (!tableExists("project_students")) {
            return;
        }

        List<Map<String, Object>> rows = jdbcTemplate.queryForList("""
                SELECT project_id::text AS project_id, student_id
                FROM project_students
                WHERE student_id IS NOT NULL AND student_id <> ''
                """);

        for (Map<String, Object> row : rows) {
            String projectId = (String) row.get("project_id");
            String studentId = (String) row.get("student_id");
            jdbcTemplate.update("""
                    INSERT INTO project_members (id, project_id, student_id, role, joined_at)
                    SELECT ?::uuid, ?::uuid, ?, 'MEMBER', NOW()
                    WHERE NOT EXISTS (
                        SELECT 1 FROM project_members
                        WHERE project_id = ?::uuid AND student_id = ?
                    )
                    """, UUID.randomUUID().toString(), projectId, studentId, projectId, studentId);
        }
    }

    private void removeLegacyProjectState() {
        dropColumnIfExists("projects", "supervisor_id");
        dropColumnIfExists("projects", "student_ids");
        dropColumnIfExists("projects", "student1_id");
        dropColumnIfExists("projects", "student2_id");
        dropColumnIfExists("projects", "teacher_id");
        dropColumnIfExists("projects", "teacher1_id");
        dropColumnIfExists("projects", "teacher2_id");
        dropTableIfExists("project_students");
    }

    private void removeOutOfBoundaryTables() {
        dropTableIfExists("comments");
        dropTableIfExists("project_messages");
    }

    private boolean tableExists(String tableName) {
        Integer count = jdbcTemplate.queryForObject("""
                SELECT COUNT(*)
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name = ?
                """, Integer.class, tableName);
        return count != null && count > 0;
    }

    private boolean columnExists(String tableName, String columnName) {
        Integer count = jdbcTemplate.queryForObject("""
                SELECT COUNT(*)
                FROM information_schema.columns
                WHERE table_schema = 'public' AND table_name = ? AND column_name = ?
                """, Integer.class, tableName, columnName);
        return count != null && count > 0;
    }

    private void dropColumnIfExists(String tableName, String columnName) {
        if (!columnExists(tableName, columnName)) {
            return;
        }
        jdbcTemplate.execute("ALTER TABLE " + tableName + " DROP COLUMN " + columnName);
        log.info("Dropped legacy Project column {}.{}", tableName, columnName);
    }

    private void dropTableIfExists(String tableName) {
        if (!tableExists(tableName)) {
            return;
        }
        jdbcTemplate.execute("DROP TABLE " + tableName + " CASCADE");
        log.info("Dropped legacy/out-of-boundary Project table {}", tableName);
    }

}
