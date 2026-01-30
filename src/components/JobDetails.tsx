import { Job } from '../types';
import { MapPin, DollarSign, Briefcase, Award, ArrowLeft } from 'lucide-react';

interface JobDetailsProps {
  job: Job;
  onBack: () => void;
  onApply: () => void;
}

export function JobDetails({ job, onBack, onApply }: JobDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Jobs
        </button>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-2xl text-blue-600 font-semibold mb-6">{job.company}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{job.location}</p>
              </div>
            </div>
            {job.salary && (
              <div className="flex items-center text-gray-700">
                <DollarSign className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-semibold">{job.salary}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-blue-600" />
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.split(',').map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onApply}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-lg"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
