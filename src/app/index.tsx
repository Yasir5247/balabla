import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores";

export default observer(function App() {
  const { todo } = useStores();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      todo.addTodo(newTodoTitle.trim(), newTodoDescription.trim() || undefined);
      setNewTodoTitle("");
      setNewTodoDescription("");
    }
  };

  const handleEdit = (id: string, title: string, description?: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditDescription(description || "");
  };

  const handleSaveEdit = (id: string) => {
    if (editTitle.trim()) {
      todo.updateTodo(id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
    }
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      "Delete Todo",
      `Are you sure you want to delete "${title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => todo.deleteTodo(id),
        },
      ]
    );
  };

  const filterButtons: Array<{ label: string; value: typeof todo.filter }> = [
    { label: "All", value: "all" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-3xl font-bold mb-2">My Todos</Text>
        <Text className="text-blue-100 text-sm">
          {todo.totalCount} total • {todo.ongoingCount} ongoing • {todo.completedCount} completed
        </Text>
      </View>

      {/* Filter Buttons */}
      <View className="flex-row px-4 py-3 bg-white border-b border-gray-200">
        {filterButtons.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            onPress={() => todo.setFilter(value)}
            className={`px-4 py-2 mx-1 rounded-full ${
              todo.filter === value
                ? "bg-blue-600"
                : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-semibold ${
                todo.filter === value ? "text-white" : "text-gray-700"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Todo Form */}
      <View className="bg-white p-4 border-b border-gray-200">
        <TextInput
          placeholder="Todo title..."
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          onSubmitEditing={handleAddTodo}
          className="border border-gray-300 rounded-lg px-4 py-3 mb-2 bg-white text-gray-900"
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          placeholder="Description (optional)..."
          value={newTodoDescription}
          onChangeText={setNewTodoDescription}
          onSubmitEditing={handleAddTodo}
          multiline
          className="border border-gray-300 rounded-lg px-4 py-3 mb-3 bg-white text-gray-900"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          className="bg-blue-600 rounded-lg py-3 px-4"
        >
          <Text className="text-white font-semibold text-center">Add Todo</Text>
        </TouchableOpacity>
      </View>

      {/* Todo List */}
      <ScrollView className="flex-1 px-4 py-2">
        {todo.filteredTodos.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-400 text-lg">
              {todo.filter === "all"
                ? "No todos yet. Add one above!"
                : todo.filter === "completed"
                ? "No completed todos"
                : "No ongoing todos"}
            </Text>
          </View>
        ) : (
          todo.filteredTodos.map((item) => (
            <View
              key={item.id}
              className={`bg-white rounded-lg p-4 mb-3 border ${
                item.completed
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              {editingId === item.id ? (
                <View>
                  <TextInput
                    value={editTitle}
                    onChangeText={setEditTitle}
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-2 bg-white text-gray-900"
                    placeholderTextColor="#9CA3AF"
                  />
                  <TextInput
                    value={editDescription}
                    onChangeText={setEditDescription}
                    multiline
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-white text-gray-900"
                    placeholderTextColor="#9CA3AF"
                  />
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => handleSaveEdit(item.id)}
                      className="flex-1 bg-green-600 rounded-lg py-2 px-4"
                    >
                      <Text className="text-white font-semibold text-center">
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setEditingId(null);
                        setEditTitle("");
                        setEditDescription("");
                      }}
                      className="flex-1 bg-gray-300 rounded-lg py-2 px-4"
                    >
                      <Text className="text-gray-700 font-semibold text-center">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <View className="flex-row items-start mb-2">
                    <TouchableOpacity
                      onPress={() => todo.toggleTodo(item.id)}
                      className={`w-6 h-6 rounded-full border-2 mr-3 mt-1 ${
                        item.completed
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400"
                      }`}
                    >
                      {item.completed && (
                        <View className="items-center justify-center flex-1">
                          <Text className="text-white text-xs font-bold">✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                    <View className="flex-1">
                      <Text
                        className={`text-lg font-semibold ${
                          item.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text
                          className={`text-sm mt-1 ${
                            item.completed
                              ? "line-through text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {item.description}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View className="flex-row gap-2 mt-2">
                    <TouchableOpacity
                      onPress={() =>
                        handleEdit(item.id, item.title, item.description)
                      }
                      className="flex-1 bg-blue-100 rounded-lg py-2 px-4"
                    >
                      <Text className="text-blue-700 font-semibold text-center">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id, item.title)}
                      className="flex-1 bg-red-100 rounded-lg py-2 px-4"
                    >
                      <Text className="text-red-700 font-semibold text-center">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
});
