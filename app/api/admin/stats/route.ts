import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { site } from "@/lib/content";

export async function GET() {
  try {
    const bookings = store.getBookings();
    const tests = store.getMockTests();
    const submissions = store.getSubmissions();
    const qa = store.getQaQuestions();

    const pendingCount = bookings.filter((b) => b.status === "pending").length;
    const verifiedCount = bookings.filter((b) => b.status === "verified").length;
    const rejectedCount = bookings.filter((b) => b.status === "rejected").length;
    const totalRevenue = verifiedCount * site.price;

    return NextResponse.json({
      success: true,
      data: {
        totalBookings: bookings.length,
        pendingCount,
        verifiedCount,
        rejectedCount,
        totalRevenue,
        totalMockTests: tests.length,
        totalTestAttempts: submissions.length,
        totalQaQuestions: qa.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load stats" },
      { status: 500 },
    );
  }
}
