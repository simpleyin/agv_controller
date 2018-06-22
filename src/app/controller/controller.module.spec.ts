import { ControllerModule } from './controller.module';

describe('ControllerModule', () => {
  let controllerModule: ControllerModule;

  beforeEach(() => {
    controllerModule = new ControllerModule();
  });

  it('should create an instance', () => {
    expect(controllerModule).toBeTruthy();
  });
});
