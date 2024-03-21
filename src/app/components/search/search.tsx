"use client";
import { BoardsContext } from "@/context/BoardsProvider";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
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
      <div className="bg-transparent border border-solid border-[#738496] text-[#9FaDBC] w-[300px] h-8 flex items-center p-1 mr-2 rounded">
        <FontAwesomeIcon className="mx-2 text-[12px] " icon={faSearch} />
        <input
          ref={inputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-transparent w-full outline-none border-none text-[14px]"
          placeholder="Tìm kiếm..."
        />
      </div>

      <Tippy interactive placement="right">
        <div>
          <h2>Kết quả tìm kiếm</h2>
          {filterBoard && filterBoard.map((item) => <h2>{item.title}</h2>)}
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
