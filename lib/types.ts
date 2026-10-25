export type BookingStatus = "pending" | "verified" | "rejected";

export type Booking = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  student_class: string | null;
  institution: string | null;
  bkash_number: string;
  transaction_id: string;
  status: BookingStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: "general" | "course" | "payment" | "mock_test";
  sort_order: number;
  published: boolean;
};

export type MockTest = {
  id: string;
  title: string;
  description: string | null;
  scheduled_at: string | null;
  duration_minutes: number | null;
  question_count: number | null;
  syllabus_topics: string[] | null;
  status: "upcoming" | "ongoing" | "completed";
  sort_order: number;
  published: boolean;
};

export type Announcement = {
  id: string;
  title: string;
  body: string | null;
  published: boolean;
  created_at: string;
};

export type BookingInput = {
  full_name: string;
  phone: string;
  email?: string;
  student_class?: string;
  institution?: string;
  bkash_number: string;
  transaction_id: string;
};

export type TestQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic?: string;
};

export type InteractiveMockTest = {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  total_marks: number;
  syllabus_topics: string[];
  difficulty: "সহজ" | "মাঝারি" | "অলিম্পিয়াড স্ট্যান্ডার্ড";
  status?: "live" | "upcoming" | "completed";
  questions: TestQuestion[];
};

export type TestSubmission = {
  id: string;
  test_id: string;
  student_name: string;
  student_phone: string;
  answers: Record<string, number>;
  score: number;
  total: number;
  time_taken_seconds: number;
  submitted_at: string;
};

export type QaAnswer = {
  id: string;
  question_id: string;
  author_name: string;
  is_mentor: boolean;
  content: string;
  upvotes: number;
  created_at: string;
};

export type QaQuestion = {
  id: string;
  title: string;
  body: string;
  topic: string;
  author_name: string;
  author_class?: string;
  author_phone?: string;
  upvotes: number;
  answers: QaAnswer[];
  is_solved: boolean;
  created_at: string;
};
