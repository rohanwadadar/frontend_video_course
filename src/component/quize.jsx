import { useState } from "react";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which CSS framework follows utility-first approach?",
    options: ["Bootstrap", "Material UI", "Tailwind CSS", "Bulma"],
    answer: 2,
  },
  {
    question: "Which React hook is used for state management?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    answer: 1,
  },
  {
    question: "What is JSX?",
    options: [
      "Java Syntax Extension",
      "JavaScript XML",
      "JSON XML",
      "Java Source Extension",
    ],
    answer: 1,
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    answer: 2,
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "text-color", "color", "foreground"],
    answer: 2,
  },
  {
    question: "Which method renders React elements?",
    options: ["render()", "ReactDOM.render()", "mount()", "display()"],
    answer: 1,
  },
  {
    question: "CSS stands for?",
    options: [
      "Colorful Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
    ],
    answer: 1,
  },
  {
    question: "Which attribute applies CSS class in JSX?",
    options: ["class", "classname", "className", "style"],
    answer: 2,
  },
  {
    question: "Largest HTML heading tag?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2,
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center">
      
      {/* SLIGHTLY RIGHT & BIGGER CONTAINER */}
      <div className="w-full flex justify-start pl-24">
        <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-6">
          
          {!showResult ? (
            <>
              <h2 className="text-xl font-semibold mb-2">
                Question {current + 1} / {questions.length}
              </h2>

              <p className="text-gray-700 text-base mb-4">
                {questions[current].question}
              </p>

              <div className="space-y-3">
                {questions[current].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelected(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition text-base
                      ${
                        selected === index
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {current === questions.length - 1 ? "Finish Quiz" : "Next"}
              </button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>

              <p className="text-base mb-2">
                Your Score:{" "}
                <span className="font-bold text-indigo-600">
                  {score} / {questions.length}
                </span>
              </p>

              <p className="text-gray-600 text-base mb-6">
                {score >= 7
                  ? "Excellent work!"
                  : score >= 4
                  ? "Good effort!"
                  : "Keep practicing!"}
              </p>

              <button
                onClick={() => {
                  setCurrent(0);
                  setScore(0);
                  setSelected(null);
                  setShowResult(false);
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-purple-700"
              >
                Restart Quiz
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
