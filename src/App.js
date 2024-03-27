import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import './App.css';
import Pendant from './pendant';
import HeightForm from './Form';
import Info from "./info";
import FeedbackForm from "./Feedback";

function App() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <header>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Підбір велосипеда" />
                        <Tab label="Розрахунок налаштувань підвіски" />
                        <Tab label="Інформаційна сторінка" />
                        <Tab label="Зворотній зв'язок" />

                    </Tabs>
                </Box>
            </header>

            <div className="content">
                {activeTab === 0 && <HeightForm />}
                {activeTab === 1 && <Pendant />}
                {activeTab === 2 && <Info />}
                {activeTab === 3 && <FeedbackForm />}
            </div>
        </div>
    );
}

export default App;
