import Link from "next/link";
import React from "react";
import s from "@styles/components/NotFound.module.css";

type Props = {
  message: string;
  redirectUrl: string;
  btnMsg: string;
};

export default function NotFound({ message, redirectUrl, btnMsg }: Props) {
  return (
    <div className={s.notFound}>
      <h1 className="fs-28 fw-medium my-100">{message}</h1>
      <Link href={redirectUrl}>
        <a className="btn-primary uppercase" style={{ textDecoration: "none" }}>
          {btnMsg}
        </a>
      </Link>
    </div>
  );
}
