import { useState, useEffect } from "react";
import axios from "axios";

import ContentSideNavbar from "./ContentSideNavbar";
import UserCardComponent from "./UserCardComponent";
import VideoPlayer from "./VideoPlayer";
import PdfViewer from "./PdfViewer";
import Quiz from "./quize";

const API_URL = import.meta.env.VITE_API_BASE_URL;



function Dashboard() {
  const [activeSection, setActiveSection] = useState("video");

  const [videoProgress, setVideoProgress] = useState(0);
  const [pdfProgress, setPdfProgress] = useState(0);

  const userId = 1;
  const videoContentId = 1;
  const pdfContentId = 2;

  // 🔁 Fetch progress on load + every 5 seconds
  useEffect(() => {
    fetchAllProgress(); // initial fetch

    const interval = setInterval(() => {
      fetchAllProgress();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchAllProgress = async () => {
    try {
      // 🎥 Fetch VIDEO progress   previously used 
      const videoRes = await axios.get(
        "http://localhost:8080/api/progress",
        {
          params: {
            userId: userId,
            contentId: videoContentId,
          },
        }
      );

      setVideoProgress(videoRes.data.watchPercentage || 0);

      // 📄 Fetch PDF progress
      const pdfRes = await axios.get(
        "http://localhost:8080/api/progress",
        {
          params: {
            userId: userId,
            contentId: pdfContentId,
          },
        }
      );

      setPdfProgress(pdfRes.data.watchPercentage || 0);

    } catch (error) {
      console.error("Failed to fetch progress", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <ContentSideNavbar
        activeSection={activeSection}
        onSelect={(section) => setActiveSection(section)}
      />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {activeSection === "video" && (
          <VideoPlayer
            videoUrl="http://localhost:8080/videos/sample.mp4"
            title="React Basics"
            topic="Introduction to React Components"
          />
        )}

        {activeSection === "pdf" && (
          <PdfViewer
            pdfUrl="http://localhost:8080/pdfs/lesson1.pdf"
            title="React Fundamentals"
            topic="React Fundamentals – PDF Notes"
          />
        )}

        {activeSection === "quiz" && (
          <div className="p-6"><Quiz/></div>
        )}

        {activeSection === "assignment" && (
          <div className="p-6">📌 Assignment Component Coming Soon</div>
        )}

        {activeSection === "live" && (
          <div className="p-6">📡 Live Class Component Coming Soon</div>
        )}
      </div>

      {/* Right User Card */}
      <UserCardComponent
        name="Rohan Wadadar"
        course="MCA - Software Developer"
        progressData={[
          { label: "Video", value: Math.round(videoProgress) },
          { label: "PDF", value: Math.round(pdfProgress) },
        ]}
      />
    </div>
  );
}

export default Dashboard;
