import { useState } from 'react';
import Layout from '../components/Layout';

interface Page4Props {
  onNext: (answer: string) => void;
}

export default function Page4({ onNext }: Page4Props) {
  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAnswer(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer) {
      onNext(answer);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Final Verification
        </h1>

        <div className="my-6">
          <div className="flex gap-1 mb-6">
            <div className="h-2 bg-[#0071ce] w-32"></div>
            <div className="h-2 bg-[#0071ce] w-32"></div>
            <div className="h-2 bg-[#0071ce] w-32"></div>
            <div className="h-2 bg-gray-300 flex-1"></div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Please answer the following question to complete verification.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question*
            </label>
            <input
              type="text"
              placeholder="Enter numbers only"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={answer}
              onChange={handleAnswerChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Numbers only</p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#0071ce] text-white font-semibold py-3 px-6 hover:bg-[#005fa3] transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
