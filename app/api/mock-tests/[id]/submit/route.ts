import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const test = store.getMockTestById(id);

    if (!test) {
      return NextResponse.json(
        { success: false, error: "মক টেস্টটি খুঁজে পাওয়া যায়নি।" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { student_name, student_phone, answers, time_taken_seconds } = body;

    const userAnswers: Record<string, number> = answers || {};
    let correctCount = 0;
    const questionReview = test.questions.map((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected !== undefined && selected === q.correctIndex;
      if (isCorrect) correctCount += 1;

      return {
        id: q.id,
        question: q.question,
        options: q.options,
        selectedIndex: selected !== undefined ? selected : null,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const total = test.questions.length;
    const score = correctCount;
    const percentage = Math.round((score / (total || 1)) * 100);

    const submission = store.saveSubmission({
      test_id: id,
      student_name: student_name || "শিক্ষার্থী",
      student_phone: student_phone || "N/A",
      answers: userAnswers,
      score,
      total,
      time_taken_seconds: time_taken_seconds || 0,
    });

    return NextResponse.json({
      success: true,
      data: {
        submission_id: submission.id,
        test_title: test.title,
        score,
        total,
        percentage,
        time_taken_seconds,
        review: questionReview,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "সাবমিশন প্রক্রিয়াকরণ ব্যর্থ হয়েছে।" },
      { status: 500 },
    );
  }
}
