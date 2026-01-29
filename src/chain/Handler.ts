import { ITaskComponent } from '../composite/TaskComponent';

export interface Handler {
  setNext(handler: Handler): Handler;
  handle(task: ITaskComponent): void;
}

export abstract class AbstractHandler implements Handler {
  private nextHandler?: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  
  protected next(task: ITaskComponent): void {
    if (this.nextHandler) {
      this.nextHandler.handle(task);
    }
  }

  abstract handle(task: ITaskComponent): void;
}
