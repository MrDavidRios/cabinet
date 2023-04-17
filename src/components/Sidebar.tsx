import { useEffect, useState } from 'react';
import { TabGroup } from '../classes/TabGroup';
import addIcon from '../icons/plus.svg';
import removeIcon from '../icons/trash.svg';
import useComponentVisible from './utils/OutsideAlerter';

export const Sidebar = (props: {
	updateGroupCallback: (group: TabGroup) => void;
	addGroupCallback: (group: TabGroup) => void;
	removeGroupCallback: (group: TabGroup) => void;
	groups: TabGroup[];
	updateSelectedGroupCallback: (idx: number) => void;
	selectedGroupIdx: number;
}) => {
	return (
		<div id='sidebar'>
			<div id='sidebarToolbar'>
				<div id='addGroupButton' onClick={() => props.addGroupCallback(new TabGroup('New group', []))}>
					<img alt='Add a new tab group' src={addIcon} />
				</div>
			</div>
			<div id='sidebarGroupList'>
				{props.groups.map((group, idx) => {
					return (
						<GroupElement
							key={idx}
							updateGroupCallback={props.updateGroupCallback}
							removeGroupCallback={props.removeGroupCallback}
							selected={idx === props.selectedGroupIdx}
							updateSelectedGroupCallback={() => {
								props.updateSelectedGroupCallback(idx);
							}}
							group={group}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const GroupElement = (props: {
	updateGroupCallback: (group: TabGroup) => void;
	removeGroupCallback: (group: TabGroup) => void;
	group: TabGroup;
	updateSelectedGroupCallback: () => void;
	selected: boolean;
}) => {
	const [showInput, setShowInput] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

	const { ref, isComponentVisible } = useComponentVisible(true);

	useEffect(() => {
		if (!isComponentVisible) {
			setShowInput(false);
			setShowDropdown(false);
		}
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
				{showInput && isComponentVisible ? (
					<input
						className='editable-text'
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								// give me regex to check if title is valid. Any text symbol is allowed.
								if ((e.target as HTMLInputElement).value.match(/^[^\n\r]*$/)) {
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
				<GroupElementDropdown
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

const GroupElementDropdown = (props: { pos: { x: number; y: number }; predictedHeight: number; removeCallback: () => void }) => {
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
