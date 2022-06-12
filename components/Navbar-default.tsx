import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import s from "@styles/components/Navbar.module.css";
import { IHeart, ILogo, IPlus, ISearch, IUser } from "@components/icons";

export default function Navbar() {
  return (
    <nav className={`grid nav-wrapper ${s.nav}`}>
      <div className={s.iconWrapper}>
        <div className={s.appear}>
          <ILogo color="icon-primary" />
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

        <li>
          <Link href="#">
            <a>
              <IPlus />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <IHeart />
            </a>
          </Link>
        </li>

        <li>
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
