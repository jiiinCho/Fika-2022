import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IHeart, ILocation } from "@components/icons";
import { Avatar } from "@components/index";
import s from "@styles/components/Post.module.css";
import { PostT } from "@interface/index";

type Props = {
  post: PostT;
};

export default function Post({ post }: Props) {
  const {
    user: { username, avatar },
    imgUrl,
    id,
  } = post;
  return (
    <article className={s.container}>
      <div className={s.imgWrapper}>
        <Image
          src={imgUrl}
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
          <Link href={`/post/${id}`}>
            <a style={{ color: "inherit", textDecoration: "none" }}>
              <Avatar username={username} avatar={avatar} />
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
