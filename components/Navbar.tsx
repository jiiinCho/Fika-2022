import React from "react";
import s from "@styles/components/Navbar.module.css";
import { IHeart, ILogo, IPlus, ISearch, IUser } from "@components/icons";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={`bg-black-20 grid ${s.nav}`}>
      <div className={s.logoWrapper}>
        <ILogo color="icon-primary" />
      </div>
      <ul className="flex">
        <li>
          <Link href="#">
            <a>
              <ISearch color="icon-white" />
            </a>
          </Link>
        </li>

        <li>
          <Link href="#">
            <a>
              <IPlus color="icon-white" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <IHeart color="icon-white" />
            </a>
          </Link>
        </li>

        <li>
          <Link href="#">
            <a>
              <IUser color="icon-white" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
