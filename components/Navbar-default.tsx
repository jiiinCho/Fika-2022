import React, { useState, useEffect } from "react";
import Link from "next/link";
import s from "@styles/components/Navbar.module.css";
import { IHeart, IPlus, ISearch, IUser } from "@components/icons";
import { useAuthContext } from "context/AuthContext";
import { AuthUserT } from "@interface/index";

export default function Navbar() {
  const [currUser, setCurrUser] = useState<AuthUserT | undefined>(undefined);
  const authService = useAuthContext();

  useEffect(() => {
    authService && setCurrUser(authService.getUser());
  }, [authService]);

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
          <Link href={`${currUser ? "/upload" : "/signIn"}`}>
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
          <Link href={currUser ? `/user/${currUser.id}` : "/signIn"}>
            <a>
              <IUser />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
