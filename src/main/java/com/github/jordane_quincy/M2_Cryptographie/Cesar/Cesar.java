package com.github.jordane_quincy.M2_Cryptographie.Cesar;

import java.util.Arrays;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Cesar {

	private static final Logger LOG = LogManager.getLogger(Cesar.class);

	private static final List<Character> ALPHABET = Arrays.asList('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
			'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
			'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ',
			'!');

	private static final int NB_LETTER_ALPHABET = ALPHABET.size();

	public static String decode(String encodedText, char key) {
		return encodeDecode(encodedText, key, false);
	}

	public static String encode(String sourceText, char key) {
		return encodeDecode(sourceText, key, true);
	}

	public static String encodeDecode(String text, char key, boolean encode) {
		final StringBuilder sb = new StringBuilder();
		LOG.debug("Cesar " + (encode ? "encode" : "decode"));
		// obtain the shift
		final int shift = ALPHABET.indexOf(key);
		LOG.debug("input : " + text + " with key : " + key + " (shift : " + shift + ")");

		for (final char letter : text.toCharArray()) {
			sb.append(encodeDecodeChar(letter, key, encode));
		}

		LOG.debug("output: " + sb.toString());
		return sb.toString();
	}

	public static char encodeDecodeChar(char letter, char key, boolean encode) {
		final char output;
		// System.out.println(encode ? "encode" : "decode");
		// obtain the shift
		final int shift = ALPHABET.indexOf(key);
		// System.out.println("input : " + letter + " with key : " + key + "
		// (shift : " + shift + ")");

		int letterCode;

		if (encode) {
			// // encode
			// letterCode = letter + shift;
			// // System.out.println((int) letter + "+" + shift + " = " + (int)
			// // letterCode + " (" + letterCode + ")");
			// if (letterCode > Z) {
			// letterCode = letterCode - this.NB_LETTER_ALPHABET;
			// }

			// encode
			final int letterInCode = ALPHABET.indexOf(letter);

			letterCode = ALPHABET.get((letterInCode + shift) % NB_LETTER_ALPHABET);

		} else {
			// // decode
			// letterCode = letter - shift;
			// // System.out.println((int) letter + "-" + shift + " = " + (int)
			// // letterCode + " (" + letterCode + ")");
			// if (letterCode < A) {
			// letterCode = letterCode + this.NB_LETTER_ALPHABET;
			// }

			// decode
			letterCode = -1; // FIXME:
		}

		output = (char) letterCode;

		// System.out.println("output: " + output);
		return output;
	}

}
