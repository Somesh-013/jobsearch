import { useState, FormEvent } from 'react';
import { Job } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, ArrowLeft, FileText } from 'lucide-react';

interface ApplicationFormProps {
  job: Job;
  onBack: () => void;
}

export function ApplicationForm({ job, onBack }: ApplicationFormProps) {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { error: submitError } = await supabase
        .from('applications')
        .insert({
          job_id: job.id,
          user_id: user?.id,
          full_name: fullName,
          email: email,
          phone: phone
        });

      if (submitError) throw submitError;

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying to <span className="font-semibold">{job.title}</span> at <span className="font-semibold">{job.company}</span>.
            We will review your application and get back to you soon.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Apply for Position
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {job.title} at {job.company}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="john.doe@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Applied For
              </label>
              <input
                type="text"
                value={job.title}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
