"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
const Profile = () => {
  const navigate = useRouter();
  const { logout, loading, user } = useAuth();
  const [bio, setBio] = useState("");
  const fetchDoc = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBio(docSnap.data().bio);
    } else {
      toast.info("No such document! please update the bio");
    }
  };
  useEffect(() => {
    fetchDoc();
  }, []);
  return (
    <div className=" sm:px-[5rem] lg:px-[20rem]">
      <div className="text-center">
        <h1 className="text-[24px] font-[400] tracking-[-0.84px]">
          Personal info
        </h1>
        <p className="text-[14px] font-[300] tracking-[-0.49px]">
          Basic info, like your name and photo
        </p>
      </div>
      <div className="sm:border-2 sm:rounded-md sm:p-4 sm:mt-2">
        <div className="px-[5px] py-10 flex flex-col gap-6">
          <div className="flex justify-between">
            <div>
              <h1>Profile</h1>
              <p className="">Some info may be visible to other people</p>
            </div>
            <button
              className="text-[14px] font-[500] tracking-[-0.49px] text-[#1877F2] hover:underline cursor-pointer border-2 px-6 py-2 rounded-md"
              onClick={() => navigate.push("/profile")}
            >
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center">
            <h1>PHOTO</h1>
            <Image
              src={user?.photoURL ? user?.photoURL : "/avatar.jpeg"}
              alt="avatar"
              width={72}
              height={100}
              className="rounded-md object-cover"
            />
          </div>
        </div>
        <hr />
        <div className="flex justify-between py-6">
          <h1>Name</h1>
          <p>{user?.displayName}</p>
        </div>
        <hr />
        <div className="flex justify-between py-6">
          <h1>Bio</h1>
          <p>{bio ? bio : "I am a user"}</p>
        </div>
        <hr />
        <hr />
        <div className="flex justify-between py-6">
          <h1>Email</h1>
          <p>{user?.email}</p>
        </div>
        <hr />
        <div className="flex justify-between py-6">
          <h1>Password</h1>
          <p>********</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
