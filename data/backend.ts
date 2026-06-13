import { CareerPath } from "./types";

export const backendPath: CareerPath = {
  id: "backend",
  title: "Backend Fundamentals",
  emoji: "⚙️",
  description:
    "A beginner path for learning Python, APIs, databases, and a simple backend app.",
  skills: [
    "Understand frontend vs backend",
    "Write basic Python code",
    "Build simple APIs",
    "Store data in SQLite",
    "Connect a frontend to data",
  ],
  technologies: [
    { name: "Python", emoji: "🐍" },
    { name: "FastAPI", emoji: "⚡" },
    { name: "SQLite", emoji: "🗄️" },
    { name: "JavaScript", emoji: "⚙️" },
  ],
  learningTimeline: "5 - 10 Hours",
  careerOpportunities: [
    "Beginner Backend Developer",
    "API Builder",
    "Python Learner",
    "Full-Stack Starter",
  ],
  roadmap: [
    {
      id: "what-is-backend",
      title: "What Is a Backend?",
      description:
        "Learn how the backend works with the frontend, server, APIs, and databases.",
      lessons: [
        {
          id: "frontend-vs-backend",
          title: "Frontend vs Backend",
          explanation:
            "The frontend is what people see and click. The backend is where data is saved and rules are handled.",
          codeExample: `Frontend = buttons and screens
Backend = data and logic`,
          quiz: {
            question: "Which part do users directly see?",
            options: ["Frontend", "Backend", "Database", "Server log"],
            answerIndex: 0,
          },
        },
        {
          id: "client-server",
          title: "Client and Server",
          explanation:
            "A client asks for data. A server listens, responds, and sends back the result.",
          codeExample: `Client -> sends request
Server -> sends response`,
          quiz: {
            question: "What does a server do?",
            options: [
              "Replies to requests",
              "Designs icons only",
              "Deletes the browser",
              "Writes CSS",
            ],
            answerIndex: 0,
          },
        },
      ],
    },
    {
      id: "python-basics",
      title: "Python Basics",
      description:
        "Learn the Python ideas you need before building a backend.",
      lessons: [
        {
          id: "python-values",
          title: "Variables, Strings, and Numbers",
          explanation:
            "Variables store values. Strings hold text. Numbers let you do math.",
          codeExample: `name = "Mia"
age = 12
print(name)
print(age)`,
          quiz: {
            question: "What type of value is \"hello\"?",
            options: ["String", "Number", "List", "Function"],
            answerIndex: 0,
          },
        },
        {
          id: "lists-conditions",
          title: "Lists and Conditions",
          explanation:
            "Lists hold many items. Conditions help your program choose between two or more paths.",
          codeExample: `scores = [10, 15, 20]
if scores[0] > 5:
    print("Great start")`,
          quiz: {
            question: "What does an if statement do?",
            options: [
              "Checks a condition",
              "Creates a database",
              "Draws a button",
              "Saves an image",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "cli-calculator",
          title: "CLI Calculator",
          description:
            "Build a small calculator that adds, subtracts, multiplies, and divides.",
          requirements: [
            "Ask for two numbers.",
            "Ask for one operator.",
            "Show the result in the terminal.",
          ],
          folderStructure: `calculator/
└── main.py`,
          guide:
            "1. Read the numbers from the user.\n2. Use if/elif to choose the operation.\n3. Print the answer.",
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      description:
        "Learn how to make reusable blocks of code.",
      lessons: [
        {
          id: "create-functions",
          title: "Creating Functions",
          explanation:
            "A function is a named block of code that does one job.",
          codeExample: `def greet():
    print("Hello!")`,
          quiz: {
            question: "Which keyword creates a function in Python?",
            options: ["def", "func", "create", "make"],
            answerIndex: 0,
          },
        },
        {
          id: "parameters-return",
          title: "Parameters and Return Values",
          explanation:
            "Parameters let you send data into a function. Return values let a function send something back.",
          codeExample: `def add(a, b):
    return a + b`,
          quiz: {
            question: "What does return do?",
            options: [
              "Sends a value back",
              "Deletes the function",
              "Writes HTML",
              "Creates a list",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "grade-checker",
          title: "Student Grade Checker",
          description:
            "Build a simple program that checks a student's grade and shows a message.",
          requirements: [
            "Use a function for the grade check.",
            "Pass the score into the function.",
            "Return or print a simple result.",
          ],
          folderStructure: `grade-checker/
└── main.py`,
          guide:
            "1. Put the grading logic inside one function.\n2. Send the score into the function.\n3. Show whether the grade is pass or fail.",
        },
      ],
    },
    {
      id: "apis-http",
      title: "APIs and HTTP",
      description:
        "Learn how apps ask for data and send data back.",
      lessons: [
        {
          id: "get-post",
          title: "GET and POST",
          explanation:
            "GET asks for data. POST sends new data to the server.",
          codeExample: `GET /students
POST /students`,
          quiz: {
            question: "Which request type is used to send new data?",
            options: ["GET", "POST", "DELETE", "HEAD"],
            answerIndex: 1,
          },
        },
        {
          id: "request-response-json",
          title: "Request, Response, and JSON",
          explanation:
            "A request goes to the server. A response comes back. JSON is a common format for sending data.",
          codeExample: `{
  "name": "Ava",
  "age": 10
}`,
          quiz: {
            question: "What is JSON often used for?",
            options: [
              "Sending data",
              "Drawing buttons",
              "Writing CSS",
              "Deleting files",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "student-api-sim",
          title: "Student API Simulation",
          description:
            "Practice the idea of an API with simple student data.",
          requirements: [
            "Create a student object.",
            "Pretend to send and receive JSON.",
            "Show the idea of request and response.",
          ],
          folderStructure: `student-api/
└── main.py`,
          guide:
            "1. Make a sample student record.\n2. Return it as JSON.\n3. Practice reading the response like an API client.",
        },
      ],
    },
    {
      id: "fastapi-basics",
      title: "FastAPI Basics",
      description:
        "Create your first backend app with FastAPI.",
      lessons: [
        {
          id: "install-fastapi",
          title: "Installing FastAPI",
          explanation:
            "FastAPI is a Python framework for building APIs. It is a good choice for simple, clean backend apps.",
          codeExample: `pip install fastapi uvicorn`,
          quiz: {
            question: "What is FastAPI used for?",
            options: [
              "Building APIs",
              "Editing images",
              "Writing CSS",
              "Making icons",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "create-routes",
          title: "Creating Routes",
          explanation:
            "Routes are paths your server responds to, such as `/` or `/students`.",
          codeExample: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello!"}`,
          quiz: {
            question: "What is a route?",
            options: [
              "A server path",
              "A color choice",
              "A type of list",
              "A font style",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "hello-api",
          title: "Hello API",
          description:
            "Create a tiny API that returns a friendly message.",
          requirements: [
            "Create one GET route.",
            "Return a JSON message.",
            "Run the server successfully.",
          ],
          folderStructure: `hello-api/
├── main.py`,
          guide:
            "1. Make a FastAPI app.\n2. Add one route.\n3. Run the app and open it in the browser.",
        },
      ],
    },
    {
      id: "crud-operations",
      title: "CRUD Operations",
      description:
        "Learn the four main data actions: create, read, update, and delete.",
      lessons: [
        {
          id: "crud-idea",
          title: "CRUD in Simple Words",
          explanation:
            "CRUD means Create, Read, Update, and Delete. These are the main actions for working with data.",
          codeExample: `Create -> add a note
Read -> view a note
Update -> edit a note
Delete -> remove a note`,
          quiz: {
            question: "What does the C in CRUD mean?",
            options: ["Create", "Check", "Connect", "Compare"],
            answerIndex: 0,
          },
        },
        {
          id: "todo-api-pattern",
          title: "CRUD API Pattern",
          explanation:
            "A CRUD API often uses GET, POST, PUT, and DELETE routes to manage data.",
          codeExample: `GET /notes
POST /notes
PUT /notes/1
DELETE /notes/1`,
          quiz: {
            question: "Which method is usually used to update data?",
            options: ["GET", "POST", "PUT", "COPY"],
            answerIndex: 2,
          },
        },
      ],
      projects: [
        {
          id: "notes-api",
          title: "Notes API",
          description:
            "Build a small API for adding, reading, editing, and deleting notes.",
          requirements: [
            "Create routes for all CRUD actions.",
            "Store notes in a simple list first.",
            "Return clear JSON responses.",
          ],
          folderStructure: `notes-api/
├── main.py`,
          guide:
            "1. Start with an in-memory list.\n2. Add routes for each CRUD action.\n3. Test each route one by one.",
        },
      ],
    },
    {
      id: "database-basics",
      title: "Database Basics",
      description:
        "Learn how data is stored in tables and saved on the backend.",
      lessons: [
        {
          id: "tables-rows-columns",
          title: "Tables, Rows, and Columns",
          explanation:
            "A database table is like a spreadsheet. Rows hold records and columns hold fields.",
          codeExample: `Table: students
Row: one student record
Column: name, age, class`,
          quiz: {
            question: "What does a row hold?",
            options: ["One record", "A file type", "A button", "A color"],
            answerIndex: 0,
          },
        },
        {
          id: "save-data",
          title: "Saving Data",
          explanation:
            "Saving data means putting it into a database so it is not lost when the app closes.",
          codeExample: `INSERT INTO notes (title, content)
VALUES ("Hello", "My first note");`,
          quiz: {
            question: "Why do we save data in a database?",
            options: [
              "So it stays after the app closes",
              "So CSS loads faster",
              "So images shrink",
              "So the browser changes color",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "notes-database",
          title: "Notes Database",
          description:
            "Store notes in a small SQLite database instead of a list.",
          requirements: [
            "Create a notes table.",
            "Add title and content fields.",
            "Save at least one note.",
          ],
          folderStructure: `notes-db/
├── main.py
└── notes.db`,
          guide:
            "1. Create a table for notes.\n2. Insert a record.\n3. Read the record back and show it.",
        },
      ],
    },
    {
      id: "connect-frontend",
      title: "Connecting a Frontend",
      description:
        "Learn how a webpage can ask the backend for data.",
      lessons: [
        {
          id: "fetch-api",
          title: "Fetch API",
          explanation:
            "The Fetch API lets JavaScript ask a server for data.",
          codeExample: `fetch("/api/notes")
  .then((res) => res.json())
  .then((data) => console.log(data));`,
          quiz: {
            question: "What does fetch do?",
            options: [
              "Sends a request to a server",
              "Draws a database",
              "Creates CSS classes",
              "Deletes HTML",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "display-data",
          title: "Displaying Data",
          explanation:
            "After data comes back, you can put it on the page in a list or card.",
          codeExample: `notes.forEach((note) => {
  console.log(note.title);
});`,
          quiz: {
            question: "What do you do after receiving data?",
            options: [
              "Show it on the page",
              "Delete the browser",
              "Turn it into a font",
              "Ignore it",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "notes-viewer",
          title: "Notes Viewer",
          description:
            "Build a simple page that shows notes from your API.",
          requirements: [
            "Fetch notes from the backend.",
            "Show the note title and content.",
            "Handle a loading state if you want an extra challenge.",
          ],
          folderStructure: `notes-viewer/
├── index.html
├── style.css
└── app.js`,
          guide:
            "1. Fetch notes when the page loads.\n2. Put the results into the page.\n3. Add a simple loading message.",
        },
      ],
    },
    {
      id: "final-project",
      title: "Final Project",
      description:
        "Build a small student manager that uses a backend and a simple frontend.",
      lessons: [
        {
          id: "plan-student-manager",
          title: "Plan the App",
          explanation:
            "Start with one small idea. The student manager should let users add, see, and delete students.",
          codeExample: `Final project:
- Add student
- Show list
- Delete student`,
          quiz: {
            question: "What is a good first step for the final project?",
            options: [
              "Plan the features",
              "Add every feature at once",
              "Skip testing",
              "Ignore the data model",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "build-and-test-student-manager",
          title: "Build and Test",
          explanation:
            "Use a backend API and a small frontend form to make the app work step by step.",
          codeExample: `Features:
- GET /students
- POST /students
- DELETE /students/{id}`,
          quiz: {
            question: "Which feature removes a student?",
            options: ["GET /students", "POST /students", "DELETE /students/{id}", "PUT /students"],
            answerIndex: 2,
          },
        },
      ],
      projects: [
        {
          id: "student-manager",
          title: "Student Manager",
          description:
            "Build the final student manager with a small frontend and backend.",
          requirements: [
            "Add a student form.",
            "Show a student list.",
            "Delete students from the list.",
          ],
          folderStructure: `student-manager/
├── backend/
└── frontend/`,
          guide:
            "1. Build the backend routes first.\n2. Connect the frontend with fetch.\n3. Finish with add and delete actions.",
        },
      ],
    },
  ],
};
