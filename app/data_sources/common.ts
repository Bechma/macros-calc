export const queryKeys = {
	searchOpenNutrition: (query: string) =>
		["search", "opennutrition", query] as const,
	searchOpenFoodFacts: (query: string) =>
		["search", "openfoodfacts", query] as const,
};

export const defaultOptions = {
	staleTime: 60 * 60 * 1000, // 60 minutes
	retry: 2,
	retryDelay: 1000,
};

export interface Food {
	id: string;
	name: string;
	image: string;
	nutrition: Nutrition;
}

export interface Nutrition {
	added_sugars?: number;
	alanine?: number;
	alpha_linolenic_acid?: number;
	arginine?: number;
	aspartic_acid?: number;
	biotin?: number;
	calcium?: number;
	calories?: number;
	carbohydrates?: number;
	chlorine?: number;
	choline?: number;
	chromium?: number;
	copper?: number;
	cysteine?: number;
	cystine?: number;
	dietary_fiber?: number;
	dihomo_gamma_linolenic_acid?: number;
	folate_dfe?: number;
	gamma_linolenic_acid?: number;
	glutamic_acid?: number;
	glycine?: number;
	histidine?: number;
	insoluble_fiber?: number;
	iodine?: number;
	iron?: number;
	isoleucine?: number;
	leucine?: number;
	linoleic_acid?: number;
	lysine?: number;
	magnesium?: number;
	manganese?: number;
	methionine?: number;
	molybdenum?: number;
	monounsaturated_fats?: number;
	myristic_acid?: number;
	niacin?: number;
	oleic_acid?: number;
	omega_3?: number;
	omega_6?: number;
	omega_9?: number;
	other_carbohydrates?: number;
	palmitic_acid?: number;
	pantothenic_acid?: number;
	phenylalanine?: number;
	phosphorus?: number;
	polyunsaturated_fats?: number;
	potassium?: number;
	proline?: number;
	protein?: number;
	riboflavin?: number;
	saturated_fats?: number;
	selenium?: number;
	serine?: number;
	sodium?: number;
	soluble_fiber?: number;
	stearic_acid?: number;
	sugar_alcohols?: number;
	thiamin?: number;
	threonine?: number;
	total_fat?: number;
	total_sugars?: number;
	tryptophan?: number;
	tyrosine?: number;
	valine?: number;
	vitamin_a?: number;
	vitamin_b12?: number;
	vitamin_b6?: number;
	vitamin_c?: number;
	vitamin_d?: number;
	vitamin_e?: number;
	vitamin_k?: number;
	water?: number;
	zinc?: number;
}
