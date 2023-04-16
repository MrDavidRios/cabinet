import { CSSProperties, useState } from 'react';
import { TabGroup } from '../classes/TabGroup';
import { getTitle, validUrl } from '../utils/webOperations';
import { BounceLoader } from 'react-spinners';
import { Tab } from '../classes/Tab';

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red'
};

export const LinksDisplay = (props: {
	tabGroup: TabGroup;
	updateGroupCallback: (group: TabGroup) => void;
	addGroupCallback: (group: TabGroup) => void;
	removeGroupCallback: (group: TabGroup) => void;
}) => {
	console.log('tab group:', props.tabGroup);

	let [loading, setLoading] = useState(false);
	let [loadingURL, setLoadingURL] = useState('');

	let tabGroup = props.tabGroup;

	return (
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
				const droppedTitle = e.dataTransfer.getData('text/plain');

				console.log(droppedUrl, droppedTitle);

				if (!validUrl(url)) return;

				setLoadingURL(url);
				setLoading(true);

				const title = await getTitle(url);

				setLoading(false);
				setLoadingURL('');

				if (!tabGroup) {
					tabGroup = new TabGroup('New Tab Group', [new Tab(url, title, 'Added now')]);

					props.addGroupCallback(tabGroup);
				} else {
					tabGroup.tabs.push(new Tab(url, title, 'Added now'));

					props.updateGroupCallback(tabGroup);
				}
			}}
		>
			{loading ? (
				<div id='tabTitleLoadingIndicator'>
					<p>Getting tab title...</p>
					{loadingURL.length > 0 ? (
						<p className='link' onClick={() => window.browser.openExternal(loadingURL)}>
							{loadingURL}
						</p>
					) : (
						<></>
					)}
					<BounceLoader loading={loading} cssOverride={override} aria-label='Loading Spinner' className='loading-indicator' />
				</div>
			) : (
				<></>
			)}
			{!tabGroup ? (
				!loading ? (
					<p id='announcementText'>No tabs to display. Drag and drop a browser tab here to get started!</p>
				) : (
					<></>
				)
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
