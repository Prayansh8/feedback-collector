import { useState } from "react";
import { db, database } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const feedbackOptions = [
    "Great service!",
    "I had a wonderful experience.",
    "The product quality is excellent.",
    "I would recommend this to others.",
    "I am not satisfied with the service.",
  ];

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "message") {
      const input = e.target.value.toLowerCase();
      const filteredSuggestions = feedbackOptions.filter(option =>
        option.toLowerCase().includes(input)
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const selectSuggestion = (suggestion) => {
    setForm({ ...form, message: suggestion });
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);
    try {
      const newFeedbackId = Date.now();
      const currentDateTime = new Date().toISOString();
      await addDoc(collection(db, "feedbacks"), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: currentDateTime,
      });

      const feedbackRef = ref(database, 'feedback/' + newFeedbackId);
      await set(feedbackRef, {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: currentDateTime,
      });

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {submitted && <p className="text-green-600">Thanks for your feedback!</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={form.email}
        onChange={handleChange}
      />
      <div className="relative">
        <textarea
          name="message"
          placeholder="Your Feedback"
          className="w-full p-2 border rounded h-24"
          value={form.message}
          onChange={handleChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-blue-950 border rounded shadow mt-1 w-full">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-800"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
