import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SignIn } from './components/SignIn';
import { Welcome } from './components/Welcome';
import { JobsList } from './components/JobsList';
import { JobDetails } from './components/JobDetails';
import { ApplicationForm } from './components/ApplicationForm';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Job } from './types';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setCurrentPage('jobDetails');
  };

  const handleApply = () => {
    setCurrentPage('apply');
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setCurrentPage('jobs');
  };

  const handleBackToJobDetails = () => {
    setCurrentPage('jobDetails');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== 'jobDetails' && page !== 'apply') {
      setSelectedJob(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <SignIn onSuccess={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage !== 'apply' && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      <main className="flex-grow">
        {currentPage === 'home' && <Welcome />}
        {currentPage === 'jobs' && <JobsList onSelectJob={handleSelectJob} />}
        {currentPage === 'jobDetails' && selectedJob && (
          <JobDetails
            job={selectedJob}
            onBack={handleBackToJobs}
            onApply={handleApply}
          />
        )}
        {currentPage === 'apply' && selectedJob && (
          <ApplicationForm job={selectedJob} onBack={handleBackToJobDetails} />
        )}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
