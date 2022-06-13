import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import s from "@styles/components/Navbar.module.css";
import { IHeart, ILogo, IPlus, ISearch, IUser } from "@components/icons";

export default function Navbar() {
  return (
    <nav className={`grid nav-wrapper ${s.nav}`}>
      <div className={s.iconWrapper}>
        <div className={s.appear}>
          <Link href="/">
            <a>
              <p className="fs-28 ff-branding text-accent uppercase ml-25">
                fika
              </p>
            </a>
          </Link>
        </div>
      </div>
      <ul className="flex">
        <div className={s.iconWrapper}>
          <li className={s.appear}>
            <Link href="#">
              <a>
                <ISearch />
              </a>
            </Link>
          </li>
        </div>

        <li className={s.list}>
          <Link href="#">
            <a>
              <IPlus />
            </a>
          </Link>
        </li>
        <li className={s.list}>
          <Link href="#">
            <a>
              <IHeart />
            </a>
          </Link>
        </li>

        <li className={s.list}>
          <Link href="#">
            <a>
              <IUser />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
