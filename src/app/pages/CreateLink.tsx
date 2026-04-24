import { useState } from "react";
import { useNavigate } from "react-router";
import { UploadCloud, Sparkles, ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";

export default function CreateLink() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [domain, setDomain] = useState("http://localhost:8080");
  const [backHalf, setBackHalf] = useState("");
  const [title, setTitle] = useState("");

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setDestination(pastedText);
    try {
      const response = await axios.get('/api/title', { params: { url: pastedText } });
      // console.log('Response from backend:', response.data);
      if (response.data) {
        setTitle(response.data);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleSaveLink = async () => {
    if (!destination) {
      toast.error('Destination URL is required');
      return;
    }
    try {
      const requestBody: Record<string, string> = {
        target_url: destination,
        title
      };
      if (backHalf) {
        requestBody.alias = backHalf;
      }
      const response = await axios.post('/api/shorten', requestBody);
      // console.log('Link created:', response.data);
      if (response.data && response.status === 201) {
        toast.success('created successfully');
        navigate(`/app/links/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error creating link:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create link';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Create a new link
          </h1>
        </div>
        <Button
          variant="ghost"
          className="text-indigo-600 hover:bg-indigo-50 gap-2"
          onClick={() => navigate("/app/links/bulk-upload")}
        >
          <UploadCloud className="w-4 h-4" />
          Bulk upload
        </Button>
      </div>

      <Card className="p-6 lg:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Link details</h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              You have 4 links and 3 custom back-halves remaining this month.
              <span className="text-blue-600 hover:underline cursor-pointer">
                Upgrade for more.
              </span>
            </p>
          </div>
          <div className="rounded-full bg-slate-100 p-2">
            <ChevronUp className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Destination URL
            </label>
            <Input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              onPaste={handlePaste}
              placeholder="https://example.com/my-long-url"
              className="w-full"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_auto]">
            <div className="grid gap-4 lg:grid-cols-[0.7fr_0.3fr] items-end">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Short link domain
                </label>
                <Select value={domain} onValueChange={setDomain}>
                  <SelectTrigger className="w-full" aria-label="Domain">
                    <SelectValue placeholder="Select a domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http://localhost:8080">http://localhost:8080</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Alias (optional)
                </label>
                <Input
                  value={backHalf}
                  onChange={(event) => setBackHalf(event.target.value)}
                  placeholder="custom-alias"
                />
              </div>
            </div>

            <div className="flex items-end justify-end">
              <Button
                className="w-full lg:w-auto bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 gap-2"
                variant="outline"
              >
                <Sparkles className="w-4 h-4" />
                Generate
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Title (optional)
            </label>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter a title for this link"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
          <div>
            <p className="text-sm text-gray-600">
              Add a title and custom path to make your link easier to share.
            </p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSaveLink}>
            Save link
          </Button>
        </div>
      </Card>
    </div>
  );
}
