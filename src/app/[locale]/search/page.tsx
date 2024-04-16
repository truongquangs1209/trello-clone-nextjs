"use client";
import { useContext, useRef, useState } from "react";
import Header from "@/app/components/header/header";
import { BoardsContext } from "@/context/BoardsProvider";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const { boards } = useContext(BoardsContext);
  const locale = useLocale()
  const filterBoard = boards.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );
  const t = useTranslations("searchPage");
  const resultMessage = searchValue
    ? `${t("searchResult")}`
    : `${t("recentboards")}`;

  return (
    <div>
      <Header />
      <div className="mt-[90px] flex flex-col px-[70px]">
        <h2 className="text-2xl font-semibold mb-5">{t("searchTitle")}</h2>
        <input
          value={searchValue}
          ref={inputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          className="  text-xs py-2 mb-3 px-3 h-9 bg-transparent outline-none border-[1px] border-solid  border-[#ccc] text-[14px]"
          placeholder={t("searchPlaceholder")}
        />
        <h2 className="text-base font-medium mb-5">{resultMessage}</h2>
        {filterBoard?.slice(0, 8).map((item) => (
          <Link
            className="flex items-center transition hover:bg-gray-600 px-2 py-2"
            href={`/${locale}/boards/${item.workspaceId}/${item.id}`}
            key={item.id}
          >
            <div
              style={{ backgroundImage: `url(${item.background})` }}
              className="w-8 h-8 rounded mr-3 bg-contain"
            ></div>
            <h2 className="text-xs font-normal">{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
