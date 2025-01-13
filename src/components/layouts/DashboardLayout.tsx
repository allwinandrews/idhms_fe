import React from 'react';

const DashboardLayout: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
    );
};

export default DashboardLayout;
