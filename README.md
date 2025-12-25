📘 Student Progress Tracking System
Automated Learning Analytics Platform

Team: Binary Bro’s

📌 Overview

This project implements an automated student progress tracking system for an EdTech platform.
Unlike traditional systems that depend on manual progress updates, this solution tracks real learning behavior such as video playback and PDF reading time.

The backend acts as the single source of truth, ensuring that dashboards reflect accurate and reliable progress data.

❌ Problem Statement

In many online learning platforms:

Students are marked completed without finishing content

Students complete content but forget to update progress

Dashboards show misleading completion metrics

Root Cause

Progress is manually updated by users, not derived from real activity.

✅ Solution Summary

Frontend automatically emits learning events

Backend calculates progress and status

No manual “Mark as Complete” actions

Progress transitions automatically:

NOT_STARTED

IN_PROGRESS

COMPLETED

🏗️ System Architecture
🔹 High-Level Architecture Diagram
+----------------------+
|   Student Browser    |
|  (React + Tailwind)  |
+----------+-----------+
           |
           | Learning Events
           | (every 5 seconds)
           v
+----------------------+
|  Spring Boot Backend |
|  (REST APIs)         |
+----------+-----------+
           |
           | ORM (JPA)
           v
+----------------------+
|     MySQL Database   |
|  (Progress + Content)|
+----------------------+

           |
           | Static File Access
           v
+----------------------+
| Videos / PDFs        |
| (Local / Object Store)|
+----------------------+

🔹 Architecture Explanation

Frontend (React)
Handles UI rendering and emits learning events automatically.

Backend (Spring Boot)
Receives events, calculates progress, and determines completion status.

Database (MySQL)
Stores content metadata and user progress.

Static Content
Videos and PDFs are served via URLs (local for demo, object storage in production).

📁 Project Structure
Backend
student-progress-backend/
├── controller/
├── service/
├── repository/
├── model/
├── dto/
└── resources/static/
    ├── videos/
    └── pdfs/

Frontend
frontend/
├── Dashboard.jsx
├── VideoPlayer.jsx
├── PdfViewer.jsx
├── UserCardComponent.jsx
└── ContentSideNavbar.jsx

🗄️ Database Design
Tables Implemented
content

Stores learning material metadata.

Field	Description
id	Content ID
title	Content name
type	VIDEO / PDF
file_url	File URL
duration_seconds	Video duration
progress

Tracks real learning behavior.

Field	Description
user_id	Student ID
content_id	Content ID
watch_percentage	Completion %
time_spent_seconds	Time spent
status	NOT_STARTED / IN_PROGRESS / COMPLETED
🧩 ER Diagram Explanation
Entities

Content: Learning material metadata

Progress: Student engagement data

Relationship
Content (1)  --------<  Progress (Many)


One content can have progress records for many students

One student has only one progress per content

Enforced using a unique constraint

🎥 Video Progress Tracking (Implemented)

Video duration and playback time are captured

Progress calculation:

watchPercentage = (currentTime / totalDuration) * 100


Backend logic:

< 90% → IN_PROGRESS

>= 90% → COMPLETED

📄 PDF Progress Tracking (Implemented)

PDFs do not expose playback duration

Progress tracked using reading time

Events sent every 5 seconds

Completion after defined threshold (e.g., 30 seconds)

📊 Dashboard Behavior

Dashboard polls backend every 5 seconds

Updates:

Video progress bar

PDF progress bar

Overall completion status

Backend remains the single source of truth

🐳 Deployment & Scalability Design
Current (Demo)

Local file serving

Single backend instance

Production-Ready Design

Backend & frontend containerized using Docker

Files stored in Object Storage (AWS S3 / MinIO)

CDN for global delivery

Stateless backend for horizontal scaling

🔮 Future Scope (Not Implemented Yet)
1️⃣ Advanced Video Tracking

Prevent skipping abuse

Track watched segments

Resume playback from last position

2️⃣ PDF Scroll & Page-Level Tracking

Track page-wise reading

Detect active vs idle reading

3️⃣ Quiz & Assignment Modules

Auto-evaluated quizzes

Assignment submissions

Score-based progress

4️⃣ Module & Course-Level Progress

Group content into modules

Course completion percentage

Certificate generation

5️⃣ Real-Time Updates

WebSockets / Server-Sent Events

Remove polling overhead

6️⃣ Authentication & Roles

JWT-based authentication

Student / Instructor / Admin roles

7️⃣ Advanced Analytics

Engagement heatmaps

Drop-off analysis

Instructor dashboards

🧠 Key Design Decisions

Backend-driven progress calculation

No manual completion actions

Event-based updates

Clean separation of concerns

Scalable, extensible architecture

🚀 How to Run
Backend
mvn spring-boot:run


Runs on:

http://localhost:8080

Frontend
npm install
npm run dev


Runs on:

http://localhost:5173

🎯 Conclusion

This project demonstrates a real-world, scalable solution to unreliable progress tracking in EdTech platforms.
By focusing on automation, accuracy, and clean architecture, it closely mirrors how modern learning platforms operate.

👥 Team

Binary Bro’s
Full-Stack EdTech Assignment
(Spring Boot + React + MySQL)