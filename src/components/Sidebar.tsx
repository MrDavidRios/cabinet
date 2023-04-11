import { TabGroup } from '../classes/TabGroup';

export const Sidebar = (props: { groups: TabGroup[] }) => {
	return (
		<div id='sidebar'>
			<div id='sidebarToolbar'>
				<div id='addGroupButton'>{/* TODO: create button element, get plus icon */}</div>
			</div>
			<div id='sidebarGroupList'>
				{props.groups.map((group) => {
					return <div>{group.title}</div>;
				})}
			</div>
		</div>
	);
};
