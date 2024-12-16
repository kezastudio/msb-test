import FavouriteCompo from "@/components/Favourite/FavouriteCompo";
import SearchComp from "@/components/Search/SearchField";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center px-3 py-8">Favourite</h1>
      <div className="flex justify-center">
        <SearchComp />
      </div>
      <FavouriteCompo />
    </div>
  );
};

export default page;
