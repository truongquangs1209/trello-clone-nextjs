"use client";
import { useDataFetching } from "@/app/hook/useFirestore";
import React, { createContext, useState } from "react";

interface BoardsContextValue {
  boards: IBoards[];
  openModalAddBoards: boolean;
  setOpenModalAddBoards: React.Dispatch<React.SetStateAction<boolean>>;
  setBoards: React.Dispatch<React.SetStateAction<IBoards[]>>;
}

export const BoardsContext = createContext<BoardsContextValue | undefined>(
  undefined
);

function BoardsProvider({ children }) {
  const [openModalAddBoards, setOpenModalAddBoards] = useState<boolean>(false);
  const [boards, setBoards] = useState<IBoards[]>([]);
  useDataFetching(setBoards, "listBoards");

  return (
    <BoardsContext.Provider
      value={{
        boards,
        setBoards,
        openModalAddBoards,
        setOpenModalAddBoards,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export default BoardsProvider;
