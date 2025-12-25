import { useEffect, useRef } from "react";
import axios from "axios";

const VideoPlayer = ({ videoUrl, title, topic }) => {
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);

  const userId = 1;
  const contentId = 1;

  // 🔁 Send progress every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      sendProgress();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendProgress = async () => {
    const video = videoRef.current;

    // Safety checks
    if (!video || !video.duration || video.paused) return;

    const currentTime = video.currentTime;     // seconds watched
    const duration = video.duration;           // total video length

    // ✅ Calculate watch percentage
    const watchPercentage = (currentTime / duration) * 100;

    // ✅ Calculate time spent since last update
    const timeSpent = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    try {
      await axios.post("http://localhost:8080/api/progress/update", {
        userId: userId,
        contentId: contentId,
        watchPercentage: watchPercentage,
        timeSpentSeconds: Math.max(0, Math.floor(timeSpent))
      });

      console.log("Progress sent:", watchPercentage.toFixed(2), "%");
    } catch (error) {
      console.error("Failed to send progress", error);
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-xl font-bold mb-4">
        🎥 {title || "Video Lecture"}
      </h1>

      <div className="w-500 max-w-4xl bg-black rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          controls
          className="w-full h-auto"
          onPause={sendProgress}
          onEnded={sendProgress}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Topic: {topic || "N/A"}
      </p>
    </div>
  );
};

export default VideoPlayer;
