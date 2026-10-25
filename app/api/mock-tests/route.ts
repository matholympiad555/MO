import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const tests = store.getMockTests();
    // Return summary without leaking answers in list
    const safeTests = tests.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      duration_minutes: t.duration_minutes,
      total_marks: t.total_marks,
      syllabus_topics: t.syllabus_topics,
      difficulty: t.difficulty,
      status: t.status || "live",
      question_count: t.questions ? t.questions.length : 10,
    }));
    return NextResponse.json({ success: true, data: safeTests });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load mock tests" },
      { status: 500 },
    );
  }
}
