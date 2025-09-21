import { useState } from "react";
import type { MetaFunction } from "react-router";
import FoodList from "~/components/FoodList";
import NutritionSummary from "~/components/NutritionSummary";
import SearchModal from "~/components/SearchModal";
import type { Food } from "~/data_sources/common";

export const meta: MetaFunction = () => {
	return [{ title: "Macros Calculator" }];
};

type SelectedFood = {
	id: string;
	food: Food;
	quantity: number;
};

export default function Home() {
	const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

	const handleAddFood = (food: Food) => {
		setSelectedFoods((prev) => [
			...prev,
			{
				id: `${food.id}-${Date.now()}`,
				food,
				quantity: 100, // Default to 100g
			},
		]);
	};

	const handleRemoveFood = (id: string) => {
		setSelectedFoods((prev) => prev.filter((item) => item.id !== id));
	};

	const handleQuantityChange = (id: string, quantity: number) => {
		setSelectedFoods((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
			),
		);
	};

	return (
		<main className="py-6">
			<div className="columns is-centered">
				<div className="column is-8">
					<div className="is-flex is-justify-content-space-between is-align-items-center mb-5">
						<h1 className="title">Macros Calculator</h1>
						<button
							type="button"
							className="button is-primary mb-0"
							onClick={() => setIsSearchModalOpen(true)}
						>
							<i className="fas fa-plus mr-2"></i>
							Add Food
						</button>
					</div>

					<div className="mb-5">
						<NutritionSummary foods={selectedFoods} />
					</div>

					<div className="box">
						<h2 className="title is-4 mb-4">
							<i className="fas fa-list mr-2"></i>
							Selected Foods
						</h2>
						<FoodList
							foods={selectedFoods}
							onQuantityChange={handleQuantityChange}
							onRemove={handleRemoveFood}
						/>
					</div>
				</div>
			</div>

			<SearchModal
				isOpen={isSearchModalOpen}
				onClose={() => setIsSearchModalOpen(false)}
				onAddFood={handleAddFood}
			/>
		</main>
	);
}
