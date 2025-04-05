import {
  ArrowRight,
  CheckCircle2Icon,
  Loader2Icon,
  RotateCcw,
  XCircle,
} from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import apiClient from "../services/apiClient";

const Question = ({
  questionID,
  question,
  nextQuestion,
  setNextQuestionData,
  onGameComplete,
  userEmail,
}) => {
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState("unanswered"); // unanswered, correct, incorrect

  // handle answer submit
  const handleSubmit = async () => {
    setState("loading"); // Set state to loading while fetching

    try {
      const data = await apiClient.submitAnswer(questionID, answer, userEmail);

      if (data.state === true) {
        if (data.completed) {
          // If the game is completed, call the onGameComplete function
          onGameComplete(data.data);
        } else {
          setState("correct");
          setNextQuestionData({
            data: data.data,
            code: data.code,
          });
        }
      } else {
        setState("incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
      setState("error");
    }
  };

  // handle input change
  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  // handle next question button click
  const handleNextQuestion = () => {
    // Reset states and inputs
    setAnswer("");
    setState("unanswered");
    nextQuestion();
  };

  return (
    <>
      {/* question display */}
      {state === "unanswered" && (
        <div className="text-center flex flex-col items-center justify-around h-full">
          <div>
            <h2 className="text-brown-primary archivo-bold text-[26px]">
              Question
            </h2>
            <p className="text-brown-primary archivo-bold text-[24px] mt-10 leading-[170%] scroll-m-0">
              {question}
            </p>
          </div>
          <div>
            <input
              className="text-[20px] p-2 px-3 text-brown-primary w-[90%] rounded-md mt-4"
              value={answer}
              onChange={handleInputChange} // Update the state on input change
            />
            <button
              onClick={handleSubmit}
              className="inline-flex justify-center items-center archivo-bold bg-brown-primary text-white text-xl px-6 py-4 rounded-full min-w-[200px] text-center mt-10">
              Submit <ArrowRight size={24} className="inline-block ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* correct answer */}
      {state === "correct" && (
        <div className="text-center flex flex-col items-center justify-around h-full">
          <div className="flex flex-col gap-2 justify-center items-center">
            <CheckCircle2Icon color="white" size={60} fill="green" />
            <h2 className="archivo-bold text-brown-primary text-[28px]">
              Correct!
            </h2>
          </div>
          <button
            onClick={handleNextQuestion} // Call handleNextQuestion to reset the component
            className="inline-flex justify-center items-center archivo-bold bg-brown-primary text-white text-xl px-6 py-4 rounded-full min-w-[200px] text-center mt-10">
            Next Question <ArrowRight size={24} className="inline-block ml-2" />
          </button>
        </div>
      )}

      {/* wrong answer */}
      {state === "incorrect" && (
        <div className="text-center flex flex-col items-center justify-around h-full">
          <div className="flex flex-col gap-2 justify-center items-center">
            <XCircle color="white" size={60} fill="red" />
            <h2 className="archivo-bold text-brown-primary text-[28px]">
              Incorrect!
            </h2>
          </div>
          <button
            onClick={() => setState("unanswered")} // Reset component when trying again
            className="inline-flex justify-center items-center archivo-bold bg-brown-primary text-white text-xl px-6 py-4 rounded-lg min-w-[200px] text-center mt-10">
            Try again <RotateCcw size={24} className="inline-block ml-2" />
          </button>
        </div>
      )}

      {/* loading */}
      {state === "loading" && (
        <div className="text-center flex flex-col items-center justify-around h-full">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className="archivo-bold text-brown-primary text-[28px] mb-6">
              Loading
            </h2>
            <Loader2Icon color="orange" size={60} className="animate-spin" />
          </div>
        </div>
      )}

      {/* error */}
      {state === "error" && (
        <div className="text-center flex flex-col items=center justify-around h-full">
          <div className="flex flex-col gap-2 justify-center items=center">
            <XCircle color="white" fill="red" size={60} />
            <h2 className="archivo-bold text-brown-primary text=[28px] mt-6">
              An error occurred while submitting the answer
            </h2>
          </div>
          <button
            onClick={handleNextQuestion} // Reset component on error retry
            className="inline-flex justify-center items=center archivo-bold bg-brown-primary text-white text-xl px-6 py-4 rounded-lg min-w=[200px] text-center mt-10">
            Try again <RotateCcw size={24} className="inline-block ml-2" />
          </button>
        </div>
      )}
    </>
  );
};

Question.propTypes = {
  questionID: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  setNextQuestionData: PropTypes.func.isRequired,
  onGameComplete: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default Question;
