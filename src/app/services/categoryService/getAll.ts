import type { Category } from "../../entities/category";
import { httpClient } from "../httpClient";

type CategoryResponse = Category[]

async function getAll() {
  const { data } = await httpClient.get<CategoryResponse>('/categories')
  return data;
}

export default getAll
