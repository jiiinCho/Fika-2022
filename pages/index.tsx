import React, { useRef } from "react";
import { Navbar, Search, Post } from "@components/index";
import s from "@styles/Landing.module.css";
import { PostT } from "@interface/post";
import { postList } from "data/data";

// [todo]
// type Props = {
//   posts: PostT[];
// };

export default function Landing() {
  const posts: PostT[] = postList;
  const headerRef = useRef(null);
  return (
    <div className={s.container}>
      <header ref={headerRef} className={s.header}>
        <video loop autoPlay muted>
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
