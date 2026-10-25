import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    return createClient(url, key);
  }
  return null;
}

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

    const cleanQuery = query.trim();

    // 1. Try Supabase first
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .or(`transaction_id.ilike.${cleanQuery},phone.eq.${cleanQuery},bkash_number.eq.${cleanQuery}`)
        .limit(1);

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          success: true,
          data: data[0],
        });
      }
    }

    // 2. Fall back to local store
    const booking = store.findBookingByQuery(cleanQuery);

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
        email: booking.email,
        student_class: booking.student_class,
        institution: booking.institution,
        bkash_number: booking.bkash_number,
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