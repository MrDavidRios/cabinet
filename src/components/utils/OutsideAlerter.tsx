import { useEffect, useRef, useState } from 'react';

export default function useComponentVisible(initialIsVisible: boolean) {
	const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as HTMLElement) && isComponentVisible) {
			setIsComponentVisible(false);
		} else {
			setIsComponentVisible(true);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		document.addEventListener('contextmenu', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
			document.addEventListener('contextmenu', handleClickOutside, true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { ref, isComponentVisible, setIsComponentVisible };
}
