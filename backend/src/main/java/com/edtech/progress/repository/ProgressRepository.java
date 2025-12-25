package com.edtech.progress.repository;

import com.edtech.progress.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

    Optional<Progress> findByUserIdAndContentId(Long userId, Long contentId);
}
