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
import {
  useDeleteComment,
  useEditComment,
  usePostComment,
} from "@/hooks/comment.hook";
import DOMPurify from "dompurify";
import { useGetSingleUser } from "@/hooks/user.hook";

const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [showOptions, setShowOptions] = useState<{ [key: string]: boolean }>(
    {}
  );
  const router = useRouter();

  const { user: userData } = useUser();
  const { data } = useGetSingleUser(userData?._id || "");
  const user = data?.data;

  const { mutate: upvoteMutate } = useUpvotePost(post._id);
  const { mutate: downvoteMutate } = UseDownVotePost(post._id);
  const { mutate: postCommentMutate } = usePostComment();
  const { mutate: editCommentMutate } = useEditComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && user) {
      const newComment = {
        comment,
        userId: user._id,
        profilePhoto: user.profilePhoto,
      };
      setComments((prev) => [...prev, newComment]);
      setComment("");
      postCommentMutate({ _id: post._id, postData: newComment });
    } else {
      toast.error("You must be logged in to comment.");
    }
  };

  const handleCommentEdit = (id: string) => {
    const updatedComments = comments.map((c) => {
      if (c._id === id) {
        return { ...c, comment: editCommentText };
      }
      return c;
    });
    setComments(updatedComments);
    setEditCommentId(null);
    setEditCommentText("");
  };

  const handleCommentDelete = (id: string) => {
    const updatedComments = comments.filter((c) => c._id !== id);
    setComments(updatedComments);
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

  const handleUpvote = () => {
    upvoteMutate();
    setUpvotes((prev) => prev + 1);
  };

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
          src={post?.userId?.profilePhoto || "/default-profile.png"} // Fallback image
          alt="Profile"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">
            {post.userId?.name || "Anonymous"}
          </h2>
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
              className="flex items-center text-green-500"
              onClick={handleUpvote}
            >
              <ThumbsUp className="w-6 h-6 mr-2" /> {upvotes}
            </button>
            <button
              className="flex items-center text-red-500"
              onClick={handleDownvote}
            >
              <ThumbsDown className="w-6 h-6 mr-2" /> {downvotes}
            </button>
            <button
              className="flex items-center text-blue-500"
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
              src={user?.profilePhoto || "/default-profile.png"} // Fallback image
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
          {comments.map((c) => (
            <div key={c._id} className="flex items-center mb-2 relative">
              <img
                className="w-8 h-8 object-cover rounded-full mr-2"
                src={c.userId?.profilePhoto || "/default-profile.png"} // Fallback image
                alt="Commenter"
              />
              <p className="text-sm flex-grow">{c.comment}</p>
              <button
                onClick={() =>
                  setShowOptions((prev) => ({
                    ...prev,
                    [c._id]: !prev[c._id],
                  }))
                }
                className="ml-2 text-gray-500"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {showOptions[c._id] && (
                <div className="absolute right-0 bg-white shadow-lg rounded-md z-10">
                  <button
                    onClick={() => {
                      setEditCommentId(c._id);
                      setEditCommentText(c.comment);
                      setShowOptions((prev) => ({ ...prev, [c._id]: false }));
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleCommentDelete(c._id);
                      setShowOptions((prev) => ({ ...prev, [c._id]: false }));
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Comment Input */}
      {editCommentId && (
        <div className="flex space-x-4 mx-5 mb-4">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src={user?.profilePhoto || "/default-profile.png"} // Fallback image
            alt="User"
          />
          <form
            className="flex-1 flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleCommentEdit(editCommentId);
            }}
          >
            <Input
              type="text"
              value={editCommentText}
              onChange={(e) => setEditCommentText(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 flex-grow"
              placeholder="Edit comment..."
            />
            <Button
              type="submit"
              className="ml-2 text-white rounded-full px-4 py-2"
            >
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
