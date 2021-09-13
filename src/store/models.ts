export interface IDocument {
  title: string;
  description?: string;
  url?: string;
  tag: string;
  id?: string;
  file?: File;
}

export interface IState {
  uid: string | null;
  documents: IDocument[];
  tags: string[];
  error: string | null;
}
