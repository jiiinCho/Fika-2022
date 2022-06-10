import React, { useRef } from "react";
import Navbar from "@components/Navbar";
import s from "@styles/Landing.module.css";

export default function Landing() {
  const headerRef = useRef(null);
  return (
    <div className={s.container}>
      <header ref={headerRef} className={s.hero}>
        <video loop autoPlay muted>
          <source
            src="https://res.cloudinary.com/dwfnwjjir/video/upload/v1654804501/3142211954_exznbg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag. I suggest you upgrade
          your browser.
        </video>
        <Navbar headerRef={headerRef} />
      </header>
      <main className={s.main}></main>
    </div>
  );
}
