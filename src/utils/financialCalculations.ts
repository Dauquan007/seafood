export const calculateCLV = (totalRevenue: number, totalCustomers: number) => {
  if (totalCustomers === 0) return 0;
  return totalRevenue / totalCustomers;
};

export const calculateChurnRate = (churnedCustomers: number, totalCustomers: number) => {
  if (totalCustomers === 0) return 0;
  return (churnedCustomers / totalCustomers) * 100;
};

export const calculateGrowth = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};
