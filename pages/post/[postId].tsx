import React, { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import {
  CustomHead,
  NavbarDefault,
  NotFound,
  Skeleton,
  Avatar,
  Review,
  Post,
} from "@components/index";
import { IHeart, ILocation } from "@components/icons";
import { PostT } from "@interface/index";
import { useAuthContext } from "context/AuthContext";
import fetcher from "@network/fetcher";
import getPostById from "@network/post/get-post-by-id";
import { getConfig } from "@network/common/config";
import getPostByLocation from "@network/post/get-post-by-location";
import s from "@styles/PostDetail.module.css";

type Props = {
  currPost: PostT | null;
  related: PostT[];
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
  const config = getConfig();

  let currPost: PostT | null = null;
  let related: PostT[] = [];

  try {
    const options = {
      config,
      variables: { id: postId },
    };
    const post = await getPostById(options);
    currPost = post;
    if (post) {
      const locationOptions = {
        config,
        variables: { locationId: post.location.id },
      };
      const postsByLocation = await getPostByLocation(locationOptions);
      const filteredPost = postsByLocation.filter(
        (p: PostT) => p.user.id !== post.user.id
      );
      related = [...filteredPost].sort(
        (a: PostT, b: PostT) => Number(b.createdAt) - Number(a.createdAt)
      );
    }
  } catch (err) {
    console.log("error while fetching data in route : post/[postId]");
    console.error(err);
  } finally {
    return { props: { currPost, related }, revalidate: 3 };
  }
};

export default function PostDetail({ currPost: post, related }: Props) {
  const router = useRouter();
  const authService = useAuthContext();

  const [likedPost, setLikedPost] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(post ? post.likes : 0);

  useEffect(() => {
    post && setLikesCount(post.likes);
  }, [post]);

  const handleOnLikes = async () => {
    if (authService) {
      const currUser = authService.getUser();
      if (currUser && post) {
        const { post: postRes, liked } = await fetcher(
          "/api/updateLikesHandler",
          {
            postId: post.id,
            userId: currUser.id,
            accessToken: currUser.accessToken,
          }
        );
        setLikedPost(liked);
        setLikesCount(postRes.likes);
        //[todo] implement getUser api
        currUser.likedPosts = liked
          ? [...currUser.likedPosts, post.id]
          : currUser.likedPosts.filter((pid) => pid !== post.id);
      } else {
        router.push("/signIn");
      }
    }
  };

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
    return <Skeleton />;
  }

  if (!post) {
    return (
      <NotFound
        message="No Post Found"
        redirectUrl="/"
        btnMsg="Go to main page"
      />
    );
  } else {
    const {
      id,
      user: { username, avatar },
      location: { business, street, city, country, id: locationId },
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
              <button className="btn-reset flex" onClick={handleOnLikes}>
                <IHeart
                  padding="iheart-padding"
                  color={`${likedPost ? "icon-primary" : "icon-default"}`}
                />
              </button>
              <p>{likesCount} Likes</p>
            </div>
          </section>

          <section>
            <div className="meta">
              <Link href={`/search/${locationId}`}>
                <a>
                  <ILocation />
                </a>
              </Link>
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
