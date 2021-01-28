export const ActionTypes = {
  DELETE_AREAPOINT: "DELETE_AREAPOINT",
  FETCH_AREAPOINTS: "FETCH_AREAPOINTS",
} as const;

export const deleteAreaPointsAction = (areapoints: []) => {
  return {
    type: typeof "DELETE_AREAPOINT",
    payload: areapoints,
  };
};

export type DeleteAreaPointsAction = ReturnType<typeof deleteAreaPointsAction>;

export const fetchAreaPointsAction = (areapoints: []) => {
  return {
    type: typeof "FETCH_AREAPOINTS",
    payload: areapoints,
  };
};

export type FetchAreaPointsAction = ReturnType<typeof fetchAreaPointsAction>;
