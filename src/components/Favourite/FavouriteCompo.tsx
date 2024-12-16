"use client"
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-search";
import FavouriteContent from "./FavouriteContent";
import FavouritePeople from "./FavouritePeople";

type Props = {};

const FavouriteCompo = (props: Props) => {
  return (
    <div className="w-full flex justify-center py-10">
      <Tabs defaultValue="content" className="w-[90%]">
        <TabsList className="flex justify-evenly">
          <TabsTrigger
            className="text-xl shadow-none font-semibold  "
            value="content"
          >
            Content
          </TabsTrigger>

          <TabsTrigger className="text-xl font-semibold" value="people">
            People
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <FavouriteContent />
        </TabsContent>
        <TabsContent value="people">
          <FavouritePeople />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FavouriteCompo;
