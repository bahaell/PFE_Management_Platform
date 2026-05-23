package com.pfe.resource.repository;

import com.pfe.resource.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    // All present equipment
    List<Equipment> findByPresentTrue();

    // All equipment in a specific room
    List<Equipment> findByRoomId(Long roomId);

    // Present equipment of a specific type
    List<Equipment> findByTypeAndPresentTrue(String type);
}
