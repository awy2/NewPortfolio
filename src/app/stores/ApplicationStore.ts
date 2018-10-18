import { observable, computed, action } from 'mobx';
import { ApplicationModel } from 'app/models';

export class ApplicationStore {
  @observable public Applications: ApplicationModel[];
  lastTop: number;
  lastLeft: number;

  constructor(fixtures: ApplicationModel[]) {
    this.Applications = fixtures;
    this.lastTop = 100;
    this.lastLeft = 100;
  }

  @computed
  get openApplications() {
    return this.Applications.filter(Application => Application.isOpened);
  }

  @action
  addApplication = (item: Partial<ApplicationModel>): void => {
    
    this.lastTop = this.lastTop + 50;
    this.lastLeft = this.lastTop + 50;

    if( window.innerHeight < (this.lastTop + item.height) 
      || window.innerWidth < (this.lastLeft + item.width)) {
      this.lastTop = 100;
      this.lastLeft = 100;
    }

    const newApp = new ApplicationModel({
      text: item.text, 
      title: item.text,
      top: this.lastTop, 
      left: this.lastLeft, 
      height: item.height,
      width: item.width
      })
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
  resizeApplication = (id: string, data: Partial<ApplicationModel>): void => {
    this.Applications = this.Applications.map((Application) => {
      if (Application.id === id) {
        if (typeof data.height === 'number') {
          Application.height = data.height;
        }
        if (typeof data.width === 'number') {
          Application.width = data.width;
        }
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
  toggleApplicationMaximize = (id: string): void => {
    this.Applications = this.Applications.map((Application) => {
      if (Application.id === id) {
        Application.isMaximize = !Application.isMaximize;
      }
      return Application;
    });
  }

  @action
  toggleApplicationMinimize = (id: string): void => {
    this.Applications = this.Applications.map((Application) => {
      if (Application.id === id) {
        Application.isOpened = !Application.isOpened;
      }
      return Application;
    });
  }

  @action
  closeApplication = (id: string): void => {
    this.Applications = this.Applications.filter(Application => Application.id !== id);
  }

  @action
  minimizeAll = (): void => {
    this.Applications = this.Applications.map(Application => ({ ...Application, isOpened: false }));
  }
}

export default ApplicationStore;
