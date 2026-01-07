import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';
import { MessageCircle, Globe, Loader } from 'lucide-react';

interface Submission {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  street: string;
  city: string;
  state: string;
  question_answer: string;
  source: 'web' | 'telegram';
  telegram_username?: string;
  created_at: string;
}

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="bg-white rounded shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Form Submissions
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-6 h-6 text-[#0071ce] animate-spin" />
            <span className="ml-2 text-gray-600">Loading submissions...</span>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-gray-50 rounded p-8 text-center">
            <p className="text-gray-600">No submissions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4 text-sm text-gray-600">
              Total: {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
            </div>

            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="border border-gray-200 rounded p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {submission.first_name} {submission.last_name}
                      </h3>
                      <div className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: submission.source === 'telegram' ? '#e8f5e9' : '#e3f2fd',
                          color: submission.source === 'telegram' ? '#2e7d32' : '#1565c0',
                        }}
                      >
                        {submission.source === 'telegram' ? (
                          <>
                            <MessageCircle className="w-3 h-3" />
                            <span>Telegram</span>
                            {submission.telegram_username && (
                              <span>@{submission.telegram_username}</span>
                            )}
                          </>
                        ) : (
                          <>
                            <Globe className="w-3 h-3" />
                            <span>Web</span>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatDate(submission.created_at)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {submission.phone_number && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                      <p className="text-sm text-gray-800">{submission.phone_number}</p>
                    </div>
                  )}
                  {submission.street && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Street</p>
                      <p className="text-sm text-gray-800">{submission.street}</p>
                    </div>
                  )}
                  {submission.city && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">City</p>
                      <p className="text-sm text-gray-800">{submission.city}</p>
                    </div>
                  )}
                  {submission.state && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">State</p>
                      <p className="text-sm text-gray-800">{submission.state}</p>
                    </div>
                  )}
                </div>

                {submission.question_answer && (
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Message / Answer
                    </p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                      {submission.question_answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
