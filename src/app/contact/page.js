"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n51etsk", // Replace with your EmailJS Service ID
        "template_0wbt1vs", // Replace with your EmailJS Template ID
        form.current,
        "bzmwZT1MV-J1sAEwg" // Replace with your Public Key from EmailJS
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          console.log(result.text);
        },
        (error) => {
          setStatus("Error sending message.");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Get in Touch
            </h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>

            {status && (
              <div
                className={`mt-4 text-center font-medium ${
                  status === "Message sent successfully!"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {status}
              </div>
            )}
          </div>

          {/* Google Maps Embed */}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Our Office Location
            </h3>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAbeTIYDaCLbev-GrI5TTmp8U9VhSv1OkA&q=12.9108,74.8987&zoom=15"
              width="100%"
              height="100%"
              className="rounded-lg shadow-md w-full h-96"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
