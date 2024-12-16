
// "use client";

// import React, { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// import { Button } from "../ui/button-2";
// import { Image as Images } from "lucide-react";
// import { useForm } from "react-hook-form";
// import {
//   completeProfileSchema,
//   completeProfileSchemaType,
// } from "@/lib/schema/profile";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Label } from "../ui/label";
// import { createClient } from "@/utils/supabase/client";
// import supabase from "@/lib/supabaseClient";
// import { User } from "@supabase/supabase-js";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Spinner from "../Spinner";
// import { toast } from "../ui/use-toast";

// type Props = {};
// interface UserCred {
//   id: string;
//   Username?: string;
//   Goals?: string;
//   Website?: string;
  
// }

// const CompleteProfile = (props: Props) => {
//   // const supabase = createClient();

//   const router = useRouter();

//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isloading2, setIsLoading] = useState(false);
//   // const [userCred, setUserCred] = useState({});
  
//   // const [userCred, setUserCred] = useState<UserCred | null>(null);
//   const [userCred, setUserCred] = useState<User | null>(null);

//   const [userData, setUserData] = useState<User | undefined | null>(null);

//   console.log(userData);
//   const getUser = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     setUserData(user);
//   };

//   const form = useForm<completeProfileSchemaType>({
//     resolver: zodResolver(completeProfileSchema),
//     defaultValues: {
//       goals: "",
//       site: "",
//     },
//   });

//   const avatarUrl: string =
//     userData?.user_metadata.avatar_url || "/DefaultDP.jpg";

  

//   useEffect(() => {
//     setLoading(true);
//     getUser();
//     setLoading(false);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       form.reset({
//         goals: userData.user_metadata.goals || "",
//         site: userData.user_metadata.site || "",
//       });
//     }
//   }, [userData, form]);


//   useEffect(() => {
//     if ( userData?.id) {
//       fetchUserData(userData?.id);
//     }
//   }, [userData?.id]);
  



//   // const fetchUserData = async (userId) => {
//     // const fetchUserData = async (userId: string): User | {} => {
//       const fetchUserData = async (userId: string): Promise<User | {} | undefined> => {
//     const { data, error } = await supabase
//       .from('User Details')
//       .select('*')
//       .eq('id', userId)
//       .single();

//     if (data) {
//       setUserCred(data);
//       console.log("Dataaaaaa", data)
//       if(data.id){router.push("/profile")}
//       return data;
//     } else if (error) {
//       console.error('Error fetching user:', error);
//       return {};
//     }


//   };






















//   // const handleSubmit = async (values: completeProfileSchemaType) => {
//   //   console.log(values);

//   //   try {
//   //     setIsLoading(true);
//   //     const response = await axios.post(
//   //       "/api/profile/complete-profile",
//   //       values
//   //     );

//   //     console.log(response);
//   //     if (response.status === 200) {
//   //       setIsLoading(false);
//   //       toast({
//   //         title: "Success",
//   //         description: "Profile Updated successfully 🎉",
//   //       });
//   //       router.push("/profile");
//   //     }
//   //   } catch (error: any) {
//   //     console.error("Error updating user:", error);

//   //     toast({
//   //       variant: "destructive",
//   //       title: "Error Occurred",
//   //       description: error.response.data.error,
//   //     });
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (values: completeProfileSchemaType) => {
//     console.log("values",values);
// const userName=localStorage.getItem("userName")||userData?.user_metadata.UserName
// const name=localStorage.getItem("name")||userData?.user_metadata.Name

// // Insert  userName and Name
// if (!userCred?.id){
// const { data:updateUser, error: updateUserError } = await supabase.auth.updateUser({
//   data: {
//     UserName: userName,
//     Name:name
//   }, 
// })
// if (updateUser){
// localStorage.removeItem("userName")
// localStorage.removeItem("name")
// }
// console.log("Updated User",updateUser)

// }
   
//       // Update existing user
//       if (userCred?.id) {
//       const { data, error } = await supabase
//         .from('User Details')
//         .update({ Username:userName , Goals: values?.goals, Website: values?.site })
//         .eq('id', userData?.id);

//       if (error) {
//         console.error('Error updating user:', error);
//         toast({
//           variant: "destructive",
//           title: "Error Occurred",
//           description: error.message,
//         })
//       } else {
//         console.log('User updated:', data);
//         toast({
//           title: "Success",
//           description: "Profile Updated successfully 🎉",
//         });
//         router.push('/profile')
//       }
      
//       // Create new user
//     } else {
//       const { data, error } = await supabase
//         .from('User Details')
//         .insert({ id: userData?.id,  Username:userName , Goals: values?.goals, Website: values?.site  });

//       if (error) {
//         console.error('Error creating user:', error);
//         toast({
//           variant: "destructive",
//           title: "Error Occurred",
//           description: error.message,
//         })
//       } else {
//         console.log('User created:', data);
//         toast({
//           title: "Success",
//           description: "Profile Created successfully 🎉",
//         });
//         router.push('/profile')
//       }
//     }
//   };


















//   // const handleFileChange = async (
//   //   event: React.ChangeEvent<HTMLInputElement>
//   // ) => {
//   //   const file = event.target.files?.[0];
//   //   if (!file) return;

//   //   console.log(file);

//   //   try {
//   //     setUploading(true);

//   //     const fileExt = file.name.split(".").pop();
//   //     const fileName = `${Date.now()}.${fileExt}`;
//   //     const filePath = `${fileName}`;

//   //     console.log(filePath);

//   //     let { data: uploadData, error: uploadError } = await supabase.storage
//   //       .from("avatars")
//   //       .upload(filePath, file);

//   //     if (uploadError) {
//   //       console.log("Upload Error:", uploadError.message);
//   //     }

//   //     console.log(uploadData);

//   //     const { data: publicUrlData } = supabase.storage
//   //       .from("avatars")
//   //       .getPublicUrl(filePath);

//   //     console.log(publicUrlData);

//   //     const { data, error: updateUrl } = await supabase.auth.updateUser({
//   //       data: {
//   //         avatar_url: publicUrlData.publicUrl,
//   //       },
//   //     });

//   //     if (updateUrl) {
//   //       console.log("Update Avater Error:", updateUrl.message);
//   //     }

//   //     console.log("userData", data);
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error);
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     console.log("Selected file:", file);

//     try {
//       setUploading(true);

//       const fileExt = file.name.split('.').pop();
//       const fileName = `${Date.now()}.${fileExt}`;
//       const filePath = fileName;

//       console.log("File path:", filePath);

//       let { data: uploadData, error: uploadError } = await supabase.storage
//         .from('Profile Picture')
//         .upload(filePath, file);

//       if (uploadError) {
//         console.error("Upload Error:", uploadError.message);
//         toast({
//           variant: "destructive",
//           title: "Upload Error",
//           description: uploadError.message,
//         });
//         return;
//       }

//       console.log("Upload data:", uploadData);

//       // const { data: publicUrlData, error: publicUrlError } = supabase.storage
//       const { data: publicUrlData } = supabase.storage
//         .from('Profile Picture')
//         .getPublicUrl(filePath);

//       // if (publicUrlError) {
//       //   console.error("Public URL Error:", publicUrlError.message);
//       //   toast({
//       //     variant: "destructive",
//       //     title: "Public URL Error",
//       //     description: publicUrlError.message,
//       //   });
//       //   return;
//       // }

//       console.log("Public URL data:", publicUrlData);

//       const { data, error: updateUserError } = await supabase.auth.updateUser({
//         data: {
//           avatar_url: publicUrlData.publicUrl,
          
//         },
//       });

//       if (userData?.id) {
//         // Update existing user profile picture
//         const { data, error } = await supabase
//           .from('User Details')
//           .update({ Profile_Picture: publicUrlData.publicUrl })
//           .eq('id', userData?.id);}



//       if (updateUserError) {
//         console.error("Update User Error:", updateUserError.message);
//         toast({
//           variant: "destructive",
//           title: "Update User Error",
//           description: updateUserError.message,
//         });
//         return;
//       }

//       console.log("User data:", data);

//       // if (data.user?.user_metadata) {
//       //   setUserCred(data.user?.user_metadata)

//       if (data.user) {
//         const updatedUser = {
//           ...data.user,
//           user_metadata: data.user.user_metadata,
//         };

//         toast({
//           title: "Success",
//           description: "Profile Photo Updated successfully 🎉",
//         });
//       }

//       window.location.reload();
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       // toast({
//       //   variant: "destructive",
//       //   title: "Error",
//       //   description: error.message,
//       // });


//       if (error instanceof Error) {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: error.message,
//         });
//       } else {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "An unknown error occurred.",
//         });
//       }


//     } finally {
//       setUploading(false);
//     }
//   };





//   return (
//     <>
//       <div className="flex flex-col  md:flex-row lg:flex-row xl:flex-row items-center justify-between w-full">
//         <div className="px-5 py-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//           <h1 className="text-4xl md:text-3xl lg:text-3xl xl:text-3xl my-6 font-bold">
//             Complete your profile
//           </h1>

//           <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5 md:items-center lg:items-center xl:items-center">
//             <>
//               <Avatar className="w-20 h-20">
//                 <AvatarImage src={avatarUrl} alt="avatar" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//             </>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               id="avatarUpload"
//             />
//             <Button
//               variant="outline"
//               className="rounded-3xl px-5 py-2 text-sm font-semibold"
//               onClick={() => document.getElementById("avatarUpload")?.click()}
//               disabled={uploading}
//             >
//               <Images className="mr-2" />
//               <span>{uploading ? "Uploading..." : "Upload profile photo"}</span>
//             </Button>
//           </div>

//           <div className="flex flex-col py-5 gap-2">
//             <p className="text-base font-bold">Username</p>
//             <p className="text-sm text-gray-300 ">
//               {/* @{userData?.user_metadata.username} */}
//               {/* @{localStorage.getItem("userName")} */}
//               @{userData?.user_metadata.UserName?(userData?.user_metadata.UserName):(localStorage.getItem("userName"))}
//             </p>
//           </div>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(handleSubmit)}>
//               <div className="">
//                 <FormField
//                   control={form.control}
//                   name="goals"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Goals</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           {...field}
//                           className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-2 py-5"
//                           rows={5}
//                           placeholder="Enter your goals"
//                         />
//                       </FormControl>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="">
//                 <FormField
//                   control={form.control}
//                   name="site"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Website or social link</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-2 py-5"
//                           placeholder="URL"
//                         />
//                       </FormControl>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className="bg-[#FFDA44] hover:bg-[#fde78e] mt-10 text-black font-bold py-5 px-28"
//                 isLoading={isloading2}
//               >
//                 Complete
//               </Button>
//             </form>
//           </Form>
//         </div>
//         {/* Left Side */}
//         <div className="p-5 md:p-12 lg:p-12 xl:p-12 m-5 md:-mr-20 lg:-mr-20 xl:-mr-20 bg-[#FAF8F0]">
//           <div className="flex items-center gap-2">
//             <div className="h-0.5 w-5 bg-black"></div>
//             <p className="font-semibold">GUIDANCE</p>
//           </div>
//           <div className="py-5">
//             <h1 className="text-5xl font-semibold ">TIPS</h1>
//           </div>

//           <div className="ml-6">
//             <div className="flex flex-col gapx-3">
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CompleteProfile;


// "use client";

// import React, { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// import { Button } from "../ui/button-2";
// import { Image as Images } from "lucide-react";
// import { useForm } from "react-hook-form";
// import {
//   completeProfileSchema,
//   completeProfileSchemaType,
// } from "@/lib/schema/profile";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Label } from "../ui/label";
// import { createClient } from "@/utils/supabase/client";
// import { User } from "@supabase/supabase-js";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Spinner from "../Spinner";
// import { toast } from "../ui/use-toast";

// type Props = {};

// const CompleteProfile = (props: Props) => {
//   const supabase = createClient();

//   const router = useRouter();

//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isloading2, setIsLoading] = useState(false);

//   const [userData, setUserData] = useState<User | undefined | null>(null);

//   console.log(userData);
//   const getUser = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     setUserData(user);
//   };

//   const form = useForm<completeProfileSchemaType>({
//     resolver: zodResolver(completeProfileSchema),
//     defaultValues: {
//       goals: "",
//       site: "",
//     },
//   });

//   const avatarUrl: string =
//     userData?.user_metadata.avatar_url || "/avater-user.webp";

//   useEffect(() => {
//     setLoading(true);
//     getUser();
//     setLoading(false);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       form.reset({
//         goals: userData.user_metadata.goals || "",
//         site: userData.user_metadata.site || "",
//       });
//     }
//   }, [userData, form]);

//   const handleSubmit = async (values: completeProfileSchemaType) => {
//     console.log(values);

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "/api/profile/complete-profile",
//         values
//       );

//       console.log(response);
//       if (response.status === 200) {
//         setIsLoading(false);
//         toast({
//           title: "Success",
//           description: "Profile Updated successfully 🎉",
//         });
//         router.push("/profile");
//       }
//     } catch (error: any) {
//       console.error("Error updating user:", error);

//       toast({
//         variant: "destructive",
//         title: "Error Occurred",
//         description: error.response.data.error,
//       });
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     console.log(file);

//     try {
//       setUploading(true);

//       const fileExt = file.name.split(".").pop();
//       const fileName = `${Date.now()}.${fileExt}`;
//       const filePath = `${fileName}`;

//       console.log(filePath);

//       let { data: uploadData, error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(filePath, file);

//       if (uploadError) {
//         console.log("Upload Error:", uploadError.message);
//       }

//       console.log(uploadData);

//       const { data: publicUrlData } = supabase.storage
//         .from("avatars")
//         .getPublicUrl(filePath);

//       console.log(publicUrlData);

//       const { data, error: updateUrl } = await supabase.auth.updateUser({
//         data: {
//           avatar_url: publicUrlData.publicUrl,
//         },
//       });

//       if (updateUrl) {
//         console.log("Update Avater Error:", updateUrl.message);
//       }

//       console.log("userData", data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col  md:flex-row lg:flex-row xl:flex-row items-center justify-between w-full">
//         <div className="px-5 py-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//           <h1 className="text-4xl md:text-3xl lg:text-3xl xl:text-3xl my-6 font-bold">
//             Complete your profile
//           </h1>

//           <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5 md:items-center lg:items-center xl:items-center">
//             <>
//               <Avatar className="w-20 h-20">
//                 <AvatarImage src={avatarUrl} alt="avatar" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//             </>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               id="avatarUpload"
//             />
//             <Button
//               variant="outline"
//               className="rounded-3xl px-5 py-2 text-sm font-semibold"
//               onClick={() => document.getElementById("avatarUpload")?.click()}
//               disabled={uploading}
//             >
//               <Images className="mr-2" />
//               <span>{uploading ? "Uploading..." : "Upload profile photo"}</span>
//             </Button>
//           </div>

//           <div className="flex flex-col py-5 gap-2">
//             <p className="text-base font-bold">Username</p>
//             <p className="text-sm text-gray-300 ">
//               @{userData?.user_metadata.username}
//             </p>
//           </div>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(handleSubmit)}>
//               <div className="">
//                 <FormField
//                   control={form.control}
//                   name="goals"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Goals</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           {...field}
//                           className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-2 py-5"
//                           rows={5}
//                           placeholder="Enter your goals"
//                         />
//                       </FormControl>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="">
//                 <FormField
//                   control={form.control}
//                   name="site"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Website or social link</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-2 py-5"
//                           placeholder="URL"
//                         />
//                       </FormControl>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className="bg-[#FFDA44] hover:bg-[#fde78e] mt-10 text-black font-bold py-5 px-28"
//                 isLoading={isloading2}
//               >
//                 Complete
//               </Button>
//             </form>
//           </Form>
//         </div>
//         {/* Left Side */}
//         <div className="p-5 md:p-12 lg:p-12 xl:p-12 m-5 md:-mr-20 lg:-mr-20 xl:-mr-20 bg-[#FAF8F0]">
//           <div className="flex items-center gap-2">
//             <div className="h-0.5 w-5 bg-black"></div>
//             <p className="font-semibold">GUIDANCE</p>
//           </div>
//           <div className="py-5">
//             <h1 className="text-5xl font-semibold ">TIPS</h1>
//           </div>

//           <div className="ml-6">
//             <div className="flex flex-col gapx-3">
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//               <div className="flex gap-3 my-4 items-center ">
//                 <div className="w-0.5 h-0.5 bg-gray-700"></div>
//                 <p className="text-gray-700">
//                   Please use a clear photo with a clear background
//                 </p>
//               </div>
//               <hr />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CompleteProfile;




"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Button } from "../ui/button-2";
import { Image as Images } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  completeProfileSchema,
  completeProfileSchemaType,
} from "@/lib/schema/profile";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { createClient } from "@/utils/supabase/client";
import supabase from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import { toast } from "../ui/use-toast";

type Props = {};
interface UserCred {
  id: string;
  Username?: string;
  Goals?: string;
  Website?: string;
  
}

const CompleteProfile = (props: Props) => {
  // const supabase = createClient();

  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading2, setIsLoading] = useState(false);
  // const [userCred, setUserCred] = useState({});
  
  // const [userCred, setUserCred] = useState<UserCred | null>(null);
  const [userCred, setUserCred] = useState<User | null>(null);
  // const [userDP, setUserDP] = useState<String | null>(null);
  const [userData, setUserData] = useState<User | undefined | null>(null);

  // console.log("user data",userData);
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserData(user);
    console.log("user data",user);
  };

  const form = useForm<completeProfileSchemaType>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      goals: "",
      site: "",
    },
  });

  const avatarUrl: string =
    userData?.user_metadata.avatar_url || "/DefaultDP.jpg";

  

  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData) {
      form.reset({
        goals: userData.user_metadata.goals || "",
        site: userData.user_metadata.site || "",
      });
    }
  }, [userData, form]);


  useEffect(() => {
    if ( userData?.id) {
      fetchUserData(userData?.id);
    }
  }, [userData?.id]);
  



  // const fetchUserData = async (userId) => {
    // const fetchUserData = async (userId: string): User | {} => {
      const fetchUserData = async (userId: string): Promise<User | {} | undefined> => {
    const { data, error } = await supabase
      .from('User Details')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setUserCred(data);
      console.log("Dataaaaaa", data)
      if(data.id){router.push("/profile")}
      return data;
    } else if (error) {
      console.error('Error fetching user:', error);
      return {};
    }


  };






















  // const handleSubmit = async (values: completeProfileSchemaType) => {
  //   console.log(values);

  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post(
  //       "/api/profile/complete-profile",
  //       values
  //     );

  //     console.log(response);
  //     if (response.status === 200) {
  //       setIsLoading(false);
  //       toast({
  //         title: "Success",
  //         description: "Profile Updated successfully 🎉",
  //       });
  //       router.push("/profile");
  //     }
  //   } catch (error: any) {
  //     console.error("Error updating user:", error);

  //     toast({
  //       variant: "destructive",
  //       title: "Error Occurred",
  //       description: error.response.data.error,
  //     });
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (values: completeProfileSchemaType) => {
    console.log("values",values);
// const userName=localStorage.getItem("userName")||userData?.user_metadata.UserName
// const name=localStorage.getItem("name")||userData?.user_metadata.Name

const userName=userData?.user_metadata.UserName
const name=userData?.user_metadata.Name


// Insert  userName and Name
// if (!userCred?.id){
// const { data:updateUser, error: updateUserError } = await supabase.auth.updateUser({
//   data: {
//     UserName: userName,
//     Name:name
//   }, 
// })
// // if (updateUser){
// // localStorage.removeItem("userName")
// // localStorage.removeItem("name")
// // }
// console.log("Updated User",updateUser)

// }
const {
  data: { user },
} = await supabase.auth.getUser();

      // Update existing user
      if (userCred?.id) {
      const { data, error } = await supabase
        .from('User Details')
        .update({ Username:userName , Goals: values?.goals, Website: values?.site,Profile_Picture: user?.user_metadata.avatar_url  })
        .eq('id', userData?.id);

      if (error) {
        console.error('Error updating user:', error);
        toast({
          variant: "destructive",
          title: "Error Occurred",
          description: error.message,
        })
      } else {
        console.log('User updated:', data);
        toast({
          title: "Success",
          description: "Profile Updated successfully 🎉",
        });
        router.push('/profile')
      }
      
      // Create new user
    } else {
      const { data, error } = await supabase
        .from('User Details')
        .insert({ id: userData?.id,  Username:userName , Goals: values?.goals, Website: values?.site, Profile_Picture:user?.user_metadata.avatar_url  });

      if (error) {
        console.error('Error creating user:', error);
        toast({
          variant: "destructive",
          title: "Error Occurred",
          description: error.message,
        })
      } else {
        console.log('User created:', data);
        toast({
          title: "Success",
          description: "Profile Created successfully 🎉",
        });
        router.push('/profile')
      }
    }
  };


















  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   console.log(file);

  //   try {
  //     setUploading(true);

  //     const fileExt = file.name.split(".").pop();
  //     const fileName = `${Date.now()}.${fileExt}`;
  //     const filePath = `${fileName}`;

  //     console.log(filePath);

  //     let { data: uploadData, error: uploadError } = await supabase.storage
  //       .from("avatars")
  //       .upload(filePath, file);

  //     if (uploadError) {
  //       console.log("Upload Error:", uploadError.message);
  //     }

  //     console.log(uploadData);

  //     const { data: publicUrlData } = supabase.storage
  //       .from("avatars")
  //       .getPublicUrl(filePath);

  //     console.log(publicUrlData);

  //     const { data, error: updateUrl } = await supabase.auth.updateUser({
  //       data: {
  //         avatar_url: publicUrlData.publicUrl,
  //       },
  //     });

  //     if (updateUrl) {
  //       console.log("Update Avater Error:", updateUrl.message);
  //     }

  //     console.log("userData", data);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file);

    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName;

      console.log("File path:", filePath);

      let { data: uploadData, error: uploadError } = await supabase.storage
        .from('Profile Picture')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError.message);
        toast({
          variant: "destructive",
          title: "Upload Error",
          description: uploadError.message,
        });
        return;
      }

      console.log("Upload data:", uploadData);

      // const { data: publicUrlData, error: publicUrlError } = supabase.storage
      const { data: publicUrlData } = supabase.storage
        .from('Profile Picture')
        .getPublicUrl(filePath);

      // if (publicUrlError) {
      //   console.error("Public URL Error:", publicUrlError.message);
      //   toast({
      //     variant: "destructive",
      //     title: "Public URL Error",
      //     description: publicUrlError.message,
      //   });
      //   return;
      // }

      console.log("Public URL data:", publicUrlData);

      const { data, error: updateUserError } = await supabase.auth.updateUser({
        data: {
          avatar_url: publicUrlData.publicUrl,
          
        },
      });

      // if (userData?.id && publicUrlData.publicUrl) {
      //   // Update existing user profile picture
      //   // const { data:profileDP, error:profileDPError } = await supabase
      //   //   .from('User Details')
      //   //   // .update({ Profile_Picture: publicUrlData.publicUrl })
      //   //   // .eq('id', userData?.id);
      //   //   // .insert({id: userData?.id, Profile_Picture: publicUrlData.publicUrl })
      //   //   .upsert([{ id: userData?.id, Profile_Picture: publicUrlData.publicUrl }], { onConflict: 'id',ignoreDuplicates: false }); 
      //   // if(profileDPError){
      //   //  console.log("profileDPError",profileDPError)}
       
      //   }


      if (updateUserError) {
        console.error("Update User Error:", updateUserError.message);
        toast({
          variant: "destructive",
          title: "Update User Error",
          description: updateUserError.message,
        });
        return;
      }

      console.log("User data:", data);

      // if (data.user?.user_metadata) {
      //   setUserCred(data.user?.user_metadata)

      if (data.user) {
        const updatedUser = {
          ...data.user,
          user_metadata: data.user.user_metadata,
        };

        toast({
          title: "Success",
          description: "Profile Photo Updated successfully 🎉",
        });
      }

      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error.message,
      // });


      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unknown error occurred.",
        });
      }


    } finally {
      setUploading(false);
    }
  };





  return (
    <>
      <div className="flex flex-col  md:flex-row lg:flex-row xl:flex-row items-center justify-between w-full">
        <div className="px-5 py-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
          <h1 className="text-4xl md:text-3xl lg:text-3xl xl:text-3xl my-6 font-bold">
            Complete your profile
          </h1>

          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5 md:items-center lg:items-center xl:items-center">
            <>
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatarUrl} alt="avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="avatarUpload"
            />
            <Button
              variant="outline"
              className="rounded-3xl px-5 py-2 text-sm font-semibold"
              onClick={() => document.getElementById("avatarUpload")?.click()}
              disabled={uploading}
            >
              <Images className="mr-2" />
              <span>{uploading ? "Uploading..." : "Upload profile photo"}</span>
            </Button>
          </div>

          <div className="flex flex-col py-5 gap-2">
            <p className="text-base font-bold">Username</p>
            <p className="text-sm text-gray-300 ">
              {/* @{userData?.user_metadata.username} */}
              {/* @{localStorage.getItem("userName")} */}
              {/* @{userData?.user_metadata.UserName?(userData?.user_metadata.UserName):(localStorage.getItem("userName"))} */}
              @{userData?.user_metadata.UserName && (userData?.user_metadata.UserName)}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="">
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-2 py-5"
                          rows={5}
                          placeholder="Enter your goals"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="site"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website or social link</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-2 py-5"
                          placeholder="URL"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="bg-[#FFDA44] hover:bg-[#fde78e] mt-10 text-black font-bold py-5 px-28"
                isLoading={isloading2}
              >
                Complete
              </Button>
            </form>
          </Form>
        </div>
        {/* Left Side */}
        <div className="p-5 md:p-12 lg:p-12 xl:p-12 m-5 md:-mr-20 lg:-mr-20 xl:-mr-20 bg-[#FAF8F0]">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-5 bg-black"></div>
            <p className="font-semibold">GUIDANCE</p>
          </div>
          <div className="py-5">
            <h1 className="text-5xl font-semibold ">TIPS</h1>
          </div>

          <div className="ml-6">
            <div className="flex flex-col gapx-3">
              <div className="flex gap-3 my-4 items-center ">
                <div className="w-0.5 h-0.5 bg-gray-700"></div>
                <p className="text-gray-700">
                  Please use a clear photo with a clear background
                </p>
              </div>
              <hr />
              <div className="flex gap-3 my-4 items-center ">
                <div className="w-0.5 h-0.5 bg-gray-700"></div>
                <p className="text-gray-700">
                  Please use a clear photo with a clear background
                </p>
              </div>
              <hr />
              <div className="flex gap-3 my-4 items-center ">
                <div className="w-0.5 h-0.5 bg-gray-700"></div>
                <p className="text-gray-700">
                  Please use a clear photo with a clear background
                </p>
              </div>
              <hr />
              <div className="flex gap-3 my-4 items-center ">
                <div className="w-0.5 h-0.5 bg-gray-700"></div>
                <p className="text-gray-700">
                  Please use a clear photo with a clear background
                </p>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;

