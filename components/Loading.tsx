import React from "react";
import s from "@styles/components/Loading.module.css";

export default function Loading() {
  return (
    <div className={s.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
