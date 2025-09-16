import { useQuery } from "@tanstack/react-query";
import {
	defaultOptions,
	type Food as FoodCommon,
	type Nutrition,
	queryKeys,
} from "./common";

export default function useOpenNutritionSearch(query: string) {
	return useQuery({
		...defaultOptions,
		queryKey: queryKeys.searchOpenNutrition(query),
		queryFn: async () => {
			if (!query) return null;
			const response = await fetch(
				`https://search.opennutrition.app/foods?q=${encodeURIComponent(query)}&limit=20&offset=0&facets=true`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch food data");
			}
			return response.json();
		},
		select: (data: Root | null): FoodCommon[] =>
			data?.foods?.map((food) => ({
				...food,
				image: food.image.key,
			})) || [],
		enabled: !!query, // Only run the query if there's a query string
	});
}

export interface Root {
	status: string;
	foods: Food[] | null;
	count: number;
	facets?: Facets;
}

export interface Food {
	id: string;
	name: string;
	image: Image;
	serving: Serving;
	nutrition: Nutrition;
}

export interface Image {
	key: string;
	source: string;
}

export interface Serving {
	common: Common;
	metric: Metric;
}

export interface Common {
	unit: string;
	quantity: number;
	name?: string;
}

export interface Metric {
	unit: "g" | "ml" | "grm" | "mg" | "iu" | "IU";
	quantity: number;
}

export interface Facets {
	type_counts: TypeCount[];
	brand_counts: BrandCount[];
	label_counts: LabelCount[];
	ingredient_tag_counts: IngredientTagCount[];
}

export interface TypeCount {
	type: string;
	count: number;
}

export interface BrandCount {
	key: string;
	count: number;
}

export interface LabelCount {
	key: string;
	count: number;
}

export interface IngredientTagCount {
	key: string;
	count: number;
}
