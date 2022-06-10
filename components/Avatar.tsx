import React from "react";
import Image from "next/image";
import s from "@styles/components/Avatar.module.css";

export default function Avatar() {
  return (
    <div className="flex g-50" style={{ alignItems: "center" }}>
      <div className={s.container}>
        <Image
          src="https://res.cloudinary.com/dwfnwjjir/image/upload/v1654803390/pexels-rikki-matsumoto-5804257_hyjuya.jpg"
          alt="avatar"
          width={62}
          height="100%"
          objectFit="cover"
        />
      </div>
      <p className="ff-montserrat fs-16 fw-semibold text-white">Maria Olga</p>
    </div>
  );
}
