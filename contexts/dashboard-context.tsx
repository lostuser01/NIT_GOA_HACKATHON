"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { dashboardAPI } from "@/lib/api-client";

export interface DashboardStats {
  totalActiveIssues: number;
  slaComplianceRate: number;
  averageResolutionTime: number;
  citizenSatisfaction: number;
  criticalIssuesPending: number;
  slaBreeches: number;
  resolvedIssuesThisMonth: number;
  trendPercentages: {
    activeIssues: number;
    slaCompliance: number;
    resolutionTime: number;
    satisfaction: number;
  };
}

export interface HotspotData {
  month: string;
  potholes: number;
  streetlights: number;
  water: number;
  sanitation: number;
  predicted: number;
}

export interface ResourceDemand {
  week: string;
  maintenance: number;
  emergency: number;
  planned: number;
  capacity: number;
}

export interface SLAAlert {
  id: string;
  issueId: number;
  title: string;
  category: string;
  priority: string;
  status: string;
  reportedDate: string;
  slaDeadline: string;
  timeRemaining: string;
  location: string;
  assignedTo: string;
  riskLevel: string;
  estimatedImpact: string;
}

export interface DepartmentPerformance {
  department: string;
  totalIssues: number;
  resolved: number;
  avgResolutionTime: number;
  slaCompliance: number;
  efficiency: number;
}

export interface ActivityItem {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  severity: string;
}

export interface PredictiveInsight {
  expectedIssues: {
    nextWeek: number;
    nextMonth: number;
    peakDays: string[];
    highRiskAreas: string[];
  };
  resourceNeeds: {
    additionalStaff: number;
    equipmentUpgrade: string[];
    budgetIncrease: number;
  };
  recommendations: string[];
}

export interface GeospatialData {
  area: string;
  lat: number;
  lng: number;
  issueCount: number;
  riskScore: number;
  category: string;
}

interface DashboardContextType {
  stats: DashboardStats;
  hotspotData: HotspotData[];
  resourceDemand: ResourceDemand[];
  slaAlerts: SLAAlert[];
  departmentPerformance: DepartmentPerformance[];
  recentActivity: ActivityItem[];
  predictiveInsights: PredictiveInsight | null;
  geospatialData: GeospatialData[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
  updateStats: () => Promise<void>;
  clearError: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<DashboardStats>({
    totalActiveIssues: 243,
    slaComplianceRate: 82.3,
    averageResolutionTime: 3.8,
    citizenSatisfaction: 4.5,
    criticalIssuesPending: 35,
    slaBreeches: 8,
    resolvedIssuesThisMonth: 127,
    trendPercentages: {
      activeIssues: 18,
      slaCompliance: -5.1,
      resolutionTime: -1.2,
      satisfaction: 0.3,
    },
  });

  const [hotspotData] = useState<HotspotData[]>([]);
  const [resourceDemand] = useState<ResourceDemand[]>([]);
  const [slaAlerts] = useState<SLAAlert[]>([]);
  const [departmentPerformance] = useState<DepartmentPerformance[]>([]);
  const [recentActivity] = useState<ActivityItem[]>([]);
  const [predictiveInsights] = useState<PredictiveInsight | null>(null);
  const [geospatialData] = useState<GeospatialData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data using api-client (which handles retries internally)
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use the dashboardAPI from api-client which handles auth automatically
      const response = await dashboardAPI.getStats();

      // Update all dashboard state
      if (response.success && response.data) {
        const apiData = response.data;
        setStats({
          totalActiveIssues: apiData.openIssues || 0,
          slaComplianceRate: 82.3,
          averageResolutionTime: apiData.averageResolutionTime || 0,
          citizenSatisfaction: 4.5,
          criticalIssuesPending: Math.floor((apiData.openIssues || 0) * 0.15), // Estimate 15% are critical
          slaBreeches: 8,
          resolvedIssuesThisMonth: apiData.resolvedIssues || 0,
          trendPercentages: {
            activeIssues: 18,
            slaCompliance: -5.1,
            resolutionTime: -1.2,
            satisfaction: 0.3,
          },
        });
      } else if (response.error) {
        // API returned an error
        setError(response.error);
      }

      // Note: The API client handles retries internally for 500+ errors
      // We don't need manual retry logic here
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch dashboard data";
      setError(errorMessage);

      // Keep existing default data visible on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update stats only
  const updateStats = useCallback(async () => {
    try {
      const response = await dashboardAPI.getStats();

      if (response.success && response.data) {
        const apiData = response.data;
        setStats({
          totalActiveIssues: apiData.openIssues || 0,
          slaComplianceRate: 82.3,
          averageResolutionTime: apiData.averageResolutionTime || 0,
          citizenSatisfaction: 4.5,
          criticalIssuesPending: Math.floor((apiData.openIssues || 0) * 0.15),
          slaBreeches: 8,
          resolvedIssuesThisMonth: apiData.resolvedIssues || 0,
          trendPercentages: {
            activeIssues: 18,
            slaCompliance: -5.1,
            resolutionTime: -1.2,
            satisfaction: 0.3,
          },
        });
      }
    } catch (err) {
      // Silently fail - dashboard will show cached data
      void err;
    }
  }, []);

  // Refresh dashboard
  const refreshDashboard = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Auto-refresh dashboard every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        updateStats();
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(interval);
  }, [updateStats]);

  const value: DashboardContextType = {
    stats,
    hotspotData,
    resourceDemand,
    slaAlerts,
    departmentPerformance,
    recentActivity,
    predictiveInsights,
    geospatialData,
    isLoading,
    error,
    fetchDashboardData,
    refreshDashboard,
    updateStats,
    clearError,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
