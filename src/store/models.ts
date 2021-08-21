export interface IPage {
  title: string;
  src: string;
  tag: string;
}

export interface IState {
  uid: string | null;
  pages: IPage[];
}
