import { useEffect, useState } from 'react';
import { TabGroup } from '../classes/TabGroup';
import addIcon from '../icons/plus.svg';
import useComponentVisible from './utils/OutsideAlerter';

export const Sidebar = (props: { updateGroupCallback: (group: TabGroup) => void; addGroupCallback: (group: TabGroup) => void; removeGroupCallback: (group: TabGroup) => void; groups: TabGroup[] }) => {
	return (
		<div id='sidebar'>
			<div id='sidebarToolbar'>
				<div id='addGroupButton'>
					{/* TODO: create button element, get plus icon */}
					<img alt='Add a new tab group' src={addIcon} />
				</div>
			</div>
			<div id='sidebarGroupList'>
				{props.groups.map((group, idx) => {
					return <GroupElement key={idx} updateGroupCallback={props.updateGroupCallback} group={group} />;
				})}
			</div>
		</div>
	);
};

export const GroupElement = (props: { updateGroupCallback: (group: TabGroup) => void; group: TabGroup }) => {
	const [showInput, setShowInput] = useState(false);

	const { ref, isComponentVisible } = useComponentVisible(true);

	useEffect(() => {
		if (!isComponentVisible) setShowInput(false);
	}, [isComponentVisible]);

	return (
		<div
			ref={ref}
			onClick={(e) => {
				switch (e.detail) {
					case 1:
						// check if target type is not an input element
						if (e.target instanceof HTMLInputElement) return;

						setShowInput(false);
						break;
					case 2:
						setShowInput(true);
						break;
					default:
						break;
				}
			}}
			className='sidebar-group'
		>
			{showInput && isComponentVisible ? (
				<input
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
	);
};
