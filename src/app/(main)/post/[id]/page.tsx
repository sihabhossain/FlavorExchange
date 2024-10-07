"use client";

import React, { useState, useEffect } from "react";
import {
  MoreHorizontal,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useUser } from "@/contexts/user.provider";
import { UseDownVotePost, useUpvotePost } from "@/hooks/voting.hook";
import { usePostComment } from "@/hooks/comment.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SharePostModal } from "@/components/modals/SharePost";
import { useParams } from "next/navigation";
import { useGetSinglePost } from "@/hooks/post.hook";
import { PostCardProps } from "@/types";
import DOMPurify from "dompurify";

const PostDetails: React.FC = () => {
  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id;

  // Use the custom hook to fetch post data
  const { data } = useGetSinglePost(postId);
  const post = data?.data as PostCardProps; // Type assertion for post

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [upvotes, setUpvotes] = useState(post?.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post?.downvotes || 0);

  const { user } = useUser();

  // Hooks for upvoting and downvoting posts
  const { mutate: upvoteMutate } = useUpvotePost(post?._id);
  const { mutate: downvoteMutate } = UseDownVotePost(post?._id);
  const { mutate: postCommentMutate } = usePostComment();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        comment,
        userId: user?._id,
        profilePhoto: user?.profilePhoto, // Add profilePhoto here
      };

      // Update local state
      setComments((prev) => [...prev, newComment]);
      setComment("");

      // Post the comment to the server
      postCommentMutate({ _id: post?._id, postData: newComment });
    }
  };

  // Handle upvote action
  const handleUpvote = () => {
    upvoteMutate();
    setUpvotes((prev) => (prev || 0) + 1);
  };

  // Handle downvote action
  const handleDownvote = () => {
    downvoteMutate();
    setDownvotes((prev) => (prev || 0) + 1);
  };

  useEffect(() => {
    // Update comments and votes when post data changes
    if (post) {
      setComments(post?.comments || []);
      setUpvotes(post?.upvotes || 0);
      setDownvotes(post?.downvotes || 0);
    }
  }, [post]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      {/* Header */}
      <div className="flex items-center px-6 py-4">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src={post?.userId?.profilePhoto}
          alt="Profile"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{post?.userId?.name}</h2>
          <p className="text-sm text-gray-500">{post?.title}</p>
        </div>
        <button className="ml-auto">
          <MoreHorizontal className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4">
        <h3 className="text-md font-semibold">Instructions:</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.instructions || ""),
          }}
          className="text-sm text-gray-700"
        />
      </div>

      {/* Image */}
      <img
        className="w-full h-80 object-cover"
        src={post?.image}
        alt="Recipe content"
      />

      {/* Ingredients */}
      <div className="px-6 py-4">
        <h3 className="text-md font-semibold">Ingredients:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {post?.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          )) || null}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <button
              className="flex items-center text-gray-500 hover:text-green-500"
              onClick={handleUpvote}
            >
              <ThumbsUp className="w-6 h-6 mr-2" /> {upvotes || 0}
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-red-500"
              onClick={handleDownvote}
            >
              <ThumbsDown className="w-6 h-6 mr-2" /> {downvotes || 0}
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-blue-500"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-6 h-6 mr-2" /> {comments.length || 0}
            </button>
            <SharePostModal />
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
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{c.userId?.name}</p>
                    <p className="text-sm">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
