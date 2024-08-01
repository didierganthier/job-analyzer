"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4
import analyzeJobPosts from "./(helpers)/analyzeJobPosts";


interface FormData {
  posts: string;
}

const App: React.FC = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm<FormData>();
  const [results, setResults] = useState<{ [key: number]: number }>({});

  const onSubmit = handleSubmit((data: FormData) => {
    const newResults = analyzeJobPosts(data.posts.split("\n"));
    setResults(newResults);
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
      <form onSubmit={onSubmit} className="w-full max-w-md">
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
      {Object.keys(results).length > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Results</h2>
          <ul>
            {Object.entries(results).map(([years, count]) => (
              <li key={uuidv4()}>
                {years} years of experience: {count} job post(s)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
