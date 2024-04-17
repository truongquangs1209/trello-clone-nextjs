"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBolt,
  faClipboardList,
  faEllipsis,
  faRocket,
  faUserAlt,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react";
import { useLocale, useTranslations } from "next-intl";

interface NavBarProps {
  boardTitle: string;
  openWidget: boolean;
  setOpenWidget: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBoard: IBoards;
  handleUpdateStar: () => any;
}

function NavBar({
  handleUpdateStar,
  boardTitle,
  openWidget,
  setOpenWidget,
  selectedBoard,
}: NavBarProps) {
  const locale = useLocale();
  const t = useTranslations("navbar");

  return (
    <div className="bg-[#00000087] w-full md:mt-[68px] mt-[45px] flex justify-between items-center py-3 pl-[10px] pr-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 max-[680px]:gap-2 mr-6 justify-center">
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
          <div className="w-20 h-8 text-white text-xs bg-[#122038] transition flex items-center fill justify-center rounded">
            <FontAwesomeIcon className="text-sm mr-1" icon={faClipboardList} />
            <span className="text-sm">{t("board")}</span>
          </div>
        </div>
        <div className="flex items-center max-[680px]:gap-[0.5rem] gap-5 mr-2">
          <Tippy
            placement="bottom"
            content={<span className="text-xs font-light">{t("addOns")}</span>}
          >
            <FontAwesomeIcon icon={faRocket} />
          </Tippy>
          <Tippy
            placement="bottom"
            content={
              <span className="text-xs font-light">{t("automation")}</span>
            }
          >
            <FontAwesomeIcon icon={faBolt} />
          </Tippy>
          <div className="w-20 h-8 text-white bg-[#122038] text-xs transition flex items-center fill justify-center rounded">
            <FontAwesomeIcon className="text-sm mr-1" icon={faUserAlt} />
            <span className="text-sm">{t("share")}</span>
          </div>
          <Tippy
            placement="bottom"
            content={<span className="text-xs font-light">{t("add")}</span>}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </Tippy>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
