import { useQueries, useQuery } from "@tanstack/react-query";
import { queryParamsOpenFoodFacts } from "./openfoodfacts";
import { queryParamsOpenNutrition } from "./opennutrition";

export default function useSearch(query: string) {
	return useQueries({
		queries: [queryParamsOpenFoodFacts(query), queryParamsOpenNutrition(query)],
		combine: (results) => {
			const dataArrays = results.map((result) => result.data || []);
			const maxLength = Math.max(...dataArrays.map((array) => array.length));
			const data = Array.from({ length: maxLength }, (_, i) =>
				dataArrays
					.map((array) => array[i])
					.filter((item) => item !== undefined),
			).flat();
			return {
				data,
				error: results.find((result) => result.error),
				isError: results.some((result) => result.isError),
				isLoading: results.some((result) => result.isLoading),
				isFetching: results.some((result) => result.isFetching),
			};
		},
	});
}

export function useOpenFoodFactsSearch(query: string) {
	return useQuery(queryParamsOpenFoodFacts(query));
}

export function useOpenNutritionSearch(query: string) {
	return useQuery(queryParamsOpenNutrition(query));
}
