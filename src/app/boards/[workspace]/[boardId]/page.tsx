"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import JobsGroup from "@/app/components/jobsgroup/jobsGroup";
import NavBar from "@/app/components/navbar/navbar";
import { useContext, useState } from "react";
import { handleDragAndDrop } from "@/firebase/service";
import CreateListJobs from "@/app/components/action/createListJobs/createListJobs";
import { ListJobsContext } from "@/context/ListJobsProvider";
import { BoardsContext } from "@/context/BoardsProvider";
import Header from "@/app/components/header/header";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import CreateWorkspace from "@/app/components/action/createWorkspace/createWorkspace";
import CreateBoards from "@/app/components/action/createBoards/createBoards";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import Sidebar from "@/app/components/sidebar/sidebar";

export default function BoardItem({ params } ) {
  const [openWidget, setOpenWidget] = useState<boolean>(false);
  const { workspace } = useContext(WorkSpaceContext);
  const { listJobs, setListJobs } = useContext(ListJobsContext);
  const { boards, setBoards, star, setStar } = useContext(BoardsContext);
  const handleUpdateStar = (selectedBoard: IBoards) => {
 
    setStar(!star);
    if (selectedBoard) {
      const itemRef = doc(db, "listBoards", selectedBoard.id);
      updateDoc(itemRef, { star: star });
      selectedBoard.star = star;
      setBoards((prevBoards) => [...prevBoards]); // Trigger re-render
    }
  };
  const listJobsOfBoard = listJobs.filter(
    (item) => item.boards === params.boardId
  );
  const selectedBoard = boards.find((board) => board.id === params.boardId);
  const boardTitle = selectedBoard ? selectedBoard.title : "";
  const workspaceTitle = workspace.find((item) => item.id === params.workspace);

  return (
    <div
      style={{ backgroundImage: `url(${selectedBoard?.background})` }}
      className="h-[100vh] bg-[#00000047] bg-cover bg-no-repeat over overflow-y-hidden"
    >
      <DragDropContext
        onDragEnd={(results) =>
          handleDragAndDrop(results, listJobsOfBoard, setListJobs)
        }
      >
        <Header />
        <div className="flex">
          <Sidebar
            openWidget={openWidget}
            setOpenWidget={setOpenWidget}
            workspaceTitle={workspaceTitle}
            selectedBoard={selectedBoard}
            params={params}
          />
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
                  className=" p-2 w-full bg-[#00000030] max-h-[calc(100vh-110px)] min-h-[calc(100vh-110px)] overflow-x-scroll flex items-start justify-start  md:max-w-[100vw]"
                >
                  {listJobsOfBoard?.map((listJob, index) => (
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
                          className="flex-[1] min-w-60 max-w-60 h-fit p-3 mb-4 font-semibold text-[#B6c2cf] bg-[#101204] mx-1 rounded-md w-60 text-sm "
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
                  <CreateListJobs
                    boardsId={params.boardId}
                    selectedWorkspace={workspaceTitle}
                    selectedBoards={selectedBoard}
                  />

                  {provided.placeholder}
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
