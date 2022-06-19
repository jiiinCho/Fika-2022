import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Avatar,
  CustomHead,
  Caption,
  NavbarDefault,
  Location,
  Loading,
  Rating,
} from "@components/index";
import { LocationT } from "@interface/index";
import s from "@styles/PostDetail.module.css";
import imageUploader from "@network/imageUploader";
import fetcher from "@network/fetcher";

import { useAuthContext } from "context/AuthContext";
import { AuthUserT } from "@interface/index";

export default function Upload() {
  const authService = useAuthContext();

  const router = useRouter();
  const [currUser, setCurrUser] = useState<AuthUserT | undefined>(undefined);
  const [caption, setCaption] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<Number>(0);
  const [location, setLocation] = useState<undefined | LocationT>(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const displayErrMsg = (message: string) => {
    return toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    if (authService) {
      setCurrUser((_) => {
        const signedUser = authService.getUser();
        if (!signedUser) {
          router.push("/signIn");
        }
        return signedUser;
      });
    }
  }, [authService, currUser, router]);

  const onUploadFail = () => {
    displayErrMsg("Error while upload post, please try it again");
    setLoading(false);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imgFile) {
      displayErrMsg("Please select an image file");
      return;
    }

    setLoading(true);
    const imgUrl = await imageUploader(imgFile);
    if (currUser) {
      const { username, avatar, id, accessToken } = currUser;
      const user = { username, avatar, id };
      const reqBody = {
        post: {
          user,
          imgUrl,
          rating,
          location,
          review: caption,
        },
        accessToken,
      };
      const { postId } = await fetcher("/api/formHandler", reqBody);
      postId ? router.push(`/post/${postId}`) : onUploadFail();
    }
  };

  const onFileUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <>
      <ToastContainer />
      <CustomHead />
      <NavbarDefault />
      {loading && (
        <main className="blocker grid" style={{ placeItems: "center" }}>
          <Loading />
        </main>
      )}
      <main className={`m-layout ${s.main}`}>
        <section className="my-auto" style={{ width: "100%" }}>
          <div className="ml-50">
            {currUser && (
              <Avatar
                avatar={currUser.avatar}
                username={currUser.username}
                textColor="text-black"
              />
            )}
          </div>
          <div className="grid mt-50">
            <div
              className="bg-secondary grid"
              style={{ height: "420px", placeItems: "center" }}
            >
              <input
                required={true}
                aria-hidden={true}
                ref={fileInputRef}
                style={{ display: "none" }}
                type="file"
                name="file"
                onChange={(e) =>
                  e.target.files && setImgFile(e.target.files[0])
                }
              />
              <button
                className="btn-secondary uppercase"
                type="button"
                onClick={onFileUpload}
              >
                {imgFile ? imgFile.name : "Select An Image File"}
              </button>
            </div>
          </div>
        </section>

        <section className="my-200">
          <form className="flow" onSubmit={handleOnSubmit}>
            <Location setLocation={setLocation} />
            <Rating setRating={setRating} />
            <Caption setCaption={setCaption} />
            <div
              className="my-auto flex"
              style={{ justifyContent: "center", flexDirection: "column" }}
            >
              <button type="submit" className="my-auto btn-primary uppercase">
                Upload
              </button>
            </div>
          </form>
        </section>

        <section></section>
      </main>
    </>
  );
}
