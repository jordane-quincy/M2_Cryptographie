package com.github.jordane_quincy.M2_Cryptographie.Switch;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Permutation {

	private static final Logger LOG = LogManager.getLogger(Permutation.class);

	public static String decode(String encodedText, String oldAlphabet, String newAlphabet) {
		return encodeDecode(encodedText, oldAlphabet, newAlphabet, false);
	}

	public static String encode(String sourceText, String oldAlphabet, String newAlphabet) {
		return encodeDecode(sourceText, oldAlphabet, newAlphabet, true);
	}

	public static String encodeDecode(String sourceTextOriginal, String oldAlphabetOriginal, String newAlphabetOriginal,
			boolean encode) {
		final StringBuilder sb = new StringBuilder();
		final String sourceText = sourceTextOriginal;
		final String newAlphabet = newAlphabetOriginal;
		final String oldAlphabet = oldAlphabetOriginal;
		LOG.info("sourceText : " + sourceText);

		for (final char letter : sourceText.toCharArray()) {

			// On retrouve l'index de la lettre à coder dans l'alphabet clair
			final int indexLetter = oldAlphabet.indexOf(letter);
			if (indexLetter == -1) {
				LOG.debug("letter '" + letter + "' not found in :" + oldAlphabet);
			} else {
				final char letterConverted = newAlphabet.substring(indexLetter, indexLetter + 1).charAt(0);

				LOG.debug("letter '" + letter + "' : '" + letterConverted + "'");
				sb.append(letterConverted);
			}
		}

		LOG.info("Permuted text : " + sb.toString());
		return sb.toString();
	}

}
