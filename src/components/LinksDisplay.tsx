import { useState } from 'react';
import { TabGroup } from '../classes/TabGroup';
import { validUrl } from '../utils/webOperations';
import { Tab } from '../classes/Tab';
import { ModifyLinkDialog } from './ModifyLinkDialog';

export const LinksDisplay = (props: {
	tabGroup: TabGroup;
	updateGroupCallback: (group: TabGroup) => void;
	addGroupCallback: (group: TabGroup) => void;
	removeGroupCallback: (group: TabGroup) => void;
}) => {
	console.log('tab group:', props.tabGroup);

	let tabGroup = props.tabGroup;

	const [newTab, setNewTab] = useState(new Tab('', '', ''));
	const [showLinkDialog, setShowLinkDialog] = useState(true);

	const hideLinkDialog = () => {
		setShowLinkDialog(false);
	};

	return (
		<>
			<div
				id='listContent'
				onDragOver={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				onDrop={async (e) => {
					e.preventDefault();
					e.stopPropagation();

					const url = e.dataTransfer.getData('text/plain');
					const droppedUrl = e.dataTransfer.getData('text/uri-list');

					console.log('Dropped URL:', droppedUrl);

					if (!validUrl(url)) return;

					const tab = new Tab(url, 'New tab', 'Added now');

					setNewTab(tab);

					setShowLinkDialog(true);

					if (!tabGroup) {
						tabGroup = new TabGroup('New Tab Group', []);

						// props.addGroupCallback(tabGroup);
					} else {
						tabGroup.tabs.push(new Tab(url, 'New Tab', 'Added now'));

						// props.updateGroupCallback(tabGroup);
					}
				}}
			>
				{!tabGroup ? (
					<p id='announcementText'>No tabs to display. Drag and drop a browser tab here to get started!</p>
				) : (
					<>
						{tabGroup.tabs.length > 0 ? (
							tabGroup.tabs.map((tab, idx) => {
								return <LinkCard key={idx} tab={tab} />;
							})
						) : (
							<p id='announcementText'>No tabs in this group. Add some tabs!</p>
						)}
					</>
				)}
			</div>
			{showLinkDialog ? <ModifyLinkDialog tab={newTab} closeDialog={hideLinkDialog} /> : <></>}
		</>
	);
};

export const LinkCard = (props: { tab: Tab }) => {
	return (
		<div className='link-card'>
			<p className='title'>{props.tab.title}</p>
			<p className='subtitle'>{props.tab.subtitle}</p>
		</div>
	);
};
