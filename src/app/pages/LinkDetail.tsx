import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Copy, Share2, QrCode, Eye, Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import axios from "axios";

interface LinkData {
  id: number;
  title: string;
  shortUrl: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

export default function LinkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [link, setLink] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLink = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/urls/${id}`);
        setLink(response.data);
      } catch (error) {
        console.error('Error fetching link:', error);
        toast.error('Failed to load link details');
        navigate('/app/links');
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [id, navigate]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  // Simple QR code component using a placeholder pattern
  const QRCodeDisplay = () => (
    <div className="w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center border border-gray-200">
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

  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="p-4 lg:p-8">
        <p>Link not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/app/links')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Links
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{link.title || 'Untitled Link'}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Link Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Short URL</label>
              <div className="flex gap-2 mt-1">
                <Input value={link.shortUrl} readOnly className="flex-1" />
                <Button onClick={() => handleCopy(link.shortUrl)} size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Original URL</label>
              <div className="flex gap-2 mt-1">
                <Input value={link.originalUrl} readOnly className="flex-1" />
                <Button onClick={() => handleCopy(link.originalUrl)} size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {link.clicks} clicks
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created {new Date(link.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">QR Code</h2>
          <div className="flex flex-col items-center gap-4">
            <QRCodeDisplay />
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <QrCode className="w-4 h-4" />
                Download QR
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}