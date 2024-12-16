import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const userEmail = await request.json();
    console.log(userEmail);

    // Sign up the user and include metadata
    let { data, error: resetError } = await supabase.auth.resetPasswordForEmail(
      userEmail.email,
      {
        redirectTo: "http://localhost:3000/reset-password",
      }
    );

    if (resetError) {
      console.log("Forgot-Password Error:", resetError.message);
      return NextResponse.json({ error: resetError.message }, { status: 400 });
    }

    console.log("SignIn Data:", data);

    return NextResponse.json({ message: "User Forgote passoword" });
  } catch (error) {
    console.log("Unexpected Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
