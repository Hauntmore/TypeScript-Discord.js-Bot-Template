/* eslint-disable func-names */
/* eslint-disable no-extend-native */

String.prototype.title = function (): string {
	const str = this.toLowerCase().split(/ +/);

	for (let i = 0; i < str.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		str[i] = str[i]!.charAt(0).toUpperCase() + str[i]!.slice(1);
	}

	return str.join(' ');
};
