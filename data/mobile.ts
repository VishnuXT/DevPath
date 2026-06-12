import { CareerPath } from "./types";

export const mobilePath: CareerPath = {
  id: "mobile",
  title: "Mobile Development",
  emoji: "📱",
  description: "Mobile development involves building high-performance, cross-platform apps for iOS and Android devices using native APIs.",
  skills: [
    "Cross-platform App Development",
    "React Native Component Architecture",
    "Native Layouts & Flexbox Positioning",
    "Expo SDK Integration & Tooling",
    "Local Device Storage & Data Syncing"
  ],
  technologies: [
    { name: "JavaScript", emoji: "⚡" },
    { name: "React", emoji: "⚛️" },
    { name: "React Native", emoji: "📱" },
    { name: "Expo", emoji: "🚀" }
  ],
  learningTimeline: "3 - 5 Months",
  careerOpportunities: [
    "Mobile App Developer",
    "React Native Developer",
    "iOS/Android Engineer",
    "App UI Developer"
  ],
  roadmap: [
    {
      id: "js-mobile",
      title: "JavaScript for Mobile",
      description: "Master modern ES6 JavaScript syntax essential for React Native programming.",
      lessons: [
        {
          id: "es6-syntax-mobile",
          title: "ES6 Syntax & Array Methods",
          explanation: "React Native utilizes modern JavaScript syntax. You must master Arrow Functions, Destructuring (extracting keys from objects/arrays), template literals, and array operators like '.map()' (to loop and render items) and '.filter()' (to remove items).",
          codeExample: `// Arrow function and destructuring
const formatUser = ({ name, role }) => {
  return \`User \${name} acts as \${role}\`;
};

const user = { name: "Sofia", role: "Developer" };
console.log(formatUser(user));`,
          quiz: {
            question: "Which array method is commonly used in React Native to loop through and render a list of views?",
            options: [".filter()", ".reduce()", ".map()", ".push()"],
            answerIndex: 2
          }
        }
      ]
    },
    {
      id: "rn-basics",
      title: "React Native Basics",
      description: "Understand cross-compilation and the core UI building blocks of mobile screens.",
      lessons: [
        {
          id: "core-components-rn",
          title: "Views, Text, and Image components",
          explanation: "Unlike web browsers that use HTML, React Native communicates with native iOS and Android modules. You build interfaces using native-equivalent wrapper components: <View> (equivalent to <div>), <Text> (for all text contents), <Image> (for images), and <ScrollView> (to enable scrolling). Use <SafeAreaView> to avoid camera notches.",
          codeExample: `import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.box}>
        <Text>Hello from Mobile Screen!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  box: { padding: 20 }
});`,
          quiz: {
            question: "Which component is required in React Native to wrap any text values?",
            options: ["<View>", "<Paragraph>", "<Text>", "<div>"],
            answerIndex: 2
          }
        }
      ]
    },
    {
      id: "styling-layouts",
      title: "Styling & Layouts",
      description: "Design mobile-first layouts using React Native Flexbox and the StyleSheet API.",
      lessons: [
        {
          id: "flexbox-rn",
          title: "Flexbox in React Native",
          explanation: "React Native uses Flexbox for positioning, but with minor differences from web CSS: 'flexDirection' defaults to 'column' instead of 'row', and style properties are written in camelCase. You compile styling rules using the 'StyleSheet.create()' utility API to ensure optimization.",
          codeExample: `const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up entire screen
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  }
});`,
          quiz: {
            question: "What is the default flexDirection in React Native?",
            options: ["row", "row-reverse", "column", "column-reverse"],
            answerIndex: 2
          }
        }
      ],
      projects: [
        {
          id: "card-layout",
          title: "Simple Product Card Layout",
          description: "Create a visually appealing, responsive profile or product card using Flexbox, rounded borders, and custom shadow offsets.",
          requirements: [
            "Use View, Text, and Image components to structure a card.",
            "Center the card in the viewport using Flexbox properties.",
            "Style elements with custom border radius, elevation (Android), and shadowColor (iOS) parameters."
          ],
          folderStructure: `card-layout/
└── CardComponent.tsx`,
          guide: "1. Create a container wrapper that centers children.\n2. Define a card container style with background color white, radius of 12, padding of 15, and elevation of 5.\n3. Position details like price/name side-by-side using `flexDirection: 'row'`."
        }
      ]
    },
    {
      id: "rn-navigation",
      title: "React Native Navigation",
      description: "Configure navigation stacks, screen transitions, and page params using Expo Router.",
      lessons: [
        {
          id: "navigation-stack-router",
          title: "Expo Router & Navigation Stack",
          explanation: "Expo Router brings file-based routing to React Native. Every file in the 'app/' directory represents a screen. Dynamic pages are specified with brackets (e.g. '[id].tsx'). You use the 'router.push()' function and '<Link>' tags to trigger stack screen transitions.",
          codeExample: `import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';

function DetailButton() {
  return (
    <Pressable onPress={() => router.push('/details/101')}>
      <Text>Go to Details</Text>
    </Pressable>
  );
}`,
          quiz: {
            question: "How do you navigate to a different screen dynamically in Expo Router?",
            options: [
              "window.location.href = '/path'",
              "router.push('/path')",
              "navigator.navigate('/path')",
              "route('/path')"
            ],
            answerIndex: 1
          }
        }
      ],
      projects: [
        {
          id: "notes-mobile",
          title: "Notes App with Routing",
          description: "Build a multi-screen Notes app where users can view a list of notes and click on any note to open its detailed text page.",
          requirements: [
            "Create a list of note items on the home screen using FlatList.",
            "Route to a detail page app/notes/[id].tsx passing note information.",
            "Include a custom back button to return to the home notes screen."
          ],
          folderStructure: `notes-app/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx (List Screen)
│   └── notes/
│       └── [id].tsx (Details Screen)
└── package.json`,
          guide: "1. Define a list of note objects: `{ id: string, title: string, content: string }`.\n2. Render each note inside a Pressable that triggers navigation: `router.push({ pathname: '/notes/[id]', params: { id: note.id, title: note.title, content: note.content } })`.\n3. In `app/notes/[id].tsx`, extract details using `useLocalSearchParams()`."
        }
      ]
    },
    {
      id: "state-hooks",
      title: "State Management & Hooks",
      description: "Manage component lifetimes, fetch network assets, and update UI reactive components on mobile.",
      lessons: [
        {
          id: "hooks-mobile-lifecycle",
          title: "useState & useEffect in Mobile",
          explanation: "State and effects drive reactive screens. Because mobile devices can change orientation, network speed, or focus state, managing lifecycle triggers properly with cleanups (like clearing setIntervals or aborting fetches) in useEffect is critical to prevent leaks.",
          codeExample: `import { useState, useEffect } from 'react';
import { Text } from 'react-native';

function Timer() {
  const [sec, setSec] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setSec(s => s + 1), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return <Text>Timer: {sec}s</Text>;
}`,
          quiz: {
            question: "Why is it important to return a cleanup function in useEffect when setting intervals or subscriptions?",
            options: [
              "To speed up database connections",
              "To prevent memory leaks and unneeded background processing",
              "To styling components automatically",
              "To convert class components into functions"
            ],
            answerIndex: 1
          }
        }
      ]
    },
    {
      id: "device-features",
      title: "Native Device Features",
      description: "Interact with device storage, secure stores, camera, and sensors using Expo SDK libraries.",
      lessons: [
        {
          id: "asyncstorage-persistence",
          title: "Using AsyncStorage & Sensors",
          explanation: "Mobile apps require local persistence so users don't lose data when the app closes. '@react-native-async-storage/async-storage' is an asynchronous, unencrypted, key-value storage system. You serialize data to JSON strings to write and deserialize on retrieve.",
          codeExample: `import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user data
const saveUser = async (userObj) => {
  await AsyncStorage.setItem('user', JSON.stringify(userObj));
};

// Retrieve user data
const getUser = async () => {
  const data = await AsyncStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};`,
          quiz: {
            question: "Which format must you convert JavaScript objects into before storing them in AsyncStorage?",
            options: ["XML string", "SQL query", "JSON string", "Binary buffer"],
            answerIndex: 2
          }
        }
      ],
      projects: [
        {
          id: "expense-tracker",
          title: "Expense Tracker",
          description: "Build an Expense Tracker that records transaction objects (name, amount, category) and persists them using AsyncStorage.",
          requirements: [
            "Provide form fields to input title, cost, and selection type.",
            "Display list of transactions and aggregate totals.",
            "Load transactions from AsyncStorage on launch and save them on additions/deletions."
          ],
          folderStructure: `expense-tracker/
├── App.tsx
└── package.json`,
          guide: "1. Store a transaction list array in state.\n2. Write async functions `loadExpenses` (triggered in mounting useEffect) and `saveExpenses` (called inside add/remove logic).\n3. Keep inputs clean and handle input validations (e.g. parse float for amount value)."
        }
      ]
    }
  ]
};
