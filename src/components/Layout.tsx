import { Package } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Package className="w-8 h-8 text-[#333366]" strokeWidth={2.5} />
            <span className="text-2xl font-bold text-[#333366]">USPS.COM</span>
          </div>
        </div>
      </header>

      <nav className="bg-[#333366] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 text-sm">
            <button className="py-3 px-4 hover:bg-[#4a4a8a]">Quick Tools</button>
            <button className="py-3 px-4 hover:bg-[#4a4a8a]">Send</button>
            <button className="py-3 px-4 hover:bg-[#4a4a8a]">Receive</button>
            <button className="py-3 px-4 hover:bg-[#4a4a8a]">Shop</button>
            <button className="py-3 px-4 hover:bg-[#4a4a8a]">Business</button>
            <button className="py-3 px-4 hover:bg-[#4a4a8a]">International</button>
            <button className="py-3 px-4 hover:bg-[#4a4a8a]">Help</button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-[#333366] text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © 2024 USPS. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
