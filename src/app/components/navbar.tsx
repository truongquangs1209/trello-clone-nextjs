"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faClipboardList,
  faUser,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface NavBarProps {
  boardTitle: string;
  openWidget: boolean;
  setOpenWidget: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBoard: IBoards;
  handleUpdateStar: () => void;
}

function NavBar({
  handleUpdateStar,
  boardTitle,
  openWidget,
  setOpenWidget,
  selectedBoard,
}: NavBarProps) {
  return (
    <div className="bg-[#00000087] w-full mt-[52px] flex justify-between items-center py-3 pl-[10px] pr-4">
      <div className="flex">
        <div className="flex items-center gap-4 mr-6 justify-center">
          <FontAwesomeIcon
            style={{ display: openWidget ? "none" : "block" }}
            onClick={() => setOpenWidget(true)}
            className="hover:bg-[#ccc] w-4 h-4 p-1 border rounded-[50%]"
            icon={faAngleRight}
          />
          <h1 className="pr-2 font-extrabold text-[20px]">{boardTitle}</h1>
          <FontAwesomeIcon
            onClick={() => handleUpdateStar()}
            icon={selectedBoard?.star ? solidStar : regularStar}
          />
          <FontAwesomeIcon className="" icon={faUser} />
          <div className="w-20 h-8 text-[#172b4d] flex items-center fill justify-center bg-[#DFe1e6] rounded">
            <FontAwesomeIcon className="text-sm mr-1" icon={faClipboardList} />
            <span className="text-sm">Bảng</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
