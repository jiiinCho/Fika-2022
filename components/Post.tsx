import Image from "next/image";
import React from "react";
import s from "@styles/components/Post.module.css";

export default function Post() {
  return (
    <article className={s.container}>
      <Image
        className={s.img}
        src="https://res.cloudinary.com/dwfnwjjir/image/upload/v1654803350/pexels-ekrulila-11538094_ygtgim.jpg"
        alt="Post"
        width="100%"
        height={650}
        objectFit="cover"
      />
    </article>
  );
}
