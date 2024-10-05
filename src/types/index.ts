export type UserData = {
  name?: string;
  email: string;
  password: string;
  mobileNumber?: string;
  profilePhoto?: string;
};

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
