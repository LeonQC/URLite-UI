import { BarChart3, TrendingUp, Users, MousePointer } from "lucide-react";
import { Card } from "../components/ui/card";

export default function Analytics() {
  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Analytics</h1>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
            P
          </div>
          <span className="hidden lg:inline text-gray-600">Pav</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <MousePointer className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">1,326,545</h3>
          <p className="text-sm text-gray-500">Total Clicks</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">45,892</h3>
          <p className="text-sm text-gray-500">Unique Visitors</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+5.4%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">89.3%</h3>
          <p className="text-sm text-gray-500">Click Rate</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-red-600 text-sm font-medium">-2.1%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">2.4s</h3>
          <p className="text-sm text-gray-500">Avg. Time</p>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Click Activity</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
            <p>Analytics chart would be displayed here</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
