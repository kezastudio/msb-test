"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button-2";
import { Images } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  EditProfileSchema,
  EditProfileSchemaType,
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

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// import { createClient } from "@/utils/supabase/client";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";
import { toast } from "../ui/use-toast";

import axios from "axios";

type Props = {
  params: {
    userId: string;
  };
  user: User | undefined | null;
};

// type UserDetails = {
//   id: string;
//   Username: string;
//   Profile_Picture: string;
//   Goals:string;
//   Website: string;
  
// };


type UserDetails = {
  id?: string;
  username?: string;
  profilePicture?: string;
  goals?: string;
  site?: string;
};


interface UserCred {
  id?: string;
  avatar_url?: string;
  
}


const EditProfile = ({ params, user }: Props) => {


  // const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL;
  // const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey);

  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);



  // const supabase = createClient();
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [userId2, setUserId2] = useState('');
  // const [userData, setUserData] = useState({});
  const [userData, setUserData] = useState<UserDetails|null>(null);
  // const [userCred, setUserCred] = useState({});
  const [userCred, setUserCred] = useState<UserCred | null>(null);


  const [isloading2, setIsLoading] = useState(false);

  const form = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: "",
      goals: "",
      site: "",
    },
  });



  useEffect(() => {
    // Retrieve and decrypt userId from session storage
    const encodedUserId = sessionStorage.getItem('userId');
    if (encodedUserId) {
      const decryptedUserId = atob(encodedUserId);
      setUserId(decryptedUserId);
      // console.log("decryptedUserId",decryptedUserId)
    } else {

      router.push('/login');
    }
  }, [router]);


  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  // const fetchUserData = async (userId) => {
    const fetchUserData = async (userId: string): Promise<User | {} | undefined> => {
   
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      console.log("User Found", user.id);
      setUserCred(user.user_metadata)
      setUserId2(user.id)
    }


    const { data, error } = await supabase
      .from('User Details')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      // setUserData(data);
      setUserData({
        id: data.id,
        username: data.Username,           // Mapping Username -> username
        profilePicture: data.Profile_Picture, // Mapping Profile_Picture -> profilePicture
        goals: data.Goals,                // Mapping Goals -> goals
        site: data.Website,            // Mapping Website -> website
      });
      
      console.log("Dataaaaaa", data)
      return data;
    } else if (error) {
      console.error('Error fetching user:', error);
      return {};
    }

    // const { data: publicUrlData, error: publicUrlError } = supabase.storage
    // .from('Profile Picture')
    // .getPublicUrl("user2.png");

    // console.log("Public URL data:", publicUrlData);




  };








  // console.log(params.userId);













  const avatarUrl: string =
    userCred?.avatar_url || "/DefaultDP.jpg";

  // const handleSubmit = async (values: EditProfileSchemaType) => {
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
  //       .from("Profile Picture")
  //       .upload(filePath, file);

  //     if (uploadError) {
  //       console.log("Upload Error:", uploadError.message);
  //     }

  //     console.log(uploadData);

  //     const { data: publicUrlData } = supabase.storage
  //       .from("Profile Picture")
  //       .getPublicUrl(filePath);

  //     console.log(publicUrlData);

  //     const { data, error: updateUrl } = await supabase.auth.updateUser({
  //       data: {
  //         avatar_url: publicUrlData.publicUrl,
  //       },
  //     });

  //     if (data.user?.user_metadata !== null) {
  //       toast({
  //         title: "Success",
  //         description: "Profile Photo Updated successfully 🎉",
  //       });
  //     }
  //     if (updateUrl) {
  //       console.log("Update Avater Error:", updateUrl.message);
  //       toast({
  //         variant: "destructive",
  //         title: "Error",
  //         description: updateUrl.message,
  //       });
  //     }

  //     window.location.reload();

  //     console.log("userData", data);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   } finally {
  //     setUploading(false);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = form.getValues();

    const { data:updateUser, error: updateUserError } = await supabase.auth.updateUser({
      data: {
        UserName: userData?.username,
        
      }, 
  })
  
  console.log("Updated User",updateUser)

    if (userData?.id) {
      // Update existing user
      const { data, error } = await supabase
        .from('User Details')
        .update({ Username: userData?.username, Goals: userData?.goals, Website: userData?.site })
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
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('User Details')
        .insert({ id: userId, Username: userData?.username, Goals: userData?.goals, Website: userData?.site, });

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













  // const handleFileChange = async (event) => {
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

      if (userData?.id) {
        // Update existing user profile picture
        const { data, error } = await supabase
          .from('User Details')
          .update({ Profile_Picture: publicUrlData.publicUrl })
          .eq('id', userData?.id);}



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

      if (data.user?.user_metadata) {
        setUserCred(data.user?.user_metadata)
        toast({
          title: "Success",
          description: "Profile Photo Updated successfully 🎉",
        });
      }

      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);

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




      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error.message,
      // });
    } finally {
      setUploading(false);
    }
  };



  //   const handleChangeInput = (e) => {
  // const {name, value}=e.target;
  //     setUserData({...userData,[name]:value});
  //   };


  const handleChangeInput = async (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));


  };



  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl my-5 font-bold">
        Edit Profile
      </h1>
      <div className="flex flex-col  py-10   w-full md:w-2/3 lg:w-3/4 xl:w-3/4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <>
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatarUrl} alt="avatar" />
                <AvatarFallback>
                  {user?.user_metadata.username}.toUpperCase().charAt(0)
                </AvatarFallback>
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
              <span>{uploading ? "Updating..." : "Update profile photo"}</span>
            </Button>
          </div>
        </div>

        <div className="my-3">
          <Form {...form}>
            {/* <form onSubmit={form.handleSubmit(handleSubmit)}> */}
            <form onSubmit={handleSubmit}>
              <div className="">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-2 py-5"
                          placeholder="@username"
                          value={userData?.username}
                          onChange={handleChangeInput}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-3">
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
                          value={userData?.goals}
                          onChange={handleChangeInput}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-3">
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
                          value={userData?.site}
                          onChange={handleChangeInput}
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
      </div>
    </div>
  );
};

export default EditProfile;
