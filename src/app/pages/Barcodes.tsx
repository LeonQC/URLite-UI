import { Search, Filter, Calendar, ChevronDown } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Barcodes() {
  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Barcodes</h1>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
            P
          </div>
          <span className="hidden lg:inline text-gray-600">Pav</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden lg:inline">Filter by created date</span>
            <span className="lg:hidden">Date</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden lg:inline">Add Filters</span>
            <span className="lg:hidden">Filters</span>
          </Button>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <span className="hidden lg:inline">Show Actions</span>
          <span className="lg:hidden">Actions</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Create barcode
        </Button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No barcodes yet
        </h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Create your first barcode to get started. Barcodes are perfect for product
          identification and inventory management.
        </p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Create your first barcode
        </Button>
      </div>
    </div>
  );
}
