"use client";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { AuthContext } from "@/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const { user } = useContext(AuthContext);
  const displayName = user ? user.displayName : "";
  const photoURL = user ? user.photoURL : "";
  return (
    <div className="bg-[#0000003d] flex justify-between items-center py-3 pl-[10px] pr-4">
      <div className="flex items-center justify-center">
        <h1 className="pr-2">My Trello</h1>
        <FontAwesomeIcon icon={faStar}/>
      </div>
      <div>
        <div className="flex items-center">
          <img
            src={photoURL}
            width={30}
            height={30}
            alt="Picture of the author"
            className="rounded-[50%] mr-2"
          />
          <h2 className="text-[12px]">{displayName}</h2>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
