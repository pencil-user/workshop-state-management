export type Employee = {
  id: string;
  Name: string;
  Phone: string;
  Email: string;
}

export type SubmitEmployee = Omit<Employee, "id">;

export type PageData<T> = {
  count: number;
  skip: number;
  limit: number;
  data: T;
}

export type Settings = { foo: string, bar: string, baz: number }