import { Tab } from '../classes/Tab';
import linkIcon from '../icons/link.svg';
import descriptionIcon from '../icons/description.svg';
import closeIcon from '../icons/close.svg';
import { EditableText } from './EditableText';

export const ModifyLinkDialog = (props: { tab: Tab }) => {
	const tab = new Tab('http://www.link.com', 'Article Title', 'Added at 11/27, 11:59 PM');

	return (
		<>
			<div className='backdrop fixed-centered' />
			<div id='linkDialog' className='floating-menu'>
				<div className='header'>
					<div className='title'>
						<EditableText id='title' text={tab.title} onEdit={() => {}} />
					</div>
					<div className='close-menu-btn'>
						<img src={closeIcon} alt='Close menu' />
					</div>
				</div>
				<div className='property-wrapper'>
					<img src={linkIcon} alt='Tab URL' />
					<EditableText id='url' text={tab.link} onEdit={() => {}} />
				</div>
				<div className='property-wrapper'>
					<img src={descriptionIcon} alt='Subtitle' />
					<EditableText id='subtitle' text={tab.subtitle} onEdit={() => {}} />
				</div>
			</div>
		</>
	);
};
