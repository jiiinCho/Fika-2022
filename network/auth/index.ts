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
  private _user: AuthUserT | undefined;
  private _localStorageKey: string = "user";

  getUser(): AuthUserT | undefined {
    const retrievedObject = localStorage.getItem(this._localStorageKey);
    if (retrievedObject) {
      const userInLocal = JSON.parse(retrievedObject);
      this._user = userInLocal;
      return userInLocal;
    }
    return this._user;
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
    this._user = user;
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
    this._user = user;
    return new Promise((resolve, _) => resolve({ user, message }));
  }

  async logout() {
    localStorage.clear();
    this._user = undefined;
  }
}
