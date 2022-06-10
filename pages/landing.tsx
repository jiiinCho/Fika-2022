import React, { useRef } from "react";
import { Navbar, Search, Post } from "@components/index";
import s from "@styles/Landing.module.css";

export default function Landing() {
  const headerRef = useRef(null);
  return (
    <div className={s.container}>
      <header ref={headerRef} className={s.header}>
        <video loop autoPlay muted>
          <source
            src="https://res.cloudinary.com/dwfnwjjir/video/upload/v1654804501/3142211954_exznbg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag. I suggest you upgrade
          your browser.
        </video>
        <Navbar headerRef={headerRef} />
        <div className={`bg-black-30 ${s.searchWrapper}`}>
          <div className="flex" style={{ flexDirection: "column" }}>
            <p className="fs-126 ff-branding text-accent uppercase">fika</p>
            <Search />
          </div>
        </div>
      </header>

      <main className={s.main}>
        <Post />
        <Post />
        <Post />
        <Post />
      </main>
    </div>
  );
}
