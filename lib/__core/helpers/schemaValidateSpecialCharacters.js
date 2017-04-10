function validateSpecialCharacters(value) {
	if (/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(value) == false) {
		return false;
	} else {
		return true;
	}
}

export default function schemaValidateSpecialCharacters() {
	const value = this.value;
	if (!validateSpecialCharacters(value)) return 'invalid';
}

global.validateSpecialCharacters = validateSpecialCharacters;
