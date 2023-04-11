import { TabGroup } from '../classes/TabGroup';
import { UserData } from '../classes/User';

function getSaveFilePath(filename: string): string {
	const globals = global.location.search;
	return `${globals.substring(globals.indexOf('=') + 1)}\\${filename}`;
}

export async function saveTabData(tabData: TabGroup[]) {
	const path = await window.fileOperations.getPath('tabdata.json');

	try {
		window.fileOperations.writeFile(path, JSON.stringify(tabData));
	} catch (err) {
		console.error('Error saving tab data:', err);
	}
}

export async function loadTabData(): Promise<TabGroup[]> {
	const path = await window.fileOperations.getPath('tabdata.json');

	try {
		const output = window.fileOperations.readFile(path);

		return JSON.parse(output);
	} catch (err: unknown) {
		const errMessage = (err as Error).message;

		if (errMessage.includes('no such file or directory')) {
			console.log('No tab data found, creating new file...');

			saveTabData([]);
		} else console.error('Error loading tab data:', err);

		return [];
	}
}

export async function saveUserData(userData: UserData) {
	const path = await window.fileOperations.getPath('userdata.json');

	try {
		window.fileOperations.writeFile(path, JSON.stringify(userData));
	} catch (err) {
		console.error('Error saving user data:', err);
	}
}

export async function loadUserData(): Promise<UserData> {
	const path = await window.fileOperations.getPath('userdata.json');

	console.log(path);

	try {
		const output = window.fileOperations.readFile(path);

		return JSON.parse(output) as UserData;
	} catch (err) {
		const errMessage = (err as Error).message;

		if (errMessage.includes('no such file or directory')) {
			console.log('No user data found, creating new file...');

			saveUserData(new UserData());
		} else console.error('Error loading user data:', err);

		return new UserData();
	}
}
