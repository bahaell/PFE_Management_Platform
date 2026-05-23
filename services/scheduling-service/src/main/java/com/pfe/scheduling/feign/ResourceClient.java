package com.pfe.scheduling.feign;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "resource-service", url = "${services.resource.url}")
public interface ResourceClient {

        // ================= ROOMS =================
        @GetMapping("/api/rooms/available")
        List<RoomDTO> getAvailableRooms();

        @GetMapping("/api/rooms/{id}")
        RoomDTO getRoomById(@PathVariable("id") Long id);

        // ================= EQUIPMENT =================
        @GetMapping("/api/equipment/type/{type}")
        List<EquipmentDTO> getAvailableEquipmentByType(@PathVariable("type") String type);

        // ================= ROOM DTO =================
        @JsonIgnoreProperties(ignoreUnknown = true)
        class RoomDTO {

                public Long id;
                public String name;
                public int capacity;
                public String building;
                public String status;

                public Equipment equipment;

                // ===== GETTERS =====
                public Long getId() {
                        return id;
                }

                public String getName() {
                        return name;
                }

                public int getCapacity() {
                        return capacity;
                }

                public String getBuilding() {
                        return building;
                }

                public String getStatus() {
                        return status;
                }

                // ===== LOGIC HELPERS =====
                public boolean isAvailable() {
                        return "available".equalsIgnoreCase(status);
                }

                public boolean hasProjector() {
                        return equipment != null
                                        && equipment.projector != null
                                        && equipment.projector.present;
                }

                public boolean hasSmartBoard() {
                        return equipment != null
                                        && equipment.smartBoard != null
                                        && equipment.smartBoard.present;
                }
        }

        // ================= EQUIPMENT =================
        @JsonIgnoreProperties(ignoreUnknown = true)
        class Equipment {
                public EquipmentItem projector;
                public EquipmentItem smartBoard;
                public EquipmentItem speakers;
                public EquipmentItem microphone;
        }

        // ================= EQUIPMENT ITEM =================
        @JsonIgnoreProperties(ignoreUnknown = true)
        class EquipmentItem {
                public boolean present;
                public String status;
                public String code;

                public boolean isPresent() {
                        return present;
                }
        }

        // ================= EQUIPMENT DTO =================
        @JsonIgnoreProperties(ignoreUnknown = true)
        class EquipmentDTO {
                public Long id;
                public String name;
                public String type;
                public boolean available;
                public Long roomId;
                public String roomName;

                public Long getId() {
                        return id;
                }
        }
}