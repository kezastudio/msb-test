"use client";
import {
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
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { set, useForm, useWatch } from "react-hook-form";

import { Input } from "../ui/input";
import Link from "next/link";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button-2";

import { createClient } from '@supabase/supabase-js'

type Props = {};

const SignUpCompo = (props: Props) => {
  const router = useRouter();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);


  

  // const supabaseUrl =  process.env.NEXT_PUBLIC_MSB_SUPABASE_URL;
  // const supabaseKey =  process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey)

  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);







  const form = useForm<signUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control: form.control, name: "password" });

  const confirmPassword = useWatch({
    control: form.control,
    name: "confirmPassword",
  });

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const onSubmit = async (values: signUpFormSchemaType) => {
    setLoading(true);
    console.log(values);
    
    const { confirmPassword, ...data } = values;

    // Do something with the data

  //   try {
  //     const response = await axios.post("/api/auth/sign-up", data);

  //     console.log(response);
  //     if (response.status === 200) {
  //       toast({
  //         title: "Sign Up succsessfully 🎈🎇",
  //         description: "You have successfully signed up. Please login.",
  //       });

  //       // Redirect to the dashboard

  //       setLoading(false);

  //       router.push(`/confirm-email/${values.email}`);
  //     }
  //   } catch (error: any) {
  //     console.log(error.response.data.error);
  //     toast({
  //       variant: "destructive",
  //       title: "Sign Up failed 😞",
  //       description: error.response.data.error,
  //     });
  //     setLoading(false);
  //   }
  // };


  try {
    
// let { data, error } = await supabase.auth.signUp({
//  email: values.email,
//   password: values.password
// })

const { data, error } = await supabase.auth.signUp({
  email: values.email,
  password: values.password,
  options: {
    data: {
      Name: values.fullname,
      UserName: values.username,
    },
   
  },
});
 



    if (error) {
      console.error('Error adding user:', error);
      if (error.message.includes('Email rate limit exceeded')) {
        
        alert('You have exceeded the email rate limit. Please try again later.');
        setLoading(false);
    } else {
       
        alert(error.message);
        setLoading(false);
    }
    } else {
      console.log('User added successfully:', data);
      alert("User added successfully:");
      setLoading(false);
       // Redirect to the dashboard
   if(data){
      //  const { data:userUpdate, error:userError } = await supabase.auth.updateUser({
      //   data: { Name:values.fullname }
      
      // })
      // console.log("userUpdate",userUpdate)
      localStorage.setItem("userName",values.username)
      localStorage.setItem("name",values.fullname)
    }
      
        router.push(`/confirm-email/${values.email}`);
     
    }
  } catch (error: any) {
        console.log(error.response.data.error);
        toast({
          variant: "destructive",
          title: "Sign Up failed 😞",
          description: error.response.data.error,
        });
        setLoading(false);
      }
    };







  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setTermsAccepted(checked === true);
  };

  //
  return (
    <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 flex flex-col justify-center px-5 py-10">
      <h1 className="text-4xl text-center font-bold py-10">
        Create your account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a username" {...field} />
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
                  <Input type="email" placeholder="Enter a Email" {...field} />
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
                <FormLabel className="font-semibold">Password</FormLabel>
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
                <FormLabel className="font-semibold">
                  Confirm Password
                </FormLabel>
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
          {!passwordsMatch && (
            <p className="text-red-500 mt-2">Passwords do not match</p>
          )}
          <div className="flex gap-2 justify-center items-center ">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={handleCheckboxChange}
            />
            <p className="text-sm">
              I agree with MSB’s{" "}
              <Link href={"#"}>
                <span className="underline">T’s & C’s</span>
              </Link>{" "}
              and{" "}
              <Link href={"#"}>
                <span className="underline">privacy policy.</span>
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-center ">
            <Button
              className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-20"
              type="submit"
              disabled={!passwordsMatch || !termsAccepted}
              isLoading={loading}
            >
              Sign Up
            </Button>

            <p className="text-sm mt-3">
              Already have an account?
              <Link className="font-semibold mx-2" href="/sign-in">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpCompo;
