import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Link2, QrCode, Barcode, TrendingUp, Shield, Zap } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="font-semibold text-gray-800 text-lg">URLite</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="hidden lg:inline-flex"
            >
              Features
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="hidden lg:inline-flex"
            >
              Pricing
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">URLite</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Shorten links, create QR codes, and track analytics all in one place.
            The smartest way to manage your URLs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg"
              onClick={() => navigate("/login")}
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg"
              onClick={() => navigate("/login")}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need in one platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools to help you create, manage, and track your links
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <Link2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Short URLs
              </h3>
              <p className="text-gray-600">
                Create memorable, branded short links that are easy to share and track
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                QR Codes
              </h3>
              <p className="text-gray-600">
                Generate dynamic QR codes with custom designs and colors
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <Barcode className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Barcodes
              </h3>
              <p className="text-gray-600">
                Create professional barcodes for products and inventory
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics
              </h3>
              <p className="text-gray-600">
                Track clicks, locations, and user behavior in real-time
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Optimized redirect speed for the best user experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg mb-8 text-indigo-100">
              Join thousands of users who trust URLite for their link management
            </p>
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={() => navigate("/login")}
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-semibold text-white">URLite</span>
            </div>
            <p className="text-sm">© 2026 URLite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}