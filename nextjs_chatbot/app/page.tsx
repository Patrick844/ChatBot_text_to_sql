"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/utils.auth";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setloader] = useState(false);
  const [question, setQuestion] = useState<string[]>([]);
  const [answer, setAnswer] = useState<any[]>([]);
  // State to manage the input value
  const [inputValue, setInputValue] = useState("");
  // Function to handle input change
  const handleInputChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  console.log("page");
  const handleSend = () => {
    setQuestion((prevItems) => [...prevItems, inputValue]);
  };

  useEffect(() => {
    const fetchData = async (query: string) => {
      const { encodedCookie } = await getCookie();
      try {
        const result = await axios.post(
          "http://localhost:3000/api/query",
          {
            query: query
          },
          {
            headers: {
              Cookie: `${encodedCookie}`
            }
          }
        );
        console.log(result.data.result);
        return result; // Return the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Throw error to handle it in handleSend
      }
    };
    const fetchDataAndProcess = async () => {
      try {
        console.log("question");
        const query = inputValue; // Provide your query here
        setInputValue("");
        const result = await fetchData(query);
        console.log(result.data.result);
        setAnswer((prevItems) => [...prevItems, result.data.result]);
        // Process the fetched data here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (question.length != 0) {
      fetchDataAndProcess();
    }
  }, [question]);

  const loadModel = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/loadModel");
      setSuccessMessage(response.data.message);
      if (response.data.message === "Model Loaded Succesfully") {
        setShowSuccess(true);
      }
      // Reset showSuccess to false after 5 seconds (for example)
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div>
      {showSuccess && (
        <div className="flex items-center bg-green-100 rounded-md p-4 mb-4">
          <svg
            className="h-6 w-6 text-green-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}

      {successMessage != "" && (
        <div className="grid grid-rows-8 grid-cols-6 min-h-screen">
          <div className="row-span-7 col-start-2 col-span-4 mt-2">
            <div className="text-black">
              {/* {question.length > 0 && <p>{question}</p>}
          {answer.length > 0 && <p>{answer}</p>} */}
              {question.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-4 mb-10 rounded-lg "
                >
                  <div className="self-start bg-blue-500 text-white rounded-lg inline-bloc p-1">
                    {question[index]}
                  </div>

                  <div className="self-end bg-gray-200 text-left rounded-lg inline-bloc p-1">
                    <div dangerouslySetInnerHTML={{ __html: answer[index] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" row-start-8 row-span-2 col-start-2 col-span-4 mb-1 flex justify-center items-center">
            <input
              className="text-black border-2 border-gray-300 border-solid rounded-xl w-3/4 p-1  "
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-600 focus:outline-none ml-1"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
