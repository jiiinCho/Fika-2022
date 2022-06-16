import { GetServerSideProps } from "next";
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CustomHead, NavbarDefault, Footer } from "@components/index";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import { UserT } from "@interface/index";
import client from "@network/apollo";
import { getUserById } from "@network/queries";
import fetcher from "@network/fetcher";
import imageUploader from "@network/imageUploader";
import { useAuthContext } from "context/AuthContext";

type UserAPIResponse = {
  password: string;
  email: string;
  id: string;
};
type Props = {
  userData: (UserT & UserAPIResponse) | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { userId } = params!;
  let userResponse = null;
  try {
    const {
      data: { getUserById: user },
      error,
    } = await client.query({ query: getUserById, variables: { id: userId } });
    userResponse = user;
  } catch (err) {
    console.error(`----------error --------- ${err}`);
  } finally {
    return {
      props: {
        userData: userResponse,
      },
    };
  }
};

export default function UserAccout({ userData }: Props) {
  const router = useRouter();
  const authService = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(userData ? userData.email : "");
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

  const fetchUpdate = async () => {
    setLoading(true);
    if (userData) {
      const imgUrl = imgFile ? await imageUploader(imgFile) : userData.avatar;
      const { user, message } = await fetcher("/api/userInfoHandler", {
        user: {
          username: userData.username,
          password,
          email: email ? email : userData.email,
          avatar: imgUrl,
        },
        id: userData.id,
        accessToken: authService ? authService.getUser()!.accessToken : "",
      });
      if (!user) {
        setLoading(false);
        displayErrMsg(message);
      } else {
        setLoading(false);
        toast.success("User info updated");
      }
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password) {
      if (password.length < 5) {
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
      } else {
        fetchUpdate();
      }
    } else {
      fetchUpdate();
    }
  };

  const handleOnDelete = async () => {
    if (userData) {
      const { message } = await fetcher("/api/userInfoHandler", {
        id: userData.id,
        accessToken: authService ? authService.getUser()!.accessToken : "",
      });
      authService && authService.logout();
      toast.success(`${message}, redirect to main page in 5 seconds`, {
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  };

  useEffect(() => {
    if (!userData) {
      displayErrMsg(
        "Fail to get account info, redirect to sign in page in 5 seconds"
      );
      setTimeout(() => {
        router.push("/signIn");
      }, 5000);
    }
  }, [router, userData]);

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
          Account Details
        </h1>

        <label
          className="my-auto fs-16 fw-medium text-black d-block w-100"
          htmlFor="username"
        >
          <span className="d-block ">Username</span>
          <input
            className="input p-50 fw-regular text-black my-25"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={userData ? userData.username : ""}
            disabled
          />
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
            {imgFile
              ? imgFile.name
              : userData
              ? getFileName(userData.avatar)
              : "Select file"}
          </button>
        </label>

        <div className="my-auto flex" style={{ alignItems: "center" }}>
          <button type="submit" className="my-auto btn-primary uppercase">
            Save
          </button>
          <button
            type="button"
            className="btn-secondary uppercase"
            onClick={handleOnDelete}
          >
            Delete
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}

function getFileName(url: string) {
  const splited = url.split("/");
  return splited[splited.length - 1];
}
