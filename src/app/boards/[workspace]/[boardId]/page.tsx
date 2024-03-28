"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import JobsGroup from "@/app/components/jobsGroup";
import NavBar from "@/app/components/navbar";
import { useContext, useState } from "react";
import { AuthContext, UserListsContext } from "@/context/AppProvider";
import { handleDragAndDrop } from "@/firebase/service";
import CreateListJobs from "@/app/components/action/createListJobs/createListJobs";
import { ListJobsContext } from "@/context/ListJobsProvider";
import { BoardsContext } from "@/context/BoardsProvider";
import Header from "@/app/components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCalendar,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import InviteMember from "@/app/components/member";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import CreateWorkspace from "@/app/components/action/createWorkspace/createWorkspace";
import CreateBoards from "@/app/components/action/createBoards/createBoards";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import { Avatar } from "antd";

export default function BoardItem({ params }) {
  const { userLists, members } = useContext(UserListsContext);
  const [openWidget, setOpenWidget] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const { workspace } = useContext(WorkSpaceContext);
  const { listJobs, setListJobs } = useContext(ListJobsContext);
  const { boards, setBoards, star, setStar } = useContext(BoardsContext);
  // console.log(listJobs);
  const handleUpdateStar = (selectedBoard: IBoards) => {
    setStar(!star);

    if (selectedBoard) {
      const itemRef = doc(db, "listBoards", selectedBoard.id);
      updateDoc(itemRef, { star: star });
      selectedBoard.star = star;
      setBoards((prevBoards) => [...prevBoards]); // Trigger re-render
    }
  };
  const email = user?.email;
  const listJobsOfBoard = listJobs.filter(
    (item) => item.boards === params.boardId
  );
  const selectedBoard = boards.find((board) => board.id === params.boardId);
  const boardTitle = selectedBoard ? selectedBoard.title : "";
  const workspaceTitle = workspace.find((item) => item.id === params.workspace);
  const checkUser = members.filter(
    (item) => item.workspaceId === params.workspace
  );
  // console.log(checkUser);
  const userCreatedWorkspace = userLists.find(
    (item) => item.id === workspaceTitle.createBy
  );
  return (
    <div
      style={{ backgroundImage: `url(${selectedBoard?.background})` }}
      className="h-[100vh] bg-cover bg-no-repeat over overflow-y-hidden"
    >
      <DragDropContext
        onDragEnd={(results) =>
          handleDragAndDrop(results, listJobsOfBoard, setListJobs)
        }
      >
        <Header />
        <div className="flex bg-[#00000047]">
          <div
            style={{
              width: openWidget ? "300px" : "0px",
              transform: openWidget ? "translateX(0)" : "translateX(-300px)",
            }}
            className="flex relative mt-[52px] flex-col w-[300px] bg-[#221d24] h-[100vh]"
          >
            <FontAwesomeIcon
              onClick={() => setOpenWidget(false)}
              icon={faAngleLeft}
              className="bg-[#221d24] overflow-visible hover:bg[#201b21] p-2 right-0 top-[3%] cursor-pointer absolute w-4 h-4 rounded"
            />
            <div className="flex p-5 h-fit w-full items-center border-b">
              <span className="w-[32px] text-sm h-[32px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white flex items-center justify-center rounded-lg">
                {workspaceTitle?.title.charAt(0)?.toUpperCase()}
              </span>
              <h2 className="text-xl font-semibold ml-2">
                {workspaceTitle?.title}
              </h2>
            </div>
            <div>
              <div className="hover:bg-slate-800 p-3 mt-4 transition">
                <FontAwesomeIcon className="w-4 h-4" icon={faClipboard} />
                <span className="text-sm font-normal p-2">Bảng</span>
              </div>
              <InviteMember
                selectedBoard={selectedBoard}
                selectedWorkspace={params?.workspace}
              />
              <div className=" p-3">
                <h3 className="text-sm mb-2">Được tạo bởi</h3>
                <div className="flex">
                  {userCreatedWorkspace?.photoURL ? (
                    <Avatar
                      size="small"
                      src={userCreatedWorkspace?.photoURL}
                    ></Avatar>
                  ) : (
                    <span className="w-[23px] text-sm h-[23px] mr-3 font-semibold text-white flex items-center justify-center rounded-[50%]">
                      {userCreatedWorkspace?.email.charAt(0)?.toUpperCase()}
                    </span>
                  )}
                  <h3 className="text-sm ml-2">
                    {userCreatedWorkspace?.displayName
                      ? userCreatedWorkspace?.displayName
                      : userCreatedWorkspace?.email}
                  </h3>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold p-3">
                Các dạng xem của bạn
              </h2>
              <div className="hover:bg-slate-800 p-3 italic transition">
                <FontAwesomeIcon className="w-4 h-4 " icon={faClipboard} />
                <span className="text-sm font-normal p-2">Bảng</span>
              </div>
              <div className="hover:bg-slate-800 p-3 py-2 italic transition">
                <FontAwesomeIcon className="w-4 h-4" icon={faCalendar} />
                <span className="text-sm font-normal p-2">Lịch</span>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold p-3">Các bảng của bạn</h2>
              <div>
                {boards
                  ?.filter(
                    (board) => board.workspaceId === selectedBoard?.workspaceId
                  )
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={`/boards/${params.workspace}/${item.id}`}
                      className="hover:bg-[#64676a] transition cursor-pointer flex items-center p-3 text-sm font-medium"
                    >
                      <div
                        className="w-7 h-6 mr-2 rounded bg-cover"
                        style={{ backgroundImage: `url(${item.background})` }}
                      ></div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <NavBar
              handleUpdateStar={() => handleUpdateStar(selectedBoard)}
              selectedBoard={selectedBoard}
              boardTitle={boardTitle}
              openWidget={openWidget}
              setOpenWidget={setOpenWidget}
            />
            <Droppable droppableId="ROOT" type="group" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className=" flex flex-wrap my-7"
                >
                  {members.some((member) => member.email === email) &&
                    listJobsOfBoard?.map((listJob, index) => (
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
                  <CreateListJobs
                    boardsId={params.boardId}
                    selectedWorkspace={workspaceTitle}
                  />
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
      <CreateBoards />
      <CreateWorkspace />
    </div>
  );
}
