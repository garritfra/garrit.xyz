import { useLocalStorage, useMediaQuery, useUpdateEffect } from "usehooks-ts";
import useSSR from "./useSSR";
import { useEffect } from "react";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkThemeOutput {
	isDarkTheme: boolean;
	toggleDarkTheme: () => void;
	enableDarkTheme: () => void;
	disableDarkTHeme: () => void;
}

export function useDarkTheme(defaultValue?: boolean): UseDarkThemeOutput {
	const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
	const [isDarkTheme, setDarkTheme] = useLocalStorage<boolean>(
		"usehooks-ts-dark-mode",
		defaultValue ?? isDarkOS ?? false
	);

	// Update darkTheme if os prefers changes
	useUpdateEffect(() => {
		setDarkTheme(isDarkOS);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDarkOS]);

	useEffect(() => {
    console.log(isDarkTheme)
		document.documentElement.setAttribute(
			"data-theme",
			isDarkTheme ? "dark" : "light"
		);
	}, [isDarkTheme]);

	return {
		isDarkTheme,
		toggleDarkTheme: () => setDarkTheme((prev) => !prev),
		enableDarkTheme: () => setDarkTheme(true),
		disableDarkTHeme: () => setDarkTheme(false),
	};
}
