// components/AddContent.tsx
"use client";

import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Images } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
// import { v4 as uuidv4 } from 'uuid';
import { User } from "@supabase/supabase-js";

import { Avatar, AvatarFallback, AvatarImage, VideoAvatar } from "../ui/avatar";

// const contentSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   caption: z.string().min(1, "Caption is required"),
//   contentType: z.enum(["video", "image"], "Content Type is required"),
// });

// const contentSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   caption: z.string().min(1, "Caption is required"),
//   contentType: z.enum(["video", "image"]).refine(
//     (val) => val !== undefined,
//     {
//       message: "Content Type is required",
//     }
//   ),
// });


const contentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    caption: z.string().min(1, "Caption is required"),
    contentType: z.enum(["video", "image"])
  });




type contentSchemaType = z.infer<typeof contentSchema>;

interface AddContentProps {
  onClose: () => void;
}

interface UserDetails {
    id: string;
    Username: string;
   
  }
  

const AddContent: React.FC<AddContentProps> = ({ onClose }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  // const [contentUrl, setContentUrl] = useState<string>('');

  const [objectUrl, setObjectUrl] = useState<string>('');
  const [isVideoFile, setIsVideoFile] = useState<boolean>(false);

  const [userId, setUserId] = useState('');
//   const [userData, setUserData] = useState({});
const [userData, setUserData] = useState<UserDetails | null>(null);
const [turnOffDonation, setTurnOffDonation] = useState<boolean>(false);


  

  const form = useForm<contentSchemaType>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: "",
      caption: "",
      contentType: "video",
     

    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // const avatarUrl: string = contentUrl


  useEffect(() => {
   
      fetchUserData( );
   
  }, []);

  const fetchUserData = async ( ) => {
   
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      console.log("User Found", user.id);
      
      setUserId(user.id)
    }


    const { data, error } = await supabase
      .from ('User Details')
      .select('*')
      .eq('id', user?.id)
      .single();

    if (data) {
      setUserData(data);
      console.log("Dataaaaaa", data)
    } else if (error) {
      console.error('Error fetching user:', error);
    }




  };













  const onSubmit = async (data: contentSchemaType) => {
    try {
      setUploading2(true);

      // Handle file upload if a file is selected
      if (file) {
        // const fileName = file.name;

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = fileName;
  
        console.log("File path:", filePath);



        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from("User Gallery")
          .upload(fileName, file);
          // .upload(`public/${fileName}`, file);

        if (uploadError) throw uploadError;
        console.log("File uploaded successfully:", uploadData);
      
        // const { data: publicUrlData, error: publicUrlError } = supabase.storage
      const { data: publicUrlData } = supabase.storage
              .from('User Gallery')
              .getPublicUrl(`${fileName}`);
      
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
      
            if (publicUrlData?.publicUrl) {
              // setContentUrl(publicUrlData?.publicUrl)
              const { error } = await supabase
        .from("All_Content")
        .insert([{ Title: data.title, Caption: data.caption, Content_Type: data.contentType, Public_URL:publicUrlData?.publicUrl,Uid:userData?.id, Uploaded_By:userData?.Username, isDonationOff:turnOffDonation }]);

      if (error) throw error;

      console.log("Data inserted successfully!");

      toast({
        title: "Success",
        description: "Content added successfully 🎉",
      });
            }
          }
            // const id = uuidv4(); // Generating random unique id
      // Insert content data into the database
      

      localStorage.getItem("token") ? router.push("/profile") : router.push("/");
      

      onClose(); // Close the form after submission

    } catch (error) {
        if (error instanceof Error) {
          // Handle known Error types
          console.error("Error inserting data:", error.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        } else {
          // Handle unexpected error types
          console.error("Unexpected error:", error);
          toast({
            variant: "destructive",
            title: "Unexpected Error",
            description: "An unexpected error occurred. Please try again.",
          });
        }
      } finally {
        setUploading2(false);
      }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
      setUploading(true);
  
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        // Create Object URL for preview
      const objectURL = URL.createObjectURL(selectedFile);
      console.log("objectURL",objectURL)
      setObjectUrl(objectURL);
    // Determine file type
    const isVideo = selectedFile.type.startsWith('video/');
    setIsVideoFile(isVideo);
      setUploading(false);
  };
  
  }
// const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
 
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
//         .from('User Gallery')
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

//       const { data: publicUrlData, error: publicUrlError } = supabase.storage
//         .from('User Gallery')
//         .getPublicUrl(filePath);

//       if (publicUrlError) {
//         console.error("Public URL Error:", publicUrlError.message);
//         toast({
//           variant: "destructive",
//           title: "Public URL Error",
//           description: publicUrlError.message,
//         });
//         return;
//       }

//       console.log("Public URL data:", publicUrlData);

//       if (publicUrlData) {

//         toast.success("Uploaded Successfully", {
//           position: toast.POSITION?.TOP_CENTER,
//         })
//       }

//     //   window.location.reload();
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       toast.error("Error uploading file:", {
//         position: toast.POSITION?.TOP_CENTER,
//       })
//     } finally {
//       setUploading(false);
//     }
//   };











  const handleFileButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent closing the modal
    document.getElementById("avatarUpload")?.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
       
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-lg">
      <h6 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl font-bold">
        Add Content
      </h6>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          title="Close"
        >
          &times;
        </button>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* <form  className="space-y-4"> */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Campaign Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Caption</FormLabel>
                  <FormControl>
                    <Textarea placeholder="About The Campaign" rows={7} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Content Type</FormLabel>
                  <FormControl>
  <div className="flex space-x-4">
    <label>
      <input
        type="radio"
        value="video"
        checked={field.value === "video"}
        onChange={field.onChange}
        name={field.name} // Explicitly setting the name
        ref={field.ref}   // Explicitly setting the ref
      />
      Video
    </label>
    <label>
      <input
        type="radio"
        value="image"
        checked={field.value === "image"}
        onChange={field.onChange}
        name={field.name} // Explicitly setting the name
        ref={field.ref}   // Explicitly setting the ref
      />
      Image
    </label>
  </div>
</FormControl>

                  <FormMessage />
                </FormItem>
              )} 
            />

<FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="font-semibold">Content Type</FormLabel> */}
                  <FormControl>
                    <div className="flex space-x-4  items-center">
                    <Avatar className="w-20 h-20">
  {objectUrl ? (
    isVideoFile ? (
      // <VideoAvatar src={objectUrl} controls />  // Added `controls` for video playback
      <AvatarImage src="/Video_Content.jpg" alt="Video File" />
    ) : (
      <AvatarImage src={objectUrl} alt="Image File" />
    )
  ) : (
    <AvatarFallback>Content</AvatarFallback>
  )}
</Avatar>
            


            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="avatarUpload"
            />
            <Button
              variant="outline"
              type="button"
              className="rounded-3xl px-5 py-2 text-sm font-semibold"
              onClick={handleFileButtonClick} 
              disabled={uploading}
            >
              <Images className="mr-2" />
              <span>{uploading ? "Uploading..." : "Upload New Content"}</span>
            </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />


{/* <div className="flex items-center my-5 mx-2 gap-3">
              <Checkbox />
              <p className="text-sm">Turn off donation</p>
            </div> */}

<div className="flex items-center my-5 mx-2 gap-3">
        <Checkbox
          checked={turnOffDonation}
          onCheckedChange={(checked: boolean) => setTurnOffDonation(checked)}
          // className="checkbox-class" 
        />
        <p className="text-sm">Turn off donations</p>
      </div>


            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className="bg-[#FFDA44] hover:bg-[#fde78e] mt-10 text-black font-bold py-5 px-24"
              >
                <span>{uploading2 ? "Uploading..." : "Finish"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddContent;
