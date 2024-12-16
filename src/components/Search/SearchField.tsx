"use client";

import { Search,BookHeart} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function SearchComp() {
  const searchParams = useSearchParams();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString().trim();

    if (typeof query === "string") {
      window.location.href = query.length > 0 ? `/search?query=${query}` : "/search";
    }
  };

  const query = searchParams.get("query") || "";

  return (
    <>
    <div className="flex flex-row gap-4 relative px-6 w-full  max-w-sm">
      <form onSubmit={onSubmit} className="relative px-4 w-full mr-2  max-w-sm">
        <Input
          placeholder="Search..."
          type="text"
          name="query"
          id="query"
          defaultValue={query}
          className="pr-12 pl-4 py-6 rounded-lg border focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-sm"
        />

        <button
          type="submit"
          className="bg-[#ffdd44] rounded-full text-white absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2"
        >
          <Search className="w-5 h-5 p-2 box-content" />
        </button>
      </form>
      <div>
      <Link href="/favourites" title="Favourites">
      <button
          
          className="bg-[#ffdd44] rounded-full text-white absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2"
        >
          <BookHeart className="w-5 h-5 p-2 box-content" />
        </button>
        </Link>
        </div>
        </div>
    </>
  );
}
