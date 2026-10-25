import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const bookings = store.getBookings();
    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.full_name || !body.phone || !body.bkash_number || !body.transaction_id) {
      return NextResponse.json(
        { success: false, error: "সকল বাধ্যতামূলক তথ্য পূরণ করুন।" },
        { status: 400 },
      );
    }

    const booking = store.addBooking({
      full_name: body.full_name,
      phone: body.phone,
      email: body.email,
      student_class: body.student_class || body.grade,
      institution: body.institution,
      bkash_number: body.bkash_number || body.bkash,
      transaction_id: body.transaction_id || body.transactionId,
    });

    return NextResponse.json({
      success: true,
      message: "তোমার প্রি-বুকিং সফলভাবে জমা হয়েছে!",
      data: booking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "বুকিং জমা দেওয়া সম্ভব হয়নি।" },
      { status: 400 },
    );
  }
}
