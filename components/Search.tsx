import React from "react";
import { ISearch, ILocation } from "@components/icons";
import s from "@styles/components/Search.module.css";

export default function Search() {
  return (
    <form className={s.form}>
      <label className="input input-search flex">
        <span className="sr-only">Search Cafe</span>
        <ISearch color="icon-primary" />
        <input
          className={`fw-regular fs-16 text-accent ${s.input}`}
          type="text"
          placeholder="Search"
        />
      </label>
      <label className="input input-search flex">
        <span className="sr-only">Search by location</span>
        <ILocation color="icon-primary" />
        <input
          className={`fw-regular fs-16 text-accent ${s.input}`}
          type="text"
          placeholder="Location"
        />
      </label>
    </form>
  );
}
