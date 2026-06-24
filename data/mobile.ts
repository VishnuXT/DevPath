import { CareerPath } from "./types";

export const mobilePath: CareerPath = {
  id: "mobile",
  title: "Mobile App Fundamentals",
  emoji: "📱",
  description:
    "A beginner path for building simple mobile apps with React Native and Expo.",
  skills: [
    "Build basic mobile screens",
    "Use simple React Native components",
    "Style layouts with Flexbox",
    "Handle taps and state",
    "Save small amounts of data",
  ],
  technologies: [
    { name: "React Native", emoji: "📱" },
    { name: "Expo", emoji: "🚀" },
    { name: "JavaScript", emoji: "⚡" },
    { name: "AsyncStorage", emoji: "💾" },
  ],
  learningTimeline: "5 - 10 Hours",
  careerOpportunities: [
    "Beginner Mobile Developer",
    "React Native Learner",
    "App UI Builder",
    "Expo Starter",
  ],
  roadmap: [
    {
      id: "intro-mobile-apps",
      title: "Introduction to Mobile Apps",
      description:
        "Learn the difference between Android and iOS, and understand what React Native and Expo do.",
      lessons: [
        {
          id: "android-vs-ios",
          title: "Android vs iOS",
          explanation:
            "Android and iOS are the two main mobile platforms. React Native helps you build one app that can run on both.",
          codeExample: `React Native helps you build one app for:
- Android phones
- iPhones`,
          commonMistakes: [
            {
              mistake: "Expecting layout alignments to look identical on all mobile screens without responsive code.",
              fix: "Use flexbox and flex-based scaling instead of hardcoded width/height values so the UI adjusts dynamically."
            }
          ],
          quiz: {
            question: "What is a big benefit of React Native?",
            options: [
              "It only works on iPhones",
              "It helps build apps for both Android and iOS",
              "It is a database tool",
              "It replaces the browser",
            ],
            answerIndex: 1,
          },
        },
        {
          id: "what-is-expo",
          title: "What is Expo?",
          explanation:
            "Expo gives you helpful tools to build, run, and test React Native apps quickly.",
          codeExample: `npx expo start`,
          commonMistakes: [
            {
              mistake: "Trying to write custom native Swift or Kotlin code while using the standard Expo Go client.",
              fix: "Expo Go only supports standard JavaScript. If you need custom native libraries, you must use Expo Development Builds."
            }
          ],
          quiz: {
            question: "What does Expo help you do?",
            options: [
              "Build and run React Native apps",
              "Write SQL queries",
              "Design logos only",
              "Replace JavaScript",
            ],
            answerIndex: 0,
          },
        },
      ],
    },
    {
      id: "rn-basics",
      title: "React Native Basics",
      description:
        "Learn the main building blocks you use on every mobile screen.",
      lessons: [
        {
          id: "view-text-image-button",
          title: "View, Text, Image, and Button",
          explanation:
            "React Native uses components instead of HTML tags. `View` is like a box, `Text` shows words, `Image` shows pictures, and `Button` is a simple tap target.",
          codeExample: `import { View, Text, Button } from "react-native";

<View>
  <Text>Hello!</Text>
  <Button title="Tap me" onPress={() => {}} />
</View>`,
          quiz: {
            question: "Which component is used to show text in React Native?",
            options: ["View", "Text", "Image", "Button"],
            answerIndex: 1,
          },
        },
        {
          id: "safe-area-scroll",
          title: "Safe Areas and Scrolling",
          explanation:
            "Use `SafeAreaView` so content does not touch the phone notch. Use `ScrollView` when the content is taller than one screen.",
          codeExample: `import { SafeAreaView, ScrollView } from "react-native";`,
          quiz: {
            question: "Why do we use SafeAreaView?",
            options: [
              "To hide buttons",
              "To avoid screen notches and edges",
              "To save data",
              "To create APIs",
            ],
            answerIndex: 1,
          },
        },
      ],
      projects: [
        {
          id: "personal-profile-app",
          title: "Personal Profile App",
          description:
            "Build a simple app that shows your photo, name, and a short bio.",
          requirements: [
            "Show a profile image.",
            "Add your name and a short description.",
            "Use `View` and `Text` components clearly.",
          ],
          folderStructure: `profile-app/
├── App.tsx`,
          guide:
            "1. Add a safe area.\n2. Place your profile picture and text in one screen.\n3. Keep the layout centered and clean.",
        },
      ],
    },
    {
      id: "styling-layouts",
      title: "Styling and Layouts",
      description:
        "Learn how to space items and build neat mobile card layouts.",
      lessons: [
        {
          id: "style-basics",
          title: "Styling Components",
          explanation:
            "React Native styles use JavaScript objects. You change color, padding, margin, border radius, and background color.",
          codeExample: `const styles = {
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
};`,
          quiz: {
            question: "Which style property adds space inside a box?",
            options: ["margin", "padding", "gap", "alignItems"],
            answerIndex: 1,
          },
        },
        {
          id: "flexbox-mobile",
          title: "Flexbox on Mobile",
          explanation:
            "Flexbox helps you line up items in rows and columns. It is the main layout system in React Native.",
          codeExample: `container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}`,
          quiz: {
            question: "What does `flex: 1` usually do?",
            options: [
              "Makes the view fill available space",
              "Deletes the view",
              "Changes text color",
              "Saves the file",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "product-card-app",
          title: "Product Card App",
          description:
            "Create a clean product card with a picture, title, and price.",
          requirements: [
            "Center the card on the screen.",
            "Add an image and short text.",
            "Use spacing and rounded corners.",
          ],
          folderStructure: `product-card/
├── App.tsx`,
          guide:
            "1. Start with one card.\n2. Add an image, a title, and a price.\n3. Use padding, margin, and border radius to make it look nice.",
        },
      ],
    },
    {
      id: "components",
      title: "Components",
      description:
        "Learn how to split your app into smaller reusable pieces.",
      lessons: [
        {
          id: "create-components",
          title: "Creating Components",
          explanation:
            "A component is a reusable piece of UI. You can make one component for a card, a header, or a button.",
          codeExample: `function Title() {
  return <Text>My App</Text>;
}`,
          quiz: {
            question: "Why use components?",
            options: [
              "To reuse UI pieces",
              "To remove JavaScript",
              "To create databases",
              "To stop the app",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "reuse-components",
          title: "Reusing Components",
          explanation:
            "Reuse the same component many times with different data. This keeps your code easier to read and update.",
          codeExample: `<UserCard name="Sam" />
<UserCard name="Asha" />`,
          quiz: {
            question: "What is one benefit of reusing components?",
            options: [
              "Less code to manage",
              "More screen breaks",
              "No need for props",
              "No need for styles",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "team-members-app",
          title: "Team Members App",
          description:
            "Show a list of team members using one reusable card component.",
          requirements: [
            "Create one card component.",
            "Pass different names and roles as data.",
            "Show at least three team members.",
          ],
          folderStructure: `team-members/
├── App.tsx
└── components/`,
          guide:
            "1. Make one card component.\n2. Pass name and role into it.\n3. Render the card multiple times for different people.",
        },
      ],
    },
    {
      id: "state-interaction",
      title: "State and Interaction",
      description:
        "Learn how your app reacts when a user taps a button.",
      lessons: [
        {
          id: "use-state",
          title: "useState",
          explanation:
            "`useState` stores data that can change. When the value changes, the screen updates.",
          codeExample: `const [count, setCount] = useState(0);`,
          quiz: {
            question: "What does useState help you do?",
            options: [
              "Store changing values",
              "Create CSS files",
              "Build a database",
              "Delete the app",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "button-press",
          title: "Button Press Events",
          explanation:
            "A button press is an event. You can use it to change text, update numbers, or show new content.",
          codeExample: `<Button title="Add" onPress={() => setCount(count + 1)} />`,
          quiz: {
            question: "What happens when a button press updates state?",
            options: [
              "The screen can change",
              "The phone turns off",
              "The app becomes HTML",
              "The image file moves",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "counter-app",
          title: "Counter App",
          description:
            "Build a small app that increases, decreases, and resets a number.",
          requirements: [
            "Show one number.",
            "Add increase and reset buttons.",
            "Keep the UI simple.",
          ],
          folderStructure: `counter-app/
├── App.tsx`,
          guide:
            "1. Create a number in state.\n2. Change it when buttons are pressed.\n3. Show the updated number on screen.",
        },
      ],
    },
    {
      id: "lists",
      title: "Lists",
      description:
        "Learn how to show many items on one screen.",
      lessons: [
        {
          id: "arrays-lists",
          title: "Arrays and Lists",
          explanation:
            "An array is a list of items. You can loop over an array to show a list of things on screen.",
          codeExample: `const items = ["Milk", "Bread", "Eggs"];`,
          quiz: {
            question: "What is an array?",
            options: [
              "A list of items",
              "A color code",
              "A type of button",
              "A server route",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "flatlist",
          title: "FlatList",
          explanation:
            "`FlatList` is a React Native component for showing lists in a clean and efficient way.",
          codeExample: `<FlatList
  data={items}
  renderItem={({ item }) => <Text>{item}</Text>}
/ >`,
          quiz: {
            question: "Which React Native component is built for lists?",
            options: ["ScrollView", "FlatList", "View", "TextInput"],
            answerIndex: 1,
          },
        },
      ],
      projects: [
        {
          id: "shopping-list-app",
          title: "Shopping List App",
          description:
            "Create a shopping list that displays several items.",
          requirements: [
            "Store items in an array.",
            "Show the items on screen.",
            "Use a list component.",
          ],
          folderStructure: `shopping-list/
├── App.tsx`,
          guide:
            "1. Put your items in an array.\n2. Display each item in a list.\n3. Add a title and simple spacing.",
        },
      ],
    },
    {
      id: "forms",
      title: "Forms",
      description:
        "Learn how to let users type information into your app.",
      lessons: [
        {
          id: "textinput-basics",
          title: "TextInput",
          explanation:
            "`TextInput` lets the user type text, such as a name, email, or note.",
          codeExample: `<TextInput placeholder="Enter your name" />`,
          quiz: {
            question: "Which component lets users type text?",
            options: ["TextInput", "View", "Image", "FlatList"],
            answerIndex: 0,
          },
        },
        {
          id: "basic-validation",
          title: "Simple Validation",
          explanation:
            "Validation checks if the input is useful before you save or send it.",
          codeExample: `if (name.trim() === "") {
  alert("Please enter your name");
}`,
          quiz: {
            question: "Why do we validate input?",
            options: [
              "To catch empty or wrong input",
              "To delete the app",
              "To make buttons bigger",
              "To change the phone language",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "contact-form-app",
          title: "Contact Form App",
          description:
            "Build a small form with name, email, and message fields.",
          requirements: [
            "Add at least two input fields.",
            "Check that the fields are not empty.",
            "Show a success message after submit.",
          ],
          folderStructure: `contact-form/
├── App.tsx`,
          guide:
            "1. Add text fields.\n2. Store the input values in state.\n3. Validate the fields before showing success.",
        },
      ],
    },
    {
      id: "local-storage",
      title: "Local Storage",
      description:
        "Save and load small app data with AsyncStorage.",
      lessons: [
        {
          id: "asyncstorage-save",
          title: "Save Data",
          explanation:
            "AsyncStorage stores simple text data on the device. You can save a list by turning it into JSON first.",
          codeExample: `await AsyncStorage.setItem("notes", JSON.stringify(notes));`,
          quiz: {
            question: "Why do we use JSON.stringify before saving objects?",
            options: [
              "To turn data into text",
              "To delete the list",
              "To make CSS faster",
              "To create a button",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "asyncstorage-load",
          title: "Load Data",
          explanation:
            "When the app opens, read the saved value and turn it back into JavaScript with JSON.parse.",
          codeExample: `const data = await AsyncStorage.getItem("notes");
const notes = data ? JSON.parse(data) : [];`,
          quiz: {
            question: "What does JSON.parse do?",
            options: [
              "Turns text back into data",
              "Creates a new app",
              "Styles the screen",
              "Sends an email",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "notes-app",
          title: "Notes App",
          description:
            "Build a notes app that saves notes on the device.",
          requirements: [
            "Add a note input field.",
            "Save notes with AsyncStorage.",
            "Load notes when the app opens.",
          ],
          folderStructure: `notes-app/
├── App.tsx`,
          guide:
            "1. Save notes into state.\n2. Write them to AsyncStorage.\n3. Load them back when the app starts.",
        },
      ],
    },
    {
      id: "final-project",
      title: "Final Project",
      description:
        "Build a small mobile app that combines what you learned.",
      lessons: [
        {
          id: "plan-mobile-app",
          title: "Plan the App",
          explanation:
            "Choose a simple idea like an expense tracker, habit tracker, or to-do app. Keep the first version small.",
          codeExample: `Final app idea:
- Add items
- Show list
- Save data`,
          quiz: {
            question: "What is a good final project idea?",
            options: [
              "A simple app with a few clear features",
              "A huge app with no plan",
              "A page with no content",
              "A database only",
            ],
            answerIndex: 0,
          },
        },
        {
          id: "build-final-app",
          title: "Build and Test",
          explanation:
            "Use components, state, lists, forms, and storage to complete the app. Test it on your phone or simulator.",
          codeExample: `Checklist:
1. Add feature
2. Save data
3. Test on device`,
          quiz: {
            question: "Why should you test on a device or simulator?",
            options: [
              "To check how the app really behaves",
              "To remove all code",
              "To change file names",
              "To skip the layout",
            ],
            answerIndex: 0,
          },
        },
      ],
      projects: [
        {
          id: "expense-tracker",
          title: "Expense Tracker",
          description:
            "Build a small app to add expenses and see the total.",
          requirements: [
            "Add an expense form.",
            "Show a list of expenses.",
            "Calculate the total amount.",
          ],
          folderStructure: `expense-tracker/
├── App.tsx`,
          guide:
            "1. Save expenses in state.\n2. Show each expense in a list.\n3. Add a total so users can see their spending.",
        },
      ],
    },
  ],
};
