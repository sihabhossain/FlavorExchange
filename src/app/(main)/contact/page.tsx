"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneIcon, MapPinIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { Input } from "@/components/ui/input"; // Adjust the import path as needed
import { Textarea } from "@/components/ui/textarea"; // Adjust the import path as needed

const ContactUsPage = () => {
  return (
    <div>
      {/* Contact Information */}
      <section className="bg-green-50 py-16">
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
                icon: PhoneIcon,
                title: "Phone",
                detail: "(123) 456-7890",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "info@recipeshare.com",
              },
              {
                icon: MapPinIcon,
                title: "Address",
                detail: "123 Recipe Lane, Flavor Town, FT 54321",
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
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {contact.title}
                </h3>
                <p className="text-gray-600">{contact.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-green-100 py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold text-green-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          <form className="max-w-lg mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700" htmlFor="name">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="border-green-400 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="email">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="border-green-400 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="message">
                  Message
                </label>
                <Textarea
                  name="message"
                  id="message"
                  required
                  className="border-green-400 focus:border-green-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-200"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
