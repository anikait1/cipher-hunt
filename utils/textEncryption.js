exports.encryptText = (text) => {
  const encryptionArray = _encryptionArray();
  const hints = _hintsMapping(text, encryptionArray);
  const encryptedTextArray = [];

  // iterate over the given text and reference the encryption table
  // to create encrypted text
  [...text].forEach((char) => {
    if (/[a-zA-Z]/.test(char)) {
      encryptedTextArray.push(
        char.toUpperCase() === char
          ? encryptionArray[char.toLowerCase().charCodeAt() - 97].toUpperCase()
          : encryptionArray[char.charCodeAt() - 97]
      );
    } else {
      encryptedTextArray.push(char);
    }
  });

  return [encryptedTextArray.join(""), hints];
};

// return a randomly shuffled array which will be used to encrypt a given text
const _encryptionArray = () => {
  const alphabets = [...Array(26)].map((_, index) =>
    String.fromCharCode(index + 97)
  );

  // shuffle the array
  return alphabets.sort(() => Math.random() - 0.5);
};

// return an array which represents the frequency of characters in a text
const _characterFrequency = (text) => {
  const normalizedText = text.toLowerCase();
  const characterFrequency = [...normalizedText].reduce((prev, curr) => {
    if (/[a-z]/.test(curr)) {
      prev[curr.charCodeAt() - 97] += 1;
    }

    return prev;
  }, Array(26).fill(0));

  return characterFrequency;
};

// return the top three characters(based upon frequency) from a text with their frequency
const _mostFrequentCharacters = (text) => {
  return _characterFrequency(text)
    .map((frequency, index) => ({
      character: String.fromCharCode(index + 97),
      frequency,
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 3);
};

// return an array containing the top three most frequent characters and their encryption mapping(to be used as hints)
const _hintsMapping = (text, encryptionArray) => {
  return _mostFrequentCharacters(text).map((val) => ({
    original: val.character,
    encrypted: encryptionArray[val.character.charCodeAt() - 97],
  }));
};
