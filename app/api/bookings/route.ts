import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    return createClient(url, key);
  }
  return null;
}

export async function GET() {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, data });
      }
    }

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

    const fullName = body.full_name || body.fullName;
    const phone = body.phone;
    const bkash = body.bkash_number || body.bkash;
    const trxId = body.transaction_id || body.transactionId || body.trxId;
    const grade = body.student_class || body.grade || "প্রাইমারি অলিম্পিয়াড";
    const institution = body.institution || "স্কুল";
    const email = body.email || null;

    if (!fullName || !phone || !bkash || !trxId) {
      return NextResponse.json(
        { success: false, error: "সকল বাধ্যতামূলক তথ্য পূরণ করুন।" },
        { status: 400 },
      );
    }

    // 1. Save to Supabase if configured
    const supabase = getSupabase();
    let supabaseRecord = null;
    if (supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : null,
          student_class: grade,
          institution: institution.trim(),
          bkash_number: bkash.trim(),
          transaction_id: trxId.trim().toUpperCase(),
          status: "pending",
          course_fee: 199.0,
        })
        .select()
        .single();

      if (!error && data) {
        supabaseRecord = data;
      }
    }

    // 2. Also save to local store as cache
    const booking = store.addBooking({
      full_name: fullName,
      phone: phone,
      email: email,
      student_class: grade,
      institution: institution,
      bkash_number: bkash,
      transaction_id: trxId,
    });

    return NextResponse.json({
      success: true,
      message: "তোমার প্রি-বুকিং সফলভাবে জমা হয়েছে!",
      data: supabaseRecord || booking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "বুকিং জমা দেওয়া সম্ভব হয়নি।" },
      { status: 400 },
    );
  }
}