export interface RevenueDataPoint {
  month: string
  revenue: number
  label: string
}

// Historical revenue data extrapolated from current €20K/month with +35% Q3 growth
// Working backwards from current metrics
export const revenueHistory: RevenueDataPoint[] = [
  { month: '2024-01', revenue: 8500, label: 'Sau' },
  { month: '2024-02', revenue: 9200, label: 'Vas' },
  { month: '2024-03', revenue: 10100, label: 'Kov' },
  { month: '2024-04', revenue: 11300, label: 'Bal' },
  { month: '2024-05', revenue: 12800, label: 'Geg' },
  { month: '2024-06', revenue: 13900, label: 'Bir' },
  { month: '2024-07', revenue: 14800, label: 'Lie' },  // Q3 starts
  { month: '2024-08', revenue: 16200, label: 'Rugp' },
  { month: '2024-09', revenue: 17600, label: 'Rugs' },
  { month: '2024-10', revenue: 18900, label: 'Spa' },  // Q4 starts - current growth
  { month: '2024-11', revenue: 19800, label: 'Lap' },
  { month: '2024-12', revenue: 20000, label: 'Gr' },   // Current: €20K
]

export const projectedRevenue: RevenueDataPoint[] = [
  { month: '2025-01', revenue: 22000, label: 'Sau \'25' },
  { month: '2025-02', revenue: 24500, label: 'Vas \'25' },
  { month: '2025-03', revenue: 27000, label: 'Kov \'25' },
]

// Calculate growth metrics
export function calculateGrowth(data: RevenueDataPoint[]): {
  totalGrowth: number
  averageMonthly: number
  q3Growth: number
  q4Growth: number
} {
  const first = data[0].revenue
  const last = data[data.length - 1].revenue
  const totalGrowth = ((last - first) / first) * 100

  // Q3: Jul-Sep (indices 6,7,8)
  const q3Start = data[6].revenue
  const q3End = data[8].revenue
  const q3Growth = ((q3End - q3Start) / q3Start) * 100

  // Q4: Oct-Dec (indices 9,10,11)
  const q4Start = data[9].revenue
  const q4End = data[11].revenue
  const q4Growth = ((q4End - q4Start) / q4Start) * 100

  const avgMonthly = (last - first) / (data.length - 1)

  return {
    totalGrowth: Math.round(totalGrowth),
    averageMonthly: Math.round(avgMonthly),
    q3Growth: Math.round(q3Growth),
    q4Growth: Math.round(q4Growth),
  }
}
