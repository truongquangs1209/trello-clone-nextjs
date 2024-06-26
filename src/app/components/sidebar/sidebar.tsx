import { UserListsContext } from "@/context/AppProvider";
import { BoardsContext } from "@/context/BoardsProvider";
import {
  faAngleLeft,
  faCalendar,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import InviteMember from "../member/member";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

function Sidebar({
  openWidget,
  setOpenWidget,
  workspaceTitle,
  selectedBoard,
  params,
}) {
  const { userLists } = useContext(UserListsContext);
  const { boards } = useContext(BoardsContext);
  const userCreatedWorkspace = userLists.find(
    (item) => item.id === workspaceTitle?.createBy
  );
  const locale=useLocale()
  const t = useTranslations("sidebar")

  return (
    <div
      className={`${
        openWidget
          ? "w-[300px] flex relative md:mt-[68px] mt-[45px] flex-col  bg-[#1a1b23] h-[100vh] transition duration-300 ease-in-out"
          : "w-0 overflow-hidden"
      }`}
    >
      <FontAwesomeIcon
        onClick={() => setOpenWidget(false)}
        icon={faAngleLeft}
        style={{ display: openWidget ? "block" : "none" }}
        className=" overflow-visible hover:bg[#201b21] p-2 right-0 top-[3%] cursor-pointer absolute w-6 h-6 rounded"
      />
      <div className="flex max-[480px]:flex-col p-5 h-fit w-full items-center border-b">
        <span className="w-[32px] max-[480px]:m-0 text-sm h-[32px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white flex items-center justify-center rounded-lg">
          {workspaceTitle?.title.charAt(0)?.toUpperCase()}
        </span>
        <h2 className="text-xl max-[480px]:m-0 font-semibold ml-2">
          {workspaceTitle?.title}
        </h2>
      </div>
      <div className="overflow-hidden">
        <div className="hover:bg-slate-800 p-3 mt-4 transition">
          <FontAwesomeIcon className="w-4 h-4" icon={faClipboard} />
          <span className="text-sm font-normal p-2">{t('board')}</span>
        </div>
        <InviteMember
          selectedBoard={selectedBoard}
          selectedWorkspace={params?.workspace}
        />
        <div className=" p-3">
          <h3 className="text-sm mb-2">{t('createdBy')}</h3>
          <div className="flex">
            {userCreatedWorkspace?.photoURL ? (
              <img
                src={userCreatedWorkspace.photoURL}
                width={30}
                height={30}
                className="rounded-[50%] mr-2"
              />
            ) : (
              <span className="w-[28px] bg-[#172b4d] text-sm h-[28px] mr-3 font-semibold text-white flex items-center justify-center rounded-[50%]">
                {userCreatedWorkspace?.email.charAt(0)?.toUpperCase()}
              </span>
            )}
            <h3 className="text-sm ml-2">
              {userCreatedWorkspace?.displayName
                ? userCreatedWorkspace?.displayName
                : userCreatedWorkspace?.email}
            </h3>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold p-3">{t('view')}</h2>
        <div className="hover:bg-slate-800 p-3 italic transition">
          <FontAwesomeIcon className="w-4 h-4 " icon={faClipboard} />
          <span className="text-sm font-normal p-2">{t('board')}</span>
        </div>
        <div className="hover:bg-slate-800 p-3 py-2 italic transition">
          <FontAwesomeIcon className="w-4 h-4" icon={faCalendar} />
          <span className="text-sm font-normal p-2">{t('calendar')}</span>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold p-3">{t('yourBoard')}</h2>
        <div>
          {boards
            ?.filter(
              (board) => board.workspaceId === selectedBoard?.workspaceId
            )
            .map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/boards/${params.workspace}/${item.id}`}
                className="hover:bg-[#64676a] transition cursor-pointer flex items-center p-3 text-sm font-medium"
              >
                <div
                  className="w-7 h-6 mr-2 rounded bg-cover"
                  style={{ backgroundImage: `url(${item.background})` }}
                ></div>
                <span>{item.title}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
