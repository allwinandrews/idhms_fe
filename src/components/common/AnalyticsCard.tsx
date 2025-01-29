import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';

interface AnalyticsCardProps {
    title: string;
    value: number | string;
    bgColor?: string; // Optional background color
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    title,
    value,
    bgColor,
}) => {
    const theme = useTheme(); // Access design tokens from the theme

    return (
        <Card
            sx={{
                backgroundColor: bgColor || theme.palette.background.paper, // Use tokenized background color
                borderRadius: theme.spacing(1), // Use spacing for rounded corners
                boxShadow: theme.shadows[2], // Use tokenized shadow level
                padding: theme.spacing(2), // Add consistent padding
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        color: theme.palette.text.primary, // Use tokenized text color
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                        color: theme.palette.text.secondary, // Use tokenized secondary text color
                    }}
                >
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AnalyticsCard;
