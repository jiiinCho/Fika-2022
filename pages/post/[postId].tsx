import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { useRouter } from "next/router";

import { NavbarDefault, Avatar, Review, Post } from "@components/index";
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
    post &&
    postList
      .filter((p) => post.id !== p.userId && p.locationId === post.locationId)
      .sort((a, b) => {
        const val1 = new Date(a.date).getTime();
        const val2 = new Date(b.date).getTime();
        return val2 - val1;
      });
  return {
    props: { post, related },
  };
};

export default function PostDetail({ post, related }: Props) {
  console.log("related", related);

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
            <div className="ml-50">
              <Avatar
                avatar={avatar}
                username={username}
                textColor="text-black"
              />
            </div>
            <div className="grid mt-50">
              <Image
                src={imgUrl}
                alt="Post"
                width="100%"
                height={420}
                objectFit="cover"
              />
            </div>
            <div className="meta">
              <IHeart />
              <p>{likes} Likes</p>
            </div>
          </section>

          <section>
            <div className="meta">
              <ILocation />
              <p>{address}</p>
            </div>
            <article>
              <h3 className="sr-only">Review List</h3>
              <Review username={username} review={review} date={date} />
              {related &&
                related.map((post) => {
                  const trimedText =
                    post.review.length > 75
                      ? `${post.review.slice(0, 72)}...`
                      : post.review;
                  return (
                    <Review
                      key={post.id}
                      username={post.username}
                      review={trimedText}
                      date={post.date}
                    />
                  );
                })}
            </article>
          </section>

          <section className="grid g-0">
            <h3 className={`m-50 fs-20 fw-medium ${s.subheading}`}>
              Related Posts
            </h3>
            <div className={s.related}>
              {related &&
                related.map((post) => <Post key={post.id} post={post} />)}
            </div>
          </section>
        </main>
      </div>
    );
  }
}
