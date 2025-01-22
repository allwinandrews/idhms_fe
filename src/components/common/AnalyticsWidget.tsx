import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface AnalyticsWidgetProps {
    title: string;
    value: string | number;
    backgroundColor?: string;
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ title, value, backgroundColor = '#f5f5f5' }) => (
    <Card style={{ backgroundColor }}>
        <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{value}</Typography>
        </CardContent>
    </Card>
);

export default AnalyticsWidget;
