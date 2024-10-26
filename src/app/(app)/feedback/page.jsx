// feedback/FeedbackForm.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // For demonstration, log the feedback data to the console
    console.log("Feedback Submitted:", { name, email, feedback });

    // Here, implement an API call to submit feedback if needed
    // Example: await fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ name, email, feedback }) });

    // Clear the form and show a submission message
    setName('');
    setEmail('');
    setFeedback('');
    setSubmissionMessage('Thank you for your feedback!');
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-black text-center">
      <h2 className="text-4xl font-bold mb-8 text-red-600 dark:text-red-400">
        We Value Your Feedback
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        Please share your thoughts on our security measures and how we can improve.
      </p>
      <form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-left font-semibold">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg w-full px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-left font-semibold">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg w-full px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block text-left font-semibold">Your Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border rounded-lg w-full px-4 py-2"
            rows="4"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Submit Feedback
        </Button>
      </form>
      {submissionMessage && <p className="mt-4 text-green-500">{submissionMessage}</p>}
    </section>
  );
};

export default FeedbackForm;

