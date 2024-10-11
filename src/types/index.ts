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
  followers: any;
  bio: string;
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  isPremium?: boolean;
  isBlocked?: boolean;
  followersCount?: number;
  followingCount?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Define the PostCardProps type
export interface PostCardProps {
  category: string;
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  userId: IUser; // Change this to the User type
  upvotes: number;
  downvotes: number;
  averageRating: number | null;
  ratings: any[];
  comments: any[];
  createdAt: string;
  __v: number;
}

export interface IComment {
  userId: string;
  comment: string;
}

type RecipeComment = {
  id: string;
  userId: string;
  comment: string;
  createdAt: string; // or Date if you prefer to work with Date objects
  updatedAt: string; // or Date if you prefer to work with Date objects
  _id: string;
};

export type TRecipe = {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  averageRating: number | null; // Assuming it can be null
  category: string;
  ratings: number[]; // Assuming ratings are stored as an array of numbers
  comments: RecipeComment[];
  createdAt: string; // or Date if you prefer to work with Date objects
  __v: number; // This usually represents the version key in Mongoose
};

export type TUpdateRecipe = {
  title: string;
  instructions: string;
  image: string;
  userId: string | undefined;
};

export type ProfileFormData = {
  name?: string;
  email?: string;
  bio?: string;
  profilePhoto?: string;
  isPremium?: boolean;
};

// Define the interface for the request body
export interface FollowUserRequestBody {
  followingId: string;
}

export interface IRating {
  userId: string;
  rating: string;
}
