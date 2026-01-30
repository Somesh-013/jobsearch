import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Job } from '../types';
import { Briefcase, MapPin, DollarSign, Search } from 'lucide-react';

interface JobsListProps {
  onSelectJob: (job: Job) => void;
}

export function JobsList({ onSelectJob }: JobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Jobs</h1>
          <p className="text-gray-600 text-lg">Find your perfect career opportunity</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
                  <Briefcase className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                <p className="text-blue-600 font-semibold mb-4">{job.company}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                  )}
                </div>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
