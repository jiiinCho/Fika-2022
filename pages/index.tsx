import React, { useRef, useEffect, useState } from "react";
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
import { getConfig } from "@network/common/config";
import { useAuthContext } from "context/AuthContext";
import getAllPosts from "@network/post/get-all-posts";
import s from "@styles/Landing.module.css";

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
  const authService = useAuthContext();
  const [likedPost, setLikedPost] = useState<string[]>([]);

  useEffect(() => {
    async function getCurrUser() {
      if (authService) {
        const currUser = await authService.getUser();
        currUser && setLikedPost(currUser.likedPosts);
      }
    }
    getCurrUser();
  }, [authService]);

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
        {posts.map((post) => {
          const liked = likedPost.find((likedId) => likedId === post.id);
          return <Post key={post.id} post={post} liked={!!liked} />;
        })}
      </main>
      <Footer />
    </div>
  );
}
