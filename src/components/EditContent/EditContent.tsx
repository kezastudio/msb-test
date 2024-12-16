// "use client";

// import { uploadSchema, uploadSchemaType } from "@/lib/schema/profile";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Checkbox } from "@/components/ui/checkbox";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import { Pencil } from "lucide-react";
// import Image from "next/image";

// type Props = {};

// const EditContent = (props: Props) => {
//   const form = useForm<uploadSchemaType>({
//     resolver: zodResolver(uploadSchema),

//     defaultValues: {
//       title: "Street dance performance",
//       caption:
//         "Street dance performancLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacus sapien, molestie quis ex ut, hendrerit congue est. Curabitur posuere fringilla ante nec luctus. ",
//       file: "",
//     },
//   });
//   return (
//     <div className=" my-10">
//       <h1 className="text-2xl  text-center md:text-4xl lg:text-4xl xl:text-4xl font-bold my-8">
//         Edit Content
//       </h1>

//       <div className=" flex flex-col items-center justify-center my-5">
//         <div className="flex gap-5 ml-20 mb-5 items-center">
//           <Image
//             className="w-48 h-48"
//             src={"/content.png"}
//             alt="content"
//             width={500}
//             height={500}
//           ></Image>

//           <Button variant="link" className="text-rose-500">
//             <Pencil className="w-3 h-3 mr-2" />
//             Edit
//           </Button>
//         </div>
//         <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit((values) => console.log(values))}
//               className="space-y-4"
//             >
//               <FormField
//                 control={form.control}
//                 name="title"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="font-semibold">Video Title</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="caption"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="font-semibold">Caption</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Enter caption"
//                         rows={7}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex items-center mx-2 gap-3">
//                 <Checkbox />
//                 <p className="text-sm">Turn off donation</p>
//               </div>

//               <div className="flex justify-center items-center">
//                 <Button
//                   type="submit"
//                   className="bg-[#FFDA44] hover:bg-[#fde78e] mt-10 text-black font-bold py-5 px-24"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditContent;

"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { uploadSchema, uploadSchemaType } from "@/lib/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Images } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import supabase from "@/lib/supabaseClient";
import { toast } from "../ui/use-toast";


interface ContentData {
  Cid: string;
  Title: string;
  Caption: string;
  created_at: string;
  Public_URL: string;
  Uid: string;
  isDonationOff: boolean;
}



const EditContent: React.FC = () => {
  const router = useRouter();
  const { content_id } = useParams(); // Accessing the Cid parameter from the URL
  // const [Cid, setCid] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<ContentData | null>(null);
  const [isDonationOff, setIsDonationOff] = useState(false);
  const [isVideoFile, setIsVideoFile] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string>('');

  const form = useForm<uploadSchemaType>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      caption: "",
      file: "",
    },
  });

  const isVideoFiles = (url: string): true | false => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extensionMatch = url.split('.').pop();
    const extension = extensionMatch ? extensionMatch.toLowerCase() : '';

    // console.log(`URL: ${url}, Extension: ${extension}`); // Debugging line

    return videoExtensions.includes(extension) ? true : false;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    setUploading(true);

    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Create Object URL for preview
      const objectURL = URL.createObjectURL(selectedFile);
      // console.log("objectURL", objectURL)
      setObjectUrl(objectURL);
      // Determine file type
      const isVideo = selectedFile.type.startsWith('video/');
      // console.log("isVideo selected file",isVideo)
      // const isVideo = isVideoFiles(objectURL);
      setIsVideoFile(isVideo);
      setUploading(false);
    };

  }

  const handleFileButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent closing the modal
    document.getElementById("avatarUpload")?.click();
  };

  useEffect(() => {

    const Cid = content_id
    // console.log("From UseEffect CID", Cid)
    if (Cid) {
      const fetchData = async () => {
        const { data: contentData, error: contentError } = await supabase
          .from("All_Content")
          .select(`
            Cid,
            Title,
            Caption,
            created_at,
            Public_URL,
            Uid,
            isDonationOff
          `)
          .eq("Cid", Cid)
          .single();

        if (contentError) {
          console.error(contentError);
        } else if (contentData) {
          setInitialData(contentData);
          const isVideo = isVideoFiles(contentData?.Public_URL);
          setIsVideoFile(isVideo)
          setIsDonationOff(contentData.isDonationOff);
          form.reset({
            title: contentData.Title,
            caption: contentData.Caption,
            file: contentData.Public_URL,
          });
        }
      };

      fetchData();
    }
    // }, [form]);
  }, [content_id, form]);

  const onSubmit = async (values: uploadSchemaType) => {
    // const Cid="acfb6214-d2bc-4acd-9c3f-7f4297b157bf"
    const Cid = content_id
    if (Cid) {
      // console.log("Values",values)

      if (file) {
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
        // console.log("File uploaded successfully:", uploadData);

        // const { data: publicUrlData, error: publicUrlError } = supabase.storage
        const { data: publicUrlData } = supabase.storage
          .from('User Gallery')
          .getPublicUrl(`${fileName}`);
        // console.log("Public URL data:", publicUrlData);

        if (publicUrlData?.publicUrl) {
          const { error } = await supabase
            .from("All_Content")
            .update({
              Title: values.title,
              Caption: values.caption,
              Public_URL: publicUrlData?.publicUrl,
              isDonationOff: isDonationOff || false,
            })
            .eq("Cid", Cid);

          if (error) {
            console.error(error);
            return;
          } else {
            
            toast({
              title: "Success",
              description: "Content updated successfully 🎉",
            });
            router.push("/profile");
            return;
          }
        }

        
      }else{
    
  const { error } = await supabase
    .from("All_Content")
    .update({
      Title: values.title,
      Caption: values.caption,
      Public_URL: values.file,
      isDonationOff: isDonationOff || false,
    })
    .eq("Cid", Cid);

  if (error) {
    console.error(error);
  } else {
    toast({
      title: "Success",
      description: "Content updated successfully 🎉",
    });
    router.push("/profile");
  }
}}
  };

return (
  <div className="my-10">
    <h1 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl font-bold my-8">
      Edit Content
    </h1>

    <div className="flex flex-col items-center justify-center my-5">
      <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >



            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="font-semibold">Caption</FormLabel> */}
                  <FormControl>
                    <div className="flex gap-5 ml-20 mb-5 items-center">


                      {isVideoFile ? (
                        objectUrl ? (<Image
                          className="w-48 h-48"
                          src={"/Video_Content.jpg"}

                          alt="content"
                          width={500}
                          height={500}
                        />) : (
                          <video width="250" height="200" controls className="object-cover w-64 h-64">
                            <source src={initialData?.Public_URL} type="video/mp4" />

                            Your browser does not support the video tag.
                          </video>)
                      ) : (
                        <Image
                          className="w-48 h-48"
                          // src={initialData?.Public_URL || "/DefaultDP.jpg"}
                          src={objectUrl ? (objectUrl || "/DefaultDP.jpg") : (initialData?.Public_URL || "/DefaultDP.jpg")}
                          alt="content"
                          width={500}
                          height={500}
                        />
                      )}


                      <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="avatarUpload"
                      />
                      <Button
                        variant="ghost"
                        type="button"
                        // className="rounded-3xl px-5 py-2 text-sm font-semibold text-rose-500"
                        className="text-rose-500"
                        onClick={handleFileButtonClick}
                      // disabled={uploading}
                      >
                        {/* <Images className="mr-2" /> */}
                        <Pencil className="w-3 h-3 mr-2" />
                        <span>{uploading ? "Editing..." : "Edit"}</span>
                        {/* <span>{"Upload New Content"}</span> */}
                      </Button>

                      {/* <Button variant="link" className="text-rose-500">
                          <Pencil className="w-3 h-3 mr-2" />
                          Edit
                        </Button> */}

                    </div>
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />












            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
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
                    <Textarea
                      placeholder="Enter caption"
                      rows={7}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center mx-2 gap-3">
              <Checkbox
                checked={isDonationOff}
                onCheckedChange={(checked) => setIsDonationOff(!!checked)}
              />
              <p className="text-sm">Turn off donation</p>
            </div>


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
  </div>
);
};

export default EditContent;


