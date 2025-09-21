import type { Food as FoodCommon } from "../data_sources/common";

interface FoodCardProps {
	food: FoodCommon;
	onAdd?: (food: FoodCommon) => void;
}

export default function FoodCard({ food, onAdd }: FoodCardProps) {
	const { name, image, nutrition } = food;
	const { protein = 0, carbohydrates = 0, total_fat: totalFat = 0 } = nutrition;
	const calories =
		nutrition.calories ||
		Math.round((protein + carbohydrates) * 4 + totalFat * 9) ||
		0;

	return (
		<div className="card mb-4">
			<div className="card-content">
				<div className="media">
					{image && (
						<div className="media-left">
							<figure className="image is-square is-64x64">
								<img src={image} alt={name} />
							</figure>
						</div>
					)}
					<div className="media-content">
						<div className="is-flex is-align-items-baseline is-justify-content-space-between mb-2">
							<div>
								<h2 className="title is-4 mr-2">{name}</h2>
								<span className="subtitle is-6 has-text-grey mr-2">
									{calories} kcal
								</span>
							</div>
							{onAdd && (
								<button
									type="button"
									className="button is-primary is-small"
									onClick={() => onAdd(food)}
								>
									<i className="fas fa-plus mr-1"></i>
									Add
								</button>
							)}
						</div>
						<div className="mt-5">
							<div className="columns is-mobile has-text-centered">
								<div className="column">
									<div className="has-text-grey is-size-8">Protein</div>
									<div className="has-text-weight-bold">
										{protein.toFixed(1)}g
									</div>
								</div>
								<div className="column">
									<div className="has-text-grey is-size-8">Carbs</div>
									<div className="has-text-weight-bold">
										{carbohydrates.toFixed(1)}g
									</div>
								</div>
								<div className="column">
									<div className="has-text-grey is-size-8">Fat</div>
									<div className="has-text-weight-bold">
										{totalFat.toFixed(1)}g
									</div>
								</div>
								<div className="column">
									<div className="has-text-grey is-size-8">Calories</div>
									<div className="has-text-weight-bold">
										{calories.toFixed(1)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
