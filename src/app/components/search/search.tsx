"use client";
import { BoardsContext } from "@/context/BoardsProvider";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";

function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { boards } = useContext(BoardsContext);
  const [searchValue, setSearchValue] = useState<string>("");

  const filterBoard = boards.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  const handleClearInput = () => {
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div>
      <Tippy
        visible={searchValue && boards.length > 0}
        interactive
        placement="right"
        render={() => (
          <div
            style={
              searchValue.length > 0
                ? { display: "block" }
                : { display: "none" }
            }
            className="fixed top-[10px] right-[10px] rounded-md bg-gray-800 w-[300px] mt-3 py-3"
          >
            <h2 className="text-xs font-semibold pl-2 mb-2">
              Kết quả tìm kiếm
            </h2>
            {filterBoard &&
              filterBoard.map((item) => (
                <Link
                  className="flex items-center transition hover:bg-gray-600 px-2 py-2"
                  href={`/boards/${item.workspaceId}/${item.id}`}
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
        )}
      >
        <div className="bg-transparent border border-solid border-[#738496] text-[#9FaDBC] w-fit md:w-[300px] h-8 flex items-center justify-between max-[600px]:border-none p-1 mr-2 rounded">
          <div>
            <FontAwesomeIcon
              onClick={() => router.push("/search")}
              className="mx-2 text-[12px] "
              icon={faSearch}
            />
            <input
              value={searchValue}
              ref={inputRef}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent max-[600px]:hidden text-xs w-fit outline-none border-none text-[14px]"
              placeholder="Tìm kiếm..."
            />
          </div>
          <div
            style={{ visibility: searchValue ? "visible" : "hidden" }}
            className="flex max-[600px]:hidden items-center justify-center rounded-[50%]"
          >
            <FontAwesomeIcon
              onClick={() => handleClearInput()}
              className="mr-2 w-3 h-3 p-1"
              icon={faClose}
            />
          </div>
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
