"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PostCardProps } from "@/types";
import { toast } from "sonner";
import { useUser } from "@/contexts/user.provider";
import { UseDownVotePost, useUpvotePost } from "@/hooks/voting.hook";
import { usePostComment } from "@/hooks/comment.hook";
import DOMPurify from "dompurify"; // Import DOMPurify

const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const router = useRouter();

  const { user } = useUser();

  // Hooks for upvoting and downvoting posts
  const { mutate: upvoteMutate } = useUpvotePost(post._id);
  const { mutate: downvoteMutate } = UseDownVotePost(post._id);
  const { mutate: postCommentMutate } = usePostComment();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        comment,
        userId: user?._id,
        profilePhoto: user?.profilePhoto,
      };

      // Update local state
      setComments((prev) => [...prev, newComment]);
      setComment("");

      // Post the comment to the server
      postCommentMutate({ _id: post._id, postData: newComment });
    }
  };

  const handleUpgradeClick = () => {
    router.push("/dashboard/profile");
  };

  const handleSeeMoreClick = () => {
    if (user?.isPremium) {
      router.push(`/post/${post._id}`);
    } else {
      toast.error("Please upgrade to premium to see the full recipe details.");
    }
  };

  // Handle upvote action
  const handleUpvote = () => {
    upvoteMutate();
    setUpvotes((prev) => prev + 1);
  };

  // Handle downvote action
  const handleDownvote = () => {
    downvoteMutate();
    setDownvotes((prev) => prev + 1);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      {/* Header */}
      <div className="flex items-center px-6 py-4">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src={post?.userId?.profilePhoto}
          alt="Profile"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{post.userId?.name}</h2>
          <p className="text-sm text-gray-500">{post.title}</p>
        </div>
        <button className="ml-auto">
          <MoreHorizontal className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Show a preview of instructions */}
      <div className="px-6 py-4">
        <h3 className="text-md font-semibold">Instructions:</h3>
        <div
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.instructions.slice(0, 50) + "..."),
          }}
        />
        <span
          onClick={handleSeeMoreClick}
          className="text-blue-500 cursor-pointer"
        >
          See more
        </span>
      </div>

      {/* Image */}
      <img
        className="w-full h-80 object-cover"
        src={post.image}
        alt="Recipe content"
      />

      {/* Ingredients */}
      {user?.isPremium ? (
        <div className="px-6 py-4">
          <h3 className="text-md font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {post.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="px-6 py-4">
          <p className="text-md cursor-pointer text-red-500">
            Upgrade to a premium account to see the full recipe details!{" "}
            <span onClick={handleUpgradeClick} className="underline">
              Upgrade Now
            </span>
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <button
              className="flex items-center text-gray-500 hover:text-green-500"
              onClick={handleUpvote}
            >
              <ThumbsUp className="w-6 h-6 mr-2" /> {upvotes}
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-red-500"
              onClick={handleDownvote}
            >
              <ThumbsDown className="w-6 h-6 mr-2" /> {downvotes}
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-blue-500"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-6 h-6 mr-2" /> {comments.length}
            </button>
          </div>
          <div className="text-gray-500">
            <p className="text-sm">
              Posted on {new Date(post?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex space-x-4 mb-4">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={user?.profilePhoto}
              alt="User"
            />
            <form className="flex-1 flex" onSubmit={handleCommentSubmit}>
              <Input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2 flex-grow"
                placeholder="Write a comment..."
              />
              <Button
                type="submit"
                className="ml-2 text-white rounded-full px-4 py-2"
              >
                Send
              </Button>
            </form>
          </div>

          {/* Render Comments */}
          {comments.length > 0 && (
            <div className="mt-2">
              {comments.map((c) => (
                <div key={c._id} className="flex items-center mb-2">
                  <img
                    className="w-8 h-8 object-cover rounded-full mr-2"
                    src={c.userId?.profilePhoto}
                    alt="Commenter"
                  />
                  <p className="text-sm">{c.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
