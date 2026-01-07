import { useState } from 'react';
import Layout from '../components/Layout';

interface Page1Props {
  onNext: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
  }) => void;
}

export default function Page1({ onNext }: Page1Props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.street &&
      formData.city &&
      formData.state
    ) {
      onNext(formData);
    }
  };

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <Layout>
      <div className="bg-white rounded shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Track Another Package <span className="text-red-600">+</span>
        </h1>

        <div className="my-6">
          <div className="text-sm font-semibold text-gray-700 mb-2">Tracking Numbers:</div>
          <div className="text-sm text-gray-600 mb-4">920719023589090001854351?</div>

          <div className="flex gap-1 mb-6">
            <div className="h-2 bg-[#0071ce] w-32"></div>
            <div className="h-2 bg-gray-300 w-32"></div>
            <div className="h-2 bg-gray-300 w-32"></div>
            <div className="h-2 bg-gray-300 flex-1"></div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
            <p className="text-red-600 font-semibold">We have issues with your shipping address</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">Verify Address</h2>
        <p className="text-sm text-gray-600 mb-6">
          Fill out and reenter your address is eligible for informed Delivery.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="First Name*"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name*"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number*"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Street Address / Apt/Suite/Other"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="City*"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          <div>
            <select
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#0071ce] text-sm text-gray-700"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#0071ce] text-white font-semibold py-3 px-6 hover:bg-[#005fa3] transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
