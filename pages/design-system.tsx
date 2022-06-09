import type { NextPage } from "next";
import Head from "next/head";
import { IHeart, ILogo, IPlus, ISearch, IUser } from "@components/icons";
import s from "../styles/DesignSystem.module.css";
import Image from "next/image";

const DesignSystem: NextPage = () => {
  const inputEmpty = "";
  const inputVal = "Email@email.com";
  return (
    <div className={s.container}>
      <Head>
        <title>Design System</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`flow ${s.main}`}>
        <h1 className="ff-32 fw-medium">Design System</h1>

        <section className="flow my-300">
          <h2 className="ff-24 uppercase">
            <span>01</span> Colors
          </h2>

          <div className={`grid ${s.colors}`}>
            <article>
              <div className="bg-white"></div>
              <h3 className="fs-16 fw-medium my-50">--clr-white</h3>
              <div
                className="grid"
                style={{ gridTemplateColumns: "min-content 1fr" }}
              >
                <p className="uppercase">hsl</p>
                <p style={{ textAlign: "end" }}>53°, 28%, 95%</p>
              </div>
            </article>
            <article>
              <div className="bg-primary"></div>
              <h3 className="fs-16 fw-medium my-50">--clr-primary</h3>
              <div
                className="grid"
                style={{ gridTemplateColumns: "min-content 1fr" }}
              >
                <p className="uppercase">hsl</p>
                <p style={{ textAlign: "end" }}>53°, 28%, 95%</p>
              </div>
            </article>
            <article>
              <div className="bg-secondary"></div>
              <h3 className="fs-16 fw-medium my-50">--clr-secondary</h3>
              <div
                className="grid"
                style={{ gridTemplateColumns: "min-content 1fr" }}
              >
                <p className="uppercase">hsl</p>
                <p style={{ textAlign: "end" }}>53°, 28%, 95%</p>
              </div>
            </article>
          </div>
        </section>

        <section className="flow my-300">
          <h2 className="ff-24 uppercase">
            <span>02</span> Typography
          </h2>

          <div className="flow">
            <article>
              <p className="fs-14 fw-light text-grey">
                BRANDING - HEARO - PLASTER - 126PX
              </p>
              <p className="fs-126 ff-branding text-accent uppercase">fika</p>
            </article>

            <article>
              <p className="fs-14 fw-light text-grey">
                BRANDING - HEADER - MOBILE - PLASTER - 32PX
              </p>
              <p className="fs-32 ff-branding text-accent uppercase">fika</p>
            </article>

            <article>
              <p className="fs-14 fw-light text-grey">
                BODY - LARGE - POPPINS - 28PX -MEDIUM
              </p>
              <p className="fs-28 fw-medium">300</p>
            </article>

            <article>
              <p className="fs-14 fw-light text-grey">
                BODY - DEFAULT - POPPINS - 16PX -REGULAR
              </p>
              <p className="fs-16  fw-regular">Search</p>
            </article>

            <article>
              <p className="fs-14 fw-light text-grey">
                SUBHEADER - POPPINS - 16PX - MEDIUM
              </p>
              <p className="fs-16 fw-medium">Add location</p>
            </article>

            <article>
              <p className="fs-14 fw-light text-grey">
                USERNAME - MONTSERRAT - 16PX SEMIBOLD
              </p>
              <p className="ff-montserrat fs-16 fw-semibold">Maria Olivia</p>
            </article>

            <article>
              <p className="fs-14 fw-light text-grey">
                BUTTON - DEFAULT - POPPIS - 18PX - MEDIUM - UPPERCASE -
                RESPONSIVE
              </p>
              <p className="fs-btn fw-medium uppercase">save</p>
            </article>
          </div>
        </section>

        <section className="flow my-300">
          <h2 className="ff-24 uppercase">
            <span>03</span> Interactive Elements
          </h2>

          <div className="flow">
            <article>
              <h3 className="fs-14 fw-light text-grey my-50">
                <span className="text-grey">A. </span>
                Icons
              </h3>
              <div className="flex">
                <ILogo color="icon-primary" />
                <ISearch />
                <IPlus />
                <IHeart />
                <IUser />
              </div>
            </article>

            <article>
              <h3 className="fs-14 fw-light text-grey my-50">
                <span className="text-grey">B. </span>
                Rating
              </h3>
              <div className="flex">
                <div>
                  <h4 className="fs-14 fw-light text-grey my-50">
                    Rating - pressable
                  </h4>
                  <div className="flex">
                    <button className="rating-pressable" aria-pressed="true">
                      <span className="sr-only">rating tab</span>
                    </button>

                    <button className="rating-pressable" aria-pressed="false">
                      <span className="sr-only">rating tab</span>
                    </button>

                    <button className="rating-pressable" aria-pressed="false">
                      <span className="sr-only">rating tab</span>
                    </button>

                    <button className="rating-pressable" aria-pressed="false">
                      <span className="sr-only">rating tab</span>
                    </button>

                    <button className="rating-pressable" aria-pressed="false">
                      <span className="sr-only">rating tab</span>
                    </button>

                    <div className="rating-display"></div>
                  </div>
                </div>

                <div>
                  <h4 className="fs-14 fw-light text-grey my-50">
                    Rating - display
                  </h4>
                  <div className="flex g-50">
                    <div className="rating rating-fill">
                      <span className="sr-only">rating tab</span>
                    </div>

                    <div className="rating rating-fill">
                      <span className="sr-only">rating tab</span>
                    </div>

                    <div className="rating rating-fill">
                      <span className="sr-only">rating tab</span>
                    </div>

                    <div className="rating">
                      <span className="sr-only">rating tab</span>
                    </div>

                    <div className="rating">
                      <span className="sr-only">rating tab</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article>
              <h3 className="fs-14 fw-light text-grey my-50">
                <span className="text-grey">C. </span>
                Input Elements
              </h3>
              <div className="flow g-200">
                <label className="fs-16 fw-medium text-black d-block">
                  <span className="d-block ">Username</span>
                  <input
                    className={`${
                      !inputEmpty && "input--empty"
                    } input p-50 fw-regular text-black my-25`}
                    type="text"
                    value={inputEmpty}
                  />
                  <p className="fs-14 fw-light text-grey">
                    We&rsquo;re big on real names around here, so people know
                    who&rsquo;s who.
                  </p>
                </label>

                <label className="fs-16 fw-medium text-black d-block">
                  <span className="d-block my-50">Email</span>
                  <input
                    className={`${
                      !inputVal && "input--empty"
                    } input p-50 fw-regular text-black`}
                    type="text"
                    value={inputVal}
                  />
                </label>

                <label className="fs-16 fw-medium text-black d-block">
                  <span className="d-block my-50">Caption</span>
                  <textarea
                    rows={5}
                    className={`${
                      !inputEmpty && "input--empty"
                    } input input--textarea p-50 fw-regular text-black`}
                  />
                </label>
              </div>
            </article>
          </div>
        </section>

        <section className="flow my-300">
          <h2 className="ff-24 uppercase">
            <span>04</span> Components
          </h2>

          <div className="flow g-200">
            <article>
              <h3 className="fs-14 fw-light text-grey my-50">
                <span className="text-grey">A. </span>
                Avatar
              </h3>
              <div className="flex">
                <div>
                  <h4>Desktop</h4>
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/54d96fcde4b0af07ca2a8871/1616629467192-HQSTI9MSL8ES895CWWCK/Linked+in_-3.jpg"
                    width={72}
                    height={72}
                    alt="avatar"
                    className="avatar"
                  />
                </div>

                <div>
                  <h4>Tablet</h4>
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/54d96fcde4b0af07ca2a8871/1616629467192-HQSTI9MSL8ES895CWWCK/Linked+in_-3.jpg"
                    width={48}
                    height={48}
                    alt="avatar"
                    className="avatar"
                  />
                </div>

                <div>
                  <h4>Mobile</h4>
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/54d96fcde4b0af07ca2a8871/1616629467192-HQSTI9MSL8ES895CWWCK/Linked+in_-3.jpg"
                    width={36}
                    height={36}
                    alt="avatar"
                    className="avatar"
                  />
                </div>
              </div>
            </article>

            <article>
              <h3 className="fs-14 fw-light text-grey my-50">
                <span className="text-grey">B. </span>
                Butoon
              </h3>
              <div className="flex">
                <div>
                  <h4>Button Primary</h4>
                  <button className="btn-primary uppercase">save</button>
                </div>

                <div>
                  <h4>Button Secondary</h4>
                  <button className="btn-secondary uppercase">Delete</button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignSystem;
