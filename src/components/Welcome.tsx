import { Briefcase, Star, TrendingUp } from 'lucide-react';

export function Welcome() {
  const quotes = [
    {
      text: "Choose a job you love, and you will never have to work a day in your life.",
      author: "Confucius",
      icon: <Star className="w-6 h-6" />
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      text: "Success is not the key to happiness. Happiness is the key to success.",
      author: "Albert Schweitzer",
      icon: <Briefcase className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Job Search Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your gateway to exciting career opportunities. Browse through hundreds of job listings,
            find your perfect match, and take the next step in your professional journey.
            We connect talented individuals with top companies looking for skilled professionals.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Inspiring Career Quotes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <div className="text-blue-600">{quote.icon}</div>
                </div>
                <blockquote className="text-gray-700 text-lg mb-4 italic">
                  "{quote.text}"
                </blockquote>
                <p className="text-blue-600 font-semibold">— {quote.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Find Your Dream Job?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore our job listings and apply to positions that match your skills and interests.
          </p>
          <a
            href="#jobs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Browse Jobs
          </a>
        </div>
      </div>
    </div>
  );
}
