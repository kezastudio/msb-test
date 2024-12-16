import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { password } = await request.json();
    console.log(password);

    // Sign up the user and include metadata
    let { data, error: resetError } = await supabase.auth.updateUser({
      password,
    });

    if (resetError) {
      console.log("Reset-Password Error:", resetError.message);
      return NextResponse.json({ error: resetError.message }, { status: 400 });
    }

    console.log("Reset Data:", data);

    return NextResponse.json({ message: "User Reset passoword" });
  } catch (error) {
    console.log("Unexpected Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
