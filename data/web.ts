import { CareerPath } from "./types";

export const webPath: CareerPath = {
  id: "web",
  title: "Web Fundamentals",
  emoji: "🌐",
  description:
    "A beginner path for building simple, responsive websites with HTML, CSS, and JavaScript.",
  skills: [
    "Write basic HTML pages",
    "Style pages with CSS",
    "Use simple JavaScript",
    "Build responsive layouts",
    "Create small website projects",
  ],
  technologies: [
    { name: "HTML", emoji: "🏷️" },
    { name: "CSS", emoji: "🎨" },
    { name: "JavaScript", emoji: "⚡" },
  ],
  learningTimeline: "5 - 10 Hours",
  careerOpportunities: [
    "Beginner Web Developer",
    "Front-End Learner",
    "UI Assistant",
    "Portfolio Builder",
  ],
  roadmap: [
    {
      id: "intro-web",
      title: "Introduction to the Web",
      description:
        "Learn what a website is, how it works in a browser, and what tools you need to begin.",
      lessons: [
        {
          id: "what-is-website",
          title: "What Is a Website?",
          explanation:
            "A website is a set of pages that people open in a browser. HTML gives the page structure, CSS adds style, and JavaScript adds action.",
          codeExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Site</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>`,
          commonMistakes: [
            {
              mistake: "Mixing up file types (e.g., trying to run style.css directly in the browser).",
              fix: "Always open the index.html file in your browser to view your project."
            },
            {
              mistake: "Putting visible page elements (like h1 or p tags) inside the <head> section.",
              fix: "Only metadata and <title> go inside <head>. All visible components must be placed inside the <body> tags."
            }
          ],
          quiz: {
            question: "Which language gives a page its structure?",
            options: ["HTML", "CSS", "JavaScript", "SQL"],
            answerIndex: 0,
          },
        },
        {
          id: "web-tools",
          title: "Your First Tools",
          explanation:
            "To start, you only need a code editor and a browser. Save your file, refresh the page, and use the browser to check how the page looks.",
          codeExample: `// Simple beginner workflow
1. Write code in index.html
2. Save the file
3. Refresh the browser`,
          commonMistakes: [
            {
              mistake: "Refreshing the browser but not seeing updates because the editor file wasn't saved.",
              fix: "Remember to use Ctrl+S (Cmd+S on Mac) in your editor before refreshing the browser."
            }
          ],
          quiz: {
            question: "What is the best tool to view your page while learning?",
            options: ["A browser", "A database", "A calculator", "A terminal only"],
            answerIndex: 0,
          },
        },
      ],
    },
    {
      id: "html-basics",
      title: "HTML Basics",
      description:
        "Practice the tags you need to write simple text, links, images, lists, and buttons.",
      lessons: [
        {
          id: "html-text",
          title: "Headings and Paragraphs",
          explanation:
            "Use headings for titles and paragraphs for normal text. This helps people read your page in a clear order.",
          codeExample: `<h1>My Profile</h1>
<p>Hello! I am learning web development.</p>`,
          quiz: {
            question: "Which tag is best for the main title of a page?",
            options: ["<p>", "<h1>", "<img>", "<ul>"],
            answerIndex: 1,
          },
        },
        {
          id: "html-links-images",
          title: "Links, Images, and Lists",
          explanation:
            "Links take users to another page. Images show pictures. Lists help you show items in order or as bullet points.",
          codeExample: `<a href="https://example.com">Visit site</a>
<img src="photo.jpg" alt="Profile photo" />
<ul>
  <li>Reading</li>
  <li>Coding</li>
</ul>`,
          quiz: {
            question: "Which tag is used to show an image?",
            options: ["<link>", "<img>", "<photo>", "<picture-text>"],
            answerIndex: 1,
          },
        },
      ],
      projects: [
        {
          id: "personal-profile-page",
          title: "Personal Profile Page",
          description:
            "Build a simple page that shows your name, short bio, photo, and favorite links.",
          requirements: [
            "Add a title and a short introduction.",
            "Show at least one image.",
            "Include a list of hobbies or skills.",
          ],
          folderStructure: `profile-page/
├── index.html
└── images/`,
          guide:
            "1. Start with a heading and a paragraph.\n2. Add one image with alt text.\n3. Add a list of your hobbies or skills.\n4. Add one link button to your favorite site.",
        },
      ],
    },
    {
      id: "css-basics",
      title: "CSS Basics",
      description:
        "Learn how to make your page look nice with colors, fonts, spacing, and borders.",
      lessons: [
        {
          id: "css-colors-fonts",
          title: "Colors and Fonts",
          explanation:
            "CSS controls the look of your page. You can change text color, font size, font family, and background color.",
          codeExample: `h1 {
  color: #1f2937;
  font-size: 32px;
}

body {
  background-color: #f9fafb;
  font-family: Arial, sans-serif;
}`,
          quiz: {
            question: "Which CSS property changes text color?",
            options: ["font-style", "color", "text-size", "background"],
            answerIndex: 1,
          },
        },
        {
          id: "css-spacing",
          title: "Backgrounds, Spacing, and Borders",
          explanation:
            "Margins add space outside an element. Padding adds space inside it. Borders help separate sections clearly.",
          codeExample: `.card {
  background: white;
  padding: 16px;
  margin: 12px;
  border: 1px solid #ddd;
}`,
          quiz: {
            question: "What does padding do?",
            options: [
              "Adds space inside an element",
              "Adds space outside an element",
              "Deletes the border",
              "Changes the page title",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "styled-profile-page",
          title: "Styled Profile Page",
          description:
            "Improve your profile page using colors, spacing, and simple card styles.",
          requirements: [
            "Use at least two text colors.",
            "Add padding and margin to separate sections.",
            "Add a border or card style to one section.",
          ],
          folderStructure: `profile-page/
├── index.html
└── style.css`,
          guide:
            "1. Pick a background color and text color.\n2. Add padding to make the content feel roomy.\n3. Use a border radius to make the card softer.",
        },
      ],
    },
    {
      id: "layouts",
      title: "Layouts",
      description:
        "Learn how to place content side by side and build a simple page structure.",
      lessons: [
        {
          id: "flexbox-basics",
          title: "Flexbox Basics",
          explanation:
            "Flexbox helps you line up items in rows or columns. It is useful for buttons, cards, and page headers.",
          codeExample: `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
          quiz: {
            question: "Which CSS value turns on Flexbox?",
            options: ["display: block", "display: flex", "position: fixed", "float: left"],
            answerIndex: 1,
          },
        },
        {
          id: "page-sections",
          title: "Navigation and Sections",
          explanation:
            "A simple website often has a header, main section, and footer. A navigation bar helps people move around the page.",
          codeExample: `<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
</header>`,
          quiz: {
            question: "What is the purpose of a navigation bar?",
            options: [
              "To play audio",
              "To help users move around the site",
              "To store images",
              "To write JavaScript",
            ],
            answerIndex: 1,
          },
        },
      ],
      projects: [
        {
          id: "simple-landing-page",
          title: "Simple Landing Page",
          description:
            "Build a one-page site with a header, hero section, and call-to-action button.",
          requirements: [
            "Add a top navigation bar.",
            "Create a hero section with a headline and button.",
            "Use Flexbox to align items.",
          ],
          folderStructure: `landing-page/
├── index.html
└── style.css`,
          guide:
            "1. Plan the header, hero, and footer.\n2. Use Flexbox to place text and a button.\n3. Keep the design simple and readable.",
        },
      ],
    },
    {
      id: "responsive-design",
      title: "Responsive Design",
      description:
        "Make sure your page looks good on phones, tablets, and desktop screens.",
      lessons: [
        {
          id: "mobile-desktop",
          title: "Mobile vs Desktop",
          explanation:
            "Phones have smaller screens than laptops. A responsive page changes its layout so it stays easy to read everywhere.",
          codeExample: `/* Keep content readable on smaller screens */
.container {
  width: 100%;
  max-width: 900px;
}`,
          quiz: {
            question: "Why do we make websites responsive?",
            options: [
              "So they only work on phones",
              "So they look good on different screen sizes",
              "So they need no CSS",
              "So they load music",
            ],
            answerIndex: 1,
          },
        },
        {
          id: "media-queries",
          title: "Media Queries",
          explanation:
            "Media queries let you change styles when the screen gets smaller or larger.",
          codeExample: `@media (max-width: 600px) {
  .menu {
    flex-direction: column;
  }
}`,
          quiz: {
            question: "What does a media query help you do?",
            options: [
              "Change styles for different screen sizes",
              "Save user passwords",
              "Add server routes",
              "Create images",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "responsive-landing-page",
          title: "Responsive Landing Page",
          description:
            "Improve your landing page so it works on both mobile and desktop.",
          requirements: [
            "Stack content on small screens.",
            "Keep spacing comfortable on large screens.",
            "Make buttons easy to tap on mobile.",
          ],
          folderStructure: `landing-page/
├── index.html
└── style.css`,
          guide:
            "1. Start with the desktop layout.\n2. Add one media query for small screens.\n3. Check that text and buttons still fit well.",
        },
      ],
    },
    {
      id: "javascript-basics",
      title: "JavaScript Basics",
      description:
        "Learn the first JavaScript ideas you need to make a page interactive.",
      lessons: [
        {
          id: "variables-functions",
          title: "Variables and Functions",
          explanation:
            "Variables store values. Functions are small blocks of code that do one job.",
          codeExample: `let name = "Ava";

function greet() {
  console.log("Hello " + name);
}`,
          quiz: {
            question: "What does a variable do?",
            options: [
              "Stores data",
              "Creates CSS",
              "Changes the browser",
              "Deletes files",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "events",
          title: "Events",
          explanation:
            "Events happen when users click, type, or move the mouse. JavaScript can respond to those actions.",
          codeExample: `button.addEventListener("click", function () {
  console.log("Button clicked");
});`,
          quiz: {
            question: "Which action is an event?",
            options: ["A button click", "A CSS color", "A folder name", "A font size"],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "click-counter",
          title: "Click Counter",
          description:
            "Build a button that increases a number every time it is clicked.",
          requirements: [
            "Show one number on the page.",
            "Add a button to increase the number.",
            "Add a reset button if you want an extra challenge.",
          ],
          folderStructure: `counter/
├── index.html
├── style.css
└── app.js`,
          guide:
            "1. Create a number variable.\n2. Update the number on button click.\n3. Show the new value on the page.",
        },
      ],
    },
    {
      id: "dom-manipulation",
      title: "DOM Manipulation",
      description:
        "Learn how to change page content after the page loads.",
      lessons: [
        {
          id: "select-elements",
          title: "Selecting Elements",
          explanation:
            "The DOM is the page structure that JavaScript can read and change. You can select elements by id, class, or tag.",
          codeExample: `const title = document.getElementById("title");
const button = document.querySelector(".btn");`,
          quiz: {
            question: "What does the DOM represent?",
            options: [
              "The page structure JavaScript can work with",
              "A CSS file",
              "A database table",
              "A type of image",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "change-text",
          title: "Changing Text and Buttons",
          explanation:
            "You can change text, show messages, or react to a button press by updating the DOM.",
          codeExample: `message.textContent = "Welcome!";
button.addEventListener("click", () => {
  message.textContent = "Thanks for clicking";
});`,
          quiz: {
            question: "Which property changes the text inside an element?",
            options: ["textContent", "className", "href", "padding"],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "quote-generator",
          title: "Quote Generator",
          description:
            "Build a small app that shows a new quote when the user clicks a button.",
          requirements: [
            "Show one quote on the page.",
            "Add a button that changes the quote.",
            "Style the quote box clearly.",
          ],
          folderStructure: `quote-generator/
├── index.html
├── style.css
└── app.js`,
          guide:
            "1. Store a few quotes in an array.\n2. Pick one quote when the button is clicked.\n3. Put the new quote into the page.",
        },
      ],
    },
    {
      id: "final-project",
      title: "Final Project",
      description:
        "Choose a small website and build it from start to finish.",
      lessons: [
        {
          id: "plan-your-site",
          title: "Plan Your Site",
          explanation:
            "Pick one simple idea and sketch the sections before you start coding. Good choices are a portfolio, coffee shop, gaming profile, or student club site.",
          codeExample: `Project idea:
- Header
- Hero section
- About section
- Contact button`,
          quiz: {
            question: "What should you do before building your final project?",
            options: [
              "Plan the sections first",
              "Skip HTML",
              "Remove the browser",
              "Write only CSS",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "build-and-polish",
          title: "Build and Polish",
          explanation:
            "Use HTML for structure, CSS for style, and JavaScript for one small interaction like a button or menu.",
          codeExample: `Final project checklist:
1. Navigation bar
2. Multiple sections
3. Images
4. Responsive layout
5. One interactive button`,
          quiz: {
            question: "Which part makes your page interactive?",
            options: ["HTML", "CSS", "JavaScript", "A favicon"],
            answerIndex: 2,
          },
        },
      ],
      projects: [
        {
          id: "portfolio-website",
          title: "Portfolio Website",
          description:
            "Build a simple personal website that shows who you are and what you made.",
          requirements: [
            "Add a navigation bar.",
            "Include multiple sections.",
            "Make it responsive and readable.",
          ],
          folderStructure: `portfolio/
├── index.html
├── style.css
└── app.js`,
          guide:
            "1. Choose one idea and keep it small.\n2. Add content section by section.\n3. Finish with a button or small interaction.",
        },
      ],
    },
  ],
};
