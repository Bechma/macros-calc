import { useSetAtom } from "jotai";
import React from "react";
import useSearch from "../data_sources";
import type { Food } from "../data_sources/common";
import useDebounce from "../hooks/useDebounce";
import { addFood } from "../stores/foodStore";
import FoodCard from "./FoodCard";

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
	const onAddFood = useSetAtom(addFood);
	const [search, setSearch] = React.useState("");
	const searchTrim = search.trim();
	const debouncedSearch = useDebounce(searchTrim, 300);
	const { data, error, isError, isLoading, isFetching } =
		useSearch(debouncedSearch);

	const handleAddFood = (food: Food) => {
		onAddFood(food);
		onClose();
	};

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
						<p className="is-size-7">Error: {error.message}</p>
					)}
				</div>
			);
		}

		if (isLoading || isFetching) {
			return (
				<div className="has-text-centered">
					<button type="button" className="button is-loading is-large">
						Loading...
					</button>
				</div>
			);
		}

		if (data?.length) {
			return data.map((food) => (
				<FoodCard key={food.id} food={food} onAdd={handleAddFood} />
			));
		}

		if (searchTrim) {
			return (
				<div className="has-text-centered">
					<p className="subtitle">No results found for "{searchTrim}"</p>
				</div>
			);
		}

		return (
			<div className="has-text-centered">
				<p className="subtitle">
					Search for food to see nutritional information
				</p>
			</div>
		);
	};

	if (!isOpen) return null;

	return (
		<div className="modal is-active">
			{/** biome-ignore lint/a11y/useSemanticElements: it's bulma styles */}
			<div
				className="modal-background"
				onClick={onClose}
				onKeyDown={(e) => e.key === "Escape" && onClose()}
				role="button"
				tabIndex={0}
				aria-label="Close modal"
			></div>
			<div className="modal-card" style={{ width: "90vw", maxWidth: "800px" }}>
				<header className="modal-card-head">
					<p className="modal-card-title">Search for a Food</p>
					<button
						type="button"
						className="delete"
						aria-label="close"
						onClick={onClose}
					></button>
				</header>
				<section className="modal-card-body">
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

					<div style={{ maxHeight: "60vh", overflowY: "auto" }}>
						{renderContent()}
					</div>
				</section>
			</div>
		</div>
	);
}
