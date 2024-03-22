"use client";
import { BoardsContext } from "@/context/BoardsProvider";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { useContext, useRef, useState } from "react";

function Search() {
  const inputRef = useRef();
  const { boards, setBoards } = useContext(BoardsContext);
  const [searchValue, setSearchValue] = useState("");

  const filterBoard = boards.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  return (
    <div>
      <Tippy
        visible={searchValue && boards.length > 0}
        interactive
        placement="right"
        render={(attrs) => (
          <div
            style={
              searchValue.length > 0
                ? { display: "block" }
                : { display: "none" }
            }
            className="fixed top-[10px] right-[10px] rounded-md bg-gray-500 w-[300px] mt-3 py-3"
          >
            <h2 className="text-xs font-semibold pl-2">KẾT QUẢ TÌM KIẾM</h2>
            {filterBoard &&
              filterBoard.map((item) => (
                <Link
                  className="flex items-center transition hover:bg-gray-600 px-2 py-2"
                  href={`/boards/${item.title}/${item.id}`}
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
        <div className="bg-transparent border border-solid border-[#738496] text-[#9FaDBC] w-[300px] h-8 flex items-center p-1 mr-2 rounded">
          <FontAwesomeIcon className="mx-2 text-[12px] " icon={faSearch} />
          <input
            ref={inputRef}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent w-full outline-none border-none text-[14px]"
            placeholder="Tìm kiếm..."
          />
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
