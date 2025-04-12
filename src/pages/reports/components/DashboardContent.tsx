
import React from 'react';
import { StatCard } from './StatCard';
import { SectorPerformance } from './SectorPerformance';
import { RecentResults } from './RecentResults';

// Mock data
const sectorPerformance = [
  { sector: "IT-ITES", assessments: 2345, passRate: 86, avgScore: 72 },
  { sector: "Healthcare", assessments: 1876, passRate: 82, avgScore: 68 },
  { sector: "Electronics", assessments: 1542, passRate: 79, avgScore: 65 },
  { sector: "Retail", assessments: 1235, passRate: 81, avgScore: 67 },
  { sector: "Construction", assessments: 987, passRate: 75, avgScore: 62 },
];

const recentResults = [
  { 
    batchId: "B-2023-001", 
    title: "IT-ITES Batch Delhi-22",
    date: "2023-09-30",
    candidates: 45,
    passed: 38,
    passRate: 84,
    avgScore: 76
  },
  { 
    batchId: "B-2023-002", 
    title: "Healthcare Batch Mumbai-15",
    date: "2023-09-28",
    candidates: 38,
    passed: 31,
    passRate: 82,
    avgScore: 71
  },
  { 
    batchId: "B-2023-003", 
    title: "Electronics Batch Bangalore-08",
    date: "2023-09-25",
    candidates: 32,
    passed: 25,
    passRate: 78,
    avgScore: 69
  },
  { 
    batchId: "B-2023-004", 
    title: "Retail Batch Chennai-11",
    date: "2023-09-22",
    candidates: 40,
    passed: 32,
    passRate: 80,
    avgScore: 72
  },
];

export const DashboardContent = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Assessments"
          description="All assessment sessions conducted"
          value="8,432"
          trend="+14% from last quarter"
        />

        <StatCard
          title="Overall Pass Rate"
          description="Across all sectors and job roles"
          value="78.6%"
          trend="+2.1% from last quarter"
        />

        <StatCard
          title="Average Score"
          description="Mean score across all assessments"
          value="68.2%"
          trend="+1.5% from last quarter"
        />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <SectorPerformance data={sectorPerformance} />
        <RecentResults data={recentResults} />
      </div>
    </>
  );
};
