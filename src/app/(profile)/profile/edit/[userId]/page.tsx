import Faqs from "@/components/FAQS/Faqs";
import EditProfile from "@/components/Profile/EditProfile";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

const page = async ({ params }: Props) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const user = data?.user || null;

  console.log("edit profiles", data.user);

  return (
    <div>
      <div className="">
        <EditProfile params={params} user={user} />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
