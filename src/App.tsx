import { useEffect, useState } from 'react';
import { Titlebar } from './components/Titlebar';
import { LinksDisplay } from './components/LinksDisplay';
import './styles/css/index.css';
import { TabGroup } from './classes/TabGroup';
import { loadTabData, loadUserData, saveTabData } from './utils/saveData';
import { UserData } from './classes/User';
import { Sidebar } from './components/Sidebar';
import { getSelectedIdx, getTabGroupIdxFromId } from './utils/tabOperations';

function App() {
	useEffect(() => {
		async function updateData() {
			setUser(await loadUserData());
			setGroups(await loadTabData());
		}

		updateData();
	}, []);

	const [groups, setGroups] = useState<TabGroup[] | undefined>();
	const [user, setUser] = useState<UserData | undefined>();

	function updateGroup(group: TabGroup) {
		if (!groups) return;

		const idx = getTabGroupIdxFromId(groups, group.id);

		if (idx === -1) {
			console.error('Error when updating group: unable to find group in groups list', groups, group);
			return;
		}

		const updatedGroups = structuredClone(groups);
		updatedGroups[idx] = group;

		setGroups(updatedGroups);
		saveTabData(updatedGroups);
	}

	function addGroup(group: TabGroup) {
		if (!groups) return;

		const updatedGroups = structuredClone(groups);
		updatedGroups.push(group);

		setGroups(updatedGroups);
		saveTabData(updatedGroups);
	}

	function removeGroup(group: TabGroup) {
		if (!groups) return;

		const idx = getTabGroupIdxFromId(groups, group.id);

		if (idx === -1) {
			console.error('Error when removing group: unable to find group in groups list', groups, group);
			return;
		}

		const updatedGroups = structuredClone(groups);
		updatedGroups.splice(idx, 1);

		setGroups(updatedGroups);
		saveTabData(updatedGroups);
	}

	function updateSelectedGroupIdx(index: number) {
		if (!user || !groups) return;

		const updatedUser = structuredClone(user);
		updatedUser.selectedTabGroupId = groups[index].id;

		setUser(updatedUser);
	}

	const selectedIdx = groups && user ? getSelectedIdx(groups, user.selectedTabGroupId) : 0;

	return (
		<div id='appWrapper'>
			<Titlebar></Titlebar>
			<div id='appContent'>
				{groups && user ? (
					<>
						<Sidebar
							updateGroupCallback={updateGroup}
							addGroupCallback={addGroup}
							removeGroupCallback={removeGroup}
							groups={groups}
							selectedGroupIdx={selectedIdx}
							updateSelectedGroupCallback={updateSelectedGroupIdx}
						/>
						<LinksDisplay updateGroupCallback={updateGroup} addGroupCallback={addGroup} removeGroupCallback={removeGroup} tabGroup={groups[selectedIdx]} />
					</>
				) : (
					<h3 id='loadingIndicator'>Loading...</h3>
				)}
			</div>
		</div>
	);
}
export default App;
