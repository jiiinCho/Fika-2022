import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import s from "@styles/components/Navbar.module.css";
import { IHeart, ILogo, IPlus, ISearch, IUser } from "@components/icons";

type Props = {
  headerRef: React.MutableRefObject<null | HTMLDivElement>;
};

export default function Navbar({ headerRef }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const [headerPosY, setHeaderPosY] = useState(0);
  const [display, setDisplay] = useState(false);

  const handleOnScroll = useCallback(() => {
    headerRef.current &&
      setHeaderPosY(headerRef.current.getBoundingClientRect().y);
  }, [headerRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [handleOnScroll]);

  useEffect(() => {
    if (headerRef.current && navRef.current) {
      const boundary =
        headerRef.current.offsetHeight - navRef.current.offsetHeight;

      const navHeight = navRef.current.offsetHeight;
      const hitLine = Math.abs(headerPosY) - navHeight * 0.5;
      const diff = boundary - hitLine; //466 - 25 > 0 && hidden
      boundary && diff < 0 ? setDisplay(true) : setDisplay(false);
    }
  }, [headerPosY, headerRef]);

  return (
    <nav ref={navRef} className={`grid ${s.nav} ${display && "nav-wrapper"}`}>
      <div className={s.logoWrapper}>
        <div className={`${display ? s.appear : s.disappear}`}>
          <ILogo color="icon-primary" />
        </div>
      </div>
      <ul className="flex">
        <li className={`${display ? "v-visible" : "v-hidden"}`}>
          <Link href="#">
            <a>
              <ISearch color={`${display ? "icon-default" : "icon-white"}`} />
            </a>
          </Link>
        </li>

        <li>
          <Link href="#">
            <a>
              <IPlus color={`${display ? "icon-default" : "icon-white"}`} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <IHeart color={`${display ? "icon-default" : "icon-white"}`} />
            </a>
          </Link>
        </li>

        <li>
          <Link href="#">
            <a>
              <IUser color={`${display ? "icon-default" : "icon-white"}`} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
