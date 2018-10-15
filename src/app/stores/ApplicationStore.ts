import { observable, computed, action } from 'mobx';
import { ApplicationModel } from 'app/models';
//

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
    const newApp = new ApplicationModel(item.text, item.isOpened, item.top, item.left, item.height, item.width)
    this.Applications.push(newApp);
  }

  @action
  moveApplication = (id: string, data: Partial<ApplicationModel>): void => {
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
  editApplication = (id: string, data: Partial<ApplicationModel>): void => {
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
  deleteApplication = (id: string): void => {
    this.Applications = this.Applications.filter(Application => Application.id !== id);
  }

  @action
  completeAll = (): void => {
    this.Applications = this.Applications.map(Application => ({ ...Application, isOpened: true }));
  }
}

export default ApplicationStore;
