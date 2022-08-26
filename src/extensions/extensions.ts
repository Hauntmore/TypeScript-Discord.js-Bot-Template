/* eslint-disable func-names */
/* eslint-disable no-extend-native */

String.prototype.title = function (): string {
	const str = this.toLowerCase().split(/ +/);

	// TODO: Return the original string if the string's length is less than 2.

	for (let i = 0; i < str.length; i++) {
		str[i] = `${str[i]?.charAt(0).toUpperCase()}${str[i]?.slice(1)}`;
	}

	return str.join(' ');
};
