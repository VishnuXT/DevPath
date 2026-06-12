import { View, Text, StyleSheet, Pressable } from "react-native";

interface RoadmapItemProps {
  number: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  isActive?: boolean;
  isLast?: boolean;
  themeColor?: string;
  onPress: () => void;
}

export default function RoadmapItem({
  number,
  title,
  description,
  isCompleted = false,
  isActive = false,
  isLast = false,
  themeColor = "#2563EB",
  onPress,
}: RoadmapItemProps) {
  // Determine node background and border based on status
  const nodeBgColor = isCompleted ? themeColor : isActive ? "white" : "#F1F5F9";
  const nodeBorderColor = isCompleted ? themeColor : isActive ? themeColor : "#CBD5E1";
  const nodeTextColor = isCompleted ? "white" : isActive ? themeColor : "#64748B";

  return (
    <View style={styles.container}>
      {/* Left side: Node Circle and Connector Line */}
      <View style={styles.timelineColumn}>
        <View
          style={[
            styles.node,
            {
              backgroundColor: nodeBgColor,
              borderColor: nodeBorderColor,
              borderWidth: isActive ? 3 : 2,
            },
          ]}
        >
          {isCompleted ? (
            <Text style={styles.checkIcon}>✓</Text>
          ) : (
            <Text style={[styles.nodeText, { color: nodeTextColor }]}>
              {number}
            </Text>
          )}
        </View>

        {/* Vertical line connecting to next item */}
        {!isLast && (
          <View
            style={[
              styles.line,
              {
                backgroundColor: isCompleted ? themeColor : "#E2E8F0",
              },
            ]}
          />
        )}
      </View>

      {/* Right side: Information Card */}
      <Pressable style={styles.cardPressable} onPress={onPress}>
        <View style={[styles.card, isActive && styles.activeCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{title}</Text>
            
            {/* Status Badge */}
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isCompleted
                    ? "#ECFDF5"
                    : isActive
                    ? `${themeColor}10`
                    : "#F1F5F9",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: isCompleted
                      ? "#059669"
                      : isActive
                      ? themeColor
                      : "#64748B",
                  },
                ]}
              >
                {isCompleted ? "Completed" : isActive ? "Active" : "Locked"}
              </Text>
            </View>
          </View>
          
          <Text style={styles.cardDescription} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 100,
  },
  timelineColumn: {
    alignItems: "center",
    marginRight: 15,
  },
  node: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  nodeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  checkIcon: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    width: 3,
    flex: 1,
    marginTop: -2,
    marginBottom: -2,
  },
  cardPressable: {
    flex: 1,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  activeCard: {
    borderColor: "#E2E8F0",
    shadowOpacity: 0.08,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
});
