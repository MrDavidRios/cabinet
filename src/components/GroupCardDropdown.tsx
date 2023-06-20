import { useState, useEffect } from "react";
import removeIcon from '../icons/trash.svg';

export const GroupCardDropdown = (props: { pos: { x: number; y: number }; predictedHeight: number; removeCallback: () => void }) => {
	const [showDropdown, setShowDropdown] = useState(true);
	const sidebarGroupList = document.getElementById('sidebarGroupList');

	function hideDropdown() {
		setShowDropdown(false);
	}

	useEffect(() => {
		sidebarGroupList?.addEventListener('scroll', hideDropdown);

		return () => {
			sidebarGroupList?.removeEventListener('scroll', hideDropdown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Makes sure dropdown menu doesn't clip out of the bottom edge of the window
	const topVal = Math.min(props.pos.y, window.innerHeight - props.predictedHeight);

	return showDropdown ? (
		<div className='dropdown' style={{ left: `${props.pos.x}px`, top: `${topVal}px` }}>
			<div
				onClick={(e) => {
					console.log('hfiwuefh');

					props.removeCallback();

					setShowDropdown(false);
				}}
			>
				<img alt='Remove' src={removeIcon} />
				<p>Remove</p>
			</div>
		</div>
	) : (
		<></>
	);
};
