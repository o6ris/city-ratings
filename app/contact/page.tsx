"use client";

import { useContext, useState } from "react";
import useContact from "@/modules/hooks/contact/useContact";
import Input from "@/components/core/inputs/Input";
import Textarea from "@/components/core/inputs/Textarea";
import NotificationContext from "@/modules/providers/ToastProvider";

function Contact() {
  const { handleNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { postContact } = useContact();
  return (
    <section className="mt-10 lg:mt-0">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p className="text-medium">
          If you have any questions or feedback, please fill out the form below.
        </p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await postContact(formData);
            handleNotification(
              "Your message has been sent successfully!",
              true
            );
            setFormData({ name: "", email: "", message: "" });
          } catch (error) {
            if (error instanceof Error) {
              console.error("Failed to send message:", error);
              handleNotification(error.message, false);
            } else {
              console.error("An unexpected error occurred:", error);
              handleNotification("An unexpected error occurred", false);
            }
          }
        }}
        className=" flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 mt-6 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Input
              name="Name"
              type="text"
              value={formData.name}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  name: value,
                }))
              }
              placeholder="Alice Smith"
              className="bg-neutral w-full p-4 rounded-lg shadow-md border border-base-200"
            />
            <Input
              name="Email"
              type="email"
              value={formData.email}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  email: value,
                }))
              }
              placeholder="alice.smith@gmail.com"
              className="bg-neutral w-full p-4 rounded-lg shadow-md border border-base-200"
            />
          </div>
          <Textarea
            name="Message"
            value={formData.message}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                message: value,
              }))
            }
            placeholder="What would you like to tell us?"
            className="bg-neutral w-full h-32  p-4 rounded-lg shadow-md border border-base-200 lg:h-full"
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary text-primary rounded-full mt-8"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default Contact;
