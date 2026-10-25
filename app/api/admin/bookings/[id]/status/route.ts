import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, note } = body;

    if (!status || !["pending", "verified", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "অবৈধ স্ট্যাটাস" },
        { status: 400 },
      );
    }

    const updated = store.updateBookingStatus(id, status, note);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update status" },
      { status: 400 },
    );
  }
}
