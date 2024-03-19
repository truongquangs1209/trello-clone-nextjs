import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const useFirestore = (collectionName) => {
  const [documents, setocuments] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, collectionName);
      const snapshot = await getDocs(dataCollection);
      const newData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    //   setData(newData);
    };

    fetchData();
  }, []);
};



// const useFirestores = (collection, condition)={
//     React.useEffect(()=>{
//         let collectionRef = db.collection(collectionName).orderBy('createAt');
//         if(condition){
//             if(!condition.compareValue || !condition.compareValue.length){
//                 return;
//             }
//             collectionRef.where(condition.fieldName,condition.operator, condition.compareValue)
//         }
//         collectionRef.onSnapshot((snapshot)=>{
//             const documents = snapshot.docs.map(doc=>(
//                 ...doc.data(),
//                 id:doc.id
//             ))
//         })
//     })
// }
