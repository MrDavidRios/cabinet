import { generateUniqueId } from '../utils/generateID';
import { Tab } from './Tab';

export class TabGroup {
	title: string;
	tabs: Tab[];
	id: string;

	constructor(title: string, tabs: Tab[]) {
		this.title = title;
		this.tabs = tabs;

		this.id = generateUniqueId();
	}
}
