import type { Food as FoodCommon } from "../data_sources/common";

interface FoodCardProps {
	food: FoodCommon;
}

export default function FoodCard({ food }: FoodCardProps) {
	const { name, image, nutrition } = food;
	const { protein = 0, carbohydrates = 0, total_fat: totalFat = 0 } = nutrition;
	const calories =
		Math.round((protein + carbohydrates) * 4 + totalFat * 9) || 0;

	return (
		<div className="card mb-4">
			<div className="card-content">
				<div className="media">
					{image && (
						<div className="media-left">
							<figure className="image is-96x96">
								<img
									src={`https://drd3kry2ubqnc.cloudfront.net/${image}@4x.webp`}
									alt={name}
									className="is-rounded"
									style={{
										width: "96px",
										height: "96px",
										objectFit: "cover",
										borderRadius: "4px",
									}}
								/>
							</figure>
						</div>
					)}
					<div className="media-content">
						<div className="is-flex is-align-items-baseline mb-2">
							<h2 className="title is-4 mr-2">{name}</h2>
							<span className="subtitle is-6 has-text-grey mr-2">
								{calories} kcal per serving
							</span>
						</div>
						<div className="content mt-5">
							<div className="columns is-mobile has-text-centered">
								<div className="column">
									<div className="has-text-grey is-size-8">Protein</div>
									<div className="has-text-weight-bold">{protein}g</div>
								</div>
								<div className="column">
									<div className="has-text-grey is-size-8">Carbs</div>
									<div className="has-text-weight-bold">{carbohydrates}g</div>
								</div>
								<div className="column">
									<div className="has-text-grey is-size-8">Fat</div>
									<div className="has-text-weight-bold">{totalFat}g</div>
								</div>
								<div className="column">
									<div className="has-text-grey is-size-8">Calories</div>
									<div className="has-text-weight-bold">{calories}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
