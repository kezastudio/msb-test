"use client";
import {
  signInFormSchema,
  signInFormSchemaType,
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "../ui/input";
import Link from "next/link";
import axios, { Axios, AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button-2";

import { createClient } from '@supabase/supabase-js'

type Props = {};
type Session = {
  access_token: string;
  user: {
    id: string;
    
  };
  
};

const SignInCompo = (props: Props) => {
  //
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  //
  const form = useForm<signInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const supabaseUrl = 'https://pobriujlqzboqzybijuc.supabase.co'
  // // const supabaseKey = process.env.SUPABASE_KEY

  // const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvYnJpdWpscXpib3F6eWJpanVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzcwOTUsImV4cCI6MjAzNzIxMzA5NX0.vVqZp_J0u1d-Grj-uTIoAT365P6vvOmRBnaQ3SgpOVs'
 
  // const supabaseUrl =  process.env.NEXT_PUBLIC_MSB_SUPABASE_URL;
  // const supabaseKey =  process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey)


  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);








  const onSubmit = async (values: signInFormSchemaType) => {
    setLoading(true);
    console.log(values);

    // try {
    //   const response = await axios.post("/api/auth/sign-in", values);

    //   console.log(response);

    //   if (response.status === 200) {
    //     toast({
    //       title: "Success",
    //       description: "User Logged in successfully 🎉",
    //     });

    //     // Redirect to the dashboard

    //     router.push("/");
    //     setLoading(false);
    //     window.location.reload();
    //   }
    // } catch (error: any) {
    //   console.log(error.response.data.error);
    //   toast({
    //     variant: "destructive",
    //     title: "Error Occurred",
    //     description: error.response.data.error,
    //   });
    //   setLoading(false);
    // }

    try {
    
     
let { data,error} = await supabase.auth.signInWithPassword({
  email: values.email,
  password: values.password,
})

      
          if (error) {
            console.error('Invalid credentials:', error);

            alert('Invalid credentials');
            setLoading(false);
           
          } else {
            if (data.session?.access_token) {
              toast({
                title: "Success",
                description: "User Logged in successfully 🎉",
              });
           
            console.log('Loged In successfully:', data);
            setSession(data.session);
            // alert('Logged In Successfully');
             // Redirect to the dashboard

             if (data.session?.user?.id) {
              // Encrypt userId with Base64 and save to session storage
              const encodedUserId = btoa(data.session?.user?.id);
              sessionStorage.setItem('userId', encodedUserId);
              localStorage.setItem("token",data.session?.access_token)

              const { data: userData, error: userError } = await supabase
                .from('User Details')
                .select('id')
                .eq('id', data.session?.user?.id)
                .single();
  
              if (userError) {
                console.error(`Error fetching user details for Uid ${data.session?.user?.id}:`, userError);
                setLoading(false);
                // return null;
              }
              if(userData?.id){
              setUserId(userData?.id)
              console.log("userData.id",userData?.id)
              router.push("/profile");
              // router.push("/complete-profile");
              setLoading(false);
              }else{router.push("/complete-profile");
                setLoading(false);
              }
            }


       
       
        // window.location.reload();
           
          }}
        } catch (error: any) {
              console.log(error.response.data.error);
              toast({
                variant: "destructive",
                title: "Login failed 😞",
                description: error.response.data.error,
              });
              setLoading(false);
            }
          };



  

  return (
    <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 flex flex-col justify-center px-5 py-10">
      <h1 className="text-4xl text-center font-bold py-10">Welcome Back</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter a Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Link className="text-sm" href="/forgot-password">
              Forgot password?
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Button
              className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-24"
              type="submit"
              isLoading={loading}
            >
              Login
            </Button>

            <p className="text-sm mt-5">
              Don’t have an account?{" "}
              <Link className="font-semibold " href="/sign-up">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInCompo;
