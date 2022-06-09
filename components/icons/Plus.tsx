import React from "react";

type Props = {
  color?: string;
  padding?: string;
};

export default function IPlus({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 12C2.25 6.61523 6.61523 2.25 12 2.25C17.3849 2.25 21.75 6.61523 21.75 12C21.75 17.3849 17.3849 21.75 12 21.75C6.61523 21.75 2.25 17.3849 2.25 12ZM12 0C5.37258 0 0 5.37258 0 12C0 18.6275 5.37258 24 12 24C18.6275 24 24 18.6275 24 12C24 5.37258 18.6275 0 12 0ZM13.125 7.125C13.125 6.50369 12.6213 6 12 6C11.3787 6 10.875 6.50369 10.875 7.125V10.875H7.125C6.50369 10.875 6 11.3787 6 12C6 12.6213 6.50369 13.125 7.125 13.125H10.875V16.875C10.875 17.4963 11.3787 18 12 18C12.6213 18 13.125 17.4963 13.125 16.875V13.125H16.875C17.4963 13.125 18 12.6213 18 12C18 11.3787 17.4963 10.875 16.875 10.875H13.125V7.125Z"
        className={color}
      />
    </svg>
  );
}
