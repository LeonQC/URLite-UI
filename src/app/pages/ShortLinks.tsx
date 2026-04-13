import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Copy, Share2, Edit2, MoreVertical, Trash2, Calendar, Link as LinkIcon } from "lucide-react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface LinkItem {
  id: number;
  title: string;
  shortUrl: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  // icon: string;
  // iconBg: string;
}

export default function ShortLinks() {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleViewLink = (id: number) => {
    navigate(`/app/links/${id}`);
  };

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('/api/urls');
        // console.log('Fetched URLs:', response.data);
        setLinks(response.data || []);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Short Links</h1>
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
        </Button>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => navigate("/app/links/create")}
        >
          Create link
        </Button>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading links...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No links found</p>
          </div>
        ) : (
          links.map((link) => (
          <Card key={link.id} className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Icon */}
              {/* <div className={`w-12 h-12 ${link.iconBg} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                {link.icon}
              </div> */}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 mb-4 truncate cursor-pointer hover:text-indigo-600" onClick={() => handleViewLink(link.id)}>
                  {link.title}
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs font-semibold text-gray-600 flex-shrink-0">
                      Short Link:
                    </Label>
                    <a
                      href={link.shortUrl}
                      className="text-sm text-indigo-600 hover:underline truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.shortUrl}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs font-semibold text-gray-600 flex-shrink-0">
                      Original Link:
                    </Label>
                    <a
                      href={link.originalUrl}
                      className="text-sm text-indigo-600 hover:underline truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.originalUrl}
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{link.clicks}</span>
                    <span>Clicks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{link.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>No Tags</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-indigo-50"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-indigo-50"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-indigo-50"
                >
                  <LinkIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-indigo-50"
                  onClick={() => handleViewLink(link.id)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-indigo-50"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
          ))
        )}
      </div>
    </div>
  );
}
