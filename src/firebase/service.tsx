import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";
import { useEffect } from "react";


export const useDataFetching = (
    setData: React.Dispatch<React.SetStateAction<any>>,
    collectionName: string,
    dependencyArray:any[],
  ) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
            const dataCollection = collection(db, collectionName);
        const snapshot = await getDocs(dataCollection);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [dependencyArray]);
  };
