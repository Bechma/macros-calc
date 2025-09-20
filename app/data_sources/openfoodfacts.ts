import {
	defaultOptions,
	type Food as FoodCommon,
	type Nutrition,
	pageSize,
} from "./common";

// docs: https://wiki.openfoodfacts.org/API/Read/Search
export const queryParamsOpenFoodFacts = (query: string) => ({
	...defaultOptions,
	queryKey: ["search", "openfoodfacts", query],
	queryFn: async () => {
		if (!query) return null;
		const response = await fetch(
			`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&page_size=${pageSize}&page=1&search_simple=1&action=process&json=1`,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch food data");
		}
		return response.json();
	},
	select: (data: Root | null): FoodCommon[] =>
		data?.products?.map((product) => ({
			id: product._id,
			name: product.abbreviated_product_name || product.product_name,
			image: product.image_url,
			nutrition: mapToNutrition(product),
		})) || [],
	enabled: !!query, // Only run the query if there's a query string
});

interface Root {
	count: number;
	page: number;
	page_count: number;
	page_size: number;
	products: NutritionSourceData[];
	size: number;
}

interface Nutriments {
	[key: string]: number | string | undefined;
}

interface NutritionSourceData {
	_id: string;
	product_name: string;
	abbreviated_product_name: string;
	image_url: string;
	nutriments: Nutriments;
	nutriments_estimated?: Nutriments;
}

export function mapToNutrition(data: NutritionSourceData): Nutrition {
	const nutrition: Partial<Nutrition> = {};
	const nutriments = {
		...(data.nutriments_estimated || {}),
		...data.nutriments,
	};

	// Map each field using the mappings
	fieldMappingEntries.forEach(([field, sourceField]) => {
		const value = nutriments[sourceField];
		if (typeof value === "number") {
			nutrition[field] = value;
		}
	});

	// Special case for calories - try to get from kcal first, then convert from kJ if needed
	if (nutrition.calories === undefined) {
		if (nutriments["energy-kcal_100g"] !== undefined) {
			nutrition.calories = Number(nutriments["energy-kcal_100g"]);
		} else if (nutriments.energy_100g !== undefined) {
			// Convert kJ to kcal (1 kcal = 4.184 kJ)
			const energyKj = Number(nutriments.energy_100g);
			if (!Number.isNaN(energyKj)) {
				nutrition.calories = energyKj / 4.184;
			}
		}
	}

	// Calculate other_carbohydrates if not directly available
	if (
		nutrition.other_carbohydrates === undefined &&
		typeof nutrition.carbohydrates === "number" &&
		typeof nutrition.dietary_fiber === "number" &&
		typeof nutrition.total_sugars === "number" &&
		typeof nutrition.sugar_alcohols === "number"
	) {
		const otherCarbs =
			nutrition.carbohydrates -
			(nutrition.dietary_fiber +
				nutrition.total_sugars +
				(nutrition.sugar_alcohols || 0));

		if (otherCarbs >= 0) {
			nutrition.other_carbohydrates = otherCarbs;
		}
	}

	return nutrition as Nutrition;
}

// Map of nutrition fields to their corresponding _100g fields
const fieldMappings: Record<
	Exclude<keyof Nutrition, "soluble_fiber" | "insoluble_fiber">,
	string
> = {
	// Macronutrients
	calories: "energy-kcal_100g",
	protein: "proteins_100g",
	total_fat: "fat_100g",
	carbohydrates: "carbohydrates_100g",
	saturated_fats: "saturated-fat_100g",
	monounsaturated_fats: "monounsaturated-fat_100g",
	polyunsaturated_fats: "polyunsaturated-fat_100g",
	dietary_fiber: "fiber_100g",
	total_sugars: "sugars_100g",
	added_sugars: "added-sugars_100g",
	other_carbohydrates: "carbohydrates_100g", // May need adjustment

	// Fats and fatty acids
	omega_3: "omega-3_100g",
	alpha_linolenic_acid: "alpha-linolenic-acid_100g",
	omega_6: "omega-6_100g",
	linoleic_acid: "linoleic-acid_100g",
	oleic_acid: "oleic-acid_100g",
	palmitic_acid: "palmitic-acid_100g",
	stearic_acid: "stearic-acid_100g",
	myristic_acid: "myristic-acid_100g",
	gamma_linolenic_acid: "gamma-linolenic-acid_100g",
	dihomo_gamma_linolenic_acid: "dihomo-gamma-linolenic-acid_100g",
	omega_9: "omega-9_100g",

	// Vitamins
	vitamin_a: "vitamin-a_100g",
	thiamin: "vitamin-b1_100g",
	riboflavin: "vitamin-b2_100g",
	niacin: "vitamin-pp_100g",
	pantothenic_acid: "pantothenic-acid_100g",
	vitamin_b6: "vitamin-b6_100g",
	vitamin_b12: "vitamin-b12_100g",
	vitamin_c: "vitamin-c_100g",
	vitamin_d: "vitamin-d_100g",
	vitamin_e: "vitamin-e_100g",
	vitamin_k: "vitamin-k_100g",
	biotin: "biotin_100g",
	folate_dfe: "folate_100g",

	// Minerals
	calcium: "calcium_100g",
	iron: "iron_100g",
	magnesium: "magnesium_100g",
	phosphorus: "phosphorus_100g",
	potassium: "potassium_100g",
	sodium: "sodium_100g",
	zinc: "zinc_100g",
	copper: "copper_100g",
	manganese: "manganese_100g",
	selenium: "selenium_100g",
	molybdenum: "molybdenum_100g",
	iodine: "iodine_100g",
	chromium: "chromium_100g",
	chlorine: "chlorine_100g",

	// Amino acids
	tryptophan: "tryptophan_100g",
	threonine: "threonine_100g",
	isoleucine: "isoleucine_100g",
	leucine: "leucine_100g",
	lysine: "lysine_100g",
	methionine: "methionine_100g",
	phenylalanine: "phenylalanine_100g",
	valine: "valine_100g",
	histidine: "histidine_100g",
	alanine: "alanine_100g",
	arginine: "arginine_100g",
	aspartic_acid: "aspartic-acid_100g",
	cysteine: "cysteine_100g",
	cystine: "cystine_100g",
	glutamic_acid: "glutamic-acid_100g",
	glycine: "glycine_100g",
	proline: "proline_100g",
	serine: "serine_100g",
	tyrosine: "tyrosine_100g",

	// Other
	choline: "choline_100g",
	water: "water_100g",
	sugar_alcohols: "sugar-alcohols_100g",
};
const fieldMappingEntries = Object.entries(fieldMappings) as [
	keyof Nutrition,
	string,
][];
