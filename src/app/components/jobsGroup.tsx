"use client";
import { JobsContext } from "@/context/AppProvider";
import { db } from "@/firebase/config";
import { faClose, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

function JobsGroup({ title, setListJobs, listId }) {
  const [openAddJob, setOpenAddJob] = useState<boolean>(false);
  const [titleList, setTitleList] = useState<string>("");

  const { jobItem, setJobItem } = useContext(JobsContext);
  const filterJobItems = jobItem.filter((job) => job.type === title);

  const handleAddJobs: () => void = async () => {
    try {
      if (titleList) {
        setTitleList("");
        setOpenAddJob(false);
        const newJob = {
          title: titleList,
          createdAt: new Date(),
          type: title,
        };
        const dataCollection = collection(db, "itemJobs");
        const docRef = await addDoc(dataCollection, newJob);
        const listJobsRef = doc(db, "listJobs", listId);
        const listJobsDoc = await getDoc(listJobsRef);

        if (listJobsDoc.exists()) {
          // Nếu listJobs tồn tại, thêm công việc mới vào trường items
          const updatedItems = [...listJobsDoc.data().items, docRef.id];
          await updateDoc(listJobsRef, { items: updatedItems });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteJobs = async (listId: string) => {
    try {
      const docRef = doc(db, "listJobs", listId);
      await deleteDoc(docRef);
      setListJobs((prevList) => prevList.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const docRef = doc(db, "itemJobs", itemId);
      await deleteDoc(docRef);
      setJobItem((prevJob) => prevJob.filter((job) => job.id !== itemId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex items-center justify-between">
            <h2 className="py-2 pl-1 text-[14px]">{title}</h2>
            <FontAwesomeIcon
              onClick={() => handleDeleteJobs(listId)}
              icon={faClose}
              style={
                filterJobItems.length > 0
                  ? { display: "none" }
                  : { display: "block" }
              }
            />
          </div>
          {filterJobItems.map((job, index) => (
            <Draggable draggableId={job.id} index={index} key={job.id}>
              {(provided) => (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  className="group flex cursor-pointer hover:border-[#85b8ff] hover:border-[1px] transition-none pt-2 pb-2 items-center px-2 my-2 font-normal bg-[#22272b] w-full justify-between rounded-lg"
                >
                  <h2>{job.title}</h2>
                  <FontAwesomeIcon
                    className="hidden group-hover:block"
                    onClick={() => handleDeleteItem(job.id)}
                    icon={faTrash}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <div style={openAddJob ? { display: "block" } : { display: "none" }}>
            <input
              onChange={(e) => setTitleList(e.target.value)}
              className="text-[#B6C2CF] mb-2 w-full my-1 py-[8px] px-3 rounded bg-[#22272b]"
              type="text"
              placeholder="Nhập tiêu đề danh sách..."
              value={titleList}
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
      )}
    </Droppable>
  );
}

export default JobsGroup;
