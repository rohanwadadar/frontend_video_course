import { useEffect, useState } from "react";

const clamp = (value) => Math.min(100, Math.max(0, value));

const getItemStatus = (value) => {
  if (value <= 0) return "Not Started";
  if (value < 90) return "In Progress";
  return "Completed";
};

const UserCardComponent = ({
  name = "Rohan Wadadar",
  course = "MCA - Software Development",
  progressData = [
    { label: "Video", value: 0 },
    { label: "PDF", value: 0 },
  ],
}) => {
  const safeProgress = progressData.map((p) => ({
    ...p,
    value: clamp(Number(p.value) || 0),
  }));

  const [animated, setAnimated] = useState(
    safeProgress.map(() => 0)
  );

  // 🔁 Animate whenever progress updates (every 5 sec)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setAnimated(safeProgress.map((p) => p.value));
    });

    return () => cancelAnimationFrame(raf);
  }, [progressData]);

  const overallProgress =
    safeProgress.length > 0
      ? safeProgress.reduce((sum, p) => sum + p.value, 0) /
        safeProgress.length
      : 0;

  const getOverallStatus = () => {
    if (overallProgress < 30) return "Beginner";
    if (overallProgress < 80) return "In Progress";
    return "Completed";
  };

  const getStatusColor = () => {
    if (overallProgress < 30) return "text-yellow-500";
    if (overallProgress < 80) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <div className="fixed h-20 my-3 right-6 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50">
      
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500">{course}</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gray-600">
            Overall Progress
          </span>
          <span className={`text-xs font-bold ${getStatusColor()}`}>
            {getOverallStatus()}
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="text-right text-xs font-semibold text-gray-700 mt-1">
          {Math.round(overallProgress)}%
        </div>
      </div>

      {/* Sub Progresses */}
      <div className="space-y-3">
        {safeProgress.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">
                {item.label}
              </span>
              <span className="font-semibold text-gray-700">
                {animated[index]}%
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-700 ease-out"
                style={{ width: `${animated[index]}%` }}
              />
            </div>

            <div className="text-[10px] text-gray-500 mt-0.5 text-right">
              {getItemStatus(item.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCardComponent;
