package com.example.projects.service;

import com.example.projects.dto.CommentRequest;
import com.example.projects.dto.CommentResponse;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    CommentResponse addComment(CommentRequest request);
    CommentResponse getCommentById(UUID id);
    List<CommentResponse> getCommentsByProject(UUID projectId);
    void deleteComment(UUID id);
}
