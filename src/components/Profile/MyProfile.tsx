
// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";
// // import { Button } from "../ui/button-2";
// import { Images } from "lucide-react";
// import { Pencil } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { createClient } from "@supabase/supabase-js";
// import { User } from "@supabase/supabase-js";

// // import { toast } from "../ui/use-toast";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AddContent from "./AddContent";
// import Modal from "../../components/ui/modal";


// // Type for user details from the database
// type UserDetails = {
//   id: string;
//   Name: string;

//   Username?: string;
//   Goals?: string;
//   Website?: string;
//   Profile?: string;

// };


// type Props = {};
// type Content= {

//   Public_URL: string;
 
// }



// const MyProfile = (props: Props) => {
//   // const [userDP, setUserDP] = useState('');
//    // const [userContent, setUserContent] = useState([]);
//    const [userContent, setUserContent] = useState<Content[]>([]);

//   const [uploading, setUploading] = useState(false);
//   const router = useRouter();
//   // const contents = [
//   //   { id: 1, images: userContent[4] },
//   //   { id: 2, images: "/card.png" },
//   //   { id: 3, images: "/card.png" },
//   //   { id: 4, images: "/card.png" },

//   // ];

//   // Initialize Supabase client using environment variables
//   // const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL;
//   // const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY;
//   // const supabase = createClient(supabaseUrl, supabaseKey);

//   const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
//   const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
//   const supabase = createClient(supabaseUrl, supabaseKey);


//   const [userData, setUserData] = useState<User | null>(null);
//   const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
//   const [isLoading, setIsloading] = useState<boolean>(false);


//   const [isAddContentFormVisible, setIsAddContentFormVisible] = useState(false);

//   const handleOpenForm = () => {
//     setIsAddContentFormVisible(true);
//   };

//   const handleCloseForm = () => {
//     setIsAddContentFormVisible(false);
//     window.location.reload();
//   };




//   const getUser = async () => {

//     const { data: { user } } = await supabase.auth.getUser();
//     setUserData(user);
// console.log("UserCred",user)
//     if (user?.id) {
//       // Fetch user details from the "User Details" table
//       const { data, error } = await supabase
//         .from('User Details')
//         .select('*')
//         .eq('id', user.id)
//         .single();

//       if (error) {
//         console.error('Error fetching user details:', error);
//         // Handle error 
//       } else {
//         setUserDetails(data);
//         // setUserDP(data.Profile_Picture)
//         // console.log("Sucessful", data.Profile_Picture)

//       }
//     }

//   };


//   const showToastMessage = () => {
//     if (!localStorage.getItem("token")) {
//       toast.error("Please Login First !", {
//         position: "top-center",
//       })
//     };
//   };





//   useEffect(() => {
//     setIsloading(true);
//     getUser().finally(() => setIsloading(false));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     showToastMessage();
//   }, []);


//   // useEffect(() => {
//   //   console.log("userContent", userContent);
//   // }, [userContent]);


//   const fetchPublicUrls = async () => {
//   try {
//     const { data: { user } } = await supabase.auth.getUser();
//     const { data, error } = await supabase
//       .from('All_Content')
//       .select('Public_URL')
//       .eq('Uid', user?.id); // Assuming the column for user ID is 'user_id'

//     if (error) throw error;

//     console.log("Public URL", data); // Check the public URL
//     setUserContent(data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching content:', error);
//     return [];
//   }
//   }






//   // const fetchPublicUrls = async () => {
//   //   const { data: files, error: listError } = await supabase.storage
//   //     .from('User Gallery')
//   //     // .list('public', {
//   //     .list('', {
//   //       limit: 100, 
//   //       offset: 0,
//   //     });

//   //   if (listError) {
//   //     console.error('Error listing files:', listError);
//   //     return;
//   //   }

//   //   const urls = files.map((file) => {
//   //     const { data, error } = supabase.storage
//   //       .from('User Gallery')
//   //       // .getPublicUrl('public/' + file.name);
//   //       .getPublicUrl(file.name);

//   //     if (error) {
//   //       console.error('Error getting public URL:', error);
//   //       return null;
//   //     }

//   //     console.log("Public URL", data.publicUrl); // Check the public URL
//   //     return data.publicUrl;
//   //   }).filter(url => url !== null); // Filter out null values

//   //   setUserContent(urls);
//   // };


//   useEffect(() => {
//     fetchPublicUrls();
//   }, []);


//   // const isVideoFile = (url) => {
//   //   const videoExtensions = ['mp4', 'webm', 'ogg'];
//   //   const extension = url?.split('.').pop().toLowerCase();
//   //   return videoExtensions.includes(extension);
//   // };

//   // const isVideoFile = (url: string):'video' | 'image'=> {
//   //   const videoExtensions = ['mp4', 'webm', 'ogg'];
//   //   const extension = url.split('.').pop()?.toLowerCase() || '';
//   //   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
//   // };


//   const isVideoFile = (url: string): true | false => {
//     const videoExtensions = ['mp4', 'webm', 'ogg'];
//     const extensionMatch = url.split('.').pop();
//     const extension = extensionMatch ? extensionMatch.toLowerCase() : '';

//     console.log(`URL: ${url}, Extension: ${extension}`); // Debugging line

//     return videoExtensions.includes(extension) ? true : false;
// };




// console.log("userData?.user_metadata",userData?.user_metadata)

//   // const handleFileChange = async (event) => {
//   //   const file = event.target.files?.[0];
//   //   if (!file) return;

//   //   console.log("Selected file:", file);

//   //   try {
//   //     setUploading(true);

//   //     const fileExt = file.name.split('.').pop();
//   //     const fileName = `${Date.now()}.${fileExt}`;
//   //     const filePath = fileName;

//   //     console.log("File path:", filePath);

//   //     let { data: uploadData, error: uploadError } = await supabase.storage
//   //       .from('User Gallery')
//   //       .upload(filePath, file);

//   //     if (uploadError) {
//   //       console.error("Upload Error:", uploadError.message);
//   //       toast({
//   //         variant: "destructive",
//   //         title: "Upload Error",
//   //         description: uploadError.message,
//   //       });
//   //       return;
//   //     }

//   //     console.log("Upload data:", uploadData);

//   //     const { data: publicUrlData, error: publicUrlError } = supabase.storage
//   //       .from('User Gallery')
//   //       .getPublicUrl(filePath);

//   //     if (publicUrlError) {
//   //       console.error("Public URL Error:", publicUrlError.message);
//   //       toast({
//   //         variant: "destructive",
//   //         title: "Public URL Error",
//   //         description: publicUrlError.message,
//   //       });
//   //       return;
//   //     }

//   //     console.log("Public URL data:", publicUrlData);

//   //     if (publicUrlData) {

//   //       toast.success("Uploaded Successfully", {
//   //         position: toast.POSITION?.TOP_CENTER,
//   //       })
//   //     }

//   //     window.location.reload();
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error);
//   //     toast.error("Error uploading file:", {
//   //       position: toast.POSITION?.TOP_CENTER,
//   //     })
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };

//   const { id, user_metadata } = userData || {};



//   return (
//     <div className=" w-full flex flex-col justify-center items-center " >
//       {localStorage.getItem("token") ? (<div>
//         <div className="px-5 py-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//           <h1 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl my-6 font-bold">
//             {userDetails?.Username || 'My Profile'}
//           </h1>
//           {/* localStorage.getItem("token")?( router.push("/profile")): (router.push("/")) */}

//           <div className="flex items-center justify-between">
//             <div className="flex gap-5 items-center">
//               <Avatar className="w-16 h-16 md:w-20 lg:w-20 xl:w-20 md:h-20 lg:h-20 xl:h-20">
//                 {/* <AvatarImage src={user_metadata?.avatar_url || '/user1.png'} alt="avatar" /> */}
//                 {/* <AvatarImage src={userDP || '/DefaultDP.jpg'} alt="avatar" /> */}
//                 <AvatarImage src={userData?.user_metadata.avatar_url || '/DefaultDP.jpg'} alt="avatar" />



//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//             </div>

//             <div className="mx-2">
//               <Link href={`/profile/edit/${id}`}>
//                 {/* <Link href={`/profile/edit`}> */}
//                 <Button
//                   variant="outline"
//                   className="rounded-3xl md:px-5 lg:px-5 xl:px-5 px-2 py-2 text-sm font-semibold"
//                 >
//                   <Pencil className="mr-2 w-4 h-4" />
//                   <span className="hidden md:block lg:block xl:block">Edit Profile</span>
//                   <span className="md:hidden lg:hidden xl:hidden">Edit</span>
//                 </Button>
//               </Link>
//             </div>
//           </div>
//           <div className="flex flex-col py-5 gap-5">
//             <div>
//               <p className="text-base font-bold">Name</p>
//               <p className="text-sm font-semibold text-gray-500">{userData?.user_metadata?.Name || 'N/A'}</p>
//             </div>
//             <div>
//               <p className="text-base font-bold">Username</p>
//               <p className="text-sm font-semibold text-gray-500">{userData?.user_metadata?.UserName || 'N/A'}</p>
//             </div>
//             <div>
//               <p className="text-base font-bold">Goals</p>
//               <p className="text-sm font-semibold text-gray-500">{userDetails?.Goals || 'N/A'}</p>
//             </div>
//             <div>
//               <p className="text-base font-bold">Website or social link</p>
//               <p className="text-sm font-semibold text-gray-500">{userDetails?.Website || 'N/A'}</p>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex gap-5 items-center">
//                 <p className="text-base font-bold">Content</p>
//               </div>
//               <div className="flex gap-4 items-center">
// {/* Add Content */}
// <div >
//       <Button
//         className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-16"
//         onClick={handleOpenForm}
//         disabled={!userDetails?.id}
//       >
//         Add Content
//       </Button>

//       <Modal
//         isOpen={isAddContentFormVisible}
//         onClose={handleCloseForm}
//         title="Add Content"
//       >
//         <AddContent onClose={handleCloseForm} />
//       </Modal>
//     </div>

//                 {/* <input
//                   type="file"
//                   // accept="image/*"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   id="avatarUpload"
//                 />
//                 <Button
//                   variant="outline"
//                   className="rounded-3xl px-5 py-2 text-sm font-semibold"
//                   onClick={() => document.getElementById("avatarUpload")?.click()}
//                   // disabled={uploading}
//                   disabled={uploading || !userDetails?.id}
//                 >
//                   <Images className="mr-2" />
//                   <span>{uploading ? "Uploading..." : "Upload New Content"}</span>
//                 </Button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-5 -mt-10 mb-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//             {/* {userContent && userContent?.map((content,index) => ( */}
//             {/* {contents?.map((content) => (
//             <div key={content.id}>
             
//               <Image
//                 src={content.images}
                
//                 alt="content"
//                 width={250}
//                 height={300}
//               />
//             </div>
//           ))} */}

//             {userContent.map((url, index) => {
//               const isVideo = isVideoFile(url.Public_URL);
//               return (
//                 <div key={index}  style={{
//                   background: "rgba(255, 255, 255, 0.8)",
//                   backdropFilter: "blur(10px)",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "10px",
//                   padding: "20px",
//                   maxWidth: "400px",
//                   height: "300px",
//                   textAlign: "center",
//                   marginBottom: '16px',
//                 }}>
//                   {isVideo ? (
//                     <video width="250" height="200" controls className="object-cover w-64 h-64">
//                       <source src={url.Public_URL} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : (
//                     <Image
//                       className="object-cover w-64 h-64"
//                       src={url.Public_URL}
//                       alt={`media-${index}`}
//                       width={250}
//                       height={700}
//                     />
//                   )}
//                 </div>
//               );
//             })}







//           </div>

//         </div>
//         {/* <EditProfile userData={userDetails}  /> */}
//       </div>) :
//         (<div style={{
//           textAlign: "center", display: "flex",
//           justifyContent: "center",
//           alignItems: "center", flexDirection: "column"
//         }}>
//           <h1 style={{ color: "red", fontSize: "16px" }}>
//             {/* <b> "Please Go For Login First"!!</b> */}
//             <b>&quot;Please Go For Login First&quot;!!</b>
//           </h1>
//           <div className="card" style={{
//             background: "rgba(255, 255, 255, 0.8)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             borderRadius: "10px",
//             padding: "20px",
//             maxWidth: "400px",
//             height: "100px",
//             textAlign: "center",
//           }}>

//             <Button
//               className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-24"
//               type="submit"
//               onClick={() => router.push("/sign-in")}
//             >
//               Login
//             </Button>


//           </div>
//         </div>
//         )}

//     </div>
//   );
// };

// export default MyProfile;




"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
// import { Button } from "../ui/button-2";
import { Images } from "lucide-react";
import { Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { User } from "@supabase/supabase-js";

// import { toast } from "../ui/use-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddContent from "./AddContent";
import Modal from "../../components/ui/modal";


// Type for user details from the database
type UserDetails = {
  id: string;
  Name: string;

  Username?: string;
  Goals?: string;
  Website?: string;
  Profile?: string;

};


type Props = {};
type Content= {

  Public_URL: string;
  Cid: string;
}




const MyProfile = (props: Props) => {
  // const [userDP, setUserDP] = useState('');
   // const [userContent, setUserContent] = useState([]);
   const [userContent, setUserContent] = useState<Content[]>([]);

  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  // const contents = [
  //   { id: 1, images: userContent[4] },
  //   { id: 2, images: "/card.png" },
  //   { id: 3, images: "/card.png" },
  //   { id: 4, images: "/card.png" },

  // ];

  // Initialize Supabase client using environment variables
  // const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL;
  // const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey);

  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);


  const [userData, setUserData] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);


  const [isAddContentFormVisible, setIsAddContentFormVisible] = useState(false);

  const handleOpenForm = () => {
    setIsAddContentFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsAddContentFormVisible(false);
    window.location.reload();
  };




  const getUser = async () => {

    const { data: { user } } = await supabase.auth.getUser();
    setUserData(user);
// console.log("UserCred",user)
    if (user?.id) {
      // Fetch user details from the "User Details" table
      const { data, error } = await supabase
        .from('User Details')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user details:', error);
        // Handle error 
      } else {
        setUserDetails(data);
        // setUserDP(data.Profile_Picture)
        // console.log("Sucessful", data.Profile_Picture)

      }
    }

  };


  const showToastMessage = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please Login First !", {
        position: "top-center",
      })
    };
  };





  useEffect(() => {
    setIsloading(true);
    getUser().finally(() => setIsloading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    showToastMessage();
  }, []);


  // useEffect(() => {
  //   console.log("userContent", userContent);
  // }, [userContent]);


  const fetchPublicUrls = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('All_Content')
      .select('Public_URL,Cid')
      .eq('Uid', user?.id)
      .order('created_at', { ascending: false }); 

    if (error) throw error;

    // console.log("Public URL", data); // Check the public URL
    setUserContent(data);
    // console.log("Error",data)
    return data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
  }






  // const fetchPublicUrls = async () => {
  //   const { data: files, error: listError } = await supabase.storage
  //     .from('User Gallery')
  //     // .list('public', {
  //     .list('', {
  //       limit: 100, 
  //       offset: 0,
  //     });

  //   if (listError) {
  //     console.error('Error listing files:', listError);
  //     return;
  //   }

  //   const urls = files.map((file) => {
  //     const { data, error } = supabase.storage
  //       .from('User Gallery')
  //       // .getPublicUrl('public/' + file.name);
  //       .getPublicUrl(file.name);

  //     if (error) {
  //       console.error('Error getting public URL:', error);
  //       return null;
  //     }

  //     console.log("Public URL", data.publicUrl); // Check the public URL
  //     return data.publicUrl;
  //   }).filter(url => url !== null); // Filter out null values

  //   setUserContent(urls);
  // };


  useEffect(() => {
    fetchPublicUrls();
  }, []);


  // const isVideoFile = (url) => {
  //   const videoExtensions = ['mp4', 'webm', 'ogg'];
  //   const extension = url?.split('.').pop().toLowerCase();
  //   return videoExtensions.includes(extension);
  // };

  // const isVideoFile = (url: string):'video' | 'image'=> {
  //   const videoExtensions = ['mp4', 'webm', 'ogg'];
  //   const extension = url.split('.').pop()?.toLowerCase() || '';
  //   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
  // };


  const isVideoFile = (url: string): true | false => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extensionMatch = url.split('.').pop();
    const extension = extensionMatch ? extensionMatch.toLowerCase() : '';

    // console.log(`URL: ${url}, Extension: ${extension}`); // Debugging line

    return videoExtensions.includes(extension) ? true : false;
};




// console.log("userData?.user_metadata",userData?.user_metadata)

  // const handleFileChange = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   console.log("Selected file:", file);

  //   try {
  //     setUploading(true);

  //     const fileExt = file.name.split('.').pop();
  //     const fileName = `${Date.now()}.${fileExt}`;
  //     const filePath = fileName;

  //     console.log("File path:", filePath);

  //     let { data: uploadData, error: uploadError } = await supabase.storage
  //       .from('User Gallery')
  //       .upload(filePath, file);

  //     if (uploadError) {
  //       console.error("Upload Error:", uploadError.message);
  //       toast({
  //         variant: "destructive",
  //         title: "Upload Error",
  //         description: uploadError.message,
  //       });
  //       return;
  //     }

  //     console.log("Upload data:", uploadData);

  //     const { data: publicUrlData, error: publicUrlError } = supabase.storage
  //       .from('User Gallery')
  //       .getPublicUrl(filePath);

  //     if (publicUrlError) {
  //       console.error("Public URL Error:", publicUrlError.message);
  //       toast({
  //         variant: "destructive",
  //         title: "Public URL Error",
  //         description: publicUrlError.message,
  //       });
  //       return;
  //     }

  //     console.log("Public URL data:", publicUrlData);

  //     if (publicUrlData) {

  //       toast.success("Uploaded Successfully", {
  //         position: toast.POSITION?.TOP_CENTER,
  //       })
  //     }

  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     toast.error("Error uploading file:", {
  //       position: toast.POSITION?.TOP_CENTER,
  //     })
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const { id, user_metadata } = userData || {};



  return (
    <div className=" w-full flex flex-col justify-center items-center " >
      {/* {localStorage.getItem("token") ? 
      ( */}
      <div>
        <div className="px-5 py-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
          <h1 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl my-6 font-bold">
            {userDetails?.Username || 'My Profile'}
          </h1>
          {/* localStorage.getItem("token")?( router.push("/profile")): (router.push("/")) */}

          <div className="flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <Avatar className="w-16 h-16 md:w-20 lg:w-20 xl:w-20 md:h-20 lg:h-20 xl:h-20">
                {/* <AvatarImage src={user_metadata?.avatar_url || '/user1.png'} alt="avatar" /> */}
                {/* <AvatarImage src={userDP || '/DefaultDP.jpg'} alt="avatar" /> */}
                <AvatarImage src={userData?.user_metadata.avatar_url || '/DefaultDP.jpg'} alt="avatar" />



                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>

            <div className="mx-2">
              <Link href={`/profile/edit/${id}`}>
                {/* <Link href={`/profile/edit`}> */}
                <Button
                  variant="outline"
                  className="rounded-3xl md:px-5 lg:px-5 xl:px-5 px-2 py-2 text-sm font-semibold"
                >
                  <Pencil className="mr-2 w-4 h-4" />
                  <span className="hidden md:block lg:block xl:block">Edit Profile</span>
                  <span className="md:hidden lg:hidden xl:hidden">Edit</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col py-5 gap-5">
            <div>
              <p className="text-base font-bold">Name</p>
              <p className="text-sm font-semibold text-gray-500">{userData?.user_metadata?.Name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-base font-bold">Username</p>
              <p className="text-sm font-semibold text-gray-500">{userData?.user_metadata?.UserName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-base font-bold">Goals</p>
              <p className="text-sm font-semibold text-gray-500">{userDetails?.Goals || 'N/A'}</p>
            </div>
            <div>
              <p className="text-base font-bold">Website or social link</p>
              <p className="text-sm font-semibold text-gray-500">{userDetails?.Website || 'N/A'}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center">
                <p className="text-base font-bold">Content</p>
              </div>
              <div className="flex gap-4 items-center">
{/* Add Content */}
<div >
      <Button
        className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-16"
        onClick={handleOpenForm}
        disabled={!userDetails?.id}
      >
        Add Content
      </Button>

      <Modal
        isOpen={isAddContentFormVisible}
        onClose={handleCloseForm}
        title="Add Content"
      >
        <AddContent onClose={handleCloseForm} />
      </Modal>
    </div>

                {/* <input
                  type="file"
                  // accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="avatarUpload"
                />
                <Button
                  variant="outline"
                  className="rounded-3xl px-5 py-2 text-sm font-semibold"
                  onClick={() => document.getElementById("avatarUpload")?.click()}
                  // disabled={uploading}
                  disabled={uploading || !userDetails?.id}
                >
                  <Images className="mr-2" />
                  <span>{uploading ? "Uploading..." : "Upload New Content"}</span>
                </Button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-5 -mt-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {/* {userContent && userContent?.map((content,index) => ( */}
            {/* {contents?.map((content) => (
            <div key={content.id}>
             
              <Image
                src={content.images}
                
                alt="content"
                width={250}
                height={300}
              />
            </div>
          ))} */}

            {userContent.map((url, index) => {
              const isVideo = isVideoFile(url.Public_URL);
              return (
                <Link href={`content/edit/${url.Cid}`} key={index} title={"Edit"} >
                <div style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  padding: "20px",
                  maxWidth: "400px",
                  height: "300px",
                  textAlign: "center",
                  marginBottom: '16px',
                }}>
                  {isVideo ? (
                    <video width="250" height="200" controls className="object-cover w-64 h-64">
                      <source src={url.Public_URL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      className="object-cover w-64 h-64"
                      src={url.Public_URL}
                      alt={`media-${index}`}
                      width={250}
                      height={700}
                    />
                  )}
                </div>
                </Link>
              );
            })}







          </div>

        </div>
        {/* <EditProfile userData={userDetails}  /> */}
      </div>
      {/* ) :
        (<div style={{
          textAlign: "center", display: "flex",
          justifyContent: "center",
          alignItems: "center", flexDirection: "column"
        }}>
          <h1 style={{ color: "red", fontSize: "16px" }}> */}
            {/* <b> "Please Go For Login First"!!</b> */}
            {/* <b>&quot;Please Go For Login First&quot;!!</b>
          </h1>
          <div className="card" style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "400px",
            height: "100px",
            textAlign: "center",
          }}>

            <Button
              className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-24"
              type="submit"
              onClick={() => router.push("/sign-in")}
            >
              Login
            </Button>


          </div>
        </div>
        )} */}

    </div>
  );
};

export default MyProfile;





























