import React from "react";
import { CustomHead, NavbarDefault } from "@components/index";
import { IHeart, ILocation } from "@components/icons";
import s from "@styles/components/Skeleton.module.css";

export default function Skeleton() {
  return (
    <>
      <CustomHead />
      <NavbarDefault />
      <main className={`m-layout ${s.main}`}>
        <section>
          <div className="ml-50">
            <div className="flex g-50" style={{ alignItems: "center" }}>
              <div className={s.container}>
                <div
                  className="bg-secondary"
                  style={{ width: "62px", height: "62px", borderRadius: "50%" }}
                ></div>
              </div>
              <p className="ff-montserrat fs-16 fw-semibold text-grey">
                Username
              </p>
            </div>
          </div>
          <div className="grid mt-50">
            <div
              className="bg-secondary"
              style={{ width: "420px", height: "420px" }}
            ></div>
          </div>
          <div className="meta">
            <IHeart padding="iheart-padding" color="icon-default" />
            <p className="text-grey">0 Likes</p>
          </div>
        </section>

        <section>
          <div className="meta">
            <ILocation />
            <div>
              <p className="text-grey">Business name</p>
              <p className="fs-14 mt-25 fw-light text-grey">
                street, city, country
              </p>
            </div>
          </div>
          <article>
            <h3 className="sr-only">Review List</h3>

            <div className="m-100" style={{ marginBottom: "1.5rem" }}>
              <article className="meta my-50">
                <ul
                  className="flex g-25 my-25 mr-50"
                  style={{ listStyle: "none", paddingLeft: "0" }}
                >
                  <li className="rating rating-fill">
                    <span className="sr-only">rating tab</span>
                  </li>
                  <li className="rating rating-fill">
                    <span className="sr-only">rating tab</span>
                  </li>
                  <li className="rating rating-fill">
                    <span className="sr-only">rating tab</span>
                  </li>
                  <li className="rating rating-fill">
                    <span className="sr-only">rating tab</span>
                  </li>
                  <li className="rating rating-fill">
                    <span className="sr-only">rating tab</span>
                  </li>
                </ul>
                <p className="fs-14 fw-regular text-grey">
                  Reviewed 0 minutes ago
                </p>
              </article>
              <article
                className="review-wrapper bg-secondary"
                style={{ height: "5rem", border: "none" }}
              >
                <p>
                  <span className="text-grey fs-16 mr-50 fw-regular">
                    Review caption
                  </span>
                </p>
              </article>
            </div>
          </article>
        </section>

        <section className="grid g-0">
          <h3
            className={`m-50 ml-100 fs-20 fw-medium ${s.subheading} text-grey`}
          >
            Related Posts
          </h3>
          <div className={s.related}>
            <div
              className="bg-secondary"
              style={{ height: "420px", width: "420px" }}
            ></div>
            <div
              className="bg-secondary"
              style={{ height: "420px", width: "420px" }}
            ></div>
            <div
              className="bg-secondary"
              style={{ height: "420px", width: "420px" }}
            ></div>
          </div>
        </section>
      </main>
    </>
  );
}
