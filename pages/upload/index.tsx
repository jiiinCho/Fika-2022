import React, { useState, useRef } from "react";
import { Avatar, CustomHead, NavbarDefault } from "@components/index";

import s from "@styles/PostDetail.module.css";
import { UserT } from "@interface/index";

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
  asset_id: string;
  width: string;
  height: string;
  url: string;
};

export default function Upload() {
  const { avatar, username } = dummyUser;

  const [location, setLocation] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("location", location);
    console.log("caption", caption);

    if (imgFile) {
      setLoading(true);
      const url = process.env.CLOUDINARY_URL;
      const preset = process.env.CLOUDINARY_PRESET;
      console.log("url", url);
      console.log("preset", preset);
      if (!url || !preset) {
        throw new Error("cannot find CLOUDINARY_URL or preset name");
      }

      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("upload_preset", preset);

      fetch(url, {
        method: "POST",
        body: formData,
      }).then(async (response) => {
        const res = await response.text();
        const data: CloudinaryResponse = JSON.parse(res);
        console.log("url", data.url);
        setLoading(false);
      });
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

        <section>
          <form className="flow" onSubmit={handleOnSubmit}>
            <label className="my-auto fs-16 fw-medium text-black d-block">
              <span className="d-block my-50">Add location</span>
              <input
                className={`${
                  !location && "input--empty"
                } input p-50 fw-regular text-black`}
                type="text"
                value={location}
                name="location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>

            <label className="my-auto fs-16 fw-medium text-black d-block">
              <span className="d-block my-50">Rating</span>
              <div className="flex">
                <button className="rating-pressable" aria-pressed="true">
                  <span className="sr-only">rating tab</span>
                </button>

                <button className="rating-pressable" aria-pressed="false">
                  <span className="sr-only">rating tab</span>
                </button>

                <button className="rating-pressable" aria-pressed="false">
                  <span className="sr-only">rating tab</span>
                </button>

                <button className="rating-pressable" aria-pressed="false">
                  <span className="sr-only">rating tab</span>
                </button>

                <button className="rating-pressable" aria-pressed="false">
                  <span className="sr-only">rating tab</span>
                </button>
              </div>
            </label>

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
