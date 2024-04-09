"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "@/app/components/header/header";
import { useContext } from "react";
import WorkSpace from "@/app/components/workspace/workspace";
import CreateWorkspace from "@/app/components/action/createWorkspace/createWorkspace";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import CreateBoards from "@/app/components/action/createBoards/createBoards";
import { BoardsContext } from "@/context/BoardsProvider";
import { faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import BoardShortcut from "@/app/components/boardItem/boardItem";

function Board({ params }) {
  const { workspace } = useContext(WorkSpaceContext);
  const { boards } = useContext(BoardsContext);
  const { openModalAddBoards, setOpenModalAddBoards } =
    useContext(BoardsContext);

  const selectWorkspace = workspace.find(
    (item) => item.id === params.workspace
  );

  return (
    <div className="w-full">
      <CreateWorkspace />
      <Header />
      <div>
        <div className="flex text-black m-auto w-[80%] mb-14">
          <WorkSpace />
          <div className="flex-[3] mt-[92px]  px-4">
            <div className="flex gap-3 p-8 items-center">
              <span className="w-[60px] text-[35px] font-bold text-[#1d2125] h-[60px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center rounded">
                {params.workspace.charAt(0)?.toUpperCase()}
              </span>
              <div>
                <h2 className="text-xl font-medium">{selectWorkspace?.title}</h2>
                <p className="text-xs font-light">
                  {selectWorkspace?.description}
                </p>
              </div>
            </div>
            <hr className="h-[1px] w-full my-4 bg-[#333c44]" />
            <div className="pb-[40px]">
              <div className="py-[10px] pb-5 flex items-center text-base font-bold">
                <FontAwesomeIcon className="pr-3 w-6 h-6" icon={faStar} />
                <span>Bảng đánh dấu sao</span>
              </div>
              <div className="flex gap-5">
                {boards &&
                  boards
                    .filter((board) => board.star === true)
                    .map((item) => (
                      <BoardShortcut
                      boardItem={item}
                        key={item.id}
                        href={`/boards/${item.title}/${item.id}`}
                        background={item.background}
                        title={item.title}
                      />
                    ))}
              </div>
            </div>
            <CreateBoards />
            <div>
              <div className="flex items-center">
                <FontAwesomeIcon className="pr-3 w-5 h-5" icon={faUser} />
                <h1 className="my-5 font-bold text-base">CÁC BẢNG CỦA BẠN</h1>
              </div>
              <div className="flex gap-5">
                {boards
                  ?.filter((board) => board.workspaceId === params.workspace)
                  .map((item) => (
                    <BoardShortcut
                    boardItem={item}
                      key={item.id}
                      href={`/boards/${item.title}/${item.id}`}
                      background={item.background}
                      title={item.title}
                    />
                  ))}
                <div
                  onClick={() => setOpenModalAddBoards(!openModalAddBoards)}
                  style={
                    boards.filter(
                      (board) => board.workspaceId === params.workspace
                    ).length >= 8
                      ? { display: "none" }
                      : { display: "flex" }
                  }
                  className="select-none  rounded text-sm text-[#b6c2cf] flex items-center justify-center w-[195px] cursor-pointer hover:bg-[#333b44] transition h-[96px] bg-[#272d33]"
                >
                  Tạo bảng mới
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;