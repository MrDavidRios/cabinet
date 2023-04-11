import { TabGroup } from '../classes/TabGroup';

export function getSelectedIdx(groups: TabGroup[], selectedTabGroupId: string): number {
	if (selectedTabGroupId === '') return 0;
	else {
		const idx = getTabGroupIdxFromId(groups, selectedTabGroupId);
		return idx > 0 ? idx : 0;
	}
}

export function getTabGroupIdxFromId(groups: TabGroup[], id: string): number {
	return groups.findIndex((group) => group.id === id) ?? -1;
}
