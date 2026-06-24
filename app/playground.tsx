import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, Radius } from "../constants/theme";

// Dynamically require WebView on native platforms to prevent build errors on web
let WebView: any;
if (Platform.OS !== "web") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    WebView = require("react-native-webview").WebView;
  } catch (e) {
    console.warn("WebView not available on this platform", e);
  }
}

export default function PlaygroundScreen() {
  const params = useLocalSearchParams<{ code?: string; language?: string; title?: string }>();
  
  // Default values
  const defaultCode =
    params.language === "html"
      ? `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: sans-serif;
        text-align: center;
        background: #f0fdf4;
        padding-top: 50px;
      }
      h1 { color: #166534; }
      p { color: #1b5e20; }
    </style>
  </head>
  <body>
    <h1>Welcome to DevRoot!</h1>
    <p>Edit this code and hit Run to see it change.</p>
  </body>
</html>`
      : `// Write your JavaScript code here
const name = "Developer";
console.log("Hello, " + name + "!");
console.log("Welcome to your DevRoot console!");

for (let i = 1; i <= 3; i++) {
  console.log("Iteration number: " + i);
}`;

  const [code, setCode] = useState(params.code || defaultCode);
  const [language, setLanguage] = useState(params.language || "html");
  const title = params.title || "Free Sandbox";
  
  const [activeTab, setActiveTab] = useState<"editor" | "output">("editor");
  const [logs, setLogs] = useState<string[]>([]);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [sandboxHtml, setSandboxHtml] = useState<string | null>(null);

  const editorRef = useRef<TextInput>(null);

  const handleSandboxMessage = (type: string, args: string[]) => {
    if (type === "completed") {
      setIsRunning(false);
      return;
    }

    const logLine = args.join(" ");
    let formattedLine = logLine;
    if (type === "warn") {
      formattedLine = `⚠️ WARNING: ${logLine}`;
    } else if (type === "error") {
      formattedLine = logLine;
    }

    setLogs((prev) => [...prev, formattedLine]);
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleWebMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data && data.source === "devroot-sandbox") {
            handleSandboxMessage(data.type, data.args);
          }
        } catch {
          // Ignore non-JSON messages
        }
      };
      window.addEventListener("message", handleWebMessage);
      return () => window.removeEventListener("message", handleWebMessage);
    }
  }, []);

  // Helper keyboard keycaps
  const helperSymbols = ["<", ">", "/", "=", "\"", "{", "}", ";", "(", ")", "[", "]", "+", "-", "*"];

  const handleInsertSymbol = (symbol: string) => {
    const newCode = code.slice(0, selection.start) + symbol + code.slice(selection.end);
    setCode(newCode);
    
    // Position cursor right after the inserted symbol
    const newCursorIndex = selection.start + symbol.length;
    setSelection({ start: newCursorIndex, end: newCursorIndex });
    
    // Refocus editor
    editorRef.current?.focus();
  };

  const handleRun = () => {
    setIsRunning(true);
    setActiveTab("output");
    setLogs([]);
    
    if (language === "javascript") {
      setRunCount((prev) => prev + 1);
      
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    (function() {
      function sendLog(type, args) {
        const serialized = args.map(arg => {
          if (arg === null) return "null";
          if (arg === undefined) return "undefined";
          if (typeof arg === "object") {
            try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
          }
          return String(arg);
        });
        const data = { type: type, args: serialized };
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        } else {
          window.parent.postMessage(JSON.stringify({ source: 'devroot-sandbox', ...data }), '*');
        }
      }
      console.log = function(...args) { sendLog('log', args); };
      console.info = function(...args) { sendLog('info', args); };
      console.warn = function(...args) { sendLog('warn', args); };
      console.error = function(...args) { sendLog('error', args); };
      window.onerror = function(message, source, lineno, colno, error) {
        sendLog('error', ['❌ CRASH: ' + message + ' (line ' + lineno + ')']);
        return true;
      };
    })();
    
    setTimeout(function() {
      try {
        ${code}
        
        const completeData = { type: 'completed', args: [] };
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify(completeData));
        } else {
          window.parent.postMessage(JSON.stringify({ source: 'devroot-sandbox', ...completeData }), '*');
        }
      } catch(err) {
        console.error(err.message);
      }
    }, 50);
  </script>
</head>
<body></body>
</html>
`;
      setSandboxHtml(html);

      // Fallback timeout in case the execution hangs or doesn't report 'completed'
      setTimeout(() => {
        setIsRunning(false);
      }, 5000);
    } else {
      setTimeout(() => {
        setIsRunning(false);
      }, 400);
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const renderPreview = () => {
    if (language === "javascript") {
      return (
        <View style={styles.consoleContainer}>
          <View style={styles.consoleHeader}>
            <Text style={styles.consoleTitle}>💻 console_output.log</Text>
            <Pressable onPress={handleClearLogs} style={styles.clearBtn}>
              <Feather name="trash-2" size={14} color={Colors.error} />
              <Text style={styles.clearBtnText}>Clear</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.consoleLogArea} contentContainerStyle={{ paddingBottom: Spacing.xl }}>
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <Text key={idx} style={[styles.consoleLogText, log.startsWith("❌") && styles.consoleErrorText]}>
                  {log}
                </Text>
              ))
            ) : (
              <Text style={styles.consoleMutedText}>Press &quot;Run Code&quot; to view logs here...</Text>
            )}
          </ScrollView>
        </View>
      );
    }

    // HTML Rendering
    if (Platform.OS === "web") {
      return (
        <iframe
          srcDoc={code}
          style={styles.webPreview}
          title="Sandbox Preview"
          sandbox="allow-scripts"
        />
      );
    }

    if (WebView) {
      return (
        <WebView
          originWhitelist={["*"]}
          source={{ html: code }}
          style={styles.nativePreview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      );
    }

    return (
      <View style={styles.fallbackPreviewContainer}>
        <Feather name="alert-circle" size={48} color={Colors.textMuted} />
        <Text style={styles.fallbackPreviewText}>
          Preview container not available. Please run this in your web browser or Expo Go.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSub}>
            Mode: {language === "html" ? "HTML & CSS" : "JavaScript Engine"}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={handleRun}
            style={({ pressed }) => [
              styles.runHeaderBtn,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Feather name="play" size={13} color={Colors.textInverse} style={{ marginRight: 4 }} />
            <Text style={styles.runHeaderBtnText}>Run</Text>
          </Pressable>
          <Pressable
            onPress={() => setLanguage(language === "html" ? "javascript" : "html")}
            style={styles.toggleLanguageBtn}
          >
            <Text style={styles.toggleLanguageText}>
              To {language === "html" ? "JS" : "HTML"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* TABS SELECTOR */}
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setActiveTab("editor")}
          style={[styles.tab, activeTab === "editor" && styles.activeTab]}
        >
          <Feather
            name="code"
            size={16}
            color={activeTab === "editor" ? Colors.primary : Colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === "editor" && styles.activeTabText]}>
            Editor
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("output")}
          style={[styles.tab, activeTab === "output" && styles.activeTab]}
        >
          <Feather
            name={language === "html" ? "eye" : "terminal"}
            size={16}
            color={activeTab === "output" ? Colors.primary : Colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === "output" && styles.activeTabText]}>
            {language === "html" ? "Live Preview" : "Console Logs"}
          </Text>
        </Pressable>
      </View>

      {/* ACTIVE SCREEN CONTAINER */}
      <View style={styles.contentContainer}>
        {activeTab === "editor" ? (
          <View style={styles.editorView}>
            <TextInput
              ref={editorRef}
              style={styles.textEditor}
              multiline
              value={code}
              onChangeText={setCode}
              onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              spellCheck={false}
              placeholder="Start coding here..."
              placeholderTextColor="#475569"
            />
            {/* KEYBOARD BAR HELPER */}
            <View style={styles.helperBar}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.helperScrollContent}>
                {helperSymbols.map((symbol) => (
                  <Pressable
                    key={symbol}
                    onPress={() => handleInsertSymbol(symbol)}
                    style={({ pressed }) => [
                      styles.helperKeycap,
                      pressed && styles.helperKeycapPressed,
                    ]}
                  >
                    <Text style={styles.helperKeycapText}>{symbol}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : isRunning ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loaderText}>Compiling and running...</Text>
          </View>
        ) : (
          renderPreview()
        )}
      </View>

      {language === "javascript" && sandboxHtml && (
        Platform.OS === "web" ? (
          <iframe
            key={runCount}
            srcDoc={sandboxHtml}
            style={{ width: 0, height: 0, opacity: 0, position: "absolute" }}
            sandbox="allow-scripts"
          />
        ) : (
          WebView && (
            <WebView
              key={runCount}
              originWhitelist={["*"]}
              source={{ html: sandboxHtml }}
              style={{ width: 0, height: 0, opacity: 0, position: "absolute" }}
              javaScriptEnabled={true}
              onMessage={(e: any) => {
                try {
                  const data = JSON.parse(e.nativeEvent.data);
                  handleSandboxMessage(data.type, data.args);
                } catch {
                  // Ignore
                }
              }}
            />
          )
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  backBtn: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.black,
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  runHeaderBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  runHeaderBtnText: {
    fontSize: 12,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  toggleLanguageBtn: {
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  toggleLanguageText: {
    fontSize: 12,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#0E131F", // Dark editor background everywhere
  },
  editorView: {
    flex: 1,
  },
  textEditor: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    fontSize: 14,
    color: "#ABB2BF", // light text
    padding: Spacing.md,
    textAlignVertical: "top",
  },
  helperBar: {
    backgroundColor: "#090D16",
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
    paddingVertical: Spacing.sm,
  },
  helperScrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  helperKeycap: {
    backgroundColor: "#1E293B",
    borderRadius: Radius.sm,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  helperKeycapPressed: {
    backgroundColor: "#334155",
  },
  helperKeycapText: {
    fontFamily: "monospace",
    color: "#F8FAFC",
    fontWeight: "bold",
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    backgroundColor: "#0E131F",
  },
  loaderText: {
    color: Colors.textSecondary,
    fontSize: FontSize.bodySmall,
  },
  consoleContainer: {
    flex: 1,
    backgroundColor: "#080C14",
  },
  consoleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#05080E",
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
  },
  consoleTitle: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: FontWeight.bold,
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
  },
  clearBtnText: {
    color: Colors.errorText,
    fontSize: 11,
    fontWeight: FontWeight.bold,
  },
  consoleLogArea: {
    flex: 1,
    padding: Spacing.md,
  },
  consoleLogText: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 18,
    color: "#34D399", // Emerald green logs
    marginBottom: 8,
  },
  consoleErrorText: {
    color: "#F87171", // Coral red errors
  },
  consoleMutedText: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#475569",
    fontStyle: "italic",
  },
  webPreview: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
    backgroundColor: "#FFFFFF",
  },
  nativePreview: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fallbackPreviewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    backgroundColor: "#1E293B",
  },
  fallbackPreviewText: {
    color: "#FFFFFF",
    marginTop: Spacing.md,
    textAlign: "center",
    fontSize: FontSize.bodySmall,
  },

});
