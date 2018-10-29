import { observable, computed, action } from 'mobx';
import { ApplicationModel } from 'app/models';

import { Test } from 'constants/applicationTypes';

export class ApplicationStore {
  @observable public applications: ApplicationModel[];
  lastTop: number;
  lastLeft: number;
  lastSequence: number;
  lastSelectedApplicationID: string;

  constructor(fixtures: ApplicationModel[]) {
    this.applications = fixtures;
    this.lastTop = 100;
    this.lastLeft = 100;
    this.lastSequence = 1;
    this.lastSelectedApplicationID = null;
  }

  @computed
  get openApplications() {
    return this.applications.filter(application => application.isOpened);
  }

  @action
  onSelectApplication = (id: string) => {

    this.lastSequence += 1;
    this.lastSelectedApplicationID = id;

    this.applications = this.applications.map((application) => {
      if (application.id === id) {
        application.sequence = this.lastSequence;
      }
      return application;
    });
  }

  @action
  addApplication = (item: Partial<ApplicationModel>): void => {

    this.lastTop = this.lastTop + 50;
    this.lastLeft = this.lastTop + 50;

    if (window.innerHeight < (this.lastTop + item.height)
      || window.innerWidth < (this.lastLeft + item.width)) {
      this.lastTop = 100;
      this.lastLeft = 100;
    }

    this.lastSequence = this.lastSequence + 1;

    const newApp = new ApplicationModel({
      text: item.text,
      title: item.text,
      top: this.lastTop,
      left: this.lastLeft,
      height: item.height,
      width: item.width,
      sequence: this.lastSequence,
      applicationType: Test,
    });

    this.lastSelectedApplicationID = newApp.id;
    this.applications.push(newApp);
  }

  @action
  moveApplication = (id: string, data: Partial<ApplicationModel>): void => {
    this.applications = this.applications.map((application) => {
      if (application.id === id) {
        if (typeof data.left === 'number') {
          application.left = data.left;
        }
        if (typeof data.top === 'number') {
          application.top = data.top;
        }
      }
      return application;
    });
  }

  @action
  resizeApplication = (id: string, data: Partial<ApplicationModel>): void => {
    this.applications = this.applications.map((application) => {
      if (application.id === id) {
        if (typeof data.height === 'number') {
          application.height = data.height;
        }
        if (typeof data.width === 'number') {
          application.width = data.width;
        }
        if (typeof data.left === 'number') {
          application.left = data.left;
        }
        if (typeof data.top === 'number') {
          application.top = data.top;
        }
      }
      return application;
    });
  }

  @action
  toggleApplicationMaximize = (id: string): void => {
    this.applications = this.applications.map((application) => {
      if (application.id === id) {
        application.isMaximize = !application.isMaximize;
      }
      return application;
    });
  }

  @action
  toggleApplicationMinimize = (id: string): void => {
    this.applications = this.applications.map((application) => {
      if (application.id === id) {
        application.isOpened = !application.isOpened;
      }
      return application;
    });
  }

  @action
  closeApplication = (id: string): void => {
    this.applications = this.applications.filter(application => application.id !== id);
  }

  @action
  minimizeAll = (): void => {
    this.applications = this.applications.map(application => ({ ...application, isOpened: false }));
  }
}

export default ApplicationStore;
