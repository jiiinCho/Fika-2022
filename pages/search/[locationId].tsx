import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

import { CustomHead, NavbarDefault, Footer, Post } from "@components/index";
import { PostT } from "@interface/index";
import getPostByLocation from "@network/post/get-post-by-location";
import { getConfig } from "@network/common/config";
import s from "@styles/Landing.module.css";

type Props = {
  posts: PostT[];
};
interface Params extends ParsedUrlQuery {
  locationId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { locationId: "62a86842ec2ea09a5ce72ae5" } },
      { params: { locationId: "62a8690eec2ea09a5ce72aea" } },
      { params: { locationId: "62a86958ec2ea09a5ce72aed" } },
      { params: { locationId: "62a8b14408e30fc88e77c574" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { locationId } = context.params!;
  const config = getConfig();

  let posts: PostT[] = [];
  try {
    const options = {
      config,
      variables: { locationId },
    };
    posts = await getPostByLocation(options);
  } catch (err) {
    console.error(`----------error --------- ${err}`);
  } finally {
    return {
      props: {
        posts,
      },
      revalidate: 3,
    };
  }
};

export default function PostByLocationId({ posts }: Props) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Searching...</h1>;
  }

  if (!posts) {
    return <h1>oops, no result found</h1>;
  }
  return (
    <>
      <CustomHead />
      <NavbarDefault />
      <main className={`m-footer bg-white ${s.main} ${s.searchResult}`}>
        {posts.length ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <section className={`flex ${s.redirect}`}>
            <h1 className="fs-28 fw-medium">No Post Found</h1>
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
