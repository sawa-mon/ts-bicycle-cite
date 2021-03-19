export type listFuncType = {
  func: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string
  ) => void;

  id: string;
  label: string;
  value: string;
};
