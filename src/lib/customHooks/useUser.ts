// hooks/useUser.ts

import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

interface User {
  id: string;
  email: string;
  
}

const useUser = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      }else if (user) {
        
        setUserData({
          id: user.id,
          email: user.email || '', // Fallback to an empty string if undefined
         
        });
      }
    };

    fetchUser();
  }, []);

  return userData;
};

export default useUser;
