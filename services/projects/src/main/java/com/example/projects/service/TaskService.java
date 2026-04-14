package com.example.projects.service;

import com.example.projects.dto.TaskRequest;
import com.example.projects.dto.TaskResponse;
import com.example.projects.entity.TaskStatus;

import java.util.List;
import java.util.UUID;

public interface TaskService {
    TaskResponse createTask(TaskRequest request);
    TaskResponse updateTask(UUID id, TaskRequest request);
    TaskResponse getTaskById(UUID id);
    List<TaskResponse> getTasksByProject(UUID projectId);
    List<TaskResponse> getTasksByAssignee(UUID assigneeId);
    void deleteTask(UUID id);
    TaskResponse updateTaskStatus(UUID id, TaskStatus status);
}
