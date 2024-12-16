import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const userData = await request.json();

    // Sign up the user and include metadata
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: userData.email,
        password: userData.password,
      }
    );

    if (signInError) {
      console.log("SignIN Error:", signInError.message);
      throw new Error(signInError.message);
    }

    return NextResponse.json({ message: "User sign-in", data: data.user });
  } catch (error: any) {
    console.log("Unexpected Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
