import { useState } from 'react';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Submissions from './pages/Submissions';
import { supabase } from './lib/supabase';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  dateField: string;
  expField: string;
  cssField: string;
  questionAnswer: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    dateField: '',
    expField: '',
    cssField: '',
    questionAnswer: '',
  });

  const handlePage1Next = (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
  }) => {
    setFormData({ ...formData, ...data });
    setCurrentPage(2);
  };

  const handlePage2Next = (data: { dateField: string; expField: string; cssField: string }) => {
    setFormData({ ...formData, ...data });
    setCurrentPage(3);
  };

  const handlePage3Complete = () => {
    setCurrentPage(4);
  };

  const handlePage4Next = async (answer: string) => {
    const finalData = { ...formData, questionAnswer: answer };
    setFormData(finalData);

    try {
      await supabase.from('form_submissions').insert([
        {
          first_name: finalData.firstName,
          last_name: finalData.lastName,
          phone_number: finalData.phoneNumber,
          street: finalData.street,
          city: finalData.city,
          state: finalData.state,
          date_field: finalData.dateField,
          exp_field: finalData.expField,
          css_field: finalData.cssField,
          question_answer: finalData.questionAnswer,
        },
      ]);
    } catch (error) {
      console.error('Error saving data:', error);
    }

    setCurrentPage(5);
  };

  if (showSubmissions) {
    return (
      <div>
        <Submissions />
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => {
              setShowSubmissions(false);
              setCurrentPage(1);
            }}
            className="bg-[#0071ce] text-white font-semibold py-2 px-6 hover:bg-[#005fa3] transition-colors"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentPage === 1 && <Page1 onNext={handlePage1Next} />}
      {currentPage === 2 && <Page2 onNext={handlePage2Next} />}
      {currentPage === 3 && <Page3 onComplete={handlePage3Complete} />}
      {currentPage === 4 && <Page4 onNext={handlePage4Next} />}
      {currentPage === 5 && (
        <Page5 onViewSubmissions={() => setShowSubmissions(true)} />
      )}
    </>
  );
}

export default App;
