import React from "react";

type Props = {
  color?: string;
  padding?: string;
};

export default function ILocation({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9808 4.72034C18.7203 5.45969 19.3071 6.33747 19.7072 7.30358C20.1075 8.26967 20.3134 9.30516 20.3134 10.3509C20.3134 11.3966 20.1075 12.4321 19.7072 13.3982C19.3071 14.3643 18.7203 15.2421 17.9808 15.9814L12.3503 21.6088L6.71972 15.9798C5.98031 15.2405 5.39377 14.3626 4.99361 13.3965C4.59344 12.4304 4.38747 11.395 4.38747 10.3493C4.38747 9.3036 4.59344 8.26816 4.99361 7.30206C5.39377 6.33597 5.98031 5.45816 6.71972 4.71875C7.45914 3.97933 8.33696 3.3928 9.30303 2.99263C10.2691 2.59246 11.3046 2.3865 12.3503 2.3865C13.396 2.3865 14.4314 2.59246 15.3975 2.99263C16.3636 3.3928 17.2413 3.97933 17.9808 4.71875V4.72034ZM19.6687 17.6693C21.1163 16.2219 22.1021 14.3776 22.5016 12.3698C22.901 10.362 22.6961 8.2809 21.9128 6.38959C21.1294 4.49827 19.8028 2.88174 18.1007 1.74439C16.3985 0.607054 14.3974 0 12.3503 0C10.3031 0 8.30199 0.607054 6.59988 1.74439C4.89777 2.88174 3.57115 4.49827 2.78778 6.38959C2.00443 8.2809 1.79951 10.362 2.19895 12.3698C2.59839 14.3776 3.58424 16.2219 5.03183 17.6693L10.6608 23.2998C10.8826 23.5218 11.146 23.6979 11.4359 23.818C11.7258 23.9382 12.0365 24 12.3503 24C12.6641 24 12.9748 23.9382 13.2647 23.818C13.5546 23.6979 13.8179 23.5218 14.0397 23.2998L19.6687 17.6693ZM12.3503 13.5356C13.1949 13.5356 14.0049 13.2 14.6022 12.6028C15.1994 12.0056 15.535 11.1955 15.535 10.3509C15.535 9.50624 15.1994 8.69621 14.6022 8.09896C14.0049 7.50171 13.1949 7.16619 12.3503 7.16619C11.5056 7.16619 10.6956 7.50171 10.0983 8.09896C9.50111 8.69621 9.16557 9.50624 9.16557 10.3509C9.16557 11.1955 9.50111 12.0056 10.0983 12.6028C10.6956 13.2 11.5056 13.5356 12.3503 13.5356Z"
      />
    </svg>
  );
}
