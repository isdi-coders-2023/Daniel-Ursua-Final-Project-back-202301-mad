export interface Repo<T> {
  create(info: T): Promise<T>;
  search(query: { key: string; value: unknown }): Promise<T[]>;
}
