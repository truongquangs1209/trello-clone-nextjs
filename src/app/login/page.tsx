"use client";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log({ res });
      const user = res.user;
      const { displayName, email, uid, photoURL } = user;
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        displayName,
        email,
        uid,
        photoURL,

      });
      if (user?.uid) {
        router.push(`/boards`);
        return;
      }
      console.log(
        "Đăng nhập thành công và lưu thông tin người dùng vào Firestore"
      );
    } catch (error) {
      console.error("Đăng nhập không thành công:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
   if(email && password){
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Success !')
      router.push("/boards");
    } catch (error) {
     toast.error('Email hoặc mật khẩu không đúng hoặc không tồn tại')
    }
   }
   else{
    toast.warning('Vui lòng nhập đầy đủ thông tin')
   }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="bg-image"
        className="fixed inset-0 z-[-1]"
      />
      <div className="p-[40px] rounded-md w-[400px]  bg-white h-fit flex flex-col items-center">
        <Image
          src="https://trello-clone-ruby.vercel.app/assets/trello-logo-blue.svg"
          alt=""
          width={117.5}
          height={40}
        />
        <div className="w-full">
          <h2 className="text-center font-semibold mb-4 pt-[24px] text-[16px] text-[#172b4d]">
            Đăng nhập để tiếp tục
          </h2>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="px-[6px] mb-3 rounded-lg py-2 text-[14px] h-[40px] w-full border border-solid text-[#172b4d]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="px-[6px] rounded-lg py-2 text-[14px] h-[40px] w-full border border-solid text-[#172b4d]"
            />
            <button
           
              type="submit"
              className="bg-[#0052cc] transition-all hover:bg-[#0065ff] text-[14px] w-full h-[40px] rounded-lg my-3 font-medium"
            >
              Tiếp tục
            </button>
          </form>
          <div className="mt-[24px]">
            <h2 className="font-semibold text-[14px] text-center text-[#5e6c84]">
              Hoặc tiếp tục với:
            </h2>
            <div>
              <button
                onClick={() => handleLoginWithGoogle()}
                className="text-[#42526e] border-solid flex items-center justify-center gap-4 font-semibold border transition-all hover:bg-[#fafafb] text-[14px] w-full h-[40px] rounded-lg my-4"
              >
                <img
                  src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg"
                  width={24}
                  alt=""
                />
                <h2>Google</h2>
              </button>
              <button className="text-[#42526e] border-solid flex items-center justify-center gap-4 font-semibold border transition-all hover:bg-[#fafafb] text-[14px] w-full h-[40px] rounded-lg my-4">
                <img
                  src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/microsoft-logo.c73d8dca.svg"
                  width={24}
                  alt=""
                />
                <h2>Microsoft</h2>
              </button>
              <button className="text-[#42526e] border-solid flex items-center justify-center gap-4 font-semibold border transition-all hover:bg-[#fafafb] text-[14px] w-full h-[40px] rounded-lg my-4">
                <img
                  src="	https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/apple-logo.54e0d711.svg"
                  width={24}
                  alt=""
                />
                <h2>Apple</h2>
              </button>
              <button className="text-[#42526e] border-solid flex items-center justify-center gap-4 font-semibold border transition-all hover:bg-[#fafafb] text-[14px] w-full h-[40px] rounded-lg my-4">
                <img
                  src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/slack-logo.5d730c10.svg"
                  width={24}
                  alt=""
                />
                <h2>Slack</h2>
              </button>
            </div>
            <p className="hover:underline text-center text-[#0c66e4] text-sm">Bạn chưa có tài khoản ? <Link href={'/register'}> Đăng kí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
