import { useState } from "react";
import { Link2, QrCode, Barcode, X } from "lucide-react";
import { Card } from "../components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";

export default function GettingStarted() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Getting Started</h1>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
            P
          </div>
          <span className="hidden lg:inline text-gray-600">Pav</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {/* Short URLs Card */}
        <Card
          className="p-8 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => setShowModal(true)}
        >
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <Link2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Short URLs</h3>
          </div>
        </Card>

        {/* QR Codes Card */}
        <Card
          className="p-8 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => setShowModal(true)}
        >
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <QrCode className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800">QR Codes</h3>
          </div>
        </Card>

        {/* Barcodes Card */}
        <Card
          className="p-8 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => setShowModal(true)}
        >
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <Barcode className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Barcodes</h3>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-xl font-semibold">
              What Do You Want To Create?
            </DialogTitle>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="flex items-start gap-3 p-6 h-auto justify-start border-2 hover:border-indigo-600 hover:bg-indigo-50"
            >
              <Link2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <div className="font-semibold text-gray-800">Shorten Link</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-start gap-3 p-6 h-auto justify-start border-2 hover:border-orange-600 hover:bg-orange-50"
            >
              <QrCode className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <div className="font-semibold text-gray-800">Create QR Code</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-start gap-3 p-6 h-auto justify-start border-2 hover:border-green-600 hover:bg-green-50"
            >
              <Barcode className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <div className="font-semibold text-gray-800">Create Barcode</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
