"use client";

import {
  helpSchema,
  helpSchemaType,
  uploadSchema,
  uploadSchemaType,
} from "@/lib/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { Textarea } from "../ui/textarea";

type Props = {};

const Help = (props: Props) => {
  const form = useForm<helpSchemaType>({
    resolver: zodResolver(helpSchema),
    defaultValues: {
      subject: "",
      email: "",
      body: "",
    },
  });
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <h1 className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold">
        Help
      </h1>

      <div className="my-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => console.log(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter caption" rows={7} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#FFDA44] hover:bg-[#fde78e] mt-10 text-black font-bold py-5 px-24"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Help;
