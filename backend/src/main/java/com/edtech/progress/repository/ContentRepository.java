package com.edtech.progress.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edtech.progress.model.Content;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
