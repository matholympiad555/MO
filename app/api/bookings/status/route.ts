import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { success: false, error: "অনুগ্রহ করে ফোন নম্বর অথবা Transaction ID লিখুন।" },
        { status: 400 },
      );
    }

    const booking = store.findBookingByQuery(query);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "কোনো বুকিং রেকর্ড পাওয়া যায়নি। তথ্য সঠিকভাবে দিয়েছেন কিনা যাচাই করুন।",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: booking.id,
        full_name: booking.full_name,
        phone: booking.phone,
        student_class: booking.student_class,
        transaction_id: booking.transaction_id,
        status: booking.status,
        admin_note: booking.admin_note,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to query status" },
      { status: 500 },
    );
  }
}
