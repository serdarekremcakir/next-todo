import React from 'react'

interface TabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Tab: React.FC<TabProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className= 'w-full flex flex-1 text-center '>
            <div
                className={`w-1/3 px-4 py-2 cursor-pointer rounded-l-md ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setActiveTab('all')}>
                All
            </div>
            <div
                className={`w-1/3 px-4 py-2 cursor-pointer ${activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setActiveTab('completed')}>
                Completed
            </div>
            <div
                className={`w-1/3 px-4 py-2 cursor-pointer rounded-r-md ${activeTab === 'uncompleted' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setActiveTab('uncompleted')}>
                Uncompleted
            </div>
        </div>
    );
};

export default Tab