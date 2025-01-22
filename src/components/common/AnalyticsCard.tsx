import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface AnalyticsCardProps {
    title: string;
    value: number | string;
    bgColor?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    title,
    value,
    bgColor = '#e3f2fd',
}) => {
    return (
        <Card
            style={{
                backgroundColor: bgColor,
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AnalyticsCard;
