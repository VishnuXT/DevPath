import QuizScreen from "../components/QuizScreen";
import { QuizQuestion } from "../quiz/types";

const demoQuestionBank: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a website?",
    options: ["A set of pages in a browser", "A computer part", "A text editor", "A database"],
    correctAnswer: "A set of pages in a browser",
    explanation: "A website is made of web pages.",
  },
  {
    id: 2,
    question: "Which language gives a web page structure?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correctAnswer: "HTML",
    explanation: "HTML builds the page structure.",
  },
  {
    id: 3,
    question: "Which language changes the look of a page?",
    options: ["CSS", "HTML", "SQL", "JSON"],
    correctAnswer: "CSS",
    explanation: "CSS controls styling.",
  },
  {
    id: 4,
    question: "Which language adds interactivity?",
    options: ["JavaScript", "HTML", "CSS", "XML"],
    correctAnswer: "JavaScript",
    explanation: "JavaScript makes pages interactive.",
  },
  {
    id: 5,
    question: "What is a heading tag often used for?",
    options: ["A title", "An image", "A list", "A link"],
    correctAnswer: "A title",
    explanation: "Headings mark titles.",
  },
  {
    id: 6,
    question: "What does padding do?",
    options: ["Adds space inside a box", "Adds space outside a box", "Deletes text", "Changes the browser"],
    correctAnswer: "Adds space inside a box",
    explanation: "Padding adds inside space.",
  },
  {
    id: 7,
    question: "What does Flexbox help with?",
    options: ["Arranging items", "Saving data", "Making photos", "Loading fonts"],
    correctAnswer: "Arranging items",
    explanation: "Flexbox arranges content.",
  },
  {
    id: 8,
    question: "What is a media query for?",
    options: ["Different screen sizes", "Database saving", "Image editing", "Color picking"],
    correctAnswer: "Different screen sizes",
    explanation: "Media queries support responsive design.",
  },
  {
    id: 9,
    question: "What is a variable?",
    options: ["A place to store data", "A link tag", "A border", "A browser tab"],
    correctAnswer: "A place to store data",
    explanation: "Variables hold values.",
  },
  {
    id: 10,
    question: "What does the DOM let JavaScript do?",
    options: ["Change page content", "Create databases", "Draw logos", "Print paper"],
    correctAnswer: "Change page content",
    explanation: "The DOM lets code update the page.",
  },
];

export default function QuizRoute() {
  return (
    <QuizScreen
      moduleName="Quiz Demo"
      subtitle="This is the reusable quiz screen in the app."
      questionBank={demoQuestionBank}
      onComplete={() => {
        // The reusable screen already shows the result state.
      }}
      onExit={() => {
        // The built-in back button is enough for this demo route.
      }}
    />
  );
}
