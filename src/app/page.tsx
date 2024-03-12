"use client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DraggableProvided,
  DragEndResult,
} from "react-beautiful-dnd";
import { useDataFetching } from "@/firebase/service";
import JobsGroup from "./components/jobsGroup";
import NavBar from "./components/navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext, UserListsContext } from "@/context/AppProvider";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DropResult } from "react-beautiful-dnd";

type handleAddList = () => void;
export default function Home() {
  const [listJobs, setListJobs] = useState<ListsJobs[]>();
  const [openInputAdd, setOpenInputAdd] = useState<boolean>(false);
  const [titleList, setTitleList] = useState<string>("");

  // const email = user ? user.displayName : "";
  const { userLists, members, setMembers } = useContext(UserListsContext);
  //Fetching data listJobs in fireBase
  useDataFetching(setListJobs, "listJobs", listJobs);

  // useEffect(() => {
  //   const fetchJobsFromFirestore = async () => {
  //     try {
  //       const usersCollection = collection(db, "itemJobs");
  //       const snapshot = await getDocs(usersCollection);
  //       const dataArray = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       // Update state listJobs based on new data from Firestore
  //       setListJobs((prevList:ListsJobs[]) =>
  //         prevList.map((job) => {
  //           const filterData = dataArray.filter(
  //             (data: ItemJobs) => data.type === job.title
  //           );
  //           return {
  //             ...job,
  //             items: filterData,
  //           };
  //         })
  //         );

  //     } catch (error) {
  //       console.error("Error getting document", error);
  //     } if(listJobs){
  //       console.log(listJobs);
  //     }
  //   };

  //   fetchJobsFromFirestore();
  // }, []);

  const { user } = useContext(AuthContext);
  const email = user ? user.email : "";
  const handleAddList: handleAddList = async () => {
    try {
      if (titleList) {
        const newList = {
          title: titleList,
          items: [],
          createdBy: email,
        };
        const dataCollection = collection(db, "listJobs");
        const docRef = await addDoc(dataCollection, newList);
        setOpenInputAdd(false);
        setTitleList("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = async (result: any) => {
    // const { source, destination, type } = result;
    // if (!destination) return;
    // if (
    //   source.droppableId === destination.droppableId &&
    //   source.index === destination.index
    // ) {
    //   return;
    // }
    // if (type === "group") {
    //   const reorderedLists = [...listJobs];
    //   const listsSourceIndex = source.index;
    //   const listsDestinationIndex = destination.index;
    //   const [removedList] = reorderedLists.splice(listsSourceIndex, 1);
    //   reorderedLists.splice(listsDestinationIndex, 0, removedList);
    //   setListJobs([...reorderedLists]);
    //   return;
    // }
    // const itemSourceIndex = source.index;
    // const itemDestinationIndex = destination.index;
    // const listJobsSourceIndex = listJobs.findIndex(
    //   (listJob) => listJob.id === source.droppableId
    // );
    // const listJobsDestinationIndex = listJobs.findIndex(
    //   (listJob) => listJob.id === destination.droppableId
    // );
    // const newSourceItems = [...listJobs[listJobsSourceIndex].items];
    // const newDestinationItems =
    //   source.droppableId !== destination.droppableId
    //     ? [...listJobs[listJobsDestinationIndex].items]
    //     : newSourceItems;
    // const [movedItem] = newSourceItems.splice(itemSourceIndex, 1);
    // newDestinationItems.splice(itemDestinationIndex, 0, movedItem);
    // const newListJobs = [...listJobs];
    // newListJobs[listJobsSourceIndex] = {
    //   ...listJobs[listJobsSourceIndex],
    //   items: newSourceItems,
    // };
    // newListJobs[listJobsDestinationIndex] = {
    //   ...listJobs[listJobsDestinationIndex],
    //   items: newDestinationItems,
    // };
    // setListJobs(newListJobs);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <NavBar />
        <Droppable droppableId="ROOT" type="group">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" mt-4 flex"
            >
              {members.some((member) => member.email === email) &&
                listJobs.map((listJob, index) => (
                  <Draggable
                    draggableId={listJob.id}
                    index={index}
                    key={listJob.id}
                  >
                    {(provided: any) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="flex-[1] h-fit p-3 font-semibold text-[#B6c2cf] bg-[#101204] mx-2 rounded-xl max-w-60 text-sm"
                      >
                        <JobsGroup
                          title={listJob.title}
                          setListJobs={setListJobs}
                          listId={listJob.id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
              {members.some((member) => member.email === email) ? (
                <div className="p-3 h-fit rounded-xl flex-[1] bg-[#ffffff3d] hover:bg-[#5c7495a6] ml-2 text-white transition-all max-w-60 text-sm">
                  <div
                    style={
                      openInputAdd ? { display: "block" } : { display: "none" }
                    }
                  >
                    <input
                      onChange={(e) => setTitleList(e.target.value)}
                      className="text-[#B6C2CF] mb-2 w-full my-1 py-[8px] px-3 rounded bg-[#22272b]"
                      type="text"
                      value={titleList}
                      placeholder="Nhập tiêu đề danh sách..."
                    />
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          handleAddList();
                          setOpenInputAdd(false);
                          setTitleList("");
                        }}
                        className="bg-[#579dff] font-semibold text-[#1D2125] hover:bg-[#85b8ff] py-[6px] px-3 rounded"
                      >
                        Thêm danh sách
                      </button>

                      <FontAwesomeIcon
                        onClick={() => setOpenInputAdd(false)}
                        className="hover:bg-[#cccccc49] cursor-pointer text-xl mr-3"
                        icon={faClose}
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => setOpenInputAdd(!openInputAdd)}
                    className="items-center"
                    style={
                      openInputAdd ? { display: "none" } : { display: "flex" }
                    }
                  >
                    <FontAwesomeIcon className="pr-2" icon={faPlus} />
                    <h2>Thêm danh sách</h2>
                  </div>
                </div>
              ) : (
                <h2>Bạn không phải thành viên</h2>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
