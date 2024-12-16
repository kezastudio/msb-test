"use client";
import {
  forgotPasswordFormSchema,
  forgotPasswordFormSchemaType,
  signUpFormSchema,
  signUpFormSchemaType,
} from "@/lib/schema/sign-in-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button-2";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js'

type Props = {};

const ForgotPass = (props: Props) => {
  const [loading, setLoading] = useState(false);

  // const supabaseUrl =  process.env.NEXT_PUBLIC_MSB_SUPABASE_URL;
  // const supabaseKey =  process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey)

  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);


  const router = useRouter();

  const form = useForm<forgotPasswordFormSchemaType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: forgotPasswordFormSchemaType) => {
    console.log(values);
    setLoading(true);

    try {
      const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`;
      // const response = await axios.post("/api/auth/forgot-password", values);
      // let { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {redirectTo: 'http://localhost:3000//reset-password',})
      let { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo,
      });

      console.log("Data",data);
      console.log("Values",values.email)

      if (data) {
       

        toast({
          variant: "default",
          title: "Success",
          description: "Reset link sent successfully 🎉",
        });

        setLoading(false);

        // Redirect to the dashboard

        // router.push("/reset-password");
      }else{
        console.log("Error",error)
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 flex flex-col justify-center px-5 py-10">
      <h1 className="text-4xl text-center font-bold py-10">Forgot password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center ">
            <Button
              className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-20"
              type="submit"
              isLoading={loading}
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPass;
