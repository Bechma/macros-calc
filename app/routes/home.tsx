import { useState } from "react";
import type { MetaFunction } from "react-router";
import FoodList from "~/components/FoodList";
import NutritionSummary from "~/components/NutritionSummary";
import SearchModal from "~/components/SearchModal";

export const meta: MetaFunction = () => {
	return [
		{ title: "Macros Calculator", description: "Calculate your macros easily" },
	];
};

export default function Home() {
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
						<NutritionSummary />
					</div>

					<div className="box">
						<h2 className="title is-4 mb-4">
							<i className="fas fa-list mr-2"></i>
							Selected Foods
						</h2>
						<FoodList />
					</div>
				</div>
			</div>

			<SearchModal
				isOpen={isSearchModalOpen}
				onClose={() => setIsSearchModalOpen(false)}
			/>
		</main>
	);
}
