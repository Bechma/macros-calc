import { atom } from "jotai";
import type { Food, FoodSummary } from "~/data_sources/common";

const innerFoodStore = atom<SelectedFood[]>([]);

function toFoodSummary(food: Food): FoodSummary {
	const { id, name, image } = food;
	const {
		protein = 0,
		carbohydrates = 0,
		total_fat: totalFat = 0,
		calories = 0,
	} = food.nutrition;

	return {
		id,
		name,
		image,
		nutrition: {
			protein,
			carbohydrates,
			total_fat: totalFat,
			calories:
				calories || Math.round((protein + carbohydrates) * 4 + totalFat * 9),
		},
	};
}

export interface SelectedFood {
	id: string;
	food: FoodSummary;
	quantity: number;
}

const readFood = atom<SelectedFood[]>((get) => {
	const elem = get(innerFoodStore);
	if (elem.length > 0) {
		return elem;
	}
	const hash = window.location.hash;
	return hash ? JSON.parse(atob(hash.slice(1))) : [];
});

const removeFood = atom(null, (get, set, id) => {
	const elem = get(readFood);
	const newInner = elem.filter((item) => item.id !== id);
	set(innerFoodStore, newInner);
	window.location.hash = btoa(JSON.stringify(newInner));
});

const updateFoodQuantity = atom(
	null,
	(get, set, { id, quantity }: { id: string; quantity: number }) => {
		const elem = get(readFood);
		const newInner = elem.map((item) =>
			item.id === id ? { ...item, quantity } : item,
		);
		set(innerFoodStore, newInner);
		window.location.hash = btoa(JSON.stringify(newInner));
	},
);

const addFood = atom(null, (get, set, newValue: Food) => {
	const elem = get(readFood);
	const newInner = [
		...elem,
		{
			id: `${newValue.id}-${Date.now()}`,
			food: toFoodSummary(newValue),
			quantity: 100,
		},
	];
	set(innerFoodStore, newInner);
	window.location.hash = btoa(JSON.stringify(newInner));
});

export { readFood, removeFood, updateFoodQuantity, addFood };
