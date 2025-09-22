import React, { useState } from "react";

interface InputFormProps {
  onSubmit: (target: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const validateInput = (value: string): boolean => {
    // Matches format like A1-J10 (case insensitive)
    const pattern = /^[A-Ja-j](?:[1-9]|10)$/;
    return pattern.test(value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedInput = input.toUpperCase();

    if (validateInput(formattedInput)) {
      onSubmit(formattedInput);
      setInput("");
      setError("");
    } else {
      setError(
        "Invalid input! Please use format like A1 (A-J followed by 1-10)"
      );
    }
  };

  return (
    <div className="mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex gap-2 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., A5"
            maxLength={3}
            className={`w-25 px-3 py-3 text-center border-2 rounded-lg 
                       ${error ? "border-red-500" : "border-gray-300"}`}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 hover:border-white"
          >
            Fire!
          </button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
};

export default InputForm;
