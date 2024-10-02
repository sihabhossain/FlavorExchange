"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Phone, Mail, MapPin } from "lucide-react";

// Example team members data
const teamMembers = [
  {
    name: "Chef Alice",
    role: "Founder & Head Chef",
    photo:
      "https://img.freepik.com/free-photo/portrait-chef_23-2147868346.jpg?t=st=1724660658~exp=1724664258~hmac=9b9b24d33032f36776532e6425fc017d59135d79e434ca2708db6327b99da8c4&w=1380",
    bio: "Chef Alice has a passion for cooking and creating community through food. She believes sharing recipes brings people together.",
  },
  {
    name: "Mark Johnson",
    role: "CTO",
    photo:
      "https://img.freepik.com/free-photo/portrait-young-programmer-working-computer_23-2147866004.jpg?t=st=1724660679~exp=1724664279~hmac=59f75c0c3f186b3d47668b71e9fcf93317c113121aeec529f2954501342e6d5d&w=826",
    bio: "Mark is a tech enthusiast, ensuring our recipe-sharing platform is user-friendly and packed with features.",
  },
];

const AboutPage = () => {
  return (
    <div>
      {/* Mission Statement */}
      <section className="bg-green-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold text-green-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-green-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our mission is to create a vibrant community where food lovers can
            share, discover, and celebrate recipes from around the world.
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-green-200 py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-green-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Meet the Team
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="w-full rounded-lg bg-white p-6 text-center shadow-lg md:w-1/3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
                <h3 className="mb-2 text-xl font-semibold text-green-800">
                  {member.name}
                </h3>
                <p className="mb-4 text-green-600">{member.role}</p>
                <p className="text-green-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Milestones */}
      <section className="bg-green-100 py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-green-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our History & Milestones
          </motion.h2>
          <div className="space-y-8">
            {[
              {
                title: "Founded in 2023",
                description:
                  "We launched our platform to connect home cooks and food enthusiasts, making it easy to share and discover recipes.",
              },
              {
                title: "Over 5,000 Recipes Shared in 2024",
                description:
                  "Our community has grown rapidly, with thousands of recipes shared, making it a go-to destination for food lovers.",
              },
              // Add more milestones as needed
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-white p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center">
                  <MapPin className="mr-4 h-8 w-8 text-green-500" />
                  <h3 className="text-xl font-semibold text-green-800">
                    {milestone.title}
                  </h3>
                </div>
                <p className="text-green-600">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-green-100 py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-green-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Phone,
                title: "Phone",
                detail: "(123) 456-7890",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "info@reciperesource.com",
              },
              {
                icon: Users,
                title: "Community",
                detail: "Join our community of food lovers!",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-white p-6 text-center shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <contact.icon className="mb-4 h-8 w-8 text-green-500" />
                <h3 className="mb-2 text-xl font-semibold text-green-800">
                  {contact.title}
                </h3>
                <p className="text-green-600">{contact.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
