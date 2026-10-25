import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const count = store.upvoteQa(id);
    return NextResponse.json({ success: true, upvotes: count });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Upvote failed" },
      { status: 400 },
    );
  }
}
