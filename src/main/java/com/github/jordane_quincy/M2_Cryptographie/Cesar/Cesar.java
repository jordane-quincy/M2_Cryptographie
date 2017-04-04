package com.github.jordane_quincy.M2_Cryptographie.Cesar;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Cesar {

	private static final Logger LOG = LogManager.getLogger(Cesar.class);

	public static String decode(String encodedText, List<Character> alphabet, char key) {
		return encodeDecode(encodedText, alphabet, key, false);
	}

	public static String encode(String sourceText, List<Character> alphabet, char key) {
		return encodeDecode(sourceText, alphabet, key, true);
	}

	public static String encodeDecode(String text, List<Character> alphabet, char key, boolean encode) {
		final StringBuilder sb = new StringBuilder();
		LOG.debug("Cesar " + (encode ? "encode" : "decode"));
		// obtain the shift
		final int shift = alphabet.indexOf(key);
		LOG.debug("input : " + text + " with key : " + key + " (shift : " + shift + ")");

		for (final char letter : text.toCharArray()) {
			sb.append(encodeDecodeChar(letter, alphabet, key, encode));
		}

		LOG.debug("output: " + sb.toString());
		return sb.toString();
	}

	public static char encodeDecodeChar(char letter, List<Character> alphabet, char key, boolean encode) {
		final char output;

		// obtain the shift
		final int shift = alphabet.indexOf(key);
		// LOG.debug("shift :" + shift);

		int letterCode;

		final int letterIndex = alphabet.indexOf(letter);
		// LOG.debug("letter : " + letter + ", letterIndex : " + letterIndex);

		if (encode) {
			// // encode
			// letterCode = letter + shift;
			// // System.out.println((int) letter + "+" + shift + " = " + (int)
			// // letterCode + " (" + letterCode + ")");
			// if (letterCode > Z) {
			// letterCode = letterCode - this.NB_LETTER_ALPHABET;
			// }

			int tmpLetterCode = (letterIndex + shift) % alphabet.size();
			if (tmpLetterCode < 0) {
				tmpLetterCode = letterIndex - shift;
			}

			// encode
			letterCode = alphabet.get(tmpLetterCode);

		} else {
			// // decode
			// letterCode = letter - shift;
			// // System.out.println((int) letter + "-" + shift + " = " + (int)
			// // letterCode + " (" + letterCode + ")");
			// if (letterCode < A) {
			// letterCode = letterCode + this.NB_LETTER_ALPHABET;
			// }

			int tmpLetterCode = (letterIndex - shift) % alphabet.size();

			if (tmpLetterCode < 0) {
				tmpLetterCode = tmpLetterCode + alphabet.size();
			}

			// decode
			letterCode = alphabet.get(tmpLetterCode);
		}

		output = (char) letterCode;

		// System.out.println("output: " + output);
		return output;
	}

}
