import { TabGroup } from '../classes/TabGroup';
import addIcon from '../icons/plus.svg';

export const Sidebar = (props: { groups: TabGroup[] }) => {
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
					return <div key={idx}>{group.title}</div>;
				})}
			</div>
		</div>
	);
};
