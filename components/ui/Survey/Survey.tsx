"use client";

import { useContext, useState } from "react";
import UserContext from "@/modules/providers/UserProvider";

function Survey() {
  const { user } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    understanding: "",
    easeOfReview: "",
    recommend: "",
    comment: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log("user in survey", user);
  console.log("form", form)
  return (
    <section>
      {!submitted ? (
        <form
          onSubmit={console.log("sublitted")}
          className="w-full max-w p-6 mt-6 bg-white rounded-2xl shadow-lg space-y-4"
        >
          <p className="text-lg font-semibold text-center">
            Before you go, could you answer 3 quick questions? (it takes less than 10 seconds)
          </p>

          {/* Question 1 */}
          <div>
            <label className="block font-medium">
              1. Did you understand what this website is about?
            </label>
            <div className="flex gap-4 mt-2">
              {["Yes", "Not sure", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="understanding"
                    value={opt}
                    onChange={handleChange}
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block font-medium">
              2. How easy was it to leave a review?
            </label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name="easeOfReview"
                    value={num}
                    onChange={handleChange}
                    required
                  />
                  {num}
                </label>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <label className="block font-medium">
              3. Would you recommend Neighbours Voices to a friend?
            </label>
            <div className="flex gap-4 mt-2">
              {["Yes", "Maybe", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="recommend"
                    value={opt}
                    onChange={handleChange}
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* Optional Comment */}
          <div>
            <label className="block font-medium">
              If something was confusing or hard, could you tell us what it was? (optional)
            </label>
            <textarea
              name="comment"
              className="w-full mt-2 p-2 border rounded-lg"
              rows={3}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 rounded-full"
          >
            Send feedback
          </button>
        </form>
      ) : (
        <p className="text-green-600 mt-4">✅ Thanks for your feedback!</p>
      )}
    </section>
  );
}

export default Survey;
