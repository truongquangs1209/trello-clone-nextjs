"use client";
import { AuthContext } from "@/context/AppProvider";
import {
  faArrowDown,
  faCaretDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function Header() {
  const { user } = useContext(AuthContext);
  const photoURL = user ? user.photoURL : "";

  return (
    <div className="text-black fixed top-0 w-full flex p-2 items-center justify-between">
      <div className="flex">
        <Image
          className="p-2"
          src="https://trello-clone-ruby.vercel.app/assets/trello-logo-blue.svg"
          alt=""
          width={100}
          height={18}
        />
        <div className="flex gap-2">
          <div className="p-2 font-medium text-[#9FaDBC] text-sm">
            <span className="mr-1">Không gian làm việc</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="p-2 font-medium text-[#9FaDBC] text-sm">
            <span className="mr-1">Gần đây</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="p-2 font-medium text-[#9FaDBC] text-sm">
            <span className="mr-1">Đánh dấu sao</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="p-2 font-medium text-[#9FaDBC] text-sm">
            <span className="mr-1">Mẫu</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
        </div>
        <button className="text-[#1d2125] font-medium bg-[#579dff] hover:bg-[#85b8ff] transition rounded-sm px-3">
          Tạo mới
        </button>
      </div>
      <div className="flex items-center">
        <div className="bg-transparent border border-solid border-[#738496] text-[#9FaDBC] w-[200px] h-8 flex items-center p-1 mr-2 rounded">
          <FontAwesomeIcon className="mx-2 text-[12px] " icon={faSearch} />
          <input
            className="bg-transparent w-full outline-none border-none text-[14px]"
            placeholder="Tìm kiếm..."
          />
        </div>
        <div className="flex items-center">
          <img
            src={photoURL}
            width={30}
            height={30}
            alt="Picture of the author"
            className="rounded-[50%] mr-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
