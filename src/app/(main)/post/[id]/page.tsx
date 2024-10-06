"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetSinglePost } from "@/hooks/post.hook";

const PostDetails = () => {
  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id; // Ensure id is a string

  // Use the custom hook to fetch post data
  const { data, isLoading, error } = useGetSinglePost(postId);

  const post = data?.data;

  // Local state for comments and votes
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment(""); // Clear the input after submission
    }
  };

  // Loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching post details.</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      {/* Header */}
      <div className="flex items-center px-6 py-4">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src={post?.userId?.profilePhoto} // Use author's image if available
          alt="Profile"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{post?.userId?.name}</h2>
          <p className="text-sm text-gray-500">{post?.title}</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className="text-gray-700">{post?.description}</p>
      </div>

      {/* Image */}
      {post?.image && (
        <img
          className="w-full h-80 object-cover"
          src={post?.image}
          alt="Post content"
        />
      )}

      {/* Ingredients Section */}
      {post?.ingredients && post?.ingredients.length > 0 && (
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {post?.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructions Section */}
      {post?.instructions && (
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold">Instructions:</h3>
          <p className="text-gray-700">{post?.instructions}</p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <button
              className="flex items-center text-gray-500 hover:text-green-500"
              onClick={() => setUpvotes(upvotes + 1)}
            >
              <ThumbsUp className="w-6 h-6 mr-2" /> {upvotes}
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-red-500"
              onClick={() => setDownvotes(downvotes + 1)}
            >
              <ThumbsDown className="w-6 h-6 mr-2" /> {downvotes}
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-blue-500"
              onClick={() => {} /* Optional: Toggle comments visibility */}
            >
              <MessageCircle className="w-6 h-6 mr-2" /> {comments.length}
            </button>
          </div>
          <div className="text-gray-500">
            <p className="text-sm">
              {post?.createdAt && new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex space-x-4 mb-4">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src="https://randomuser.me/api/portraits/women/44.jpg"
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
            {comments.map((c, index) => (
              <div key={index} className="flex items-center mb-2">
                <img
                  className="w-8 h-8 object-cover rounded-full mr-2"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Commenter"
                />
                <p className="text-sm">{c}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
