import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IHeart, ILocation } from "@components/icons";
import { Avatar } from "@components/index";
import s from "@styles/components/Post.module.css";

export default function Post() {
  return (
    <article className={s.container}>
      <div className={s.imgWrapper}>
        <Image
          className={s.img}
          src="https://res.cloudinary.com/dwfnwjjir/image/upload/v1654803350/pexels-ekrulila-11538094_ygtgim.jpg"
          alt="Post"
          width="100%"
          height={420}
          objectFit="cover"
        />
      </div>

      <div className={s.meta}>
        <button className="btn-reset">
          <IHeart color="icon-white" />
        </button>
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <Link href="#">
            <a style={{ color: "inherit", textDecoration: "none" }}>
              <Avatar />
            </a>
          </Link>
          <button className="btn-reset">
            <ILocation color="icon-white" />
          </button>
        </div>
      </div>
    </article>
  );
}
