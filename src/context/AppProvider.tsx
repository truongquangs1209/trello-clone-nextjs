"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onIdTokenChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { useDataFetching } from "@/app/hook/useFirestore";


interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface JobsItems {
  jobItem: ItemJobs[];
  setJobItem: React.Dispatch<React.SetStateAction<ItemJobs[]>>;
}
interface ListsUser {
  userLists: UserLists[];
  setUserList: React.Dispatch<React.SetStateAction<UserLists[]>>;
  members: MemberList[];
  setMembers:React.Dispatch<React.SetStateAction<MemberList[]>>;
}



export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
export const JobsContext = createContext<JobsItems | undefined>(undefined);
export const UserListsContext = createContext<ListsUser | undefined>(undefined);


function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [jobItem, setJobItem] = useState<ItemJobs[]>([]);
  const [members, setMembers] = useState([]);
  const [userLists, setUserList] = useState<UserLists[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // localStorage.setItem("accessToken", user.accessToken);
      } else {
        setUser(null);
        // localStorage.clear();
        // router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, router]);

  useDataFetching(setJobItem, "itemJobs", members);
  useDataFetching(setUserList, "users", members);
  useDataFetching(setMembers, "member", null);
  // console.log(members);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <UserListsContext.Provider value={{ userLists, setUserList,members,setMembers }}>
        <JobsContext.Provider value={{ jobItem, setJobItem }}>
          {children}
        </JobsContext.Provider>
      </UserListsContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
