//https://gist.github.com/jbinto/119c3f0e5735ab73faaa
export async function getTitle(url: string): Promise<string> {
	return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
		.then(async (response) => {
			if (response.ok) return await response.text();

			return '';
		})
		.then((data) => {
			if (data === '') return 'No title found';

			const doc = new DOMParser().parseFromString(data, 'text/html');
			const title = doc.querySelectorAll('title')[0];
			return title.innerText;
		});
}

export function validUrl(url: string): boolean {
	const pattern = /^(http|https):\/\/([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
	return pattern.test(url);
}
