import { apiGet } from './api'; // Use API utility functions
import backendUrls from '../assets/backendUrls'; // Maintain backend URL structure
import { AdminAnalyticsResponse } from '../assets/types';

// Function to fetch Admin Analytics data
export const fetchAdminAnalytics =
  async (): Promise<AdminAnalyticsResponse | null> => {
    try {
      return await apiGet<AdminAnalyticsResponse>(backendUrls.admin.analytics);
    } catch (error) {
      console.error('[AdminService] Error fetching admin analytics:', error);
      return null;
    }
  };
