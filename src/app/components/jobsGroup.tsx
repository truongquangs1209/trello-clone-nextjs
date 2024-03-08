"use client";
import { AuthContext } from "@/context/AppProvider";
import { db } from "@/firebase/config";
import { useDataFetching } from "@/firebase/service";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import JobItems from "./jobItems";


function JobsGroup({ title, setListJobs,listId }) {
  const [openAddJob, setOpenAddJob] = useState<boolean>(false);
  const [titleList, setTitleList] = useState<string>("");


  const handleAddJobs:()=> void = async () => {
    try {
      if (titleList) {
        const newJob = {
          title: titleList,
          createdAt: new Date(),
          type:title
        };
        const dataCollection = collection(db, "itemJobs");
        const docRef = await addDoc(dataCollection, newJob);
        setOpenAddJob(false);
        setTitleList("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleDeleteJobs = async (listId:string) => {
    try {
      const docRef = doc(db, "listJobs", listId);
      await deleteDoc(docRef);
      setListJobs((prevList) => prevList.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="py-2 pl-1 text-[14px]">{title}</h2>
        <FontAwesomeIcon onClick={() => handleDeleteJobs(listId)} icon={faClose} />
      </div>
      <JobItems/>
      <div style={openAddJob ? { display: "block" } : { display: "none" }}>
        <input
          onChange={(e) => setTitleList(e.target.value)}
          className="text-[#B6C2CF] mb-2 w-full my-1 py-[8px] px-3 rounded bg-[#22272b]"
          type="text"
          placeholder="Nhập tiêu đề danh sách..."
        />
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              handleAddJobs();
            }}
            className="bg-[#579dff] font-semibold text-[#1D2125] hover:bg-[#85b8ff] py-[6px] px-3 rounded"
          >
            Thêm thẻ
          </button>

          <FontAwesomeIcon
            onClick={() => setOpenAddJob(false)}
            className="hover:bg-[#cccccc49] cursor-pointer text-xl mr-3"
            icon={faClose}
          />
        </div>
      </div>
      <div
        onClick={() => setOpenAddJob(!openAddJob)}
        className="items-center"
        style={openAddJob ? { display: "none" } : { display: "flex" }}
      >
        <FontAwesomeIcon className="pr-2" icon={faPlus} />
        <h2>Thêm thẻ</h2>
      </div>
    </div>
  );
}

export default JobsGroup;
