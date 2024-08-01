"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4
import { generateContent } from "./(helpers)/generateContent";


interface FormData {
  posts: string;
}

const App: React.FC = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm<FormData>();
  const [results, setResults] = useState<string>("");

  const onSubmit = handleSubmit(async (data: FormData) => {
    const newResults = await generateContent(data.posts);
    const extractedText = newResults.candidates[0].content.parts[0].text;
    setResults(extractedText);
    reset();
  });

  return (
    <div className="flex flex-col items-center justify-center bg-blue-500 h-screen p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Job Post Analysis</h1>
        <p>
          Enter job posts below, one per line. The application will analyze the
          posts and present the stats on the years of experience required for
          each role.
        </p>
      </div>
      <form onSubmit={onSubmit} className="w-full max-w-md bg-blue-500">
        <textarea
          {...register("posts", { required: true })}
          placeholder="Enter job posts here, one per line"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        {errors.posts && (
          <p className="text-red-500 mb-4">
            This field is required
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Analyze
        </button>
      </form>
      {results && (
        <div className="mt-8 text-center bg-blue-500">
          <h2 className="text-2xl font-bold">Results</h2>
          <pre className="text-left bg-blue-500 p-4 rounded container">{results}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
