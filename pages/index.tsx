import React, { useRef } from "react";
import { GetStaticProps } from "next";
import {
  CustomHead,
  Navbar,
  Search,
  Post,
  NotFound,
  Footer,
} from "@components/index";
import { PostT } from "@interface/index";
import s from "@styles/Landing.module.css";
import { getConfig } from "@network/common/config";
import getAllPosts from "@network/post/get-all-posts";

type Props = {
  posts: PostT[];
};

export const getStaticProps: GetStaticProps = async () => {
  const config = getConfig();
  let posts: PostT[] = [];
  try {
    posts = await getAllPosts(config);
  } catch (err) {
    console.error(`----------error --------- ${err}`);
  } finally {
    return {
      props: {
        posts,
      },
      revalidate: 10,
    };
  }
};

export default function Landing({ posts }: Props) {
  const headerRef = useRef(null);

  if (!posts) {
    return (
      <NotFound message="No Post Found" redirectUrl="/" btnMsg="Refresh" />
    );
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

      <main className={`m-footer ${s.main}`}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
