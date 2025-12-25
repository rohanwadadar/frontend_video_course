import { useState } from "react";

const ContentSideNavbar = ({
  onSelect = () => {},
  activeSection = "video",
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const contentItems = [
    { id: "video", label: "Video Lectures", icon: "🎥" },
    { id: "pdf", label: "PDF Notes", icon: "📄" },
    { id: "quiz", label: "Quizzes", icon: "📝" },
    { id: "assignment", label: "Assignments", icon: "📌" },
    { id: "live", label: "Live Class", icon: "📡" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg
      transition-all duration-300 ease-in-out
      ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {!collapsed && (
          <h2 className="text-sm font-bold text-gray-700">
            Course Content
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600"
        >
          {collapsed ? "⮞" : "⮜"}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="mt-4 space-y-1 px-2">
        {contentItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
              transition-all duration-200
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>

              {!collapsed && (
                <span className="text-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="text-xs text-gray-400 text-center">
            © Learning Platform
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSideNavbar;
