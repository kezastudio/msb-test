"use client";
import {
  resetPasswordFormSchema,
  resetPasswordFormSchemaType,
} from "@/lib/schema/sign-in-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";

import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter  } from "next/navigation";
import { Button } from "../ui/button-2";
import supabase from "@/lib/supabaseClient";


type Props = {};
type ParamsType = {
  error?: string | null;
  error_code?: string | null;
  error_description?: string | null;
};


const ResetPasswords = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [params, setParams] = useState({});
  const [params, setParams] = useState<ParamsType>({});

  const form = useForm<resetPasswordFormSchemaType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const hashParams = new URLSearchParams(window.location.hash.substring(1));
  //     setParams({
  //       error: hashParams.get('error'),
  //       error_code: hashParams.get('error_code'),
  //       error_description: hashParams.get('error_description'),
  //     });
  //   }
  // }, [router]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const errorParams = {
        error: hashParams.get('error'),
        error_code: hashParams.get('error_code'),
        error_description: hashParams.get('error_description'),
      };

      setParams(errorParams);

      // Check if there's an error and display the toast
      // console.log("errorParams.error",errorParams.error)
      // if (errorParams.error) {
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: `${errorParams.error}!\n${errorParams.error_description || "Unknown error"}!`,
         
      //   });
      // }
    }
  }, [router]);

  useEffect(() => {
  
      // Check if there's an error and display the toast
      console.log("params.error",params.error)
      if (params?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `${params?.error}!\n${params?.error_description || "Unknown error"}!`,
         
        });
      }
    
  }, [params]);




// console.log(params)









  // const onSubmit = async (values: resetPasswordFormSchemaType) => {
  //   console.log(values);
  //   // Add your password reset logic here
  //   const { password } = values;
  //   try {
  //     const response = await axios.post("/api/auth/reset-password", {
  //       password,
  //     });

  //     console.log(response);
  //     if (response.status === 200) {
  //       // Redirect to the dashboard
  //       toast({
  //         variant: "default",
  //         title: "Success",
  //         description: "Password reset successfully 🎉",
  //       });
  //       setLoading(false);
  //       // Redirect to the dashboard
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "An error occurred while resetting password",
  //     });
  //   }
  // };


  const onSubmit = async (values: resetPasswordFormSchemaType) => {
    console.log(values);
    const { password } = values;
  
    try {
      // Call Supabase to update the user's password
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
  
      if (error) {
        throw error;
      }
  
      console.log(data);
      toast({
        variant: "default",
        title: "Success",
        description: "Password reset successfully 🎉",
      });
      setLoading(false);
      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error(error);
      setLoading(false);



      toast({
        variant: "destructive",
        title: "Error",
        // description: `An error occurred while resetting password.\n${params?.error_description || "Unknown error"}!`,
        description: `${params?.error}!\n${params?.error_description || "Unknown error"}!`,
        
      });
    }
  };
  







  return (
    <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 flex flex-col justify-center px-5 py-10">
      <h1 className="text-4xl text-center font-bold py-10">Reset password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="8+ Characters"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="8+ Characters"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-20"
              type="submit"
              disabled={!form.formState.isValid}
              isLoading={loading}
            >
              Reset Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswords;
