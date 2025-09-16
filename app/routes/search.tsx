import React from "react";
import type { MetaFunction } from "react-router";
import FoodCard from "../components/FoodCard";
import useOpenNutritionSearch from "../data_sources/opennutrition";
import useDebounce from "../utils/useDebounce";

export const meta: MetaFunction = () => {
	return [{ title: "Macros calculator" }];
};

export default function Search() {
	const [search, setSearch] = React.useState("");
	const searchTrim = search.trim();
	const debouncedSearch = useDebounce(searchTrim, 200);
	const { data, error, isError, isLoading, isFetching } =
		useOpenNutritionSearch(debouncedSearch);

	const renderContent = () => {
		if (isError) {
			return (
				<div className="notification is-danger">
					<button
						type="button"
						className="delete"
						onClick={() => window.location.reload()}
					></button>
					<p>Error loading food data. Please try again.</p>
					{error instanceof Error && (
						<p className="is-size-7 mt-2">Error: {error.message}</p>
					)}
				</div>
			);
		}

		if (isLoading || isFetching) {
			return (
				<div className="has-text-centered py-6">
					<button type="button" className="button is-loading is-large is-white">
						Loading...
					</button>
				</div>
			);
		}

		if (data?.length) {
			return data.map((food) => <FoodCard key={food.id} food={food} />);
		}

		if (searchTrim) {
			return (
				<div className="has-text-centered py-6">
					<p className="subtitle">No results found for "{searchTrim}"</p>
				</div>
			);
		}

		return (
			<div className="has-text-centered py-6">
				<p className="subtitle">
					Search for food to see nutritional information
				</p>
			</div>
		);
	};

	return (
		<div className="container p-5">
			<h1 className="title is-1 has-text-centered mb-6">Nutrition Search</h1>

			<div className="field">
				<div className="control has-icons-left has-icons-right">
					<input
						className={`input is-large ${isError ? "is-danger" : ""}`}
						type="text"
						placeholder="Search for food..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						aria-busy={isLoading}
						aria-invalid={isError}
					/>
					<span className="icon is-left">
						<i
							className={`fas ${isError ? "fa-exclamation-triangle" : "fa-search"}`}
						></i>
					</span>
					{(isLoading || isFetching) && (
						<span className="icon is-right">
							<i className="fas fa-spinner fa-spin"></i>
						</span>
					)}
				</div>
				{isError && (
					<p className="help is-danger">
						There was an error with your search. Please try again.
					</p>
				)}
			</div>

			<div className="mt-5">{renderContent()}</div>
		</div>
	);
}
