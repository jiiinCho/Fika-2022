import Link from "next/link";
import React from "react";

type Props = {
  username: string;
  review: string;
  date: string;
  postId?: string;
  rating: number;
};
export default function Review({
  username,
  review,
  date,
  postId,
  rating,
}: Props) {
  const ratingArr = [];
  for (let i = 0; i < 5; i++) {
    i < rating ? ratingArr.push(1) : ratingArr.push(0);
  }
  return (
    <div className="m-100" style={{ marginBottom: "1.5rem" }}>
      <article className="meta my-50">
        <ul
          className="flex g-25 my-25 mr-50"
          style={{ listStyle: "none", paddingLeft: "0" }}
        >
          {ratingArr.map((val, i) => (
            <li
              key={`${date}-${i}`}
              className={`rating ${val && "rating-fill"}`}
            >
              <span className="sr-only">rating tab</span>
            </li>
          ))}
        </ul>
        <p className="fs-14 fw-regular text-grey">
          Reviewed {getTimeDiff(date)} ago
        </p>
      </article>
      <article className="review-wrapper">
        <p>
          <span className="ff-montserrat fs-16 fw-semibold mr-50">
            {username}
          </span>
          {review}&nbsp;
          {postId && (
            <Link href={`/post/${postId}`}>
              <a className="fs-16 fw-medium text-accent">more</a>
            </Link>
          )}
        </p>
      </article>
    </div>
  );
}

const getTimeDiff = (createdAt: string) => {
  const today = new Date().getTime();
  // const created = Number(new Date(createdAt.replace(/-/g, "/")));
  const diffMs = today - Number(createdAt); // milliseconds between now & Christmas
  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

  if (diffDays) {
    return `${diffDays} days`;
  } else if (diffHrs) {
    return `${diffHrs} hours`;
  } else {
    return `${diffMins} minutes`;
  }
};
