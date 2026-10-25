import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic");
    const search = searchParams.get("search")?.toLowerCase();

    let list = store.getQaQuestions();

    if (topic && topic !== "সব") {
      list = list.filter((q) => q.topic === topic);
    }

    if (search) {
      list = list.filter(
        (q) =>
          q.title.toLowerCase().includes(search) ||
          q.body.toLowerCase().includes(search) ||
          q.author_name.toLowerCase().includes(search),
      );
    }

    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load questions" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, body: content, topic, author_name, author_class, author_phone } = body;

    if (!title || !content || !author_name) {
      return NextResponse.json(
        { success: false, error: "প্রশ্নের শিরোনাম, বিস্তারিত ও নাম আবশ্যক।" },
        { status: 400 },
      );
    }

    const newQuestion = store.addQaQuestion({
      title,
      body: content,
      topic: topic || "সাধারণ",
      author_name,
      author_class,
      author_phone,
    });

    return NextResponse.json({
      success: true,
      message: "তোমার প্রশ্নটি সফলভাবে পোস্ট হয়েছে!",
      data: newQuestion,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "প্রশ্ন পোস্ট করা যায়নি।" },
      { status: 400 },
    );
  }
}
