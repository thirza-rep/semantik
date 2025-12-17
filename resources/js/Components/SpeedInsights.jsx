import { useEffect } from 'react';
import { injectSpeedInsights } from '@vercel/speed-insights';

/**
 * SpeedInsights Component
 * 
 * This component injects Vercel Speed Insights tracking script into the application.
 * It should be rendered once in the main app layout to track performance metrics.
 * 
 * Speed Insights will track Core Web Vitals and other performance metrics,
 * sending the data to Vercel's dashboard for analysis.
 */
export default function SpeedInsights() {
    useEffect(() => {
        // Inject Speed Insights tracking script
        // This should only be called once in the application
        injectSpeedInsights();
    }, []);

    // This component doesn't render anything visible
    return null;
}
