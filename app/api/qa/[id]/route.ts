import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const q = store.getQaById(id);

    if (!q) {
      return NextResponse.json(
        { success: false, error: "প্রশ্নটি খুঁজে পাওয়া যায়নি।" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: q });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load question" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { author_name, content, is_mentor } = body;

    if (!author_name || !content) {
      return NextResponse.json(
        { success: false, error: "নাম ও উত্তরের বিবরণ আবশ্যক।" },
        { status: 400 },
      );
    }

    const answer = store.addQaAnswer(id, {
      author_name,
      content,
      is_mentor: Boolean(is_mentor),
    });

    return NextResponse.json({
      success: true,
      message: "উত্তর সফলভাবে যুক্ত হয়েছে!",
      data: answer,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "উত্তর সংরক্ষণ করা যায়নি।" },
      { status: 400 },
    );
  }
}
