import Search from "@/components/Search/Search";
import SearchComp from "@/components/Search/SearchField";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="flex justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchComp />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
    </div>
  );
};

export default page;
