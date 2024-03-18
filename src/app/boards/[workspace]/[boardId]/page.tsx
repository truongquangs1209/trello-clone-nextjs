"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import JobsGroup from "@/app/components/jobsGroup";
import NavBar from "@/app/components/navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext, UserListsContext } from "@/context/AppProvider";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { handleDragAndDrop } from "@/firebase/service";

type handleAddList = () => void;
export default function Home() {
  const [listJobs, setListJobs] = useState<ListsJobs[]>([]);
  const [openInputAdd, setOpenInputAdd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [titleList, setTitleList] = useState<string>("");
  const { user } = useContext(AuthContext);
  const { members } = useContext(UserListsContext);
  const email = user ? user.email : "";
  //Fetching data listJobs in fireBase
  // useDataFetching(setListJobs, "listJobs");

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
        setLoading(false);
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

  const handleAddList: handleAddList = async () => {
    try {
      if (titleList) {
        const newList: ListsJobs = {
          name: titleList,
          items: [],
          createdBy: email,
          createdAt: new Date(),
        };
        const dataCollection = collection(db, "listJobs");
        const docRef = await addDoc(dataCollection, newList);
        newList.id = docRef.id;
        setListJobs([...listJobs, newList as any]);

        setOpenInputAdd(false);
        setTitleList("");
        toast.success("Create succeed !...");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddList();
    }
  };

  return (
    <div className="h-[100vh]">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spin />
          <h1>Loading...</h1>
        </div>
      ) : (
        <DragDropContext
          onDragEnd={(results) =>
            handleDragAndDrop(results, listJobs, setListJobs)
          }
        >
          <NavBar />
          <Droppable droppableId="ROOT" type="group" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className=" mt-4 flex flex-wrap"
              >
                {members.some((member) => member.email === email) &&
                  listJobs &&
                  listJobs.map((listJob, index) => (
                    <Draggable
                      draggableId={listJob?.id}
                      index={index}
                      key={listJob.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className="flex-[1] h-fit  p-3 min-w-[18%] mb-4 font-semibold text-[#B6c2cf] bg-[#101204] mx-2 rounded-xl max-w-60 text-sm"
                        >
                          <JobsGroup
                            listJobs={listJobs}
                            items={listJob.items}
                            title={listJob.name}
                            setListJobs={setListJobs}
                            listId={listJob?.id}
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
                        openInputAdd
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <input
                        onChange={(e) => setTitleList(e.target.value)}
                        onKeyDown={handleKeyDown}
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
      )}
    </div>
  );
}
