"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PostDetails = () => {
  const router = useRouter();

  const { id } = useParams();

  console.log(id);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  // Sample data (you would replace this with actual data from an API)
  const post = {
    author: "Phillip Tønder",
    content: "is feeling happy with @johndoe",
    description:
      "This is the description of the post. It provides additional context and information about the content shared in the post.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    createdAt: "1 day ago",
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment(""); // Clear the input after submission
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      {/* Header */}

      <div className="flex items-center px-6 py-4">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{post.author}</h2>
          <p className="text-sm text-gray-500">{post.content}</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className="text-gray-700">{post.description}</p>
      </div>

      {/* Image */}
      <img
        className="w-full h-80 object-cover"
        src={post.imageUrl}
        alt="Post content"
      />

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
            <p className="text-sm">{post.createdAt}</p>
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
