import React from "react";

type Props = {
  username: string;
  review: string;
  date: string;
};
export default function Review({ username, review, date }: Props) {
  return (
    <div className="m-50" style={{ marginBottom: "1.5rem" }}>
      <article className="meta my-50">
        <div className="flex g-25 mr-50">
          <div className="rating rating-fill">
            <span className="sr-only">rating tab</span>
          </div>

          <div className="rating rating-fill">
            <span className="sr-only">rating tab</span>
          </div>

          <div className="rating rating-fill">
            <span className="sr-only">rating tab</span>
          </div>

          <div className="rating">
            <span className="sr-only">rating tab</span>
          </div>

          <div className="rating">
            <span className="sr-only">rating tab</span>
          </div>
        </div>
        <p className="fs-14 fw-regular text-grey">
          Reviewed {getTimeDiff(date)} ago
        </p>
      </article>
      <article className="review-wrapper">
        <p>
          <span className="ff-montserrat fs-16 fw-semibold mr-50">
            {username}
          </span>
          {review}
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
