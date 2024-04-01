"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  return (
    <div className="h-[100vh]">
      <header className="fixed w-full bg-white shadow-md flex items-center justify-between h-[68px] px-[48px]">
        <Image
          src="https://trello-clone-ruby.vercel.app/assets/trello-logo-blue.svg"
          alt=""
          width={117.5}
          height={40}
        />

        <div className=" h-full flex items-center">
          <Link
            href={"/login"}
            className="hover:bg-[#e2e8f0] transition p-[20px] text-[18px] text-black"
          >
            Log in
          </Link>
          <button
            onClick={() => router.push("/register")}
            className="hover:bg-[#3b82f6] text-white bg-[#2563eb] px-[20px] h-full text-[18px]"
          >
            Get Trello for free
          </button>
        </div>
      </header>
      <div className="h-[100vh] bg-gradient-to-r from-purple-600 to-pink-500 md:mt-0 w-full container mx-auto px-10 md:px-20 grid grid-cols-2 row-auto">
        <div className="max-w-[600px] md:col-span-1 col-span-2 md:text-left text-center flex items-center justify-center flex-col">
          <h1 className="md:text-5xl text-2xl text-white font-semibold">
            Trello brings all your tasks, teammates, and tools together
          </h1>
          <p className="md:text-2xl text-xl text-white my-5">
            {`Keep everything in the same place—even if your team isn't.`}
          </p>
          <form
            action="/register"
            className="flex items-center justify-start md:flex-row flex-col"
          >
            <input
              className="w-[400px] text-black block py-3 px-2 rounded-md outline-none border-2 focus:border-blue-500 border-white bg-white ease-out duration-300"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
            />
            <div className="mt-4 md:mt-0 ml-0 md:ml-3">
              <button
                type="submit"
                className="md:w-[200px] hover:bg-[#3b82f6] w-[400px] py-3 rounded-md bg-blue-600 text-white"
              >
                {`Sign up - it's free!`}
              </button>
            </div>
          </form>
        </div>

        <div className="md:col-span-1 col-span-2 h-full flex items-center justify-center">
          <img
            src="https://trello-clone-ruby.vercel.app/_next/image?url=%2Fassets%2Ftrello-home.webp&w=640&q=75"
            width={632}
            height={558}
            alt="home-img"
          />
        </div>
      </div>
    </div>
  );
}
