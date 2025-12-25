import { useEffect, useRef } from "react";
import axios from "axios";

const PdfViewer = ({ pdfUrl, title, topic }) => {
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const userId = 1;
  const contentId = 2; // 👈 PDF content ID from DB

  useEffect(() => {
    // Start tracking when component mounts
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      sendPdfProgress();
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
      sendPdfProgress(); // final update on exit
    };
  }, []);

  const sendPdfProgress = async () => {
    const currentTime = Date.now();
    const timeSpentSeconds = Math.floor(
      (currentTime - startTimeRef.current) / 1000
    );

    // ✅ Simple completion logic
    const watchPercentage =
      timeSpentSeconds >= 30 ? 100 : (timeSpentSeconds / 300) * 100;

    try {
      await axios.post("http://localhost:8080/api/progress/update", {
        userId: userId,
        contentId: contentId,
        watchPercentage: Math.min(watchPercentage, 100),
        timeSpentSeconds: 5, // incremental
      });

      console.log("PDF progress sent:", watchPercentage.toFixed(2), "%");
    } catch (error) {
      console.error("Failed to send PDF progress", error);
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-xl font-bold mb-4">
        📄 {title || "PDF Notes"}
      </h1>

      <div className="w-full max-w-4xl h-[80vh] border rounded-xl shadow-md overflow-hidden">
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="w-full h-full"
        />
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Topic: {topic || "N/A"}
      </p>
    </div>
  );
};

export default PdfViewer;
