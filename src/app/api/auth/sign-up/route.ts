import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const userData = await request.json();

    // Sign up the user and include metadata
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          fullname: userData.fullname,
          username: userData.username,
        },
      },
    });

    if (signUpError) {
      console.log("SignUp Error:", signUpError.message);
      throw new Error(signUpError.message);
    }

    return NextResponse.json({ message: "User Created", data: data.user });
  } catch (error: any) {
    console.log("Unexpected Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
