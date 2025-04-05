import { useEffect, useState } from "react";
import Question from "../components/Question";
import { API_URL } from "../constants";

import { useUser } from "@clerk/clerk-react";
import QRScanner from "../components/QRScanner";
import { RefreshCw, RotateCcw } from "lucide-react";

const GamePage = () => {
  const [nextOperation, setNextOperation] = useState("waiting"); // 'waiting', 'scan', 'question', 'clue', 'error', "completed"
  const [question, setQuestion] = useState("");
  const [questionID, setQuestionID] = useState(null);
  const [nextQuestionData, setNextQuestionData] = useState({
    data: "",
    code: "",
    completed: false,
  });
  const [isError, setIsError] = useState(false);
  const [clue, setClue] = useState("");
  const [invalidClue, setInvalidClue] = useState(false);
  const [place, setPlace] = useState("");
  const { user, isLoaded } = useUser();

  // 1. initial fetch to get the first clue (QR code)
  useEffect(() => {
    if (isLoaded) {
      console.log(user.primaryEmailAddress.emailAddress);
      setNextOperation("waiting");
      fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "init",
          user_id: user.primaryEmailAddress.emailAddress,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("response: ", data);
          if (data.completed === true) {
            setNextOperation("completed");
          } else if (
            data.state === false &&
            data.data === "All locations hav  e already been scanned." &&
            data.operation === "error"
          ) {
            setNextOperation("completed");
            console.log("completed");
          } else if (data.operation === "qr" || data.operation === "question") {
            setClue(data.data);
            setNextOperation(data.operation);
          }
        })
        .catch((error) => {
          setIsError(true);
          console.error("Error:", error);
        });
    }
  }, [isLoaded, user]); // Dependency array includes isLoaded and user to ensure correct behavior

  // handle submit QR clue
  // once the code is sent, it returns a question with question id
  function handleQRClueSubmit(code) {
    fetch(`${API_URL}/users/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operation: "qr",
        code: code,
        answer: "",
        user_id: user.primaryEmailAddress.emailAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response: ", data);

        // if (data.state === true) {
        //   if (data.completed === true) {
        //     setNextOperation("completed");
        //   } else if (data.operation === "question") {
        //     setNextOperation(data.operation);
        //     setQuestion(data.data);
        //     setQuestionID(data.question_id);
        //   }
        // } else {
        //   setInvalidClue(true);
        //   setNextOperation("wrongclue");
        // }
      })
      .catch((error) => {
        setIsError(true);
        console.error("Error:", error);
      });
  }

  function handleNextQuestion() {
    setNextOperation("qr");
    // update clue state
    setClue(nextQuestionData.data);
  }

  function setNextQuestion(data) {
    setNextQuestionData(data);
  }

  function setGameComplete(data) {
    setNextOperation("completed");
    setPlace(data);
  }

  return (
    <>
      {/* {isError && (
        <div className="text-center text-3xl bokor text-brown-primary h-full flex justify-center items-center">
          Error connecting to server 😢
        </div>
      )} */}
      {!isError && (
        <main className="h-full">
          {nextOperation === "waiting" && (
            <div className="text-center text-xl bokor text-brown-primary h-full flex flex-col justify-center items-center">
              Waiting for server 🧐
              <RefreshCw
                color="brown"
                size={60}
                className="animate-spin mt-10"
              />
            </div>
          )}

          {/* wrong clue */}
          {invalidClue && (
            <div className="text-center text-xl archivo-light text-brown-primary h-full flex flex-col justify-center items-center">
              <p className="text-2xl archivo-bold">
                Oops!
                <br />
                That wasn&apos;t the right clue
              </p>
              <span className="text-[64px] mt-16 mb-10">🫣</span>

              <button
                onClick={() => {
                  setInvalidClue(false);
                  setNextOperation("qr");
                }}
                className="inline-flex justify-center items-center archivo-bold bg-brown-primary text-white text-xl px-6 py-4 rounded-full min-w-[200px] text-center mt-10">
                Try again <RotateCcw size={24} className="inline-block ml-2" />
              </button>
            </div>
          )}

          {!invalidClue && nextOperation === "question" && (
            <Question
              questionID={questionID}
              question={question}
              nextQuestion={handleNextQuestion}
              setNextQuestionData={setNextQuestion}
              onGameComplete={setGameComplete}
              userEmail={user.primaryEmailAddress.emailAddress}
            />
          )}

          {!invalidClue && nextOperation === "qr" && (
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl archivo-bold text-brown-primary mb-10 mt-10 px-10">
                {clue}
              </h2>
              <QRScanner clue={clue} handleQRSubmit={handleQRClueSubmit} />
            </div>
          )}

          {nextOperation === "completed" && (
            <div className="text-center text-xl archivo-light text-brown-primary h-full flex flex-col justify-center items-center">
              <span className="text-[64px] mt-16 mb-10">🎉</span>
              <p className="text-2xl archivo-bold">
                Congrats!
                <br />
                You have completed the
                <br />
                Treasure Hunt!
              </p>
              {place && (
                <>
                  <p className="text-[100px] archivo-bold mt-10 mb-10">
                    {place}
                  </p>
                  <p>Place</p>
                </>
              )}
            </div>
          )}
        </main>
      )}
      <ScannerComponent clue={clue} handleQRSubmit={handleQRClueSubmit} />
    </>
  );
};

export default GamePage;
