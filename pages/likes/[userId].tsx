import { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { CustomHead, NavbarDefault, Footer, Post } from "@components/index";
import { PostT } from "@interface/index";
import getUserById from "@network/user/get-user-by-id";
import { getConfig } from "@network/common/config";
import getPostById from "@network/post/get-post-by-id";
import s from "@styles/Landing.module.css";

type Props = {
  posts: Array<PostT>;
};

interface Params extends ParsedUrlQuery {
  userId: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { userId } = context.params!;
  const config = getConfig();

  let posts: PostT[] = [];

  try {
    const options = {
      config,
      variables: { id: userId },
    };
    const user = await getUserById(options);
    if (user) {
      const likedPostIdArr = user.likedPosts; // ['123', '456, '788']
      posts = await Promise.all(
        likedPostIdArr.map(async (postId: string) => {
          return await getPostById({ config, variables: { id: postId } });
        })
      );
    }
  } catch (err) {
    console.error(`----------error --------- ${err}`);
  } finally {
    return {
      props: {
        posts,
      },
    };
  }
};

export default function LikedPosts({ posts }: Props) {
  const router = useRouter();
  const [likedPostList, setLikedPostList] = useState<PostT[]>(posts);

  const handleOnDislike = (postId: string) => {
    setLikedPostList((prev) => prev.filter((post) => post.id !== postId));
  };
  useEffect(() => {
    if (!posts) {
      router.push("/signIn");
    }
  }, [router, posts]);
  return (
    <>
      <CustomHead />
      <NavbarDefault />
      <main className={`m-footer bg-white ${s.main} ${s.searchResult}`}>
        {likedPostList.length ? (
          likedPostList.map((post) => (
            <Post key={post.id} post={post} onDislike={handleOnDislike} />
          ))
        ) : (
          <section className={`flex ${s.redirect}`}>
            <h1 className="fs-28 fw-medium">Your list is empty</h1>
            <div className="btn-primary uppercase">
              <Link href="/">
                <a style={{ textDecoration: "none", color: "inherit" }}>
                  Go to Main page
                </a>
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
