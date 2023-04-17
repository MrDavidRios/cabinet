import { useEffect, useState } from 'react';
import useComponentVisible from './utils/OutsideAlerter';

interface EditableTextProps {
	id: string;
	text: string;
	regExp?: RegExp;
	onEdit: (newText: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({ id, text, onEdit, regExp = /^[^\n\r]*$/ }) => {
	const [editing, setEditing] = useState(false);
	const [inputContentLength, setInputContentLength] = useState(text.length - 9);

	const { ref, isComponentVisible } = useComponentVisible(true);

	useEffect(() => {
		if (!isComponentVisible) {
			setEditing(false);
		}
	}, [isComponentVisible]);

	return (
		<div ref={ref} id={id}>
			{editing && isComponentVisible ? (
				<input
					className='editable-text'
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							// give me regex to check if contents are valid. Any text symbol is allowed.
							if ((e.target as HTMLInputElement).value.match(regExp)) {
								console.log('Valid title');
							} else {
								console.log('Invalid title');
							}

							setEditing(false);
						} else {
							setInputContentLength((e.target as HTMLInputElement).value.length - 7);
							console.log(inputContentLength);
						}
					}}
					onInput={(e) => {
						setInputContentLength((e.target as HTMLInputElement).value.length - 7);
						console.log(inputContentLength);
					}}
					defaultValue={text}
					size={inputContentLength}
					autoFocus
				></input>
			) : (
				<p
					onClick={(e) => {
						switch (e.detail) {
							case 2:
								// Double click
								setEditing(true);
								break;
						}
					}}
				>
					{text}
				</p>
			)}
		</div>
	);
};
