import React from "react";
import s from "@styles/components/Footer.module.css";

export default function Footer() {
  return (
    <div className={`bg-white ${s.container}`}>
      <p className="fs-14 fw-light">
        Designed &amp; Developed by&nbsp;
        <a className="text-accent" href="https://github.com/jiiinCho">
          jiiin.cho.dev
        </a>
      </p>
      <p className="fs-14 fw-light">&#169;2022 FIKA. All rights reserved.</p>
    </div>
  );
}
