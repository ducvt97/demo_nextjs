"use client";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import React, { FormEvent, useState } from "react";
import Button from "../buttons/Button";

interface IContactForm {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}
const defaultModel: IContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const PropertyContactForm = () => {
  const [model, setModel] = useState(defaultModel);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setModel((prevModel) => ({
      ...prevModel,
      [e.currentTarget.id]: e.currentTarget.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            className="input"
            id="name"
            placeholder="Enter your name"
            required
            type="text"
            value={model.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="input"
            id="email"
            placeholder="Enter your email"
            required
            type="email"
            value={model.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="phone">
            Phone:
          </label>
          <input
            className="input"
            id="phone"
            placeholder="Enter your phone number"
            type="text"
            value={model.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="message">
            Message:
          </label>
          <textarea
            className="input"
            id="message"
            placeholder="Enter your message"
            value={model.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <Button iconLeft={faPaperPlane} type="submit" className="w-full">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
