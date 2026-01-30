/*
  # Job Search System Database Schema

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text) - Job title
      - `company` (text) - Company name
      - `description` (text) - Job description
      - `skills` (text) - Required skills
      - `location` (text) - Job location
      - `salary` (text) - Salary range (optional)
      - `created_at` (timestamptz) - Creation timestamp
    
    - `applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, foreign key to jobs)
      - `user_id` (uuid, foreign key to auth.users)
      - `full_name` (text) - Applicant's full name
      - `email` (text) - Applicant's email
      - `phone` (text) - Applicant's phone number
      - `created_at` (timestamptz) - Application submission timestamp

  2. Security
    - Enable RLS on both tables
    - Jobs: Public read access (anyone can view jobs)
    - Applications: Users can only create applications and view their own applications
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  description text NOT NULL,
  skills text NOT NULL,
  location text NOT NULL,
  salary text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Jobs policies (public read access)
CREATE POLICY "Anyone can view jobs"
  ON jobs FOR SELECT
  USING (true);

-- Applications policies
CREATE POLICY "Users can create applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);