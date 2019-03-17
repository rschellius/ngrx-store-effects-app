import {
  Navigate,
  NAVIGATE,
  NAVIGATE_BACK, NAVIGATE_FORWARD,
  NavigateBack, NavigateForward,
} from './router.action';

describe('Router Actions', () => {
  describe('Navigate actions', () => {
    describe('Navigate', () => {
      it('should create an action', () => {
        const payload = { path: [] };
        const action = new Navigate(payload);
        expect({ ...action }).toEqual({ type: NAVIGATE, payload });
      });
    });
    describe('NavigateBack', () => {
      it('should create an action', () => {
        const action = new NavigateBack();
        expect({ ...action }).toEqual({ type: NAVIGATE_BACK });
      });
    });
    describe('NavigateForward', () => {
      it('should create an action', () => {
        const action = new NavigateForward();
        expect({ ...action }).toEqual({ type: NAVIGATE_FORWARD });
      });
    });
  });
});
