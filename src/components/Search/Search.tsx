"use client"
import React,{useEffect,useState} from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-search";
import PeopleSearch from "./PeopleSearch";
import ContentSearch from "./ContentSearch";
import { Input } from "../ui/input";
import { useSearchParams } from 'next/navigation'


type Props = {};


const Search = (props: Props) => {
  // const [searchData, setSearchData] = useState<string|null>('');
  const [searchData, setSearchData] = useState<string>('');

  const searchParams = useSearchParams()
 
  const searchNew = searchParams.get('query') 
  console.log('search',searchNew)


  useEffect(() => {
    // setSearchData(searchNew)
    setSearchData(searchNew ?? '*');
  }, [searchNew]);

  console.log('searchData', searchData);

  return (
    <div className="w-full flex justify-center py-10">
      <Tabs defaultValue="content" className="w-full md:w-3/4 lg:3/4 xl:3/4">
        <TabsList className="flex my-5 justify-evenly">
          <TabsTrigger
            className="text-xl shadow-none font-semibold   "
            value="content"
          >
            <span className="hidden md:block lg:block xl:block my-2">
              Content Search
            </span>

            <span className="block md:hidden lg:hidden xl:hidden">Content</span>
          </TabsTrigger>

          <TabsTrigger className="text-xl font-semibold" value="people">
            <span className="hidden md:block lg:block xl:block">
              People Search
            </span>

            <span className="block md:hidden lg:hidden xl:hidden">People</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <ContentSearch search={searchData} />
        </TabsContent>
        <TabsContent value="people">
          <PeopleSearch search={searchData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Search;
