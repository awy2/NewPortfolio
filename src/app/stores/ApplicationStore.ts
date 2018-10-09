import { observable, computed, action } from 'mobx';
import { ApplicationModel } from 'app/models';

export class ApplicationStore {
  constructor(fixtures: ApplicationModel[]) {
    this.todos = fixtures;
  }

  @observable public todos: ApplicationModel[];

  @computed
  get activeTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  @computed
  get completedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  @action
  addTodo = (item: Partial<ApplicationModel>): void => {
    this.todos.push(new ApplicationModel(item.text, item.completed));
  }

  @action
  editTodo = (id: number, data: Partial<ApplicationModel>): void => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        if (typeof data.completed === 'boolean') {
          todo.completed = data.completed;
        }
        if (typeof data.text === 'string') {
          todo.text = data.text;
        }
      }
      return todo;
    });
  }

  @action
  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  @action
  completeAll = (): void => {
    this.todos = this.todos.map(todo => ({ ...todo, completed: true }));
  }

  @action
  clearCompleted = (): void => {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
}

export default ApplicationStore;
