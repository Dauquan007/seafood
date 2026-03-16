import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import ContainerPanel from "./ContainerPanel"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Users, DollarSign, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import mockData from '../mockData.json';
const [containers, setContainers] = useState([])
useEffect(() => {
  fetchContainers()
}, [])

async function fetchContainers() {
  const { data, error } = await supabase
    .from("containers")
    .select("*")

  if (error) {
    console.error("Supabase error:", error)
  } else {
    setContainers(data)
  }
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
  icon: any;
}

const StatCard = ({ title, value, change, isPositive, icon: Icon }: StatCardProps) => (
  <div className="card card-hoverable">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="p-3 bg-slate-800 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {isPositive ? (
        <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
      ) : (
        <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
      )}
      <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change}%
      </span>
      <span className="text-sm text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

const ChurnPredictionList = () => {
  // Sort customers by churn probability
  const atRiskCustomers = [...(mockData.customers || [])]
    .sort((a, b) => b.churnProbability - a.churnProbability)
    .slice(0, 5); // top 5 highest risk

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">High Churn Risk Customers</h3>
        <button className="text-primary text-sm font-medium hover:underline focus:outline-none cursor-pointer">View All</button>
      </div>
      <div className="space-y-4">
        {atRiskCustomers.map(customer => (
          <div key={customer.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-xs text-slate-400">LTV: ${customer.totalSpend.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                <span className="font-bold text-red-500">{customer.churnProbability}%</span>
              </div>
              <button className="mt-1 text-xs text-cta hover:text-cta/80 font-medium cursor-pointer transition-colors">
                Send Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock data for the revenue chart
const revenueData = [
  { name: 'Jan', revenue: 65000, target: 60000 },
  { name: 'Feb', revenue: 78000, target: 65000 },
  { name: 'Mar', revenue: 82000, target: 70000 },
  { name: 'Apr', revenue: 95000, target: 80000 },
  { name: 'May', revenue: 110000, target: 90000 },
  { name: 'Jun', revenue: 125000, target: 100000 },
];

export default function Dashboard() {
  const analyticsSummary = mockData.analyticsSummary || {
  mrr:0,
  averageCLV:0,
  averageCAC:0,
  averageChurnRate:0
}

const logisticsSummary = {
  containersInTransit: containers.filter(c => c.status === "In Transit").length,
  onTimeDelivery: 92,
  temperatureAlerts: containers.filter(c => c.status === "Temperature Alert").length,
  inventoryDays: 18
} || {
  containersInTransit:0,
  onTimeDelivery:0,
  temperatureAlerts:0,
  inventoryDays:0
}
  
  return (
    <div className="min-h-screen bg-background text-text p-8 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">E-commerce Analytics</h1>
          <p className="text-slate-400 mt-1">AI-Driven Predictive Dashboard</p>
        </div>
        <div className="flex gap-4">
           {/* Primary Action from Design System */}
          <button className="btn-primary flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
        <StatCard 
          title="Total Revenue (MRR)" 
          value={`$${analyticsSummary.mrr.toLocaleString()}`}
          change={12.5}
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard 
          title="Average CLV" 
          value={`$${analyticsSummary.averageCLV.toLocaleString()}`}
          change={5.2}
          isPositive={true}
          icon={Users}
        />
        <StatCard 
          title="Customer Acquisition (CAC)" 
          value={`$${analyticsSummary.averageCAC.toLocaleString()}`}
          change={2.1}
          isPositive={false} // CAC going up is usually negative
          icon={TrendingUp}
        />
        <StatCard 
          title="Avg Churn Risk" 
          value={`${analyticsSummary.averageChurnRate}%`}
          change={1.4}
          isPositive={false} // Churn going up is negative
          icon={AlertTriangle}
        />
        <StatCard
 title="Containers in Transit"
 value={`${logisticsSummary.containersInTransit}`}
 change={2.3}
 isPositive={true}
 icon={TrendingUp}
/>

<StatCard
 title="On-time Delivery"
 value={`${logisticsSummary.onTimeDelivery}%`}
 change={1.1}
 isPositive={true}
 icon={TrendingUp}
/>

<StatCard
 title="Temperature Alerts"
 value={`${logisticsSummary.temperatureAlerts}`}
 change={-0.5}
 isPositive={false}
 icon={AlertTriangle}
/>

<StatCard
 title="Inventory Days"
 value={`${logisticsSummary.inventoryDays}`}
 change={0.8}
 isPositive={true}
 icon={Users}
/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-lg">Revenue vs Target</h3>
             <select className="input py-1 px-3 text-sm">
                <option>Last 6 Months</option>
                <option>This Year</option>
             </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" tick={{fill: '#64748B'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{fill: '#64748B'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#1E293B', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="target" fill="#64748B" radius={[4, 4, 0, 0]} maxBarSize={40} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Churn Prediction Side Panel */}
        <div className="lg:col-span-1">
          <ChurnPredictionList />
          <ContainerPanel />
        </div>
      </div>
      
    </div>
  );
}
