"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function Feedback() {
  //state
  const [data, setData] = useState(initialState);

  //navigaion
  const router = useRouter();

  //funcs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      router.push("/thank-you");
    }
  };

  const canSave = Object.values(data).every(Boolean);

  const content = (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <h1 className="text-4xl mb-4">Contact Us</h1>

      <label className="text-2xl mb-1" htmlFor="name">
        Name:
      </label>
      <input
        className="p-3 mb-6 text-2xl rounded-2xl text-black"
        type="text"
        id="name"
        name="name"
        placeholder="Jane"
        pattern="([A-Z])[\w+.]{1,}"
        value={data.name}
        onChange={handleChange}
        autoFocus
      />

      <label className="text-2xl mb-1" htmlFor="email">
        Email:
      </label>
      <input
        className="p-3 mb-6 text-2xl rounded-2xl text-black"
        type="email"
        id="email"
        name="email"
        placeholder="Jane@yoursite.com"
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        value={data.email}
        onChange={handleChange}
      />

      <label className="text-2xl mb-1" htmlFor="message">
        Message:
      </label>
      <textarea
        className="p-3 mb-6 text-2xl rounded-2xl text-black"
        id="message"
        name="message"
        placeholder="Your message here..."
        rows={5}
        cols={33}
        value={data.message}
        onChange={handleChange}
      />

      <button
        className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
        disabled={!canSave}
      >
        Submit
      </button>
    </form>
  );

  return content;
}
