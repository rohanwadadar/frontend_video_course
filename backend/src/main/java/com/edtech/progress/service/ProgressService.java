package com.edtech.progress.service;

import com.edtech.progress.model.Progress;
import com.edtech.progress.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository repository;

    public Progress updateProgress(Long userId, Long contentId,
            double watchPercentage, long timeSpent) {

        Progress progress = repository
                .findByUserIdAndContentId(userId, contentId)
                .orElse(new Progress());

        progress.setUserId(userId);
        progress.setContentId(contentId);
        progress.setWatchPercentage(watchPercentage);
        progress.setTimeSpentSeconds(
                progress.getTimeSpentSeconds() + timeSpent
        );

        if (watchPercentage >= 90) {
            progress.setStatus("COMPLETED");
        } else if (watchPercentage > 0) {
            progress.setStatus("IN_PROGRESS");
        } else {
            progress.setStatus("NOT_STARTED");
        }

        return repository.save(progress);
    }

    // ✅ NEW: Get Progress
    public Progress getProgress(Long userId, Long contentId) {
        return repository
                .findByUserIdAndContentId(userId, contentId)
                .orElse(null);
    }
}
