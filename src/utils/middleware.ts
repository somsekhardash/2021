const LOGGING = true;

export const logger = (store: any) => (next: any) => (action: any) => {
  if (LOGGING) {
    console.group(action.type);
    console.info("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
export const crashReporter = () => (next: any) => (action: any) => {
  if (LOGGING) {
    try {
      return next(action);
    } catch (err) {
      console.error("Caught an exception!", err);
      // Raven.captureException(err, {
      //   extra: {
      //     action,
      //     state: store.getState()
      //   }
      // })
      throw err;
    }
  }
  return next(action);
};
