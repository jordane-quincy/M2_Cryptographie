package com.github.jordane_quincy.M2_Cryptographie.Cesar;

public class Cesar {

	public static final int A = 'A'; // int == 65
	public static final int Z = 'Z'; // int == 90
	public static final int NB_LETTER_ALPHABET = 26; // (Z - A) +1

	public static String decode(String encodedText, char key) {
		return encodeDecode(encodedText, key, false);
	}

	public static String encode(String sourceText, char key) {
		return encodeDecode(sourceText, key, true);
	}

	public static String encodeDecode(String text, char key, boolean encode) {
		final StringBuilder sb = new StringBuilder();
		System.out.println("Cesar " + (encode ? "encode" : "decode"));
		// obtain the shift
		final int shift = Character.toUpperCase(key) - A;
		System.out.println("input : " + text + " with key : " + key + " (shift : " + shift + ")");

		for (final char letter : text.toUpperCase().toCharArray()) {
			sb.append(encodeDecodeChar(letter, key, encode));
		}

		System.out.println("output: " + sb.toString());
		return sb.toString();
	}

	public static char encodeDecodeChar(char letter, char key, boolean encode) {
		final char output;
		// System.out.println(encode ? "encode" : "decode");
		// obtain the shift
		final int shift = Character.toUpperCase(key) - A;
		// System.out.println("input : " + letter + " with key : " + key + "
		// (shift : " + shift + ")");

		int letterCode;

		if (encode) {
			// encode
			letterCode = letter + shift;
			// System.out.println((int) letter + "+" + shift + " = " + (int)
			// letterCode + " (" + letterCode + ")");
			if (letterCode > Z) {
				letterCode = letterCode - NB_LETTER_ALPHABET;
			}
		} else {
			// decode
			letterCode = letter - shift;
			// System.out.println((int) letter + "-" + shift + " = " + (int)
			// letterCode + " (" + letterCode + ")");
			if (letterCode < A) {
				letterCode = letterCode + NB_LETTER_ALPHABET;
			}
		}

		output = (char) letterCode;

		// System.out.println("output: " + output);
		return output;
	}

}
