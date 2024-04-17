import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAngleDown,
  faAngleUp,
  faClipboard,
  faClipboardCheck,
  faGear,
  faHeart,
  faHome,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

function WorkSpace() {
  const [openItems, setOpenItems] = useState({});
  const { workspace, setOpenModalAddWOrkspace } = useContext(WorkSpaceContext);
  const locale= useLocale()
  const t = useTranslations("boardPage");

  // Hàm toggle chỉ mở rộng/collapse item được click
  const toggle = (itemId: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [itemId]: !prevOpenItems[itemId], // Đảo ngược trạng thái open của item được click
    }));
  };

  return (
    <div className=" flex-[1] max-[768px]:mx-3 max-[600px]:hidden overflow-x-hidden mt-[92px] h-[80vh] overflow-y-auto px-4">
      <ul className="text-[#9FaDBC] ">
        <li className="py-[10px] mb-1 hover:bg-[#333b44] rounded-md transition px-2 text-sm font-medium">
          <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faClipboard} />
          <span>{t("board")}</span>
        </li>
        <li className="py-[10px]  mb-1 hover:bg-[#333b44] rounded-md transition px-2 text-sm font-medium">
          <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faClipboardCheck} />
          <span>{t("templates")}</span>
        </li>
        <Link
          href={`/${locale}/boards/home`}
          className="py-[10px] block mb-1 hover:bg-[#333b44] rounded-md transition px-2 text-sm font-medium"
        >
          <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faHome} />
          <span>{t("home")}</span>
        </Link>
        <hr className="my-3"></hr>
      </ul>

      <div className="cursor-pointer">
        <div className="p-2 text-xs font-semibold flex item-center justify-between">
          <span>{t("workspace")}</span>
          <FontAwesomeIcon
            onClick={() => setOpenModalAddWOrkspace(true)}
            icon={faAdd}
          />
        </div>
        <div className="flex items-center flex-col justify-between">
          {workspace &&
            workspace.map((item) => (
              <div key={item.id} className="flex-col w-full mb-3">
                <div className="flex items-center mb-3 pr-4 justify-between md:w-full w-fit">
                  <span className="w-[26px] text-sm h-[26px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white flex items-center justify-center rounded-lg">
                    {item.title.charAt(0)?.toUpperCase()}
                  </span>
                  <span className="md:pr-[100px] pr-[25px] text-sm font-medium">
                    {item.title}
                  </span>
                  <FontAwesomeIcon
                    onClick={() => toggle(item.id)} // Truyền ID của item vào hàm toggle
                    icon={openItems[item.id] ? faAngleUp : faAngleDown} // Sử dụng trạng thái open của item
                  />
                </div>

                <div
                  style={
                    openItems[item.id] ? { height: "auto" } : { height: "1px" }
                  }
                  className="overflow-hidden"
                >
                  <Link
                    href={`/${locale}/boards/${item.id}`}
                    className="block py-1 mb-1 pr-2 pl-6 rounded-md overflow-hidden transition hover:bg-[#333c43]"
                  >
                    <FontAwesomeIcon className="w-4" icon={faClipboard} />
                    <span className="pl-2 text-sm">{t("board")}</span>
                  </Link>
                  <div className="py-1 mb-1 pr-2 pl-6 rounded-md overflow-hidden transition hover:bg-[#333c43]">
                    <FontAwesomeIcon className="w-4" icon={faHeart} />
                    <span className="pl-2 text-sm">{t("highlights")}</span>
                  </div>
                  <div className="py-1 mb-1 pr-2 pl-6 rounded-md overflow-hidden transition hover:bg-[#333c43]">
                    <FontAwesomeIcon className="w-4" icon={faImage} />
                    <span className="pl-2 text-sm">{t("image")}</span>
                  </div>
                  <div className="py-1 mb-1 pr-2 pl-6 rounded-md overflow-hidden transition hover:bg-[#333c43]">
                    <FontAwesomeIcon className="w-4" icon={faUser} />
                    <span className="pl-2 text-sm">{t("member")}</span>
                  </div>
                  <Link
                    href={`/${locale}/boards/${item.id}/setting`}
                    className="py-1 block mb-1 pr-2 pl-6 rounded-md overflow-hidden transition hover:bg-[#333c43]"
                  >
                    <FontAwesomeIcon className="w-4" icon={faGear} />
                    <span className="pl-2 text-sm">{t("setting")}</span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
