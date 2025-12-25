package com.edtech.progress.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edtech.progress.model.Content;
import com.edtech.progress.repository.ContentRepository;

@RestController
@RequestMapping("/api/content")
@CrossOrigin
public class ContentController {

    @Autowired
    private ContentRepository repository;

    @GetMapping
    public List<Content> getAllContent() {
        return repository.findAll();
    }
}
