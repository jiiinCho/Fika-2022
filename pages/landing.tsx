import React from "react";
import s from "../styles/Landing.module.css";

export default function Landing() {
  return (
    <div className={s.container}>
      <main className={s.main}>
        <video autoPlay muted loop>
          <source
            src="https://res.cloudinary.com/dwfnwjjir/video/upload/v1654804501/3142211954_exznbg.mp4"
            type="video/mp4"
          />
        </video>
      </main>
    </div>
  );
}
