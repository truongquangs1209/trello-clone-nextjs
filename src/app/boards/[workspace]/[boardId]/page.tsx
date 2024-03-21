"use client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import JobsGroup from "@/app/components/jobsGroup";
import NavBar from "@/app/components/navbar";
import { useContext } from "react";
import { AuthContext, UserListsContext } from "@/context/AppProvider";
import { handleDragAndDrop } from "@/firebase/service";
import CreateListJobs from "@/app/components/createListJobs/createListJobs";
import { ListJobsContext } from "@/context/ListJobsProvider";
import { BoardsContext } from "@/context/BoardsProvider";

export default function BoardItem({ params }) {
  const { user } = useContext(AuthContext);
  const { members } = useContext(UserListsContext);
  const email = user ? user.email : "";

  const { listJobs, setListJobs } = useContext(ListJobsContext);

  const listJobsOfBoard = listJobs.filter(
    (item) => item.boards === params.boardId
  );
  const { boards } = useContext(BoardsContext);
  const selectedBoard = boards.find((board) => board.id === params.boardId);
  console.log(selectedBoard);
  const boardTitle = selectedBoard ? selectedBoard.title : "";
  return (
    <div
      style={{ backgroundImage: `url(${selectedBoard?.background})` }}
      className="h-[100vh] bg-cover bg-no-repeat"
    >
      <DragDropContext
        onDragEnd={(results) =>
          handleDragAndDrop(results, listJobs, setListJobs)
        }
      >
        <NavBar boardTitle={boardTitle} />
        <Droppable droppableId="ROOT" type="group" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" mt-4 flex flex-wrap"
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
      </DragDropContext>
    </div>
  );
}
