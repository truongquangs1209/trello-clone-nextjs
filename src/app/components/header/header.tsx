"use client";
import { AuthContext } from "@/context/AppProvider";
import { BoardsContext } from "@/context/BoardsProvider";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import {
  faAngleDown,
  faClipboard,
  faStar as solidStar,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Search from "../search/search";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

function Header() {
  const [openWidgetCreateNew, setOpenWidgetCreateNew] =
    useState<boolean>(false);
  const [openWidget, setOpenWidget] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { workspace, setOpenModalAddWOrkspace } = useContext(WorkSpaceContext);
  const { boards, setOpenModalAddBoards } = useContext(BoardsContext);
  const photoURL = user ? user.photoURL : "";
  const displayName = user ? user.displayName : "";
  const email = user ? user.email : "";
  const router = useRouter();

  const handleUpdateStar = (itemStar: IBoards) => {
    const itemRef = doc(db, "listBoards", itemStar.id);
    updateDoc(itemRef, { star: !itemStar.star });
  };

  return (
    <div className="text-black bg-[#1d2125] fixed top-0 w-full flex p-2 items-center justify-between">
      <div className="flex items-center">
        <Link href={"/boards"}>
          <Image
            priority
            
            src="https://trello-clone-ruby.vercel.app/assets/trello-logo-blue.svg"
            alt=""
            width={100}
            height={18}
          />
        </Link>
        <div className="relative ">
          <div
            onClick={() => setOpenWidget(!openWidget)}
            className="flex ml-3 items-center cursor-pointer md:hidden"
          >
            <h2 className="mr-1 text-sm font-semibold">Thêm</h2>
            <FontAwesomeIcon className="w-3" icon={faAngleDown} />
          </div>

          <div
            className={`cursor-pointer gap-2 md:sticky absolute rounded-md top-[40px] p-2 md:flex flex-col md:flex-row md:bg-transparent bg-[#282e33] w-[200px] md:w-auto ${
              openWidget ? "flex" : "hidden"
            }`}
          >
            <Tippy
              interactive
              placement="right"
              theme="light"
              content={
                <div>
                  <h1 className="my-4 mt-5 mb-2 text-xs font-semibold">
                    Các không gian làm việc của bạn
                  </h1>
                  {workspace &&
                    workspace.map((item) => (
                      <div key={item.id} className="flex-col w-full mb-3">
                        <div className="flex items-center mb-3 pr-4 justify-between w-full">
                          <span className="w-[40px] text-sm h-[40px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white flex items-center justify-center rounded-lg">
                            {item.title.charAt(0)?.toUpperCase()}
                          </span>
                          <span className="pr-[100px] text-sm font-semibold">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              }
            >
              <div className="p-2 flex items-center justify-between hover:bg-[#323940] transition rounded-md font-medium text-[#9FaDBC] text-sm">
                <span className="mr-1">Không gian làm việc</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </Tippy>
            <Tippy
              interactive
              placement="bottom"
              zIndex={10}
              theme="light"
              content={
                <div>
                  <h1 className="mb-2 text-xs font-semibold">
                    Các bảng gần đây
                  </h1>
                  {boards &&
                    boards.slice(0, 5).map((item) => (
                      <Link
                        key={item.id}
                        href={`/boards/${item.workspaceId}/${item.id}`}
                        className="hover:bg-[#64676a] transition cursor-pointer flex items-center p-2 text-sm font-medium"
                      >
                        <div
                          className="w-10 h-8 mr-2 rounded bg-cover"
                          style={{ backgroundImage: `url(${item.background})` }}
                        ></div>
                        <span>{item.title}</span>
                      </Link>
                    ))}
                </div>
              }
            >
              <div className="p-2 flex items-center rounded-md justify-between hover:bg-[#323940] transition overflow-hidden font-medium text-[#9FaDBC] text-sm">
                <span className="mr-1">Gần đây</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </Tippy>
            <Tippy
              interactive
              placement="bottom"
              zIndex={10}
              theme="light"
              content={
                <div className="w-[290px] py-3">
                  <h1 className="mb-2 text-xs font-semibold">
                    Các bảng đã đánh dấu sao
                  </h1>
                  {boards
                    ?.filter((boards) => boards.star === true)
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/boards/${item.workspaceId}/${item.id}`}
                        className="hover:bg-[#64676a] transition cursor-pointer px-2 flex items-center py-2 justify-between text-sm font-medium"
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="w-10 h-8 mr-2 rounded bg-cover"
                            style={{
                              backgroundImage: `url(${item.background})`,
                            }}
                          ></div>
                          <span>{item.title}</span>
                        </div>
                        <FontAwesomeIcon
                          onClick={() => handleUpdateStar(item)}
                          icon={item.star ? solidStar : regularStar}
                        />
                      </Link>
                    ))}
                </div>
              }
            >
              <div className="p-2 flex items-center rounded-md justify-between hover:bg-[#323940] transition font-medium text-[#9FaDBC] text-sm">
                <span className="mr-1">Đánh dấu sao</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </Tippy>
            <Tippy
              interactive
              placement="bottom"
              zIndex={10}
              theme="light"
              content={<span>Không có mẫu nào</span>}
            >
              <div className="p-2 flex rounded-md items-center justify-between hover:bg-[#323940] transition font-medium text-[#9FaDBC] text-sm">
                <span className="mr-1">Mẫu</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </Tippy>
          </div>
        </div>

        <button
          className="relative bg-[#579dff] hover:bg-[#85b8ff] transition h-[32px] text-sm font-semibold rounded-sm ml-6 px-3"
          onClick={() => setOpenWidgetCreateNew(!openWidgetCreateNew)}
        >
          <FontAwesomeIcon className="md:hidden block" icon={faPlus} />
          <span className="text-[#1d2125] hidden md:block">Tạo mới</span>
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
        {/* Search */}
        <Search />
        <div className="flex items-center ">
          <div className="flex items-center">
            {photoURL ? (
              <img
                src={photoURL}
                width={30}
                height={30}
                className="rounded-[50%] mr-2"
              />
            ) : (
              <span className="w-[28px] text-sm h-[28px] mr-3 rounded-[50%] font-semibold bg-[#172b4d] text-white flex items-center justify-center">
                {email?.charAt(0)?.toUpperCase()}
              </span>
            )}
            <h2 className="text-[12px] hidden md:block">
              {displayName ? displayName : email}
            </h2>
          </div>
          <button
            className="text-[12px] p-1 h-fit ml-[6px] border border-solid border-[#ccc]"
            onClick={() => {
              auth.signOut();
              router.push("/login");
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
