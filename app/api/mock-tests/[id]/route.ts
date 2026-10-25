import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(
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

    // Strip out correctIndex and explanation while student is taking the test
    const sanitizedTest = {
      ...test,
      questions: test.questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        topic: q.topic,
      })),
    };

    return NextResponse.json({ success: true, data: sanitizedTest });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch mock test" },
      { status: 500 },
    );
  }
}
