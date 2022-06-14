import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Avatar,
  CustomHead,
  Caption,
  NavbarDefault,
  Location,
  Rating,
} from "@components/index";
import { LocationT } from "@interface/index";
import s from "@styles/PostDetail.module.css";
import imageUploader from "@network/imageUploader";

// [todo] get user info from context?
const dummyUser = {
  id: "62a61f8843f899f21b325a78",
  username: "Maria Olga",
  avatar:
    "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935174/portrait-3_bknblw.jpg",
};

// [todo] update props
//   type Props = {
//       userInfo : UserT
//   }

export default function Upload() {
  const router = useRouter();
  const { avatar, username } = dummyUser;

  const [caption, setCaption] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<Number>(0);
  const [location, setLocation] = useState<undefined | LocationT>(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imgFile) {
      toast.error("Please select an image file", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else {
      setLoading(true);
      const imgUrl = await imageUploader(imgFile);
      const locationTemp = { ...location, id: "0" };
      const formHandlerResponse = await fetch("/api/formHandler", {
        method: "POST",
        body: JSON.stringify({
          user: dummyUser,
          imgUrl,
          rating,
          location: locationTemp,
          review: caption,
        }),
      });
      const { postId } = await formHandlerResponse.json();
      //[todo] update redirect to upload fail page
      postId ? router.push(`/post/${postId}`) : router.push("/");
    }
  };

  const onFileUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  //[todo] uploading component
  if (loading) {
    return <h1>Uploading...</h1>;
  }

  return (
    <>
      <ToastContainer />
      <CustomHead />
      <NavbarDefault />
      <main className={`m-layout ${s.main}`}>
        <section className="my-auto" style={{ width: "100%" }}>
          <div className="ml-50">
            <Avatar
              avatar={avatar}
              username={username}
              textColor="text-black"
            />
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
