import React from "react";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="mr-2"
        checked={isDarkMode}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <span className="text-gray-500 dark:text-gray-300">Dark Mode</span>
    </label>
  );
};

export default DarkModeToggle;
