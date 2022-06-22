import {
  AuthServiceI,
  AuthUserT,
  AuthResT,
  SignUpUserInputT,
  SignInUserInputT,
} from "@interface/index";
import fetcher from "@network/fetcher";
import imageUploader from "@network/imageUploader";

export default class AuthService implements AuthServiceI {
  private _localStorageKey: string = "user";

  async getUser(): Promise<AuthUserT | undefined> {
    const retrievedObject = localStorage.getItem(this._localStorageKey);
    if (retrievedObject) {
      const userInLocal = JSON.parse(retrievedObject);
      const userId = userInLocal.id;
      const { user } = await fetcher("/api/getUserHandler", { userId });
      return {
        ...user,
        accessToken: userInLocal.accessToken,
      };
    }
    return undefined;
  }
  async signUp(args: SignUpUserInputT): Promise<AuthResT> {
    const { username, password, email, imgFile, isSignUp } = args;
    const avatar = await imageUploader(imgFile);
    const reqBody = {
      user: { username, password, email, avatar },
      isSignUp,
    };
    const { user, message }: { user: AuthUserT; message: string } =
      await fetcher("/api/authHandler", reqBody);

    // Put the object into storage
    localStorage.setItem(this._localStorageKey, JSON.stringify(user));
    return new Promise((resolve, _) => resolve({ user, message }));
  }

  async signIn(args: SignInUserInputT): Promise<AuthResT> {
    const { username, password, isSignUp } = args;
    const reqBody = {
      user: { username, password },
      isSignUp,
    };
    const { user, message }: { user: AuthUserT; message: string } =
      await fetcher("/api/authHandler", reqBody);

    localStorage.setItem(this._localStorageKey, JSON.stringify(user));
    return new Promise((resolve, _) => resolve({ user, message }));
  }

  async logout() {
    localStorage.clear();
  }
}
