import { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { ref, onValue } from "firebase/database";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const feedbacksRef = ref(database, 'feedback');
    onValue(feedbacksRef, (snapshot) => {
        const feedbacksList = [];
        snapshot.forEach((childSnapshot) => {
            const feedback = childSnapshot.val();
            feedbacksList.push({ id: childSnapshot.key, ...feedback });
        });
        setFeedbacks(feedbacksList);
    });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="space-y-4">
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map((f, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="font-semibold">{f.name} — {f.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(f.timestamp).toLocaleString()}</p>
            <p className="mt-2">{f.message}</p>
          </div>
        ))
      )}
    </div>
  );
}
