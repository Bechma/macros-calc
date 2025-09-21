import type { Food } from "~/data_sources/common";

interface FoodListProps {
	foods: Array<{
		food: Food;
		quantity: number;
		id: string;
	}>;
	onQuantityChange: (id: string, quantity: number) => void;
	onRemove: (id: string) => void;
}

export default function FoodList({
	foods,
	onQuantityChange,
	onRemove,
}: FoodListProps) {
	if (foods.length === 0) {
		return (
			<div className="has-text-centered py-6">
				<p className="has-text-grey">No foods added yet</p>
			</div>
		);
	}

	return (
		<div>
			{foods.map(({ food, quantity, id }) => (
				<div key={id} className="box">
					<div className="is-flex is-justify-content-space-between is-align-items-center">
						<div className="is-flex is-align-items-center">
							{food.image && (
								<figure className="image is-square is-32x32 mr-2">
									<img src={food.image} alt={food.name} />
								</figure>
							)}
							<p className="title is-5">{food.name}</p>
						</div>
						<div className="is-flex is-align-items-center">
							<div className="field has-addons mb-0">
								<div className="control is-expanded has-icons-right">
									<input
										id={id}
										className="input"
										type="tel"
										min="1"
										value={quantity}
										onChange={(e) => {
											if (Number(e.target.value) > 0) {
												onQuantityChange(id, Number(e.target.value));
											}
										}}
									/>
									<span className="icon is-small is-right has-text-grey is-size-8">
										g
									</span>
								</div>
							</div>
							<button
								className="delete is-large"
								onClick={() => onRemove(id)}
								aria-label="Remove food"
								type="button"
							></button>
						</div>
					</div>

					<div className="columns is-mobile has-text-centered mt-3">
						<div className="column">
							<div className="has-text-grey is-size-8">Calories</div>
							<div className="has-text-weight-bold">
								{Math.round((food.nutrition.calories || 0) * (quantity / 100))}
							</div>
						</div>
						<div className="column">
							<div className="has-text-grey is-size-8">Protein</div>
							<div className="has-text-weight-bold">
								{((food.nutrition.protein || 0) * (quantity / 100)).toFixed(1)}g
							</div>
						</div>
						<div className="column">
							<div className="has-text-grey is-size-8">Carbs</div>
							<div className="has-text-weight-bold">
								{(
									(food.nutrition.carbohydrates || 0) *
									(quantity / 100)
								).toFixed(1)}
								g
							</div>
						</div>
						<div className="column">
							<div className="has-text-grey is-size-8">Fat</div>
							<div className="has-text-weight-bold">
								{((food.nutrition.total_fat || 0) * (quantity / 100)).toFixed(
									1,
								)}
								g
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
