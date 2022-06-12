import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { useRouter } from "next/router";

import { NavbarDefault, Avatar } from "@components/index";
import { IHeart, ILocation } from "@components/icons";
import s from "@styles/PostDetail.module.css";
import { PostT } from "@interface/index";
import { postList } from "data/data";

type Props = {
  post: PostT | undefined;
  related: PostT[] | undefined;
};

interface Params extends ParsedUrlQuery {
  postId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { postId } = context.params!;
  const post = postList.find(
    (post) => parseInt(post.id) === parseInt(postId[0])
  );
  //[todo] sort by date
  const related =
    post && postList.filter((p) => p.locationId === post.locationId);
  return {
    props: { post, related },
  };
};

export default function PostDetail({ post, related }: Props) {
  console.log("post", post);
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading Page...</h1>;
  }

  if (!post) {
    //[todo] make no list found page
    return <h1>No List Found, return to Home</h1>;
  } else {
    const { username, address, avatar, imgUrl, date, review, likes } = post;

    return (
      <div>
        <NavbarDefault />
        <main className={`m-layout ${s.main}`}>
          <section>
            <Avatar
              avatar={avatar}
              username={username}
              textColor="text-black"
            />
            <div className="grid">
              <Image
                src={imgUrl}
                alt="Post"
                width="100%"
                height={420}
                objectFit="cover"
              />
            </div>
            <div className={s.meta}>
              <IHeart />
              <p>{likes} Likes</p>
            </div>
          </section>

          <section>
            <div className={s.meta}>
              <ILocation />
              <p>{address}</p>
            </div>
            <div className={s.meta} style={{ margin: "0 0.25rem" }}>
              <div className="flex g-50 m-50 mr-100">
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
              <p className="fs-16 fw-regular text-grey">
                Reviewed {getTimeDiff(date)} ago
              </p>
            </div>

            <article className="review-wrapper">
              <p>
                <span className="ff-montserrat fs-16 fw-semibold mr-50">
                  {username}
                </span>
                {review}
              </p>
            </article>
          </section>
        </main>
      </div>
    );
  }
}

const getTimeDiff = (createdAt: string) => {
  const today = new Date().getTime();
  const created = Number(new Date(createdAt.replace(/-/g, "/")));
  const diffMs = today - created; // milliseconds between now & Christmas
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
