import React, { useState, useRef } from "react";
import {
  Avatar,
  CustomHead,
  NavbarDefault,
  Location,
  Rating,
} from "@components/index";
import { LocationT } from "@interface/index";
import s from "@styles/PostDetail.module.css";

const dummyUser = {
  userId: "1",
  username: "Maria Olga",
  avatar:
    "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935174/portrait-3_bknblw.jpg",
};

// [todo] update props
//   type Props = {
//       userInfo : UserT
//   }

type CloudinaryResponse = {
  width: string;
  height: string;
  secure_url: string;
};

type APIResponse = {
  url: string;
  preset: string;
};

export default function Upload() {
  const { avatar, username } = dummyUser;

  const [caption, setCaption] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<Number>(0);

  console.log("rating", rating);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("location", location);
    console.log("caption", caption);

    if (imgFile) {
      setLoading(true);

      /* 
      [TBC] unable to get file from FormData in /api/imageHandler 
      username would be exposed if you check network tab, do not know how to solve it! 20220613
      this method is not to use dotenv library 
      */

      const response = await fetch("/api/imageHandler");
      const { url, preset } = (await response.json()) as APIResponse;

      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("upload_preset", preset);

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const { secure_url } = (await res.json()) as CloudinaryResponse;

      secure_url && setLoading(false);
    }
  };

  const onFileUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const getLocationVar = (locationInfo: LocationT) => {
    console.log("locationInfo", locationInfo);
  };

  //[todo] uploading component
  if (loading) {
    return <h1>Uploading...</h1>;
  }

  return (
    <>
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

        <section className="my-100">
          <form className="flow fg-200" onSubmit={handleOnSubmit}>
            <Location getLocationVar={getLocationVar} />

            <Rating setRating={setRating} />

            <label className="my-auto fs-16 fw-medium text-black d-block">
              <span className="d-block my-50">Caption</span>
              <textarea
                rows={5}
                className={`${
                  !caption && "input--empty"
                } input input--textarea p-50 fw-regular text-black`}
                value={caption}
                name="caption"
                onChange={(e) => setCaption(e.target.value)}
              />
            </label>

            <div className="my-auto flex" style={{ justifyContent: "center" }}>
              <button type="submit" className="btn-primary uppercase">
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
