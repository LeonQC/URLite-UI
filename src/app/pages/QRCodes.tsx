import { useState } from "react";
import { Search, Filter, Calendar, Eye, Edit2, Download, ChevronDown } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

interface QRCodeItem {
  id: string;
  title: string;
  url: string;
  scans: number;
  date: string;
  qrCodeData: string;
}

export default function QRCodes() {
  const [qrCodes] = useState<QRCodeItem[]>([
    {
      id: "1",
      title: "Untitled 2025-04-16",
      url: "https://news.google.com/home",
      scans: 0,
      date: "Apr 16, 2025",
      qrCodeData: "example1",
    },
    {
      id: "2",
      title: "YouTube",
      url: "https://www.youtube.com",
      scans: 0,
      date: "Apr 4, 2025",
      qrCodeData: "youtube",
    },
  ]);

  // Simple QR code component using a placeholder pattern
  const QRCodeDisplay = ({ data }: { data: string }) => (
    <div className="w-full aspect-square bg-white rounded-lg p-4 flex items-center justify-center border border-gray-200">
      <div className="w-full h-full grid grid-cols-5 gap-1">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`${
              Math.random() > 0.5 ? "bg-black" : "bg-white"
            } rounded-sm`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">QR Codes</h1>
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
          Create code
        </Button>
      </div>

      {/* QR Codes List */}
      <div className="space-y-4">
        {qrCodes.map((qrCode) => (
          <Card key={qrCode.id} className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* QR Code Preview */}
              <div className="w-full lg:w-24 flex-shrink-0">
                <QRCodeDisplay data={qrCode.qrCodeData} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {qrCode.title}
                </h3>
                <a
                  href={qrCode.url}
                  className="text-sm text-indigo-600 hover:underline truncate block mb-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {qrCode.url}
                </a>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{qrCode.scans}</span>
                    <span>Scans/Hits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{qrCode.date}</span>
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded text-xs">
                    SN32NQM3d
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100"
                >
                  <span className="sr-only">Favorite</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-indigo-50"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-indigo-50"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-indigo-50"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                >
                  View details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
