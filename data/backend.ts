import { CareerPath } from "./types";

export const backendPath: CareerPath = {
  id: "backend",
  title: "Backend Development",
  emoji: "⚙️",
  description: "Backend development handles the database, server, API routing, and business logic of software applications.",
  skills: [
    "API Design & Integration",
    "Database Management & SQL",
    "Server-side Programming",
    "Security & Authentication",
    "Cloud Deployment & Scaling"
  ],
  technologies: [
    { name: "Python", emoji: "🐍" },
    { name: "FastAPI", emoji: "⚡" },
    { name: "PostgreSQL", emoji: "🗄" }
  ],
  learningTimeline: "4 - 6 Months",
  careerOpportunities: [
    "Backend Engineer",
    "API Developer",
    "Software Engineer",
    "Database Administrator"
  ],
  roadmap: [
    {
      id: "python-basics",
      title: "Python Basics",
      description: "Learn Python fundamentals, syntax, variable assignment, and simple control flow.",
      lessons: [
        {
          id: "what-is-python",
          title: "What is Python?",
          explanation: "Python is a high-level, interpreted, general-purpose programming language. Known for its readability and simplicity, it allows developers to write clean, maintainable code quickly. Python runs on an interpreter system, meaning code is executed line-by-line, facilitating quick prototyping and debugging.",
          codeExample: `# Python syntax is clean and readable
message = "Hello, DevPath!"
print(message)

# Arithmetic is straightforward
total = 10 + 5
print(total)`,
          quiz: {
            question: "What type of language is Python?",
            options: [
              "Compiled language",
              "Interpreted language",
              "Low-level machine language",
              "Markup language"
            ],
            answerIndex: 1
          }
        },
        {
          id: "first-program",
          title: "Your First Program",
          explanation: "In Python, variables are created when you assign a value to them. Unlike other languages, Python has no command for declaring a variable; it automatically infers the type. The 'print()' function is used to output text to the console.",
          codeExample: `# Variable declarations
name = "Alex"
age = 25
is_student = True

# F-strings make formatting text easy
print(f"My name is {name} and I am {age} years old.")`,
          quiz: {
            question: "How do you output text to the screen in Python?",
            options: [
              "echo 'text'",
              "console.log('text')",
              "print('text')",
              "system.out.println('text')"
            ],
            answerIndex: 2
          }
        }
      ],
      projects: [
        {
          id: "calculator",
          title: "Simple CLI Calculator",
          description: "Build a command-line calculator that takes user input and performs basic arithmetic operations.",
          requirements: [
            "Accept two numbers and an operator (+, -, *, /) from the user via input().",
            "Perform correct arithmetic based on the operator.",
            "Handle division-by-zero errors gracefully."
          ],
          folderStructure: `calculator/
└── main.py`,
          guide: "1. Use python's `input()` to prompt for numbers and operations.\n2. Wrap the operations in `try-except` blocks to handle any value conversions or arithmetic exceptions (like ZeroDivisionError).\n3. Use conditional `if-elif-else` logic to execute the chosen operation."
        }
      ]
    },
    {
      id: "functions",
      title: "Functions in Python",
      description: "Master reusable blocks of code, parameters, arguments, and return types.",
      lessons: [
        {
          id: "defining-functions",
          title: "Defining Functions",
          explanation: "A function is a block of organized, reusable code that performs a single related action. You define functions using the 'def' keyword, followed by the function name and parentheses containing any parameters. Use the 'return' statement to send a value back to the caller.",
          codeExample: `def greet(name, prefix="Hello"):
    return f"{prefix}, {name}!"

# Call the function
msg1 = greet("Alice")
msg2 = greet("Bob", "Welcome")
print(msg1) # Output: Hello, Alice!
print(msg2) # Output: Welcome, Bob!`,
          quiz: {
            question: "Which keyword is used to create a function in Python?",
            options: ["function", "def", "func", "create"],
            answerIndex: 1
          }
        }
      ]
    },
    {
      id: "oop",
      title: "Object-Oriented Programming",
      description: "Understand classes, objects, inheritance, encapsulation, and method overrides.",
      lessons: [
        {
          id: "classes-and-objects",
          title: "Classes and Objects",
          explanation: "Python is an object-oriented programming language. Almost everything in Python is an object, with its properties and methods. A Class is like an object constructor, or a 'blueprint' for creating objects. The '__init__' method is a special method called a constructor, which initializes attributes on creation.",
          codeExample: `class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.is_active = True

    def deactivate(self):
        self.is_active = False

# Instantiate an object
user1 = User("dev_coder", "dev@example.com")
print(user1.username)
user1.deactivate()
print(user1.is_active) # Output: False`,
          quiz: {
            question: "What is the purpose of the __init__ method in a Python class?",
            options: [
              "To terminate the class instance",
              "To define class properties that cannot be changed",
              "To initialize the object's attributes on creation",
              "To print information about the class"
            ],
            answerIndex: 2
          }
        }
      ]
    },
    {
      id: "apis",
      title: "APIs & HTTP Basics",
      description: "Learn about the client-server architecture, JSON format, and RESTful routing principles.",
      lessons: [
        {
          id: "intro-to-apis",
          title: "Introduction to APIs",
          explanation: "An API (Application Programming Interface) allows different software applications to communicate with each other. In web development, APIs usually run over the HTTP protocol. The client makes a Request (containing a method, URL, headers, and body), and the server processes it to send back a Response (containing status code, headers, and body, usually in JSON format).",
          codeExample: `# JSON structure example
{
  "id": 101,
  "title": "Learn FastAPI",
  "completed": false
}`,
          quiz: {
            question: "Which format is most commonly used for transmitting data in modern web APIs?",
            options: ["XML", "JSON", "CSV", "YAML"],
            answerIndex: 1
          }
        }
      ]
    },
    {
      id: "fastapi",
      title: "FastAPI Framework",
      description: "Build robust, modern, and auto-documented APIs using the FastAPI framework.",
      lessons: [
        {
          id: "fastapi-basics",
          title: "Building APIs with FastAPI",
          explanation: "FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints. It automatically generates interactive OpenAPI documentation (Swagger UI) at the '/docs' endpoint. It uses Pydantic to enforce data validation.",
          codeExample: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.get("/")
def read_root():
    return {"message": "Welcome to DevPath API!"}

@app.post("/items")
def create_item(item: Item):
    return {"status": "created", "item": item}`,
          quiz: {
            question: "Which python library does FastAPI use for data validation and serialization?",
            options: ["Django", "Pydantic", "SQLAlchemy", "Requests"],
            answerIndex: 1
          }
        }
      ],
      projects: [
        {
          id: "todo-api",
          title: "Todo API",
          description: "Build a complete REST API using FastAPI for managing a simple list of todo items.",
          requirements: [
            "Implement CRUD routes: GET /todos, POST /todos, GET /todos/{id}, PUT /todos/{id}, DELETE /todos/{id}.",
            "Use Pydantic models to validate the incoming todo payload (title, description, completed status).",
            "Store todos in an in-memory python list."
          ],
          folderStructure: `todo_api/
├── main.py
├── schemas.py
└── database.py`,
          guide: "1. Define schemas in `schemas.py` using Pydantic.\n2. In `main.py`, instantiate your FastAPI app and create an in-memory database list.\n3. Create endpoints for adding, listing, updating, and removing items from the list, returning proper HTTP status codes (like 201 Created)."
        }
      ]
    },
    {
      id: "databases",
      title: "Databases & SQL",
      description: "Connect APIs to persistent SQL databases using PostgreSQL and SQLAlchemy ORM.",
      lessons: [
        {
          id: "sql-basics",
          title: "Relational Databases & SQL",
          explanation: "Relational databases store data in structured tables linked by relationships. SQL (Structured Query Language) is the standard language to query, filter, and insert records. Object Relational Mappers (ORMs) like SQLAlchemy allow Python developers to interact with the database using classes and objects instead of writing raw SQL statements.",
          codeExample: `# SQL Statement Example
# SELECT * FROM users WHERE active = true;

# SQLAlchemy representation
class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primaryKey=True)
    username = Column(String, unique=True)
    is_active = Column(Boolean, default=True)`,
          quiz: {
            question: "What is an ORM (Object Relational Mapper) used for?",
            options: [
              "Translating database schema into markdown documentation",
              "Interacting with database tables using object-oriented code",
              "Encrypting web requests",
              "Speeding up internet connections"
            ],
            answerIndex: 1
          }
        }
      ],
      projects: [
        {
          id: "notes-api",
          title: "Notes API with Database",
          description: "Extend your API capabilities by persisting data in a relational database using SQLAlchemy and PostgreSQL.",
          requirements: [
            "Configure SQLAlchemy connection string.",
            "Create a Notes table with id, title, content, and created_at fields.",
            "Implement complete CRUD operations that read/write directly to the database."
          ],
          folderStructure: `notes_api/
├── main.py
├── models.py
├── schemas.py
└── database.py`,
          guide: "1. Define models in `models.py` inheriting from declarative base.\n2. Set up engine and SessionLocal in `database.py`.\n3. Write dependency function `get_db` to yield session and close it automatically.\n4. Replace in-memory queries in FastAPI endpoints with session queries: `db.query(Note).all()`."
        }
      ]
    },
    {
      id: "authentication",
      title: "Authentication & Security",
      description: "Protect endpoints using user signups, hashed passwords, and JSON Web Tokens (JWT).",
      lessons: [
        {
          id: "jwt-auth",
          title: "JWT Authentication",
          explanation: "Security is paramount in backend services. Passwords must never be stored in plaintext; they are hashed using secure algorithms like bcrypt. When a user logs in, the server generates a signed JSON Web Token (JWT) that encodes user info and an expiration date. The client passes this token in subsequent request headers (Authorization: Bearer <token>) to access protected endpoints.",
          codeExample: `from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

# Hash a password
hashed_pw = pwd_context.hash("userpassword")

# Create a token
token = jwt.encode({"sub": "username"}, SECRET_KEY, algorithm=ALGORITHM)`,
          quiz: {
            question: "Why should passwords never be stored in plain text?",
            options: [
              "Because it takes up too much database space",
              "Because databases do not support strings",
              "Because a database breach would expose all user passwords instantly",
              "Because hashing makes code execute faster"
            ],
            answerIndex: 2
          }
        }
      ]
    },
    {
      id: "deployment",
      title: "Deployment & Production",
      description: "Deploy your FastAPI application live to cloud platforms like Render or Fly.io.",
      lessons: [
        {
          id: "deploy-rendering",
          title: "Deploying to Render",
          explanation: "To make your API accessible worldwide, you deploy it to cloud hosting platforms like Render or Fly.io. This requires configuring environment variables for secrets (like SECRET_KEY and DATABASE_URL), running production-ready web servers like Uvicorn or Gunicorn, and utilizing packages like Gunicorn to handle concurrent processes.",
          codeExample: `# Starting the production server
# uvicorn main:app --host 0.0.0.0 --port 8000`,
          quiz: {
            question: "Which server command is typically used to run a FastAPI app in production?",
            options: [
              "python main.py",
              "uvicorn main:app --host 0.0.0.0",
              "run fastapi",
              "npm start"
            ],
            answerIndex: 1
          }
        }
      ]
    }
  ]
};
