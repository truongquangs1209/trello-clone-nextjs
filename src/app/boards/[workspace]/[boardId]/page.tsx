"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import JobsGroup from "@/app/components/jobsGroup";
import NavBar from "@/app/components/navbar";
import { useContext, useState } from "react";
import { AuthContext, UserListsContext } from "@/context/AppProvider";
import { handleDragAndDrop } from "@/firebase/service";
import CreateListJobs from "@/app/components/createListJobs/createListJobs";
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

export default function BoardItem({ params }) {
  const { user } = useContext(AuthContext);
  const [openWidget, setOpenWidget] = useState<boolean>(true);
  const { members } = useContext(UserListsContext);
  const email = user ? user.email : "";

  const { listJobs, setListJobs } = useContext(ListJobsContext);

  const listJobsOfBoard = listJobs.filter(
    (item) => item.boards === params.boardId
  );
  const { boards } = useContext(BoardsContext);
  const selectedBoard = boards.find((board) => board.id === params.boardId);
  const boardTitle = selectedBoard ? selectedBoard.title : "";
  return (
    <div
      style={{ backgroundImage: `url(${selectedBoard?.background})` }}
      className="h-[100vh]  bg-cover bg-no-repeat over overflow-y-hidden"
    >
      <DragDropContext
        onDragEnd={(results) =>
          handleDragAndDrop(results, listJobs, setListJobs)
        }
      >
        <Header />
        <div className="flex bg-[#00000047]">
          <div
            style={{
              width: openWidget ? "300px" : "0px",
              transform: openWidget ? "translateX(0)" : "translateX(-200px)",
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
                {params.workspace.charAt(0)?.toUpperCase()}
              </span>
              <h2 className="text-sm font-normal ml-2">{params.workspace}</h2>
            </div>
            <div>
              <div className="hover:bg-slate-800 p-3 mt-4 transition">
                <FontAwesomeIcon className="w-4 h-4" icon={faClipboard} />
                <span className="text-sm font-normal p-2">Bảng</span>
              </div>
              <InviteMember />
            </div>
            <div>
              <h2 className="text-sm font-semibold p-3">
                Các dạng xem của bạn
              </h2>
              <div className="hover:bg-slate-800 p-3 italic transition">
                <FontAwesomeIcon className="w-4 h-4" icon={faClipboard} />
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
                {boards &&
                  boards
                    .filter(
                      (board) => board.workspaceId === selectedBoard.workspaceId
                    )
                    .map((item) => (
                      <div className="hover:bg-[#64676a] transition cursor-pointer flex items-center p-3 text-sm font-medium">
                        <div
                          className="w-7 h-6 mr-2 rounded bg-cover"
                          style={{ backgroundImage: `url(${item.background})` }}
                        ></div>
                        <span>{item.title}</span>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <NavBar
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
                  {listJobs &&
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
                  <CreateListJobs boardsId={params.boardId} />
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
