package com.edtech.progress.controller;

import com.edtech.progress.dto.ProgressRequest;
import com.edtech.progress.model.Progress;
import com.edtech.progress.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin
public class ProgressController {

    @Autowired
    private ProgressService service;

    @PostMapping("/update")
    public Progress updateProgress(@RequestBody ProgressRequest request) {
        return service.updateProgress(
                request.getUserId(),
                request.getContentId(),
                request.getWatchPercentage(),
                request.getTimeSpentSeconds()
        );
    }

    // ✅ NEW: GET progress
    @GetMapping
    public Progress getProgress(
            @RequestParam Long userId,
            @RequestParam Long contentId) {

        return service.getProgress(userId, contentId);
    }
}
