import { useEffect } from 'react';
import Layout from '../components/Layout';
import { Loader2 } from 'lucide-react';

interface Page3Props {
  onComplete: () => void;
}

export default function Page3({ onComplete }: Page3Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Layout>
      <div className="bg-white rounded shadow-sm p-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <Loader2 className="w-16 h-16 text-[#0071ce] animate-spin" />

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">Processing Your Information</h2>
            <p className="text-gray-600">Please wait while we verify your details...</p>
          </div>

          <div className="w-full max-w-md bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-[#0071ce] animate-pulse"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
