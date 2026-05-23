package com.pfe.chat.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateRoomRequest {
    private String projectId;
    private String academicYear;
    private List<ParticipantRequest> participants;

    @Data
    public static class ParticipantRequest {
        private String userId;
        private String role;
    }
}
