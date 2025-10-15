import { useAtomValue, useSetAtom } from "jotai";
import { readFood, removeFood, updateFoodQuantity } from "~/stores/foodStore";

export default function FoodList() {
	const foods = useAtomValue(readFood);
	const setFoodQuantity = useSetAtom(updateFoodQuantity);
	const onRemove = useSetAtom(removeFood);

	if (foods.length === 0) {
		return (
			<div className="has-text-centered py-6">
				<p className="has-text-grey">No foods added yet</p>
			</div>
		);
	}

	return (
		<div>
			{foods.map(({ food, quantity, id }) => {
				const factor = quantity ? quantity / 100 : 0;
				return (
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
								<div className="field has-addons mb-0 mr-2">
									<div className="control is-expanded has-icons-right">
										<input
											id={id}
											className="input is-rounded"
											type="number"
											value={quantity ?? ""}
											onChange={(e) => {
												let value = e.target.valueAsNumber;
												if (!value || Number.isNaN(value) || value < 0) {
													value = NaN;
												}
												console.log({ value, quantity });
												setFoodQuantity({
													id,
													quantity: value,
												});
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
									{Math.round((food.nutrition.calories || 0) * factor)}
								</div>
							</div>
							<div className="column">
								<div className="has-text-grey is-size-8">Protein</div>
								<div className="has-text-weight-bold">
									{((food.nutrition.protein || 0) * factor).toFixed(1)}g
								</div>
							</div>
							<div className="column">
								<div className="has-text-grey is-size-8">Carbs</div>
								<div className="has-text-weight-bold">
									{((food.nutrition.carbohydrates || 0) * factor).toFixed(1)}g
								</div>
							</div>
							<div className="column">
								<div className="has-text-grey is-size-8">Fat</div>
								<div className="has-text-weight-bold">
									{((food.nutrition.total_fat || 0) * factor).toFixed(1)}g
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
