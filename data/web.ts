import { CareerPath } from "./types";

export const webPath: CareerPath = {
  id: "web",
  title: "Web Development",
  emoji: "🌐",
  description: "Web development focuses on building visual interfaces, interactive components, and responsive experiences for browsers.",
  skills: [
    "HTML5 Structure & Semantic Layouts",
    "CSS3 Layouts, Animations & Responsive Design",
    "JavaScript ES6+ Programming",
    "React Library Framework",
    "Asset Bundling & Development Tools (Vite)"
  ],
  technologies: [
    { name: "HTML", emoji: "🏷️" },
    { name: "CSS", emoji: "🎨" },
    { name: "JavaScript", emoji: "⚡" },
    { name: "React", emoji: "⚛️" },
    { name: "Vite", emoji: "📦" }
  ],
  learningTimeline: "3 - 5 Months",
  careerOpportunities: [
    "Frontend Developer",
    "Web Developer",
    "UI Engineer",
    "React Developer"
  ],
  roadmap: [
    {
      id: "html-css-basics",
      title: "HTML & CSS Basics",
      description: "Learn how to structure web pages using HTML elements and style them using basic CSS properties.",
      lessons: [
        {
          id: "html-tags",
          title: "HTML Tags & Document Structure",
          explanation: "HTML (HyperText Markup Language) is the standard skeleton of every webpage. It uses tags (like <h1>, <p>, <div>, and <a>) to define content. Semantic tags like <header>, <main>, and <footer> inform the browser and search engines about the structural content layout, improving SEO.",
          codeExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>Welcome to DevPath</h1>
    <p>HTML is easy to learn!</p>
  </body>
</html>`,
          quiz: {
            question: "Which tag is used to define the primary heading of a page?",
            options: ["<heading>", "<h6>", "<h1>", "<title>"],
            answerIndex: 2
          }
        },
        {
          id: "css-styling",
          title: "CSS Styling and Colors",
          explanation: "CSS (Cascading Style Sheets) is used to style and lay out web pages. You select HTML elements and apply properties like background-color, font-size, margin, padding, and border to define visual appearances.",
          codeExample: `/* Styles the h1 tag */
h1 {
  color: #2563eb;
  font-size: 24px;
  margin-bottom: 15px;
}`,
          quiz: {
            question: "Which CSS property is used to change the text color of an element?",
            options: ["text-color", "color", "font-color", "style-color"],
            answerIndex: 1
          }
        }
      ]
    },
    {
      id: "responsive-design",
      title: "Responsive Design & Flexbox",
      description: "Master flexible layouts, grids, media queries, and responsive structures for mobile and desktop screens.",
      lessons: [
        {
          id: "flexbox-layouts",
          title: "Flexbox and Layouts",
          explanation: "Flexbox (Flexible Box Layout) is a one-dimensional layout model that makes it easy to align, distribute, and space elements in columns or rows. By applying 'display: flex' on a container, you gain access to positioning properties like 'justify-content' (align along main axis) and 'align-items' (align along cross axis).",
          codeExample: `.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}`,
          quiz: {
            question: "Which property activates Flexbox on a container?",
            options: ["display: block", "display: flex", "flex-direction: row", "align: flex"],
            answerIndex: 1
          }
        }
      ]
    },
    {
      id: "js-fundamentals",
      title: "JavaScript Fundamentals",
      description: "Learn standard programming syntax, variables, loop types, functions, and manipulating DOM elements.",
      lessons: [
        {
          id: "js-variables-dom",
          title: "Variables, Functions, and the DOM",
          explanation: "JavaScript brings web pages to life by adding interactivity. You declare variables with 'let' and 'const', write operations using conditional blocks, and use the Document Object Model (DOM) API to programmatically read/update HTML elements based on user events (like button clicks).",
          codeExample: `// Select a button element
const btn = document.getElementById("myBtn");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  document.getElementById("counter-text").innerText = count;
});`,
          quiz: {
            question: "Which keyword is used to declare a variable that cannot be reassigned?",
            options: ["let", "const", "var", "immutable"],
            answerIndex: 1
          }
        }
      ],
      projects: [
        {
          id: "interactive-counter",
          title: "Interactive Counter Page",
          description: "Build a web page with increase, decrease, and reset buttons that dynamically update a counter number.",
          requirements: [
            "Create an HTML layout displaying a count number.",
            "Write CSS to center align elements and style the buttons nicely.",
            "Add JavaScript listeners for click events to increment, decrement, and reset the counter value."
          ],
          folderStructure: `counter/
├── index.html
├── style.css
└── app.js`,
          guide: "1. Link your `app.js` and `style.css` in the HTML head.\n2. In JS, select the buttons and the counter paragraph element using querySelector.\n3. Keep a mutable `let count = 0` variable. Update the innerText of the paragraph on every button click."
        }
      ]
    },
    {
      id: "react-core",
      title: "React Core Concepts",
      description: "Transition to React. Undergo component styling, passing properties, and managing reactivity with hooks.",
      lessons: [
        {
          id: "react-components-state",
          title: "Components, Props, and State",
          explanation: "React is a popular UI library based on reusable component blocks. Props are read-only properties passed down from parents, while State is local mutable data managed within the component. The 'useState' hook is used to declare state variables that re-render the component automatically when modified.",
          codeExample: `import React, { useState } from 'react';

function CounterButton({ label }) {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {label}: {count}
    </button>
  );
}`,
          quiz: {
            question: "Which React hook is used to create reactive, mutable values inside a functional component?",
            options: ["useEffect", "useState", "useContext", "useRef"],
            answerIndex: 1
          }
        }
      ],
      projects: [
        {
          id: "todo-web",
          title: "Todo App (React)",
          description: "Build a client-side Todo web app where users can add, toggle, and delete todo tasks.",
          requirements: [
            "Use React components to structure your app (TodoList, TodoItem, TodoForm).",
            "Store todos in a state array. Allow users to add a new todo and mark it complete.",
            "Permit deleting items from the list."
          ],
          folderStructure: `todo-react/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   └── index.css
├── package.json
└── index.html`,
          guide: "1. Create an array of object models for todos: `{ id: number, text: string, completed: boolean }`.\n2. Pass state callbacks as props from `App.jsx` down to children components.\n3. Make sure to use key properties on array mappings to help React perform efficient re-renders."
        }
      ]
    },
    {
      id: "vite-setup",
      title: "Vite & React Setup",
      description: "Understand the modern build pipelines, scaffolding applications, and production bundling.",
      lessons: [
        {
          id: "vite-scaffolding",
          title: "Modern Build Tools & Folder Structure",
          explanation: "Vite is a fast development server and build tool that replaces older pipelines like Create React App. It bundles assets efficiently using ES modules. A typical Vite React project has a specific structure: node_modules for dependencies, src for code, index.html at root, and vite.config.js for configurations.",
          codeExample: `# Scaffold a project using Vite
# npm create vite@latest my-app -- --template react`,
          quiz: {
            question: "What is Vite primarily used for in modern React development?",
            options: [
              "Managing databases",
              "Fast development serving and bundle building",
              "Writing unit tests",
              "Hosting servers on the cloud"
            ],
            answerIndex: 1
          }
        }
      ],
      projects: [
        {
          id: "portfolio-website",
          title: "Developer Portfolio Website",
          description: "Design and build a multi-section responsive portfolio website showcasing your bio, skills, and projects.",
          requirements: [
            "Scaffold a React application using Vite.",
            "Build reusable React components for Header, Hero, Skills, Projects, and Contact sections.",
            "Make it fully responsive using responsive CSS grid or flex layouts."
          ],
          folderStructure: `portfolio/
├── src/
│   ├── components/
│   │   ├── Contact.jsx
│   │   ├── Header.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── App.jsx
│   └── index.css
├── index.html
└── package.json`,
          guide: "1. Outline your sections before coding.\n2. Design clean cards for your project showcases.\n3. Use state to build a mobile navigation menu toggle for narrow screens."
        }
      ]
    },
    {
      id: "react-apis",
      title: "APIs in React",
      description: "Connect your front-end components to server-side APIs using fetching operations and rendering cycles.",
      lessons: [
        {
          id: "useEffect-fetching",
          title: "Fetching Data with useEffect",
          explanation: "React components interact with the external world using side effects. The 'useEffect' hook executes actions (like loading remote data from REST APIs) when a component mounts. Combined with standard fetch() or Axios, you store the output in state variables to display on screen.",
          codeExample: `import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []); // Empty dependency array runs once on mount

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
          quiz: {
            question: "Which dependency array argument triggers useEffect to run exactly once when a component mounts?",
            options: [
              "No dependency array argument",
              "An array containing all state values: [state1, state2]",
              "An empty array: []",
              "An array containing mounting states: ['mount']"
            ],
            answerIndex: 2
          }
        }
      ],
      projects: [
        {
          id: "weather-app",
          title: "Weather Search Application",
          description: "Build a weather app that consumes a public weather API to fetch temperature and forecast details by city query.",
          requirements: [
            "Incorporate a search field that collects city inputs.",
            "Perform fetch calls to openweathermap.org API.",
            "Display visual indicators: loading status, error messages, temperature, wind speeds, and custom weather icons."
          ],
          folderStructure: `weather-app/
├── src/
│   ├── App.jsx
│   └── index.css
├── index.html
└── package.json`,
          guide: "1. Register on OpenWeatherMap to obtain an API key.\n2. Store user search query in state. Trigger a fetch call on submit.\n3. Manage load states: `isLoading = true` while waiting, set to false on return to prevent UI glitches."
        }
      ]
    }
  ]
};
