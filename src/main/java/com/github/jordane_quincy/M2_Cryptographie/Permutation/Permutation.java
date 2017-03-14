package com.github.jordane_quincy.M2_Cryptographie.Permutation;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.github.jordane_quincy.M2_Cryptographie.Vigenere.Vigenere;

public class Permutation {

	private static final Logger LOG = LogManager.getLogger(Vigenere.class);

	private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	public static String encode(String sourceText, String newAlphabet) {
		return encodeDecode(sourceText, newAlphabet, true);
	}

	public static String encodeDecode(String sourceText, String newAlphabet, boolean encode) {
		final StringBuilder sb = new StringBuilder();
		LOG.debug("sourceText : " + sourceText);

		for (final char letter : sourceText.toUpperCase().toCharArray()) {

			// On retrouve l'index de la lettre à coder dans l'alphabet clair
			final int indexLetter = ALPHABET.indexOf(letter);
			final char letterConverted = newAlphabet.substring(indexLetter, indexLetter + 1).charAt(0);

			LOG.debug("letter '" + letter + "' : '" + letterConverted + "'");
			sb.append(letterConverted);
		}

		LOG.debug("Permuted text : " + sb.toString());
		return sb.toString();
	}

}
