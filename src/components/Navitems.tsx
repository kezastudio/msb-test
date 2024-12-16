
// "use client";

// import * as React from "react";

// import { usePathname, useRouter } from "next/navigation";
// import { createClient } from '@/utils/supabase/client';
// import Link from "next/link";
// import { Button } from "./ui/button";

// export const NavManu = () => {
//   // const [token, setToken] = React.useState<string | null>(null);
//   let token=""
//   if (typeof window !== "undefined") {
//    token = localStorage.getItem("token")|| ""}
//   const router = useRouter();
//   const supabase = createClient();
//   const signOutHandle = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       localStorage.removeItem('token');
//       sessionStorage.clear();

//       router.push('/');
//     } else {
//       console.error('Sign out error:', error);
//     }
//   };


//   // React.useEffect(() => {
   
//   //   const storedToken = localStorage.getItem("token");
//   //   setToken(storedToken);
//   //   // console.log(typeof(storedToken))
//   // }, []); 




//   const navItems = [
//     {
//       name: "Home",
//       path: "/",
//     },
//     // {
//     //   name: "How Its Work",
//     //   path: "",
//     // },
   
//     {
//       name: "FAQs",
//       path: "/faqs",
//     },
//     {
//       name: "Contact Us",
//       path: "/contact",
//     },
//     {
//       name: "Campaigns",
//       path: "/campaigns",
//     },
//     {
//       name: "Profile",
//       path: "/profile",
//     },
//     {
//       name: "Search",
//       path: "/search",
//     },
//     {
//       name: "Inbox",
//       path: "/inbox",
//     },
//     // {
//     //   name: "Userdetails",
//     //   path: "/userdetails",
//     // },
//   ];

//   const pathName = usePathname();
//   return (
//     <>
//       <nav className="">
//         <ul className="space-y-5 mt-0 xl:space-y-2 lg:space-y-2 md:space-y-2 flex flex-col md:flex-row lg:flex-row xl:flex-row  items-start md:items-center lg:items-center xl:items-center justify-center">
//           {navItems.map(({ name, path }, index) => {
//             const isActive = pathName === path;
//             const shouldShowLink = (path === "/profile" || path === "/campaigns" || path === "/search"|| path === "/inbox") ? !!token : true;

//             return (
//               <li
//                 key={index}
//                 className={`relative mt-0 group font-medium text-sm  ${isActive ? "text-[#FFDA44]" : "hover:text-[#FFDA44]"
//                   }`}
//               >


//                 {/* <Link href={path} className="flex  items-center gap-1 px-5">
//                   <span className="whitespace-nowrap">{name}</span>
//                 </Link> */}

//                 {shouldShowLink && (
//                   <Link href={path} className="flex items-center gap-1 px-5">
//                     <span className="whitespace-nowrap">{name}</span>
//                   </Link>
//                 )}


//                 <hr
//                   hidden
//                   aria-hidden
//                   className={`absolute  left-5 -bottom-1 xl:left-5 lg:left-5 md:left-5 lg:-bottom-8 xl:-bottom-8 md:-bottom-8  w-[50%] h-1 bg-[#FFDA44] rounded-full ${isActive ? "block" : "hidden group-hover:block"
//                     }`}
//                 />
//               </li>
//             );
//           })}

// {token && (
//             <li>
//               <Button
//                 className="bg-[#FFDA44] text-black hover:bg-[#f0c92c] hover:text-black mr-1"
//                 onClick={() => router.push("/content/upload")}
//               >
//                 Add Content
//               </Button>
//             </li>
//           )}






//           {token ? (
//             <li>
//               <Button onClick={signOutHandle}>Sign Out</Button>

//             </li>
//           ) : (
//             <>
//               <li>
//                 <Button
//                   className="mr-1"
//                   variant="outline"
//                   onClick={() => router.push("/sign-in")}
//                 >
//                   Login
//                 </Button>
//               </li>
//               <li>
//                 <Button
//                   className="bg-[#FFDA44] text-black hover:bg-[#f0c92c] hover:text-black"
//                   variant="default"
//                   onClick={() => router.push("/sign-up")}
//                 >
//                   Sign Up
//                 </Button>

//               </li>
//             </>
//           )}


//         </ul>
//       </nav>

//       <style jsx>{`
//         nav ul li {
//           margin-top: 0;
//         }
//       `}</style>
//     </>
//   );
// };











"use client";

import * as React from "react";

import { usePathname, useRouter } from "next/navigation";
import { createClient } from '@/utils/supabase/client';
import  supabase  from '../lib/supabaseClient';
import Link from "next/link";
import { Button } from "./ui/button";
import { Bell } from 'lucide-react';

export const NavManu = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<null | any>(null);
  // let token=""
  // if (typeof window !== "undefined") {
  //  token = localStorage.getItem("token")|| ""}
  const router = useRouter();
  // const supabase = createClient();
  const signOutHandle = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem('token');
      sessionStorage.clear();
      // setUser(null); // Ensure state is updated immediately
      router.push('/');
    } else {
      console.error('Sign out error:', error);
    }
  };


  // React.useEffect(() => {
   
  //   const storedToken = localStorage.getItem("token");
  //   setToken(storedToken);
  //   // console.log(typeof(storedToken))
  // }, []); 


  React.useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Fetched session:', session); // Debugging log
        // setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
  
    // Call fetchSession to get the current session on component mount
    // fetchSession();
  
    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log('Auth state changed:', event, session); // Debugging log
      if (event === 'SIGNED_OUT') {
        console.log('SIGNED_OUT', session);
  
        // Clear local and session storage
        [window.localStorage, window.sessionStorage].forEach((storage) => {
          storage.clear(); // More efficient way to clear storage
        });
  
        // Update state to null when signed out
        setUser(null);
        setToken(null)
      // } else if (event === 'SIGNED_IN' || session) {
      } else if (event === 'SIGNED_IN'||'INITIAL_SESSION ') {
        // console.log('SIGNED_IN', session);
  
        // Update state with the signed-in user
        setUser(session?.user ?? null);
        // setUser((prevUser: any | null) => session?.user ?? prevUser);
        const storedToken = localStorage.getItem("token");
    setToken(storedToken);
      }
    });
  
    // Cleanup function to unsubscribe from auth state changes
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  

  
  
    // React.useEffect(() => {
    //   // Directly fetch session and set user state
    //   supabase.auth.getSession().then(({ data: { session } }) => {
    //     console.log('Fetched session:', session);
    //     setUser(session?.user ?? null);
    //   }).catch(error => {
    //     console.error('Error fetching session:', error);
    //   });
  
    //   // Listen for auth state changes
    //   const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    //     console.log('Auth state changed:', event, session);
    //     if (event === 'SIGNED_OUT') {
    //       // Handle sign out
    //       setUser(null);
    //     // } else if (event === 'SIGNED_IN') {
    //      } else{
    //       // Handle sign in
    //       setUser(session?.user ?? null);
    //     }
    //   });
  
    //   // Cleanup on unmount
    //   return () => {
    //     authListener?.subscription.unsubscribe();
    //   };
    // }, []);
  
   
  








  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    // {
    //   name: "How Its Work",
    //   path: "",
    // },
   
    {
      name: "FAQs",
      path: "/faqs",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
    {
      name: "Campaigns",
      path: "/campaigns",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Search",
      path: "/search",
    },
    {
      name: "Inbox",
      path: "/inbox",
    },
    // {
    //   name: "Userdetails",
    //   path: "/userdetails",
    // },
    {
      name: "Notification",
      path: "/notifications/1",
    },
  ];

  const pathName = usePathname();
  return (
    <>
      <nav className="">
        <ul className="space-y-5 mt-0 xl:space-y-2 lg:space-y-2 md:space-y-2 flex flex-col md:flex-row lg:flex-row xl:flex-row  items-start md:items-center lg:items-center xl:items-center justify-center">
          {navItems.map(({ name, path }, index) => {
            const isActive = pathName === path;
            const shouldShowLink = (path === "/profile" || path === "/campaigns" || path === "/search"|| path === "/inbox"|| path === "/notifications/1") ? !!token : true;
            // const shouldShowLink = (path === "/profile" || path === "/campaigns" || path === "/search"|| path === "/inbox") ? !!user : true;
            return (
              <li
                key={index}
                className={`relative mt-0 group font-medium text-sm  ${isActive ? "text-[#FFDA44]" : "hover:text-[#FFDA44]"
                  }`}
              >


                {/* <Link href={path} className="flex  items-center gap-1 px-5">
                  <span className="whitespace-nowrap">{name}</span>
                </Link> */}

                {shouldShowLink && (
                  <Link href={path} className="flex items-center gap-1 px-5">
                    <span className="whitespace-nowrap">{name==="Notification"?<Bell />:name}</span>
                  </Link>
                )}


                <hr
                  hidden
                  aria-hidden
                  className={`absolute  left-5 -bottom-1 xl:left-5 lg:left-5 md:left-5 lg:-bottom-8 xl:-bottom-8 md:-bottom-8  w-[50%] h-1 bg-[#FFDA44] rounded-full ${isActive ? "block" : "hidden group-hover:block"
                    }`}
                />
              </li>
            );
          })}
{/* {user && ( */}
{token && (

            <li>
              <Button
                className="bg-[#FFDA44] text-black hover:bg-[#f0c92c] hover:text-black mr-1"
                onClick={() => router.push("/content/upload")}
              >
                Add Content
              </Button>
            </li>
          )}






          {token ? (
          // {/* {user ? ( */}
            <li>
              <Button onClick={signOutHandle}>Sign Out</Button>

            </li>
          ) : (
            <>
              <li>
                <Button
                  className="mr-1"
                  variant="outline"
                  onClick={() => router.push("/sign-in")}
                >
                  Login
                </Button>
              </li>
              <li>
                <Button
                  className="bg-[#FFDA44] text-black hover:bg-[#f0c92c] hover:text-black"
                  variant="default"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>

              </li>
            </>
          )}


        </ul>
      </nav>

      <style jsx>{`
        nav ul li {
          margin-top: 0;
        }
      `}</style>
    </>
  );
};
