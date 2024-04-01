import { AuthContext, UserListsContext } from "@/context/AppProvider";
import { BoardsContext } from "@/context/BoardsProvider";
import { ListJobsContext } from "@/context/ListJobsProvider";
import { db } from "@/firebase/config";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState } from "react";

type handleAddList = () => void;

function CreateListJobs({ boardsId, selectedWorkspace }) {
  const [titleList, setTitleList] = useState<string>("");
  const {
    listJobs,
    setListJobs,
    openInputAddListJobs,
    setOpenInputAddListJobs,
  } = useContext(ListJobsContext);
  const { members, userLists } = useContext(UserListsContext);
  const { user } = useContext(AuthContext);
  // console.log(typeof user);
  const email = user ? user.email : "";
  const userListNotInMembers = userLists?.filter(
    (user) => !members.some((member) => member.id === user.id)
  );
  // console.log(userListNotInMembers);

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleAddList();
    }
  };

  const handleAddList: handleAddList = async () => {
    try {
      if (titleList) {
        const newList: ListsJobs = {
          name: titleList,
          items: [],
          createdBy: email,
          boards: boardsId,
          createdAt: new Date(),
        };
        const dataCollection = collection(db, "listJobs");
        const docRef = await addDoc(dataCollection, newList);
        newList.id = docRef.id;
        setListJobs([...listJobs, newList as any]);

        setOpenInputAddListJobs(false);
        setTitleList("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{ display: listJobs?.length >= 5 ? "none" : "flex" }}
        className="p-3 h-fit rounded-xl min-w-64 flex-[1] bg-[#ffffff3d] hover:bg-[#5c7495a6] ml-2 text-white transition-all max-w-60 text-sm"
      >
        <div
          style={
            openInputAddListJobs ? { display: "block" } : { display: "none" }
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
                setOpenInputAddListJobs(false);
                setTitleList("");
              }}
              className="bg-[#579dff] font-semibold text-[#1D2125] hover:bg-[#85b8ff] py-[6px] px-3 rounded"
            >
              Thêm danh sách
            </button>

            <FontAwesomeIcon
              onClick={() => setOpenInputAddListJobs(false)}
              className="hover:bg-[#cccccc49] cursor-pointer text-xl mr-3"
              icon={faClose}
            />
          </div>
        </div>
        {members.find((item) => item.id === user?.uid) ||
        members.filter(
          (item) =>
            item.workspaceId === selectedWorkspace ||
            selectedWorkspace?.createBy === user?.uid
        ) ? (
          <div
            onClick={() => setOpenInputAddListJobs(!openInputAddListJobs)}
            className="items-center"
            style={
              openInputAddListJobs ? { display: "none" } : { display: "flex" }
            }
          >
            <FontAwesomeIcon className="pr-2" icon={faPlus} />
            <h2>Thêm danh sách</h2>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CreateListJobs;
