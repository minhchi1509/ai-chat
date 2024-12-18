import { Account, Profile, Session } from 'next-auth';

interface IUserMainProfile {
  id: number;
  fullName: string;
  email: string;
  accessToken: string;
}

interface IUserOAuthProfile extends Account, Profile {}

interface IUser {
  mainProfile: IUserMainProfile;
  oAuthProfile?: IUserOAuthProfile;
}

declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Session {}
}
