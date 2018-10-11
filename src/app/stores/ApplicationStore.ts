import { observable, computed, action } from 'mobx';
import { ApplicationModel } from 'app/models';

export class ApplicationStore {
  constructor(fixtures: ApplicationModel[]) {
    this.Applications = fixtures;
  }

  @observable public Applications: ApplicationModel[];

  @computed
  get minimizeApplications() {
    return this.Applications.filter(Application => !Application.isOpened);
  }

  @computed
  get openApplications() {
    return this.Applications.filter(Application => Application.isOpened);
  }

  @action
  addApplication = (item: Partial<ApplicationModel>): void => {
    this.Applications.push(new ApplicationModel(item.text, item.isOpened, item.top, item.left, item.height, item.width));
  }

  @action
  moveApplication = (id: number, data: Partial<ApplicationModel>): void => {
    this.Applications = this.Applications.map((Application) => {
      if (Application.id === id) {
        if (typeof data.left === 'number') {
          Application.left = data.left;
        }
        if (typeof data.top === 'number') {
          Application.top = data.top;
        }
      }
      return Application;
    });
  }

  @action
  editApplication = (id: number, data: Partial<ApplicationModel>): void => {
    this.Applications = this.Applications.map((Application) => {
      if (Application.id === id) {
        if (typeof data.isOpened === 'boolean') {
          Application.isOpened = data.isOpened;
        }
        if (typeof data.text === 'string') {
          Application.text = data.text;
        }
      }
      return Application;
    });
  }

  @action
  deleteApplication = (id: number): void => {
    this.Applications = this.Applications.filter(Application => Application.id !== id);
  }

  @action
  completeAll = (): void => {
    this.Applications = this.Applications.map(Application => ({ ...Application, isOpened: true }));
  }
}

export default ApplicationStore;
