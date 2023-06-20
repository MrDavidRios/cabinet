import { useEffect, useState } from "react";
import { TabGroup } from "../classes/TabGroup";
import useComponentVisible from "./utils/OutsideAlerter";
import { GroupCardDropdown } from "./GroupCardDropdown";

export const GroupCard = (props: {
	updateGroupCallback: (group: TabGroup) => void;
	removeGroupCallback: (group: TabGroup) => void;
	group: TabGroup;
	updateSelectedGroupCallback: () => void;
	selected: boolean;
}) => {
    const titleBlank = props.group.title === '';

	const [showInput, setShowInput] = useState(titleBlank);
	const [showDropdown, setShowDropdown] = useState(false);
	const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

	const { ref, isComponentVisible } = useComponentVisible(true);

	useEffect(() => {
		if (!isComponentVisible) {
            // Deletes new group if title is blank (works because titleBlank represents the state of the group before the user started editing it)
            if (titleBlank)
                props.removeGroupCallback(props.group);

			setShowInput(false);
			setShowDropdown(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isComponentVisible]);

	return (
		<>
			<div
				className={props.selected ? 'sidebar-group selected' : 'sidebar-group'}
				ref={ref}
				onClick={(e) => {
					switch (e.detail) {
						case 1:
							// check if target type is not an input element
							if (e.target instanceof HTMLInputElement) return;

							props.updateSelectedGroupCallback();
							break;
						case 2:
							setShowInput(true);
							break;
					}
				}}
				onContextMenu={(e) => {
					setDropdownPos({ x: e.clientX, y: e.clientY });

					setShowDropdown(true);
				}}
			>
				{(showInput && isComponentVisible) || titleBlank ? (
					<input
						className='editable-text'
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								// give me regex to check if title is valid. Any text symbol is allowed.
                                const inputVal = (e.target as HTMLInputElement).value;

								if (inputVal.match(/^[^\n\r]*$/) && inputVal !== '') {
									console.log('Valid title');

									const updatedGroup = structuredClone(props.group);
									updatedGroup.title = (e.target as HTMLInputElement).value;
									props.updateGroupCallback(updatedGroup);
								} else {
									console.log('Invalid title');
								}

                                setShowInput(false);
							}
						}}
						defaultValue={props.group.title}
						autoFocus
					></input>
				) : (
					<p>{props.group.title}</p>
				)}
			</div>
			{showDropdown ? (
				<GroupCardDropdown
					pos={dropdownPos}
					predictedHeight={32}
					removeCallback={() => {
						console.log('removing group...');

						props.removeGroupCallback(props.group);
					}}
				/>
			) : (
				<></>
			)}
		</>
	);
};