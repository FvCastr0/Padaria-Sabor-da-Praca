export interface ResponseData<T> {
  msg: string;
  status: number;
  data: T;
}
