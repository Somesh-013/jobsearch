export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string;
  location: string;
  salary: string;
  created_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}
