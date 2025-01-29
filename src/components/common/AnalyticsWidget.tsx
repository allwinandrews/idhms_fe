import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';

interface AnalyticsWidgetProps {
    title: string;
    value: string | number;
    backgroundColor?: string; // Optional custom background color
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({
    title,
    value,
    backgroundColor,
}) => {
    const theme = useTheme(); // Access design tokens from the theme

    return (
        <Card
            sx={{
                backgroundColor: backgroundColor || theme.palette.background.paper, // Default to theme background
                borderRadius: theme.spacing(1), // Use theme spacing for consistent border radius
                boxShadow: theme.shadows[2], // Use theme shadow level
                padding: theme.spacing(2), // Consistent padding
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.primary, // Use tokenized text color
                        marginBottom: theme.spacing(1), // Add spacing between title and value
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

export default AnalyticsWidget;
