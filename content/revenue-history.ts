export interface RevenueDataPoint {
  month: string
  revenue: number
  label: string
}

// Real revenue data - Business started June 2024
// Actual monthly revenue from launch to current (6 months)
export const revenueHistory: RevenueDataPoint[] = [
  { month: '2024-06', revenue: 9000, label: 'Bir' },   // Launch: €9K
  { month: '2024-07', revenue: 12000, label: 'Lie' },  // €12K
  { month: '2024-08', revenue: 10000, label: 'Rugp' }, // €10K
  { month: '2024-09', revenue: 20000, label: 'Rugs' }, // €20K (2x growth!)
  { month: '2024-10', revenue: 20000, label: 'Spa' },  // €20K (last month)
  { month: '2024-11', revenue: 25000, label: 'Lap' },  // €25K (current month)
]

// Projection based on current growth trajectory
export const projectedRevenue: RevenueDataPoint[] = [
  { month: '2024-12', revenue: 28000, label: 'Gr' },      // December '24
  { month: '2025-01', revenue: 30000, label: 'Sau \'25' }, // January '25
  { month: '2025-02', revenue: 33000, label: 'Vas \'25' }, // February '25
]

// Calculate growth metrics
export function calculateGrowth(data: RevenueDataPoint[]): {
  totalGrowth: number
  averageMonthly: number
  q3Growth: number
  q4Growth: number
} {
  const first = data[0].revenue  // June: €9K
  const last = data[data.length - 1].revenue  // November: €25K
  const totalGrowth = ((last - first) / first) * 100

  // Q3 2024: Jul-Sep (indices 1,2,3) - €12K → €20K
  const q3Start = data[1]?.revenue || first
  const q3End = data[3]?.revenue || last
  const q3Growth = ((q3End - q3Start) / q3Start) * 100

  // Q4 2024 (so far): Oct-Nov (indices 4,5) - €20K → €25K
  const q4Start = data[4]?.revenue || q3End
  const q4End = data[5]?.revenue || last
  const q4Growth = ((q4End - q4Start) / q4Start) * 100

  const avgMonthly = (last - first) / (data.length - 1)

  return {
    totalGrowth: Math.round(totalGrowth),
    averageMonthly: Math.round(avgMonthly),
    q3Growth: Math.round(q3Growth),
    q4Growth: Math.round(q4Growth),
  }
}
