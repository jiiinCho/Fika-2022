import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CustomHead, NavbarDefault, Footer } from "@components/index";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import { useAuthContext } from "context/AuthContext";
import { AuthUserT } from "@interface/index";

export default function Login() {
  const context = useAuthContext();

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const onFileUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const displayErrMsg = (message: string) => {
    return toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const pageRouter = (user: null | AuthUserT, message: string) => {
    if (!user) {
      setLoading(false);
      displayErrMsg(message);
    } else {
      router.push("/");
    }
  };

  const signInUser = async () => {
    setLoading(true);
    if (context) {
      const { user, message } = await context.signIn({
        username,
        password,
        isSignUp: signUp,
      });
      pageRouter(user, message);
    }
  };

  const signUpUser = async () => {
    if (!imgFile) {
      displayErrMsg("Please select a profile image");
      return;
    }

    if (context) {
      setLoading(true);
      const { user, message } = await context.signUp({
        username,
        password,
        email,
        imgFile,
        isSignUp: signUp,
      });
      pageRouter(user, message);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length > 15 || username.length < 3) {
      displayErrMsg("Username must be between 3 to 15 characters");
    } else if (password.length < 5) {
      displayErrMsg("Password must be at least 5 characters");
      return;
    } else if (password.search(/[a-z]/i) < 0) {
      displayErrMsg("Password must contain at least one letter.");
      return;
    } else if (password.search(/[0-9]/) < 0) {
      displayErrMsg("Password must contain at least one digit.");
      return;
    } else if (password !== confirmPassword) {
      displayErrMsg("Passwords not match");
      return;
    } else if (!email) {
      displayErrMsg("Email address is required");
      return;
    } else {
      signUp ? signUpUser() : signInUser();
    }
  };

  //[todo] uploading component
  if (loading) {
    return <h1>Log In...</h1>;
  }
  return (
    <>
      <ToastContainer />
      <CustomHead />
      <NavbarDefault />
      <form
        className="m-layout grid m-footer"
        style={{ placeItems: "center" }}
        onSubmit={handleOnSubmit}
      >
        <h1 className="ff-28 fw-medium my-100" style={{ textAlign: "center" }}>
          {signUp ? "Join FIKA today" : "Sign in to FIKA"}
        </h1>

        <label
          className="my-auto fs-16 fw-medium text-black d-block w-100"
          htmlFor="username"
        >
          <span className="d-block ">Username</span>
          <input
            className={`${
              !username && "input--empty"
            } input p-50 fw-regular text-black my-25`}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <p className="fs-14 fw-light text-grey" style={{ lineHeight: "1.2" }}>
            We&rsquo;re big on real names around here, so people know
            who&rsquo;s who.
          </p>
        </label>

        <label
          className="my-auto fs-16 fw-medium text-black d-block w-100"
          htmlFor="password"
        >
          <span className="d-block ">Password</span>
          <input
            className={`${
              !password && "input--empty"
            } input p-50 fw-regular text-black my-25`}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        {signUp && (
          <>
            <label
              className="my-auto fs-16 fw-medium text-black d-block w-100"
              htmlFor="confirm"
            >
              <span className="d-block ">Confirm password</span>
              <input
                className={`${
                  !confirmPassword && "input--empty"
                } input p-50 fw-regular text-black my-25`}
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </label>

            <label
              className="my-auto fs-16 fw-medium text-black d-block w-100"
              htmlFor="email"
            >
              <span className="d-block my-50">Email</span>
              <input
                className={`${
                  !email && "input--empty"
                } input p-50 fw-regular text-black`}
                type="email"
                id="email"
                name="email"
                placeholder="abc@abc.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>

            <label className="my-auto fs-16 fw-medium text-black d-block w-100">
              <span className="d-block my-50">Profile Image</span>
              <input
                aria-hidden={true}
                ref={fileInputRef}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  e.target.files && setImgFile(e.target.files[0]);
                }}
              />
              <button
                className="btn-secondary uppercase"
                type="button"
                onClick={onFileUpload}
              >
                {imgFile ? imgFile.name : "Select An Image File"}
              </button>
            </label>
          </>
        )}

        <label
          className="my-auto flex g-25 w-100"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            style={{ cursor: "pointer" }}
            type="checkbox"
            checked={signUp}
            onChange={() => {
              setSignUp(signUp ? false : true);
            }}
          />
          <span className="fs-16 text-black">Create new account</span>
        </label>

        <div
          className="my-auto flex"
          style={{ justifyContent: "center", flexDirection: "column" }}
        >
          <button type="submit" className="my-auto btn-primary uppercase">
            {signUp ? "Create" : "Sign In"}
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}
