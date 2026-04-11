import { useQuery } from "@tanstack/react-query"
import { categoryKeys } from "../config/queryKeys"
import { categoryServices } from "../services/categoryService"

export function useCategories() {
  const { isPending, data } = useQuery({
    queryKey: categoryKeys.all,
    queryFn: categoryServices.getAll
  })
  return {
    isLoading: isPending,
    categories: data ?? []
  }
}
