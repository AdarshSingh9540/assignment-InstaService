import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="lg:max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between lg:items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-blue-600">InstaService</h2>
            <p className="text-sm text-gray-600 mt-1">
              Simplifying service management
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} InstaService. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
