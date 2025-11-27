# Todo App - React Native Expo

A modern, feature-rich todo application built with React Native and Expo. Manage your tasks efficiently with an intuitive interface, persistent storage, and powerful filtering capabilities.

## 📱 Screenshots

### Main Screen
<p align="center">
  <img src="./screenshots/Screenshot%202025-11-27%20at%209.35.15%20PM.png" alt="Todo App Main Screen" width="400"/>
</p>
<p align="center">
  <em>Main Todo Screen with Filter Options and Todo List</em>
</p>

### Todo Management
<p align="center">
  <img src="./screenshots/Screenshot%202025-11-27%20at%209.35.43%20PM.png" alt="Todo App Features" width="400"/>
</p>
<p align="center">
  <em>Todo Management Interface with Add/Edit Functionality</em>
</p>

## ✨ Features

- **Create Todos**: Add new tasks with titles and optional descriptions
- **Edit Todos**: Update existing todos with inline editing
- **Delete Todos**: Remove tasks with confirmation dialogs
- **Toggle Completion**: Mark todos as complete or incomplete with a single tap
- **Smart Filtering**: Filter todos by status (All, Ongoing, Completed)
- **Statistics Dashboard**: View total, ongoing, and completed todo counts
- **Persistent Storage**: Todos are automatically saved and restored using AsyncStorage
- **Modern UI**: Beautiful, responsive interface built with NativeWind (Tailwind CSS)
- **Type-Safe**: Built with TypeScript for better code quality and developer experience

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: [MobX](https://mobx.js.org/) with [mobx-persist-store](https://github.com/quarrant/mobx-persist-store)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Language**: TypeScript
- **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 📋 Basic Functionality

### Adding a Todo
1. Enter a todo title in the "Todo title..." input field
2. Optionally add a description in the "Description (optional)..." field
3. Tap the "Add Todo" button or press Enter to create the todo

### Editing a Todo
1. Tap the "Edit" button on any todo item
2. Modify the title and/or description in the inline edit form
3. Tap "Save" to apply changes or "Cancel" to discard

### Completing a Todo
- Tap the circular checkbox on the left side of any todo item to toggle its completion status
- Completed todos are visually distinguished with a green background and strikethrough text

### Filtering Todos
- Use the filter buttons at the top (All, Ongoing, Completed) to view todos by status
- The active filter is highlighted in blue
- Statistics update automatically based on the current filter

### Deleting a Todo
1. Tap the "Delete" button on any todo item
2. Confirm the deletion in the alert dialog
3. The todo will be permanently removed

### Data Persistence
- All todos are automatically saved to local storage
- Your todos persist across app restarts
- Filter preferences are also saved and restored

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Expo CLI (optional, but recommended)
- iOS Simulator (for macOS) or Android Emulator, or Expo Go app on your device

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RN-ExpoGo-Villa-Sample
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

4. Run on your preferred platform:
   - **iOS**: `yarn ios` or press `i` in the terminal
   - **Android**: `yarn android` or press `a` in the terminal
   - **Web**: `yarn web` or press `w` in the terminal
   - **Expo Go**: Scan the QR code with the Expo Go app on your device

## 📁 Project Structure

```
RN-ExpoGo-Villa-Sample/
├── src/
│   ├── app/              # Expo Router app directory
│   │   ├── _layout.tsx   # Root layout with store hydration
│   │   ├── index.tsx     # Main todo app screen
│   │   └── providers/    # App providers (MobX, etc.)
│   ├── stores/           # MobX stores
│   │   ├── todo-store.ts # Todo store with CRUD operations
│   │   ├── types.ts      # TypeScript type definitions
│   │   └── index.tsx     # Store exports and hydration
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries and configurations
│   └── utils/            # Helper functions
├── assets/               # Images and static assets
├── app.config.js         # Expo configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎯 Key Components

### TodoStore
The core state management store that handles:
- Todo CRUD operations (Create, Read, Update, Delete)
- Filtering logic (All, Ongoing, Completed)
- Statistics calculations
- Automatic persistence to AsyncStorage

### Main App Screen
The primary UI component (`src/app/index.tsx`) that provides:
- Todo input form
- Filter buttons
- Todo list with edit/delete actions
- Completion toggle functionality

## 📝 Available Scripts

- `yarn start` - Start the Expo development server
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn web` - Run in web browser
- `yarn lint` - Run ESLint and Prettier checks
- `yarn format` - Format code with ESLint and Prettier
- `yarn prebuild` - Generate native code

## 🔧 Development

The app uses:
- **MobX** for reactive state management
- **mobx-persist-store** for automatic persistence
- **NativeWind** for styling with Tailwind CSS classes
- **Expo Router** for file-based routing
- **TypeScript** for type safety

## 📄 License

This project is private and proprietary.

## 👤 Author

Built with ❤️ using React Native and Expo

---

*For questions or support, please open an issue in the repository.*

