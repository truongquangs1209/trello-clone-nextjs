"use client";
import React, { useContext, useEffect, useState } from "react";
import { Form, Modal, Select, Avatar, Tooltip } from "antd";
import { AuthContext } from "@/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { auth } from "@/firebase/config";
import InviteMember from "./member";

function NavBar() {
  const { user } = useContext(AuthContext);
  const displayName = user ? user.displayName : "";
  const photoURL = user ? user.photoURL : "";
  
  return (

    <div className="bg-[#0000003d] flex justify-between items-center py-3 pl-[10px] pr-4">
      <div className="flex">
        <div className="flex items-center mr-6 justify-center">
          <h1 className="pr-2 font-extrabold text-[20px]">My Trello</h1>
          <FontAwesomeIcon icon={faStar} />
        </div>
        <InviteMember/>
      </div>
      <div className="flex items-center ">
        
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
        <button
          className="text-[12px] p-1 h-fit ml-[6px] border border-solid border-[#ccc]"
          onClick={() => {
            auth.signOut();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
