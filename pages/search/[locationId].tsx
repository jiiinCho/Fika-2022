import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import client from "@network/apollo";
import { CustomHead, NavbarDefault, Footer, Post } from "@components/index";
import { PostT } from "@interface/index";
import { GetPostByLocation } from "@network/queries";
import s from "@styles/Landing.module.css";

type Props = {
  posts: PostT[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locationId } = context.params!;

  let posts: PostT[] = [];
  if (!locationId) {
    return {
      props: {
        posts,
      },
    };
  }

  try {
    const {
      data: { getPostByLocation },
    } = await client.query({
      query: GetPostByLocation,
      variables: { locationId },
    });
    posts = getPostByLocation as PostT[];
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

export default function PostByLocationId({ posts }: Props) {
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
