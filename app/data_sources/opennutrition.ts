import {
	defaultOptions,
	type Food as FoodCommon,
	type Nutrition,
	pageSize,
} from "./common";

export const queryParamsOpenNutrition = (query: string) => ({
	...defaultOptions,
	queryKey: ["search", "opennutrition", query],
	queryFn: async () => {
		if (!query) return null;
		const response = await fetch(
			`https://search.opennutrition.app/foods?q=${encodeURIComponent(query)}&limit=${pageSize}&offset=0&facets=true`,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch food data");
		}
		return response.json();
	},
	select: (data: Root | null): FoodCommon[] =>
		data?.foods?.map((food) => ({
			...food,
			image: food.image.key
				? `https://drd3kry2ubqnc.cloudfront.net/${food.image.key}@4x.webp`
				: undefined,
		})) || [],
	enabled: !!query, // Only run the query if there's a query string
});

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
