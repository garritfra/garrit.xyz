import { useEffect, useState } from "react";

export default () => {
	const [SSR, setSSR] = useState(true);
	useEffect(() => {
		setSSR(false);
	});

	return SSR;
};
