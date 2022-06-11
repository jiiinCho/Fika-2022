import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { PostT } from "@interface/post";
import { postList } from "data/data";

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

export const getStaticProps: GetStaticProps = async (context) => {
  const { postId } = context.params!;

  let post = null;
  post = postId && postList.find((post) => post.id === parseInt(postId[0]));

  return {
    props: { post },
  };
};

type Props = {
  post: PostT | null;
};
export default function PostDetail({ post }: Props) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading Page...</h1>;
  }

  return <div>PostDetail</div>;
}
