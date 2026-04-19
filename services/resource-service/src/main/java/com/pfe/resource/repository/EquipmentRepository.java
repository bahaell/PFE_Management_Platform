package com.pfe.resource.repository;

import com.pfe.resource.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    // All available equipment
    List<Equipment> findByAvailableTrue();

    // All equipment in a specific room
    List<Equipment> findByRoomId(Long roomId);

    // Available equipment of a specific type (e.g. all free projectors)
    List<Equipment> findByTypeAndAvailableTrue(String type);
}
