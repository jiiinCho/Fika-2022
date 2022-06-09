import React from "react";

type Props = {
  color?: string;
  padding?: string;
};

export default function ILogo({
  color = "icon-default",
  padding = "p-50",
}: Props) {
  return (
    <svg
      className={`icon ${padding}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={color}
        d="M13.1094 1H21.7812V6.90625H20.1562C17.3333 6.90625 15.4062 6.46354 14.375 5.57812C13.5312 4.84896 13.1094 3.67188 13.1094 2.04688V1ZM2 1H10.4062V9.5625H16.6719V13.6406H10.4062V22.2344H2V1Z"
      />
    </svg>
  );
}
