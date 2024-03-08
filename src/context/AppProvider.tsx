'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onIdTokenChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { useDataFetching } from "@/firebase/service";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface JobsItems{
  jobItem:ItemJobs[];
  setJobItem: React.Dispatch<React.SetStateAction<ItemJobs[] | undefined>>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
export const JobsContext = createContext<JobsItems | undefined>(
  undefined
);

function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<User | null>(null);
  const [jobItem, setJobItem] = useState<ItemJobs[]>()
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // localStorage.setItem("accessToken", user.accessToken);
      } else {
        setUser(null);
        localStorage.clear();
        router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, router]);


  useDataFetching(setJobItem,'itemJobs', jobItem)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
     <JobsContext.Provider value={{jobItem,setJobItem}}>
      {children}
     </JobsContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
