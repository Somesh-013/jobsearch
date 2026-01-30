export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold mb-2">Job Search Portal</h3>
        <p className="text-gray-400 text-sm">
          College Mini Project - Demonstrating Job Search System
        </p>
        <p className="text-gray-500 text-xs mt-4">
          {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
