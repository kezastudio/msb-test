import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const userData = await request.json();

    const { data: user } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not found");
    }

    console.log("userData", userData);
    const { goals, site } = userData;

    const { data, error: GoalError } = await supabase.auth.updateUser({
      data: {
        goals,
        site,
      },
    });
    console.log(data);

    if (GoalError) {
      throw new Error(GoalError.message);
    }

    // Sign up the user and include metadata
    return NextResponse.json({ message: "Profile Updated" });
  } catch (error: any) {
    console.log("Unexpected Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
