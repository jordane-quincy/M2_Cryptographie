package com.github.jordane_quincy.M2_Cryptographie.Vigenere;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.github.jordane_quincy.M2_Cryptographie.Cesar.Cesar;

public class Vigenere {

	private static final Logger LOG = LogManager.getLogger(Vigenere.class);

	public static String decode(String encodedText, String key, List<Character> alphabet) {
		return encodeDecode(encodedText, key, false, alphabet);
	}

	public static String encode(String sourceText, String key, List<Character> alphabet) {
		return encodeDecode(sourceText, key, true, alphabet);
	}

	public static String encodeDecode(String textInput, String key, boolean encode, List<Character> alphabet) {
		final StringBuilder sb = new StringBuilder();
		LOG.debug("Vigenere " + (encode ? "encode" : "decode"));
		// // obtain the shift
		// final int shift = Character.toUpperCase(key) - A;
		LOG.debug("input : " + textInput + " with key : " + key);

		// final String text = textInput.toUpperCase();
		final String text = textInput;
		for (int i = 0; i < text.length(); i++) {
			final char letter = text.charAt(i);
			final char keyLetter = key.charAt(i % key.length());
			// System.out.println(letter + " " + keyLetter);

			// FIXME: pouvoir changer d'alphabet
			final char car = Cesar.encodeDecodeChar(letter, alphabet, keyLetter, encode);

			sb.append(car);
		}

		LOG.debug("output: " + sb.toString());
		return sb.toString();
	}
}
