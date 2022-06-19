import { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";
import { CustomHead, NavbarDefault, Footer, Post } from "@components/index";

import { useRouter } from "next/router";
import { PostT } from "@interface/index";
import client from "@network/apollo";
import { GetUserById, GetPostById } from "@network/queries";
import s from "@styles/Landing.module.css";
import Link from "next/link";

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
    } = await client.query({ query: GetUserById, variables: { id: userId } });
    const likedPostIdArr = user.likedPosts; // ['123', '456, '788']
    posts = await Promise.all(
      likedPostIdArr.map(async (postId: string) => {
        try {
          const {
            data: { getPostById: post },
          } = await client.query({
            query: GetPostById,
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
