import { useEffect, useState } from 'react';
import minimizeIcon from './icons/minimize.svg';
import maximizeIcon from './icons/square.svg';
import resizeIcon from './icons/copy.svg';
import closeIcon from './icons/close.svg';

export function Titlebar() {
	useEffect(() => {
		async function getMaximizedStatus() {
			const isMaximized = await window.windowControl.isMaximized();

			setMaximized(isMaximized);
		}

		window.addEventListener('maximized', getMaximizedStatus);
		window.addEventListener('unmaximized', getMaximizedStatus);

		return () => {
			window.removeEventListener('maximized', getMaximizedStatus);
			window.removeEventListener('unmaximized', getMaximizedStatus);
		};
	}, []);

	const [maximized, setMaximized] = useState(false);

	return (
		<div id='titlebar'>
			<div id='draggable'></div>
			<div id='windowControlButtons'>
				<div
					id='minimizeButton'
					onClick={() => {
						window.windowControl.minimize();
					}}
				>
					<img alt='Minimize Window Button' src={minimizeIcon} />
				</div>
				{maximized ? (
					<div id='resizeButton'>
						<img alt='Resize Window Button' src={resizeIcon} />
					</div>
				) : (
					<div
						id='maximizeButton'
						onClick={() => {
							window.windowControl.maximize();
						}}
					>
						<img alt='Maximize Window Button' src={maximizeIcon} />
					</div>
				)}
				<div
					id='closeButton'
					onClick={() => {
						window.windowControl.close();
					}}
				>
					<img alt='Close Window Button' src={closeIcon} />
				</div>
			</div>
		</div>
	);
}
