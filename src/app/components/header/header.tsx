"use client";
import { AuthContext } from "@/context/AppProvider";
import { BoardsContext } from "@/context/BoardsProvider";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import {
  faCaretDown,
  faClipboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Search from "../search/search";

function Header() {
  const [openWidgetCreateNew, setOpenWidgetCreateNew] =
    useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { setOpenModalAddBoards } = useContext(BoardsContext);
  const { setOpenModalAddWOrkspace } = useContext(WorkSpaceContext);
  const photoURL = user ? user.photoURL : "";

  return (
    <div className="text-black bg-[#1d2125] fixed top-0 w-full flex p-2 items-center justify-between">
      <div className="flex">
        <Image
          priority
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
        <button
          className="relative text-[#1d2125] bg-[#579dff] hover:bg-[#85b8ff] transition h-[32px] text-sm font-semibold rounded-sm ml-6 px-3"
          onClick={() => setOpenWidgetCreateNew(!openWidgetCreateNew)}
        >
          Tạo mới
          <div
            style={
              openWidgetCreateNew ? { display: "block" } : { display: "none" }
            }
            className="absolute top-[120%]  overflow-hidden left-0 w-[304px] bg-[#282e33] h-fit rounded-lg"
          >
            <div
              onClick={() => setOpenModalAddBoards(true)}
              className="hover:bg-[#323940] mt-3 py-2 px-3 transition"
            >
              <div className="text-start flex items-center">
                <FontAwesomeIcon className="w-3 h-3 pr-1" icon={faClipboard} />
                <span className="text-sm font-normal">Tạo bảng</span>
              </div>
              <p className="text-[#9FADBC] font-extralight text-xs mt-1">
                Một bảng được tạo thành từ các thẻ được sắp xếp trong danh sách.
                Sử dụng bảng để quản lý các dự án, theo dõi thông tin, hoặc tổ
                chức bất cứ việc gì.
              </p>
            </div>
            <div
              onClick={() => setOpenModalAddWOrkspace(true)}
              className="hover:bg-[#323940] mt-3 py-2 px-3 transition"
            >
              <div className="text-start">
                <FontAwesomeIcon className="w-3 h-3 pr-1" icon={faUser} />
                <span className="text-sm font-normal">
                  Tạo không gian làm việc
                </span>
              </div>
              <p className="text-[#9FADBC] font-extralight text-xs mt-1">
                Một Không gian làm việc là tập hợp các bảng và mọi người. Sử
                dụng Không gian làm việc để tổ chức công ty của bạn, hỗ trợ
                người bận rộn, gia đình hoặc bạn bè.
              </p>
            </div>
          </div>
        </button>
      </div>
      <div className="flex items-center">
        <Search/>
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
