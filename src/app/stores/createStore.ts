import { History } from 'history';
import { ApplicationModel } from 'app/models';
import { RouterStore } from './RouterStore';
import { ApplicationStore } from './ApplicationStore';
import { STORE_ROUTER, STORE_APPLICATION } from 'app/constants';

export function createStores(
  history: History,
  defaultApplication?: ApplicationModel[]) {

  const routerStore = new RouterStore(history);
  const applicationStore = new ApplicationStore(defaultApplication);
  return {
    [STORE_ROUTER]: routerStore,
    [STORE_APPLICATION]: applicationStore,
  };
}
