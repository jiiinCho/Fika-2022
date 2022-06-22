import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IHeart, IPlus, ISearch, IUser } from "@components/icons";
import { Search } from "@components/index";
import { useAuthContext } from "context/AuthContext";
import { AuthUserT } from "@interface/index";
import s from "@styles/components/Navbar.module.css";

export default function Navbar() {
  const [currUser, setCurrUser] = useState<AuthUserT | undefined>(undefined);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const authService = useAuthContext();

  const onSearchBtnClick = () => {
    setOnSearch(!onSearch);
  };

  useEffect(() => {
    async function getCurrUser() {
      if (authService) {
        const res = await authService.getUser();
        setCurrUser(res);
      }
    }
    getCurrUser();
  }, [authService]);

  return (
    <nav className={`grid nav-wrapper ${s.nav} ${s.navDefault}`}>
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
        {onSearch && (
          <li className={s.list}>
            <Search />
          </li>
        )}
        <li className={`${s.list} ${s.searcher}`}>
          <button
            style={{
              lineHeight: 0,
              padding: 0,
              margin: 0,
              border: "none",
              background: "transparent",
            }}
            type="button"
            onClick={onSearchBtnClick}
          >
            <ISearch color="icon-default" />
          </button>
        </li>

        <li className={s.list}>
          <Link href={`${currUser ? "/upload" : "/signIn"}`}>
            <a>
              <IPlus />
            </a>
          </Link>
        </li>

        <li className={s.list}>
          <Link href={`${currUser ? `/likes/${currUser.id}` : "/signIn"}`}>
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
