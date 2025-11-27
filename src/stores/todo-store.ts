import { makeAutoObservable } from 'mobx';
import { makePersistable, hydrateStore } from 'mobx-persist-store';

export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type TodoFilter = 'all' | 'completed' | 'ongoing';

export class TodoStore {
  todos: Todo[] = [];
  filter: TodoFilter = 'all';

  constructor() {
    makeAutoObservable(this);
    
    // Configure automatic persistence
    makePersistable(this, {
      name: 'TodoStore',
      properties: ['todos', 'filter'],
    });
  }

  // Create
  addTodo(title: string, description?: string) {
    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  // Read
  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  // Update
  updateTodo(id: string, updates: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      Object.assign(todo, updates, { updatedAt: Date.now() });
    }
  }

  toggleTodo(id: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = Date.now();
    }
  }

  // Delete
  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  // Filtering
  setFilter(filter: TodoFilter) {
    this.filter = filter;
  }

  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      case 'ongoing':
        return this.todos.filter(todo => !todo.completed);
      case 'all':
      default:
        return this.todos;
    }
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  get ongoingCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get totalCount(): number {
    return this.todos.length;
  }

  hydrate = async (): Promise<void> => {
    await hydrateStore(this);
  };
}

