import { useState, useRef, useEffect, use } from "react";
import { useNavigate } from "react-router";
import { UploadCloud, ArrowLeft, FileText, Loader2, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import axios from "axios";

interface UploadResult {
  index: number;
  longUrl: string;
  shortUrl: string;
}

export default function BulkUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<UploadResult[]>([]);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setIsCreated(false);
    setResults([]);
    setProgress({ current: 0, total: 0 });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      fileInputRef.current.files = dataTransfer.files;
      handleFileChange({ target: { files: dataTransfer.files } } as any);
    }
  };

  const handleBulkUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsUploading(true);
    setProgress({ current: 0, total: 0 });
    setResults([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const batchId = response.data;

      // Connect to WebSocket
      const ws = new WebSocket(`ws://localhost:8080/w/s?batchId=${batchId}`);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('====data====>: ', data);

        // done message with index -1 indicates completion
        if (data.index === -1) {
          setIsUploading(false);
          setIsCreated(true);
          toast.success("Links created successfully");
          ws.close();
          return;
        }

        // Each message is a result with { shortUrl, index, longUrl }
        setResults((prev) => [...prev, {
          index: data.index,
          longUrl: data.longUrl || "",
          shortUrl: data.shortUrl || "",
        }]);

        // Increment progress for each result received
        setProgress((prev) => ({
          current: prev.current + 1,
          total: results.length - 1
        }));
      };

      // ws.onclose = () => {
      //   setIsUploading(false);
      //   setIsCreated(true);
      //   toast.success("Links created successfully");
      // };

      // ws.onerror = (error) => {
      //   console.error("WebSocket error:", error);
      //   setIsUploading(false);
      //   toast.error("Connection error");
      // };

    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to upload file");
    }
  };

  const handleClear = () => {
    setFile(null);
    setFileName("");
    setIsCreated(false);
    setResults([]);
    setProgress({ current: 0, total: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/app/links/create")}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Bulk upload links
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Upload a CSV file with URLs to create multiple short links
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Initial Upload State */}
        {!file && (
          <Card className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 hover:border-gray-400"
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadCloud className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-700 font-medium mb-2">
                Drag and drop your CSV file here
              </p>
              <p className="text-gray-500 text-sm mb-4">
                or click to browse files
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </Button>
              <p className="text-gray-400 text-xs mt-4">
                CSV format: one URL per row
              </p>
            </div>
          </Card>
        )}

        {/* Uploaded State - Before Creation */}
        {file && !isCreated && !isUploading && (
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{fileName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleClear}
                >
                  Remove
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleBulkUpload}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Create links
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Uploading Progress State */}
        {isUploading && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Creating links...</p>
                    <p className="text-sm text-gray-500">
                      {progress.current} links processed
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-indigo-600">
                  {progress.current}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Created State - Show Results */}
        {isCreated && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Links created successfully
                </h2>
                <p className="text-sm text-gray-500">
                  {results.length} links created
                </p>
              </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm text-gray-900 truncate">{result.longUrl}</p>
                  </div>
                  {result.shortUrl ? (
                    <a
                      href={result.shortUrl}
                      className="text-sm text-indigo-600 hover:underline flex-shrink-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.shortUrl}
                    </a>
                  ) : (
                    <span className="text-sm text-red-600 flex-shrink-0">Failed</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={handleClear}
              >
                Upload another file
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => navigate("/app/links")}
              >
                View all links
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}