"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  MessageCircle,
  Share,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SharePostModal } from "../modals/SharePost";
import Link from "next/link";

const PostCard = () => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const handleCommentSubmit = () => {};

  return (
    <Link href={`/post/${1}`}>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
        {/* Header */}
        <div className="flex items-center px-6 py-4">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src="https://i.ibb.co.com/tpkfQ7d/Screenshot-9.png"
            alt="Profile"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Mrinmoyee</h2>
            <p className="text-sm text-gray-500">
              is feeling happy with{" "}
              <span className="text-blue-500">@sihab</span>
            </p>
          </div>
          <button className="ml-auto">
            <MoreHorizontal className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Image */}
        <img
          className="w-full h-80 object-cover"
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
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
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="w-6 h-6 mr-2" /> 45
              </button>
              <SharePostModal />
            </div>
            <div className="text-gray-500">
              <p className="text-sm">1 day ago</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
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
        )}
      </div>
    </Link>
  );
};

export default PostCard;