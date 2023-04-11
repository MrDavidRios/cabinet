/// <reference types="react-scripts" />

interface Window {
	windowControl: {
		isMaximized: () => boolean;
		maximize: () => void;
		unmaximize: () => void;
		minimize: () => void;
		close: () => void;
	};
	fileOperations: {
		/** Writes the provided data to a file. The data must be in the format of a JSON string. */
		writeFile: (path: string, data: string) => void;

		/** Writes the provided data to a file. The data will be returned as a JSON string. */
		readFile: (path: string) => string;

		getPath: (path: string) => string;
	};
}
