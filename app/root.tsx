import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{
		rel: "stylesheet",
		href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css",
		integrity:
			"sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://cdnjs.cloudflare.com/ajax/libs/bulma/1.0.4/css/bulma.min.css",
		integrity:
			"sha512-yh2RE0wZCVZeysGiqTwDTO/dKelCbS9bP2L94UvOFtl/FKXcNAje3Y2oBg/ZMZ3LS1sicYk4dYVGtDex75fvvA==",
		crossOrigin: "anonymous",
	},
];

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body>
				<QueryClientProvider client={queryClient}>
					{children}
					<ScrollRestoration />
					<Scripts />
				</QueryClientProvider>
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="container">
			<h1 className="title">{message}</h1>
			<p className="subtitle">{details}</p>
			{stack && (
				<pre className="container is-fullhd">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
