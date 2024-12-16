import UserProfile from "@/components/Profile/UserProfile";
import React from "react";


type Props = {
  params: {
    userId: string;
  };
};

const page = ({ params: { userId } }: Props) => {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <UserProfile userId={userId} />
    </div>
  );
};

export default page;
