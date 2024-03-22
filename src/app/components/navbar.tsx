"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faClipboardList,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "@/firebase/config";

interface NavBarProps {
  boardTitle: string;
  openWidget: boolean;
  setOpenWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar({ boardTitle, openWidget, setOpenWidget }: NavBarProps) {
  const { user } = useContext(AuthContext);
  const displayName = user ? user.displayName : "";
  const photoURL = user ? user.photoURL : "";

  return (
    <div className="bg-[#00000087] w-full mt-[52px] flex justify-between items-center py-3 pl-[10px] pr-4">
      <div className="flex">
        <div className="flex items-center gap-4 mr-6 justify-center">
          <FontAwesomeIcon
            style={{ display: openWidget ? "none" : "block" }}
            onClick={() => setOpenWidget(true)}
            className="hover:bg-[#ccc] w-4 h-4 p-1  border rounded-[50%]"
            icon={faAngleRight}
          />
          <h1 className="pr-2 font-extrabold text-[20px]">{boardTitle}</h1>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon className="" icon={faUser} />
          <div className="w-20 h-8 text-[#172b4d] flex items-center justify-center bg-[#DFe1e6] rounded">
            <FontAwesomeIcon className="text-sm mr-1" icon={faClipboardList} />
            <span className="text-sm">Bảng</span>
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <div className="flex items-center">
          <img
            src={photoURL}
            width={30}
            height={30}
            alt="Picture of the author"
            className="rounded-[50%] mr-2"
          />
          <h2 className="text-[12px]">{displayName}</h2>
        </div>
        <button
          className="text-[12px] p-1 h-fit ml-[6px] border border-solid border-[#ccc]"
          onClick={() => {
            auth.signOut();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
