'use client'
import { feedbacks } from "../components/FeedbackList";

export default function handler(req, res) {
  res.status(200).json({ feedbacks });
}
