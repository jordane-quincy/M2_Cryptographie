package com.github.jordane_quincy.M2_Cryptographie.Permutation;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

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
		final String sourceText = Util.removeAllNonAlphabeticalCharacters(sourceTextOriginal);
		final String newAlphabet = Util.removeAllNonAlphabeticalCharacters(newAlphabetOriginal);
		final String oldAlphabet = Util.removeAllNonAlphabeticalCharacters(oldAlphabetOriginal);
		LOG.info("sourceText : " + sourceText);

		for (final char letter : sourceText.toCharArray()) {

			// On retrouve l'index de la lettre à coder dans l'alphabet clair
			final int indexLetter = oldAlphabet.indexOf(letter);
			final char letterConverted = newAlphabet.substring(indexLetter, indexLetter + 1).charAt(0);

			LOG.debug("letter '" + letter + "' : '" + letterConverted + "'");
			sb.append(letterConverted);
		}

		LOG.info("Permuted text : " + sb.toString());
		return sb.toString();
	}

}
