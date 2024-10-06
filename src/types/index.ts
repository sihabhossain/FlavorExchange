export type UserData = {
  name?: string;
  email: string;
  password: string;
  mobileNumber?: string;
  profilePhoto?: string;
};

export interface IRecipe {
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  userId: string | undefined;
}

// Define the User type
export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  isPremium?: boolean;
  followersCount?: number;
  followingCount?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Define the PostCardProps type
export interface PostCardProps {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  userId: IUser; // Change this to the User type
  upvotes: number;
  downvotes: number;
  averageRating: number | null;
  ratings: any[]; // Adjust this if you have a specific type for ratings
  comments: any[]; // Adjust if you have a specific type for comments
  createdAt: string;
  __v: number;
}

export interface IComment {
  userId: string | undefined;
  comment: string;
}
