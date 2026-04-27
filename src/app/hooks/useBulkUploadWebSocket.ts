// filepath: src/app/hooks/useBulkUploadWebSocket.ts
import { useEffect, useRef, useState, useCallback } from "react";

interface UploadResult {
  index: number;
  longUrl: string;
  shortUrl: string;
}

interface UseBulkUploadWebSocketReturn {
  progress: { current: number; total: number };
  results: UploadResult[];
  isUploading: boolean;
  isCreated: boolean;
  uploadFile: (file: File) => Promise<string | null>;
  clearResults: () => void;
}

// Singleton WebSocket manager
class BulkUploadWebSocketManager {
  private static instance: BulkUploadWebSocketManager;
  private ws: WebSocket | null = null;
  private onMessageCallback: ((data: any) => void) | null = null;
  private onCloseCallback: (() => void) | null = null;
  private onErrorCallback: ((error: any) => void) | null = null;

  private constructor() {}

  static getInstance(): BulkUploadWebSocketManager {
    if (!BulkUploadWebSocketManager.instance) {
      BulkUploadWebSocketManager.instance = new BulkUploadWebSocketManager();
    }
    return BulkUploadWebSocketManager.instance;
  }

  connect(batchId: string): void {
    // Close existing connection if any
    this.disconnect();

    this.ws = new WebSocket(`ws://localhost:8080/w/s?batchId=${batchId}`);

    this.ws.onmessage = (event) => {
      if (this.onMessageCallback) {
        const data = JSON.parse(event.data);
        this.onMessageCallback(data);
      }
    };

    this.ws.onclose = () => {
      if (this.onCloseCallback) {
        this.onCloseCallback();
      }
    };

    this.ws.onerror = (error) => {
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    };
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  onMessage(callback: (data: any) => void): void {
    this.onMessageCallback = callback;
  }

  onClose(callback: () => void): void {
    this.onCloseCallback = callback;
  }

  onError(callback: (error: any) => void): void {
    this.onErrorCallback = callback;
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export function useBulkUploadWebSocket(): UseBulkUploadWebSocketReturn {
  const wsManager = BulkUploadWebSocketManager.getInstance();
  
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<UploadResult[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  
  const resultsRef = useRef<UploadResult[]>([]);

  useEffect(() => {
    // Set up callbacks that persist across component lifecycle
    wsManager.onMessage((data) => {
      // done message with index -1 indicates completion
      if (data.index === -1) {
        setIsUploading(false);
        setIsCreated(true);
        wsManager.disconnect();
        return;
      }

      // Each message is a result with { shortUrl, index, longUrl }
      const newResult = {
        index: data.index,
        longUrl: data.longUrl || "",
        shortUrl: data.shortUrl || "",
      };
      
      resultsRef.current = [...resultsRef.current, newResult];
      setResults([...resultsRef.current]);

      // Increment progress for each result received
      setProgress((prev) => ({
        current: prev.current + 1,
        total: prev.total
      }));
    });

    wsManager.onClose(() => {
      // Connection closed
    });

    wsManager.onError((error) => {
      console.error("WebSocket error:", error);
      setIsUploading(false);
    });

    // Cleanup on unmount - but don't disconnect WebSocket
    return () => {
      // We intentionally don't disconnect here to keep WebSocket alive
      // when navigating away from the page
    };
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setProgress({ current: 0, total: 0 });
    resultsRef.current = [];
    setResults([]);
    setIsCreated(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const batchId = response.data;
      console.log('=====batchId=====>:', batchId);

      // Connect to WebSocket using the singleton manager
      wsManager.connect(batchId);

      return batchId;
    } catch (error) {
      setIsUploading(false);
      return null;
    }
  }, []);

  const clearResults = useCallback(() => {
    resultsRef.current = [];
    setResults([]);
    setProgress({ current: 0, total: 0 });
    setIsCreated(false);
  }, []);

  return {
    progress,
    results,
    isUploading,
    isCreated,
    uploadFile,
    clearResults,
  };
}

// Import axios for the upload function
import axios from "axios";