import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  CustomHead,
  NavbarDefault,
  Avatar,
  Review,
  Post,
} from "@components/index";
import { IHeart, ILocation } from "@components/icons";
import { PostT } from "@interface/index";
import client from "@network/apollo";
import { getAllPosts, getPostById } from "@network/queries";
import s from "@styles/PostDetail.module.css";

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
      { params: { postId: "62a6202843f899f21b325a7a" } },
      { params: { postId: "62a6214243f899f21b325a7e" } },
      { params: { postId: "62a6219343f899f21b325a82" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { postId } = context.params!;
  const {
    data: { getPostById: post },
    error: getPostByIdError,
  } = await client.query({ query: getPostById, variables: { id: postId } });

  //  [todo] backend, Build a query: getPostByLocationId
  const {
    data: { getAllPosts: postList },
    error: getAllPostsError,
  } = await client.query({ query: getAllPosts });

  //[TBC] Error handling
  if (getPostByIdError || getAllPostsError) {
    return {
      props: { post: undefined, related: undefined },
    };
  }

  const related =
    post &&
    postList
      .filter(
        (p: PostT) => post.id !== p.userId && p.locationId === post.locationId
      )
      .sort((a: PostT, b: PostT) => Number(b.createdAt) - Number(a.createdAt));

  return {
    props: { post, related },
  };
};

export default function PostDetail({ post, related }: Props) {
  const router = useRouter();
  if (router.isFallback) {
    //[todo] make skeleton component
    return <h1>Loading Page...</h1>;
  }

  if (!post) {
    //[todo] make no list found page
    return <h1>No List Found, return to Home</h1>;
  } else {
    const { username, address, avatar, imgUrl, createdAt, review, likes } =
      post;

    return (
      <>
        <CustomHead />
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
              <Review username={username} review={review} date={createdAt} />
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
                      date={post.createdAt}
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
      </>
    );
  }
}
