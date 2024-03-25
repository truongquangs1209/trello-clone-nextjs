"use client";
import { db } from "@/firebase/config";
import { useDataFetching } from "@/app/hook/useFirestore";
import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";

interface ListJobsContextValue {
  listJobs: ListsJobs[];
  openInputAddListJobs: boolean;
  setOpenInputAddListJobs: React.Dispatch<React.SetStateAction<boolean>>;
  setListJobs: React.Dispatch<React.SetStateAction<ListsJobs[]>>;
}

export const ListJobsContext = createContext<ListJobsContextValue | undefined>(
  undefined
);

function ListJobsProvider({ children }) {
  const [openInputAddListJobs, setOpenInputAddListJobs] =
    useState<boolean>(false);
  const [listJobs, setListJobs] = useState<ListsJobs[]>([]);

  useEffect(() => {
    const fetchJobsFromFireStore = async () => {
      try {
        const userCollection = collection(db, "listJobs");
        const snapshot = await getDocs(userCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListJobs(data as ListsJobs[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchJobsFromFireStore();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collect = collection(db, "itemJobs");
        const snapshot = await getDocs(collect);
        const dataArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          type: doc.data()?.type,
          ...doc.data(),
        }));
        setListJobs((prev: ListsJobs[]) =>
          prev.map((list) => {
            const filterData = dataArray.filter(
              (data) => data.type === list.name
            );
            return {
              ...list,
              items: filterData,
            };
          })
        );
      } catch (error) {
        console.error("error getting document", error);
      }
    };
    fetchData();
  }, []);
  return (
    <ListJobsContext.Provider
      value={{
        listJobs,
        setListJobs,
        openInputAddListJobs,
        setOpenInputAddListJobs,
      }}
    >
      {children}
    </ListJobsContext.Provider>
  );
}

export default ListJobsProvider;
