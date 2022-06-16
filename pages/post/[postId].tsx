import React, { useState, useEffect } from "react";
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
import { getPostByLocation, getPostById } from "@network/queries";
import s from "@styles/PostDetail.module.css";
import { useAuthContext } from "context/AuthContext";

type Props = {
  currPost: PostT | undefined;
  related: PostT[] | undefined;
};

interface Params extends ParsedUrlQuery {
  postId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { postId: "62a8d7b50ca42fbec30a597f" } },
      { params: { postId: "62a8d87a0ca42fbec30a5987" } },
      { params: { postId: "62a8d8ca0ca42fbec30a598c" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { postId } = context.params!;

  let currPost: PostT | undefined = undefined;
  let related: Array<PostT> = [];

  try {
    const {
      data: { getPostById: post },
    } = await client.query({ query: getPostById, variables: { id: postId } });
    currPost = post;

    const locationId = post.location.id;
    const {
      data: { getPostByLocation: relatedPosts },
    } = await client.query({
      query: getPostByLocation,
      variables: { locationId },
    });
    const filteredPost = relatedPosts.filter(
      (p: PostT) => p.user.id !== post.user.id
    );
    related = [...filteredPost].sort(
      (a: PostT, b: PostT) => Number(b.createdAt) - Number(a.createdAt)
    );
  } catch (err) {
    console.error(err);
  } finally {
    return { props: { currPost, related } };
  }
};

export default function PostDetail({ currPost: post, related }: Props) {
  const router = useRouter();
  const authService = useAuthContext();

  const [likedPost, setLikedPost] = useState<boolean>(false);

  useEffect(() => {
    if (authService) {
      const currUser = authService.getUser();
      if (currUser && currUser.likedPosts.length && post) {
        const found = currUser.likedPosts.find((postId) => postId === post.id);
        setLikedPost(!!found);
      }
    }
  }, [authService, post]);

  if (router.isFallback) {
    //[todo] make skeleton component
    return <h1>Loading Page...</h1>;
  }

  if (!post) {
    //[todo] make no list found page
    return <h1>No List Found, return to Home</h1>;
  } else {
    const {
      id,
      user: { username, avatar },
      location: { business, street, city, country },
      imgUrl,
      createdAt,
      review,
      likes,
      rating,
    } = post;
    const address = `${business}, ${street}, ${city}, ${country}`;
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
              <IHeart
                padding="iheart-padding"
                color={`${likedPost && "icon-primary"}`}
              />
              <p>{likes} Likes</p>
            </div>
          </section>

          <section>
            <div className="meta">
              <ILocation />
              <div>
                <p>{business}</p>
                <p className="fs-14 mt-25 fw-light">
                  {street}, {city}, {country}
                </p>
              </div>
            </div>
            <article>
              <h3 className="sr-only">Review List</h3>
              <Review
                username={username}
                review={review}
                date={createdAt}
                rating={rating}
              />
              {related &&
                related.map((post) => {
                  const trimedText =
                    post.review.length > 75
                      ? `${post.review.slice(0, 72)}...`
                      : post.review;
                  const {
                    id,
                    user: { username },
                    createdAt,
                    rating,
                  } = post;
                  return (
                    <Review
                      key={post.id}
                      username={username}
                      review={trimedText}
                      date={createdAt}
                      postId={id}
                      rating={rating}
                    />
                  );
                })}
            </article>
          </section>

          <section className="grid g-0">
            <h3 className={`m-50 ml-100 fs-20 fw-medium ${s.subheading}`}>
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
