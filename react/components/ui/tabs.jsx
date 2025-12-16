/* 
   * Tabs/Accordion - To create tabs or collapsible sections
   */
  import { useState } from "react";
  export const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].label);
    return (
      <div>
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`p-2 ${activeTab === tab.label ? "bg-blue-500" : "bg-gray-200"}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {tabs.map((tab) => (
            tab.label === activeTab && <div key={tab.label}>{tab.content}</div>
          ))}
        </div>
      </div>
    );
  };