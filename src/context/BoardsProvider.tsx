"use client";
import { useDataFetching } from "@/app/hook/useDataFetching";
import React, { createContext, useState } from "react";

interface BoardsContextValue {
  boards: IBoards[];
  star: boolean;
  openModalAddBoards: boolean;
  setStar: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalAddBoards: React.Dispatch<React.SetStateAction<boolean>>;
  setBoards: React.Dispatch<React.SetStateAction<IBoards[]>>;
}

export const BoardsContext = createContext<BoardsContextValue | undefined>(
  undefined
);

function BoardsProvider({ children }) {
  const [openModalAddBoards, setOpenModalAddBoards] = useState<boolean>(false);
  const [boards, setBoards] = useState<IBoards[]>([]);
  const [star, setStar] = useState<boolean>(false);
  useDataFetching(setBoards, "listBoards",null);

  return (
    <BoardsContext.Provider
      value={{
        boards,
        setBoards,
        star,
        setStar,
        openModalAddBoards,
        setOpenModalAddBoards,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export default BoardsProvider;
