import { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { ref, onValue } from "firebase/database";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
console.log(feedbacks);
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="space-y-4">
    {feedbacks.length === 0 ? (
      <p className="text-center text-gray-500">No feedback yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((f, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 w-full md:w-80">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{capitalizeFirstLetter(f.name)}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{capitalizeFirstLetter(f.email)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(f.createdAt).toLocaleString()}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{capitalizeFirstLetter(f.message)}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}
