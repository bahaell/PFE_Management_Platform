package com.pfe.resource.repository;

import com.pfe.resource.entity.Room;
import com.pfe.resource.entity.RoomStatus;
import com.pfe.resource.entity.RoomType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByCode(String code);

    List<Room> findByStatus(RoomStatus status);

    List<Room> findByType(RoomType type);

    List<Room> findByStatusAndCapacityGreaterThanEqual(RoomStatus status, int capacity);
}
