import { GetServerSideProps } from "next";
import React, { useState, useRef, useEffect } from "react";
import { CustomHead, NavbarDefault, Footer, Post } from "@components/index";

import { useRouter } from "next/router";
import { PostT } from "@interface/index";
import client from "@network/apollo";
import { getUserById, getPostById } from "@network/queries";
import s from "@styles/Landing.module.css";

type Props = {
  posts: Array<PostT>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { userId } = params!;

  let posts: Array<PostT> = [];
  try {
    const {
      data: { getUserById: user },
      error,
    } = await client.query({ query: getUserById, variables: { id: userId } });
    const likedPostIdArr = user.likedPosts; // ['123', '456, '788']
    posts = await Promise.all(
      likedPostIdArr.map(async (postId: string) => {
        try {
          const {
            data: { getPostById: post },
          } = await client.query({
            query: getPostById,
            variables: { id: postId },
          });
          return post;
        } catch (err) {
          console.error(err);
        }
      })
    );
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

  useEffect(() => {
    if (!posts) {
      router.push("/signIn");
    }
  }, [router, posts]);

  return (
    <>
      <CustomHead />
      <NavbarDefault />
      <main className={`m-footer ${s.main}`} style={{ marginTop: "3.8rem" }}>
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </main>
      <Footer />
    </>
  );
}
