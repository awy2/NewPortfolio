import { History } from 'history';
import { TodoModel, ApplicationModel } from 'app/models';
import { TodoStore } from './TodoStore';
import { RouterStore } from './RouterStore';
import { ApplicationStore } from './ApplicationStore';
import { STORE_TODO, STORE_ROUTER, STORE_APPLICATION } from 'app/constants';

export function createStores(history: History, defaultTodos?: TodoModel[], defaultApplication?: ApplicationModel[]) {
  const todoStore = new TodoStore(defaultTodos);
  const routerStore = new RouterStore(history);
  const applicationStore = new ApplicationStore(defaultApplication);
  return {
    [STORE_TODO]: todoStore,
    [STORE_ROUTER]: routerStore,
    [STORE_APPLICATION]: applicationStore
  };
}
