import Navbar from "@components/Navbar";
import React from "react";
import s from "@styles/Landing.module.css";

export default function Landing() {
  return (
    <div className={s.container}>
      <header className={s.hero}>
        <video loop autoPlay muted>
          <source
            src="https://res.cloudinary.com/dwfnwjjir/video/upload/v1654804501/3142211954_exznbg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag. I suggest you upgrade
          your browser.
        </video>
        <Navbar />
      </header>
      <main className={s.main}></main>
    </div>
  );
}
