import { generateUniqueId } from '../utils/generateID';

export class Tab {
	title: string;
	subtitle: string;
	link: string;
	id: string;

	constructor(link: string, title: string, subtitle: string) {
		this.link = link;
		this.title = title;
		this.subtitle = subtitle;

		// Generate unique ID for each tab on generation
		this.id = generateUniqueId();
	}
}
