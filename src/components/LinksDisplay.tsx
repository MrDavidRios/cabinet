import { CSSProperties, useState } from 'react';
import { TabGroup } from '../classes/TabGroup';
import { getTitle } from '../utils/webOperations';
import { BounceLoader } from 'react-spinners';

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red'
};

export const LinksDisplay = (props: { tabGroup: TabGroup; addLinkCallback: (group: TabGroup) => void }) => {
	console.log('tab group:', props.tabGroup);

	let [loading, setLoading] = useState(false);

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

				setLoading(true);

				const title = await getTitle(url);

				setLoading(false);

				props.addLinkCallback(props.tabGroup);
			}}
		>
			{loading ? (
				<div id='tabTitleLoadingIndicator'>
					<p>Getting tab title...</p>
					<BounceLoader loading={loading} cssOverride={override} aria-label='Loading Spinner' className='loading-indicator' />
				</div>
			) : (
				<></>
			)}
			{!props.tabGroup ? (
				!loading ? (
					<p id='announcementText'>No tabs to display. Drag and drop a browser tab here to get started!</p>
				) : (
					<></>
				)
			) : (
				<>
					{props.tabGroup.tabs.map((tab) => {
						return <div>{tab.title}</div>;
					})}
				</>
			)}
		</div>
	);
};
