import fs from "fs";
import path from "path";
import {
  Booking,
  BookingInput,
  InteractiveMockTest,
  TestSubmission,
  QaQuestion,
  QaAnswer,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(filename: string, fallback: T): T {
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(filename: string, data: T): void {
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ---------------- INITIAL SEED DATA ----------------

const initialBookings: Booking[] = [
  {
    id: "bmo-demo-1",
    full_name: "রাফিদ হাসান",
    phone: "01711223344",
    email: "rafid@example.com",
    student_class: "Class 5",
    institution: "আইডিয়াল স্কুল অ্যান্ড কলেজ, মতিঝিল",
    bkash_number: "01711223344",
    transaction_id: "BK992817AX",
    status: "verified",
    admin_note: "পেমেন্ট ভেরিফাইড। কোর্স অ্যাক্সেস চালু করা হয়েছে।",
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "bmo-demo-2",
    full_name: "তানজিলা শারমিন",
    phone: "01855667788",
    email: "tanjila@example.com",
    student_class: "Class 4",
    institution: "ভিকারুননিসা নূন স্কুল",
    bkash_number: "01855667788",
    transaction_id: "BK773410PL",
    status: "pending",
    admin_note: null,
    created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const INITIAL_MOCK_TESTS: InteractiveMockTest[] = [
  {
    id: "mock-1",
    title: "প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি মক ০১: সংখ্যাতত্ত্ব ও প্যাটার্ন",
    description:
      "মৌলিক সংখ্যা, বিভাজ্যতার নিয়ম, শেষ অঙ্ক নির্ণয় এবং ধারা ভিত্তিক বাছাইকৃত অলিম্পিয়াড প্রশ্নাবলী।",
    duration_minutes: 20,
    total_marks: 10,
    difficulty: "মাঝারি",
    syllabus_topics: ["সংখ্যাতত্ত্ব", "বিভাজ্যতা", "লজিক প্যাটার্ন", "শেষ অঙ্ক"],
    questions: [
      {
        id: "m1-q1",
        question:
          "১ থেকে ১০০ পর্যন্ত সংখ্যাগুলোর মধ্যে ৩ অথবা ৫ দ্বারা বিভাজ্য কিন্তু উভয় (৩ এবং ৫ উভয়) দ্বারা বিভাজ্য নয় এমন কতটি সংখ্যা আছে?",
        options: ["৩৩", "৪৭", "৪০", "৪১"],
        correctIndex: 1,
        explanation:
          "১ থেকে ১০০ পর্যন্ত ৩ দ্বারা বিভাজ্য সংখ্যা ৩৩টি [১০০/৩ = ৩৩]। ৫ দ্বারা বিভাজ্য সংখ্যা ২০টি [১০০/৫ = ২০]। ৩ ও ৫ উভয়ের ল.সা.গু ১৫ দ্বারা বিভাজ্য সংখ্যা ৬টি [১০০/১৫ = ৬]। সুতরাং কেবল ৩ বা ৫ দ্বারা বিভাজ্য কিন্তু উভয় নয় = (৩৩ - ৬) + (২০ - ৬) = ২৭ + ১৪ = ৪১ নয়, ৩৩ + ২০ - ২*(৬) = ৪১। (সঠিক উত্তর: ৪১ - বিকল্প ৪১)।",
      },
      {
        id: "m1-q2",
        question:
          "একটি দুই অঙ্কের সংখ্যার অঙ্কদ্বয়ের যোগফল ৯। সংখ্যাটির সাথে ২৭ যোগ করলে অঙ্কদ্বয় স্থান পরিবর্তন করে। সংখ্যাটি কত?",
        options: ["৩৬", "৪৫", "২৭", "৫৪"],
        correctIndex: 0,
        explanation:
          "ধরি সংখ্যাটি ৩৬। ৩৬ এর অঙ্কদ্বয়ের যোগফল ৩+৬ = ৯। এখন ৩৬ + ২৭ = ৬৩, যা স্থান পরিবর্তনকৃত সংখ্যা। সুতরাং সঠিক সংখ্যা ৩৬।",
      },
      {
        id: "m1-q3",
        question: "নিচের সংখ্যা ধারার পরবর্তী সংখ্যাটি কত? ২, ৬, ১২, ২০, ৩০, ?",
        options: ["৪০", "৪২", "৩৬", "৪৮"],
        correctIndex: 1,
        explanation:
          "ধারার প্রতিটি পদ n*(n+1) আকারে সাজানো: ১×২ = ২, ২×৩ = ৬, ৩×৪ = ১২, ৪×৫ = ২০, ৫×৬ = ৩০। সুতরাং পরবর্তী পদ হবে ৬×৭ = ৪২।",
      },
      {
        id: "m1-q4",
        question:
          "কোন ক্ষুদ্রতম সংখ্যাকে ৪, ৫ এবং ৬ দ্বারা ভাগ করলে প্রতিক্ষেত্রে ৩ ভাগশেষ থাকে?",
        options: ["৬৩", "১২৩", "৫৭", "৩৩"],
        correctIndex: 0,
        explanation:
          "৪, ৫ এবং ৬ এর ল.সা.গু = ৬০। যেহেতু প্রতি ক্ষেত্রে ৩ অবশিষ্ট থাকে, ক্ষুদ্রতম সংখ্যাটি হবে ৬০ + ৩ = ৬৩।",
      },
      {
        id: "m1-q5",
        question: "২^২০২৬ (2 power 2026) এর একক স্থানীয় অঙ্ক (Unit Digit) কত হবে?",
        options: ["২", "৪", "৮", "৬"],
        correctIndex: 1,
        explanation:
          "২ এর ঘাতের একক স্থানীয় অঙ্কের চক্র: ২^১=২, ২^২=৪, ২^৩=৮, ২^৪=৬ (চক্রের দৈর্ঘ্য ৪)। এখন ২০২৬ কে ৪ দিয়ে ভাগ করলে ভাগশেষ থাকে ২ (কারণ ২০২৬ = ৪×৫০৬ + ২)। চক্রের ২য় সংখ্যা হলো ৪। সুতরাং একক স্থানীয় অঙ্ক হবে ৪।",
      },
    ],
  },
  {
    id: "mock-2",
    title: "প্রাইমারি গণিত অলিম্পিয়াড প্রস্তুতি মক ০২: জ্যামিতি ও গণনাতত্ত্ব",
    description:
      "ত্রিভুজ, চতুর্ভুজ, পরিসীমা, ক্ষেত্রফল এবং পিজনহোল প্রিন্সিপাল ভিত্তিক বাস্তব অলিম্পিয়াড চ্যালেঞ্জ।",
    duration_minutes: 25,
    total_marks: 10,
    difficulty: "অলিম্পিয়াড স্ট্যান্ডার্ড",
    syllabus_topics: ["জ্যামিতি", "ত্রিভুজ ও চতুর্ভুজ", "পিজনহোল নীতি", "গণনাতত্ত্ব"],
    questions: [
      {
        id: "m2-q1",
        question:
          "একটি সমকোণী ত্রিভুজের অতিভুজ ১০ সেমি এবং একটি বাহু ৬ সেমি হলে, অপর বাহুর দৈর্ঘ্য কত সেমি?",
        options: ["৭ সেমি", "৮ সেমি", "৯ সেমি", "৫ সেমি"],
        correctIndex: 1,
        explanation:
          "পীথাগোরাসের উপপাদ্য অনুযায়ী: অতিভুজ^২ = লম্ব^২ + ভূমি^২ => ১০^২ = ৬^২ + x^২ => ১০০ - ৩৬ = ৬৪ => x = ৮ সেমি।",
      },
      {
        id: "m2-q2",
        question:
          "একটি বর্গক্ষেত্রের পরিসীমা ৩৬ সেমি হলে, ঐ বর্গক্ষেত্রের ক্ষেত্রফল কত বর্গ সেমি?",
        options: ["৮১", "৭২", "৬৪", "৩৬"],
        correctIndex: 0,
        explanation:
          "বর্গক্ষেত্রের এক বাহুর দৈর্ঘ্য = ৩৬ / ৪ = ৯ সেমি। ক্ষেত্রফল = ৯ × ৯ = ৮১ বর্গ সেমি।",
      },
      {
        id: "m2-q3",
        question:
          "একটি বৃত্তের ব্যাসার্ধ দ্বিগুণ করা হলে, নতুন বৃত্তটির ক্ষেত্রফল আদি ক্ষেত্রফলের কতগুণ হবে?",
        options: ["২ গুণ", "৩ গুণ", "৪ গুণ", "৮ গুণ"],
        correctIndex: 2,
        explanation:
          "বৃত্তের ক্ষেত্রফল πr²। ব্যাসার্ধ 2r হলে ক্ষেত্রফল π(2r)² = 4πr²। অর্থাৎ ক্ষেত্রফল ৪ গুণ হবে।",
      },
      {
        id: "m2-q4",
        question:
          "একটি ক্লাসে ৫ জন শিক্ষার্থী আছে। প্রত্যেকে প্রত্যেকের সাথে একবার হ্যান্ডশেক (করমর্দন) করলে মোট কতটি হ্যান্ডশেক হবে?",
        options: ["৫", "৮", "১০", "২০"],
        correctIndex: 2,
        explanation:
          "হ্যান্ডশেকের মোট সংখ্যা = n(n-1)/২ = ৫×(৫-১)/২ = ৫×৪/২ = ১০টি।",
      },
      {
        id: "m2-q5",
        question:
          "একটি ব্যাগে ৫টি লাল, ৪টি নীল এবং ৩টি সবুজ মার্বেল আছে। চোখ বন্ধ করে না দেখে অন্তত কতটি মার্বেল তুললে নিশ্চিতভাবে অন্তত একটি নীল মার্বেল থাকবেই?",
        options: ["৪টি", "৮টি", "৯টি", "১০টি"],
        correctIndex: 2,
        explanation:
          "ওয়ার্স্ট-কেস দৃশ্যকল্প (Worst-case scenario): আমরা প্রথমে সব লাল (৫টি) এবং সব সবুজ (৩টি) মার্বেল তুলে ফেললাম, মোট ৮টি। এর পরের (৯ম) মার্বেলটি নিশ্চিতভাবেই নীল হতে বাধ্য। সুতরাং উত্তর: ৫ + ৩ + ১ = ৯টি।",
      },
    ],
  },
];

const initialQa: QaQuestion[] = [
  {
    id: "qa-1",
    title: "মৌলিক সংখ্যার শেষ অঙ্ক কি কখনো ৫ হতে পারে?",
    body: "আমাদের শিক্ষক ক্লাসে বলেছিলেন যে কোনো মৌলিক সংখ্যার শেষ অংক ৫ হয় না। কিন্তু ৫ তো নিজেই একটি মৌলিক সংখ্যা। এর সঠিক ব্যাখ্যা কী?",
    topic: "সংখ্যাতত্ত্ব",
    author_name: "আহমেদ সাদিক",
    author_class: "Class 5",
    upvotes: 14,
    is_solved: true,
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    answers: [
      {
        id: "ans-1",
        question_id: "qa-1",
        author_name: "মেন্টর আসিফ (Math Olympiad Trainer)",
        is_mentor: true,
        content:
          "দারুণ একটি পর্যবেক্ষণ সাদিক! ৫ নিজেই একমাত্র মৌলিক সংখ্যা যার শেষ অংক ৫। তবে ৫ এর চেয়ে বড় কোনো সংখ্যার শেষ অঙ্ক ৫ হলে সেটি অবশ্যই ৫ দ্বারা নিঃশেষে বিভাজ্য হবে, তাই ৫ এর চেয়ে বড় কোনো মৌলিক সংখ্যার শেষ অংক কখনো ৫ হতে পারে না। চমৎকার চিন্তা!",
        upvotes: 19,
        created_at: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "qa-2",
    title: "একটি ত্রিভুজের তিন কোণের সমষ্টি সর্বদা ১৮০° কেন হয়?",
    body: "আমরা মুখস্থ করি ত্রিভুজের তিন কোণের যোগফল ১৮০ ডিগ্রি। কিন্তু জ্যামিতিকভাবে এটা কীভাবে অনুভব করা যায়?",
    topic: "জ্যামিতি",
    author_name: "নুসরাত জাহান",
    author_class: "Class 4",
    upvotes: 8,
    is_solved: true,
    created_at: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    answers: [
      {
        id: "ans-2",
        question_id: "qa-2",
        author_name: "মেন্টর জামান",
        is_mentor: true,
        content:
          "ত্রিভুজের যেকোনো শীর্ষবিন্দু দিয়ে বিপরীত বাহুর সমান্তরাল একটি সরলরেখা আঁকো। দেখবে একান্তর কোণদ্বয় পরস্পর সমান হওয়ায় রেখার একপাশে তিনটি কোণ মিলে একটি সরল কোণ (১৮০°) গঠন করে!",
        upvotes: 11,
        created_at: new Date(Date.now() - 15 * 3600 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "qa-3",
    title: "প্রি-বুকিং এর পর কোর্স শুরুর লিংক এবং মক টেস্ট কবে পাব?",
    body: "আমি bKash এ পেমেন্ট করে ট্রানজেকশন আইডি দিয়েছি। কখন কনফার্মেশন মেসেজ আসবে?",
    topic: "সাধারণ",
    author_name: "তানভীর হাসান",
    author_class: "Class 6",
    upvotes: 5,
    is_solved: true,
    created_at: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    answers: [
      {
        id: "ans-3",
        question_id: "qa-3",
        author_name: "Banglar Math Olympiad টিম",
        is_mentor: true,
        content:
          "বুকিং সাবমিটের পর অ্যাডমিন সর্বোচ্চ ২৪ ঘণ্টার মধ্যে ট্রানজেকশন আইডি যাচাই করে স্ট্যাটাস আপডেট করবে। তুমি 'স্ট্যাটাস চেক' পেজে তোমার ফোন নম্বর বা Transaction ID দিয়েও যেকোনো মুহূর্তে লাইভ স্ট্যাটাস দেখতে পারবে!",
        upvotes: 7,
        created_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      },
    ],
  },
];

// ---------------- PUBLIC REPOSITORY API ----------------

export const store = {
  // Bookings
  getBookings(): Booking[] {
    return readJson<Booking[]>("bookings.json", initialBookings);
  },

  findBookingByQuery(query: string): Booking | null {
    const q = query.trim().toLowerCase();
    const bookings = this.getBookings();
    return (
      bookings.find(
        (b) =>
          b.transaction_id.toLowerCase() === q ||
          b.phone.replace(/[\s-+]/g, "").includes(q.replace(/[\s-+]/g, "")) ||
          (b.email && b.email.toLowerCase() === q),
      ) || null
    );
  },

  addBooking(input: BookingInput): Booking {
    const bookings = this.getBookings();
    const existing = bookings.find(
      (b) => b.transaction_id.toLowerCase() === input.transaction_id.trim().toLowerCase(),
    );
    if (existing) {
      throw new Error("এই ট্রানজেকশন আইডিটি ইতোমধ্যে ব্যবহৃত হয়েছে।");
    }

    const newBooking: Booking = {
      id: "bmo-" + Math.random().toString(36).substring(2, 9),
      full_name: input.full_name.trim(),
      phone: input.phone.trim(),
      email: input.email ? input.email.trim() : null,
      student_class: input.student_class || null,
      institution: input.institution ? input.institution.trim() : null,
      bkash_number: input.bkash_number.trim(),
      transaction_id: input.transaction_id.trim().toUpperCase(),
      status: "pending",
      admin_note: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    writeJson("bookings.json", bookings);
    return newBooking;
  },

  updateBookingStatus(id: string, status: "pending" | "verified" | "rejected", note?: string): Booking {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("Booking not found");
    }
    bookings[index] = {
      ...bookings[index],
      status,
      admin_note: note !== undefined ? note : bookings[index].admin_note,
      updated_at: new Date().toISOString(),
    };
    writeJson("bookings.json", bookings);
    return bookings[index];
  },

  // Mock Tests
  getMockTests(): InteractiveMockTest[] {
    return readJson<InteractiveMockTest[]>("mock-tests.json", INITIAL_MOCK_TESTS);
  },

  getMockTestById(id: string): InteractiveMockTest | null {
    const tests = this.getMockTests();
    return tests.find((t) => t.id === id) || null;
  },

  saveSubmission(submission: Omit<TestSubmission, "id" | "submitted_at">): TestSubmission {
    const submissions = readJson<TestSubmission[]>("submissions.json", []);
    const full: TestSubmission = {
      ...submission,
      id: "sub-" + Math.random().toString(36).substring(2, 9),
      submitted_at: new Date().toISOString(),
    };
    submissions.unshift(full);
    writeJson("submissions.json", submissions);
    return full;
  },

  getSubmissions(): TestSubmission[] {
    return readJson<TestSubmission[]>("submissions.json", []);
  },

  // Q&A
  getQaQuestions(): QaQuestion[] {
    return readJson<QaQuestion[]>("qa.json", initialQa);
  },

  getQaById(id: string): QaQuestion | null {
    const questions = this.getQaQuestions();
    return questions.find((q) => q.id === id) || null;
  },

  addQaQuestion(data: {
    title: string;
    body: string;
    topic: "সংখ্যাতত্ত্ব" | "জ্যামিতি" | "প্যাটার্ন ও যুক্তি" | "গণনাতত্ত্ব" | "সাধারণ";
    author_name: string;
    author_class?: string;
    author_phone?: string;
  }): QaQuestion {
    const questions = this.getQaQuestions();
    const newQ: QaQuestion = {
      id: "qa-" + Math.random().toString(36).substring(2, 9),
      title: data.title.trim(),
      body: data.body.trim(),
      topic: data.topic,
      author_name: data.author_name.trim(),
      author_class: data.author_class,
      author_phone: data.author_phone,
      upvotes: 0,
      answers: [],
      is_solved: false,
      created_at: new Date().toISOString(),
    };
    questions.unshift(newQ);
    writeJson("qa.json", questions);
    return newQ;
  },

  addQaAnswer(
    questionId: string,
    data: { author_name: string; content: string; is_mentor?: boolean },
  ): QaAnswer {
    const questions = this.getQaQuestions();
    const qIndex = questions.findIndex((q) => q.id === questionId);
    if (qIndex === -1) throw new Error("Question not found");

    const answer: QaAnswer = {
      id: "ans-" + Math.random().toString(36).substring(2, 9),
      question_id: questionId,
      author_name: data.author_name.trim(),
      is_mentor: Boolean(data.is_mentor),
      content: data.content.trim(),
      upvotes: 0,
      created_at: new Date().toISOString(),
    };

    questions[qIndex].answers.push(answer);
    if (data.is_mentor) {
      questions[qIndex].is_solved = true;
    }
    writeJson("qa.json", questions);
    return answer;
  },

  upvoteQa(questionId: string): number {
    const questions = this.getQaQuestions();
    const q = questions.find((item) => item.id === questionId);
    if (!q) throw new Error("Question not found");
    q.upvotes += 1;
    writeJson("qa.json", questions);
    return q.upvotes;
  },
};
