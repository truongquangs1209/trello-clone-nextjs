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
import { usePathname } from "next/navigation";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState, useTransition } from "react";
import Search from "../search/search";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";

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
  const [isPending, starTransition] = useTransition();
  const localActive = useLocale();
  const pathname = usePathname();
  const t = useTranslations("header");
  const handleSelectLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    starTransition(() => {
      const updatePathname = pathname.replace(pathname.slice(1, 3), nextLocale);
      router.replace(`${updatePathname}`);
    });
  };

  const handleUpdateStar = (itemStar: IBoards) => {
    const itemRef = doc(db, "listBoards", itemStar.id);
    updateDoc(itemRef, { star: !itemStar.star });
  };

  return (
    <div className="text-black bg-[#1a1b23] fixed z-10 top-0 w-full flex p-2 items-center justify-between">
      <div className="flex items-center">
        <Link href={`/${localActive}/boards`}>
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
            style={{ backgroundColor: openWidget ? "#333c44" : "transparent" }}
            onClick={() => setOpenWidget(!openWidget)}
            className="flex py-[6px] pr-[10px] pl-3 rounded ml-3 items-center cursor-pointer md:hidden"
          >
            <h2 className="mr-1 text-sm font-semibold">{t("more")}</h2>
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
                    {t("workspaceTippy")}
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
                <span className="mr-1">{t("workspace")}</span>
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
                    {t("recentboardsTippy")}
                  </h1>
                  {boards &&
                    boards.slice(0, 5).map((item) => (
                      <Link
                        key={item.id}
                        href={`/${localActive}/boards/${item.workspaceId}/${item.id}`}
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
                <span className="mr-1">{t("recentboards")}</span>
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
                    {t("starredboardsTippy")}
                  </h1>
                  {boards
                    ?.filter((boards) => boards.star === true)
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/${localActive}/boards/${item.workspaceId}/${item.id}`}
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
                <span className="mr-1">{t("starredboards")}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </Tippy>
            <Tippy
              interactive
              placement="bottom"
              zIndex={10}
              theme="light"
              content={<span>{t("templatesTippy")}</span>}
            >
              <div className="p-2 flex rounded-md items-center justify-between hover:bg-[#323940] transition font-medium text-[#9FaDBC] text-sm">
                <span className="mr-1">{t("templates")}</span>
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
          <span className="text-[#1d2125] hidden md:block">
            {t("createbtn")}
          </span>
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
                <span className="text-sm font-normal">{t("createBoards")}</span>
              </div>
              <p className="text-[#9FADBC] font-extralight text-xs mt-1">
                {t("createBoardsDesc")}
              </p>
            </div>
            <div
              onClick={() => setOpenModalAddWOrkspace(true)}
              className="hover:bg-[#323940] mt-3 py-2 px-3 transition"
            >
              <div className="text-start">
                <FontAwesomeIcon className="w-3 h-3 pr-1" icon={faUser} />
                <span className="text-sm font-normal">
                  {t("createWorkspace")}
                </span>
              </div>
              <p className="text-[#9FADBC] font-extralight text-xs mt-1">
                {t("createWorkspaceDesc")}
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
              router.push(`/${localActive}/login`);
            }}
          >
            {t("logout")}
          </button>
          <select
            className="text-[12px] p-1 ml-[6px] border border-solid border-[#ccc] bg-transparent"
            id="languageSelect"
            defaultValue={localActive}
            onChange={handleSelectLanguageChange}
            disabled={isPending}
          >
            <option value="vi">VN</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
