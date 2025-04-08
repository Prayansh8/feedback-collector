'use client'
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Feedback Collector</h1>

        <div className="flex justify-between items-center mb-6">
          <ToggleButton onClick={() => setShowAdmin(!showAdmin)} showAdmin={showAdmin} />
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="px-3 py-2 border rounded"
          >
            Toggle Theme
          </button>
        </div>

        {showAdmin ? <FeedbackList /> : <FeedbackForm />}

        <footer className="mt-10 text-center text-xs opacity-60">
          Built by <strong>Prayansh Gupta</strong> · April 2025 · Feedback Collector Task
        </footer>
      </div>
    </main>
  );    
}
    