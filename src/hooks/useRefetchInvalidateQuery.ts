import { useQueryClient } from '@tanstack/react-query'

export const useRefetchInvalidateQuery = () => {
  const queryClient = useQueryClient()

  const refetch = (qKey: string) => {
    // Invalidate and refetch a specific query
    // @ts-ignore
    queryClient.invalidateQueries(qKey)
  }

  return { refetch }
}
