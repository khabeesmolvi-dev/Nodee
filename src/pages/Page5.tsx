import Layout from '../components/Layout';
import { CheckCircle2 } from 'lucide-react';

interface Page5Props {
  onViewSubmissions?: () => void;
}

export default function Page5({ onViewSubmissions }: Page5Props) {
  return (
    <Layout>
      <div className="bg-white rounded shadow-sm p-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <CheckCircle2 className="w-20 h-20 text-green-600" />

          <div className="text-center space-y-3">
            <h1 className="text-3xl font-semibold text-gray-800">Thank You!</h1>
            <p className="text-lg text-gray-600">
              Your information has been successfully submitted.
            </p>
            <p className="text-sm text-gray-500">
              We appreciate your time and will process your request shortly.
            </p>
          </div>

          <div className="flex gap-1 w-full max-w-md">
            <div className="h-2 bg-[#0071ce] flex-1"></div>
            <div className="h-2 bg-[#0071ce] flex-1"></div>
            <div className="h-2 bg-[#0071ce] flex-1"></div>
            <div className="h-2 bg-[#0071ce] flex-1"></div>
          </div>

          {onViewSubmissions && (
            <button
              onClick={onViewSubmissions}
              className="mt-6 bg-[#0071ce] text-white font-semibold py-2 px-6 hover:bg-[#005fa3] transition-colors"
            >
              View All Submissions
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
