import { useAtomValue } from "jotai";
import { readFood } from "~/stores/foodStore";

export default function NutritionSummary() {
	const foods = useAtomValue(readFood);
	const totals = foods.reduce(
		(acc, { food, quantity }) => {
			const factor = quantity ? quantity / 100 : 0;
			return {
				calories: acc.calories + (food.nutrition.calories || 0) * factor,
				protein: acc.protein + (food.nutrition.protein || 0) * factor,
				carbohydrates:
					acc.carbohydrates + (food.nutrition.carbohydrates || 0) * factor,
				fat: acc.fat + (food.nutrition.total_fat || 0) * factor,
			};
		},
		{ calories: 0, protein: 0, carbohydrates: 0, fat: 0 },
	);

	return (
		<div className="box">
			<h3 className="title is-5 mb-4">Nutrition Summary</h3>
			<div className="columns is-mobile has-text-centered">
				<div className="column">
					<div className="has-text-grey is-size-8">Calories</div>
					<div className="has-text-weight-bold is-size-4">
						{Math.round(totals.calories)}
					</div>
				</div>
				<div className="column">
					<div className="has-text-grey is-size-8">Protein</div>
					<div className="has-text-weight-bold is-size-4">
						{totals.protein.toFixed(1)}g
					</div>
				</div>
				<div className="column">
					<div className="has-text-grey is-size-8">Carbs</div>
					<div className="has-text-weight-bold is-size-4">
						{totals.carbohydrates.toFixed(1)}g
					</div>
				</div>
				<div className="column">
					<div className="has-text-grey is-size-8">Fat</div>
					<div className="has-text-weight-bold is-size-4">
						{totals.fat.toFixed(1)}g
					</div>
				</div>
			</div>
		</div>
	);
}
