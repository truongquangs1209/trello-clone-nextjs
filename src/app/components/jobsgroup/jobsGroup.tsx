"use client";
import { db } from "@/firebase/config";
import {
  faClose,
  faEllipsis,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

type Props = {
  listId: string;
  title: string;
  items: ItemJobs[];
  listJobs: ListsJobs[];
  setListJobs: React.Dispatch<React.SetStateAction<ListsJobs[]>>;
};

function JobsGroup({ listId, title, items, listJobs, setListJobs }: Props) {
  const [openAddJob, setOpenAddJob] = useState<boolean>(false);
  const [titleList, setTitleList] = useState<string>("");
  const [, setDataJobItem] = useState(items);

  const handleAddJobs: () => void = async () => {
    try {
      if (titleList) {
        setTitleList("");
        setOpenAddJob(false);
        const newJob: ItemJobs = {
          title: titleList,
          createdAt: new Date(),
          type: title,
        };

        const dataCollection = collection(db, "itemJobs");
        const docRef = await addDoc(dataCollection, newJob);
        newJob.id = docRef.id;
        const updatedListJobs = listJobs.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              items: [...list.items, newJob],
            };
          }
          return list;
        });
        // Cập nhật trạng thái của listJobs với mục mới được thêm vào
        setListJobs(updatedListJobs);
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
      toast.success("Delete Jobs Success !");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const docRef = doc(db, "itemJobs", itemId);
      await deleteDoc(docRef);
      const indexToRemove = items.findIndex((item) => item.id === itemId);
      setDataJobItem(items.splice(indexToRemove, 1));
      toast.success("Delete Jobs Success !");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddJobs();
    }
  };
  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex items-center justify-between">
            <h2 className="py-2 pl-1 text-[14px]">{title}</h2>
            <Tippy
              interactive
             
              theme="light"
              content={
                <div className="text-[#9FADBC] min-w-[200px] flex flex-col p-0">
                  <span className="text-center font-medium py-2">Thao Tác</span>
                  <div className="font-normal">
                    <button
                      className="hover:bg-[#3c464f] text-start transition p-1 w-full"
                      onClick={() => handleDeleteJobs(listId)}
                    >
                      Xóa thẻ
                    </button>
                    <button
                      className="hover:bg-[#3c464f] text-start transition p-1 w-full"
                      onClick={() => setOpenAddJob(true)}
                    >
                      Thêm thẻ
                    </button>
                  </div>
                </div>
              }
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Tippy>
          </div>
          {items &&
            items.map((job, index) => (
              <Draggable draggableId={job.id} index={index} key={job.id}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="group flex cursor-pointer hover:border-[#85b8ff] hover:border-[1px] transition-none pt-2 pb-2 items-center px-2 my-2 font-normal bg-[#22272b] w-full justify-between rounded"
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
              onKeyDown={handleKeyDown}
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