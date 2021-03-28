export const networkActionsCreator = (type: string) => {
  const requestingtype = `${type.toLocaleUpperCase()}-REQUESTING`;
  const successtype = `${type.toLocaleUpperCase()}-ON-SUCCESS`;
  const errortype = `${type.toLocaleUpperCase()}-ON-ERROR`;

  return {
    requesting: () => {
      return {
        type: requestingtype,
      };
    },
    success: (response: any) => {
      return {
        type: successtype,
        payload: response,
      };
    },
    failure: (response: any) => {
      return {
        type: errortype,
        payload: response,
      };
    },
  };
};

export const ActionsCreator = (type: string) => {
  const actionGenerator = (data?: any) => ({
    type,
    payload: data,
  });
  return actionGenerator;
};
