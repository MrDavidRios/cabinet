import { TabGroup } from '../classes/TabGroup';
import addIcon from '../icons/plus.svg';
import { GroupCard } from './GroupCard';

const addNewGroupThroughUI = (addGroupCallback: (group: TabGroup) => void) => {
	addGroupCallback(new TabGroup('', []));


}

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
				<div id='addGroupButton' onClick={() => addNewGroupThroughUI(props.addGroupCallback)}>
					<img alt='Add a new tab group' src={addIcon} />
				</div>
			</div>
			<div id='sidebarGroupList'>
				{props.groups.map((group, idx) => {
					return (
						<GroupCard
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