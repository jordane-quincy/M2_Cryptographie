package com.github.jordane_quincy.M2_Cryptographie.Vigenere;

import com.github.jordane_quincy.M2_Cryptographie.Cesar.Cesar;

public class Vigenere {

	public static String decode(String encodedText, String key) {
		return encodeDecode(encodedText, key, false);
	}

	public static String encode(String sourceText, String key) {
		return encodeDecode(sourceText, key, true);
	}

	public static String encodeDecode(String textInput, String key, boolean encode) {
		final StringBuilder sb = new StringBuilder();
		System.out.println("Vigenere " + (encode ? "encode" : "decode"));
		// // obtain the shift
		// final int shift = Character.toUpperCase(key) - A;
		System.out.println("input : " + textInput + " with key : " + key);

		final String text = textInput.toUpperCase();
		for (int i = 0; i < text.length(); i++) {
			final char letter = text.charAt(i);
			final char keyLetter = key.charAt(i % key.length());
			// System.out.println(letter + " " + keyLetter);

			final char car = Cesar.encodeDecodeChar(letter, keyLetter, encode);

			sb.append(car);
		}

		System.out.println("output: " + sb.toString());
		return sb.toString();
	}
}
