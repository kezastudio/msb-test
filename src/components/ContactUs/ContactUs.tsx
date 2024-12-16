// "use client";

// import React ,{useEffect} from "react";
// import { useForm } from "react-hook-form";

// import {
//   Form,

//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "../ui/button";

// import { Textarea } from "../ui/textarea";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { contactSchema, contactSchemaType } from "@/lib/schema/profile";

// type Props = {};

// const ContactUs = (props: Props) => {
//   const form = useForm<contactSchemaType>({
//     resolver: zodResolver(contactSchema),
//     defaultValues: {
//       subject: "",
//       email: "",
//       body: "",
//     },
//   });

  






//   return (
//     <div className="w-full flex flex-col justify-center items-center ">
//       <h1 className="text-2xl my-4 text-center md:text-4xl lg:text-4xl xl:text-4xl font-bold">
//         Contact Us
//       </h1>

//       <div className="my-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit((values) => console.log(values))}
//             className="space-y-4"
//           >
//             <FormField
//               control={form.control}
//               name="subject"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Subject</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter subject" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="body"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="font-semibold">Body</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Enter caption" rows={7} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex justify-center items-center">
//               <Button
//                 type="submit"
//                 className="bg-[#FFDA44] hover:bg-[#fde78e] mt-10 text-black font-bold py-5 px-24"
//               >
//                 Submit
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;









"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, contactSchemaType } from "@/lib/schema/profile";

type Props = {};

const ContactUs = (props: Props) => {
  const router = useRouter();
  const form = useForm<contactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "",
      email: "",
      body: "",
    },
  });

  

  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const onSubmit = async (data: contactSchemaType) => {
    try {
      const { error } = await supabase
        .from("Contact_Us") 
        .insert([{ Subject: data.subject, Email: data.email, Body: data.body }]);

      if (error) throw error;
      console.log("Data inserted successfully!");
      
        toast({
          title: "Success",
          description: "Message Received successfully 🎉",
        });
        localStorage.getItem("token")?( router.push("/profile")): (router.push("/"))
       

    } catch (error) {
      console.error("Error inserting data:");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl my-4 text-center md:text-4xl lg:text-4xl xl:text-4xl font-bold">
        Contact Us
      </h1>

      <div className="my-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subject" {...field} />
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

            <div className="flex justify-center items-center">
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

export default ContactUs;
