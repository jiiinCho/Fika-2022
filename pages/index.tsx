import React, { useRef } from "react";
import { GetStaticProps } from "next";
import { CustomHead, Navbar, Search, Post } from "@components/index";
import client from "@network/apollo";
import { GetAllPosts as query } from "@network/queries";
import { PostT } from "@interface/index";
import s from "@styles/Landing.module.css";

type Props = {
  posts: PostT[];
};

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { getAllPosts: posts },
    error,
  } = await client.query({ query });

  // [TBC] Error handling
  return error ? { props: { posts: [] } } : { props: { posts } };
};

export default function Landing({ posts }: Props) {
  const headerRef = useRef(null);

  if (!posts) {
    //[todo] make no list found page
    return <h1>No List Found, return to Home</h1>;
  }

  return (
    <div className={s.container}>
      <CustomHead />
      <header ref={headerRef} className={s.header}>
        <video
          loop
          autoPlay
          muted
          poster="https://res.cloudinary.com/dwfnwjjir/image/upload/v1655291091/black-screen_zpuc23.jpg"
          style={{ objectFit: "cover" }}
        >
          <source
            src="https://res.cloudinary.com/dwfnwjjir/video/upload/v1654804501/3142211954_exznbg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag. I suggest you upgrade
          your browser.
        </video>
        <Navbar headerRef={headerRef} />
        <div className={`bg-black-30 ${s.searchWrapper}`}>
          <div
            className="flex"
            style={{ flexDirection: "column", justifyContent: "center" }}
          >
            <p
              className="fs-126 ff-branding text-accent uppercase"
              style={{ textAlign: "center" }}
            >
              fika
            </p>
            <Search />
          </div>
        </div>
      </header>

      <main className={s.main}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
}
