package com.edtech.progress.dto;

public class ProgressRequest {

    private Long userId;
    private Long contentId;
    private double watchPercentage;
    private long timeSpentSeconds;

    // ===== GETTERS & SETTERS =====
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getContentId() {
        return contentId;
    }

    public void setContentId(Long contentId) {
        this.contentId = contentId;
    }

    public double getWatchPercentage() {
        return watchPercentage;
    }

    public void setWatchPercentage(double watchPercentage) {
        this.watchPercentage = watchPercentage;
    }

    public long getTimeSpentSeconds() {
        return timeSpentSeconds;
    }

    public void setTimeSpentSeconds(long timeSpentSeconds) {
        this.timeSpentSeconds = timeSpentSeconds;
    }
}
