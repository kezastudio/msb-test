// import DonateNowSingle from "@/components/Card/DonateNowSingle";
// import DonateNow from "@/components/Donate/DonateNow";
// import React from "react";

// type Props = {};

// const page = (props: Props) => {
//   return (
//     <div>
//       <DonateNow />
//     </div>
//   );
// };

// export default page;


// import DonateNowSingle from "@/components/Card/DonateNowSingle";
import DonateNow from "@/components/Donate/DonateNow";
import React, { Suspense } from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    // <div>
    //   <DonateNow />
    // </div>
    <Suspense fallback={<div>Loading...</div>}>
   <DonateNow />
  </Suspense>
  );
};

export default page;

