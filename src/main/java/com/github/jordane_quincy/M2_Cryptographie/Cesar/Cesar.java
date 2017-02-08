package com.github.jordane_quincy.M2_Cryptographie.Cesar;

public class Cesar {

	public static final int A = 'A'; // int == 65
	public static final int Z = 'Z'; // int == 90
	public static final int NB_LETTER_ALPHABET = 26; // (Z - A) +1

	public static String decode(String encodedText, char key) {
		// final StringBuilder sb = new StringBuilder();
		// // obtain the shift
		// final int keyCode = key) - A;
		// System.out.println(
		// "encodedText : " + encodedText + " with key : " + key + " (" + (int)
		// key + "->" + keyCode + ")");
		//
		// for (final char letter : encodedText.toCharArray()) {
		// System.out.println("letter : " + letter + " (" + (int) letter + ")");
		//
		// // shift the original letter according to key
		// final int letterCode = letter) - keyCode;
		//
		// System.out.println("letterCode : " + (char) letterCode + " (" +
		// letterCode + ")");
		//
		// sb.append((char) letterCode);
		// }
		//
		// return sb.toString();

		return encodeDecode(encodedText, key, false);
	}

	public static String encode(String sourceText, char key) {
		// final StringBuilder sb = new StringBuilder();
		// // obtain the shift
		// final int keyCode = key) - A;
		// System.out.println("source : " + sourceText + " with key : " + key +
		// " (" + (int) key + "->" + keyCode + ")");
		//
		// for (final char letter : sourceText.toCharArray()) {
		// // System.out.println("letter : " + letter + " (" + (int) letter +
		// // ")");
		//
		// // shift the original letter according to key
		// final int letterCode = letter) + keyCode;
		//
		// // System.out.println("letterCode : " + (char) letterCode + " (" +
		// // letterCode + ")");
		//
		// sb.append((char) letterCode);
		// }
		//
		// return sb.toString();

		return encodeDecode(sourceText, key, true);
	}

	public static String encodeDecode(String text, char key, boolean encode) {
		final StringBuilder sb = new StringBuilder();
		// obtain the shift
		final int shift = Character.toUpperCase(key) - A;
		System.out.println("source : " + text + " with key : " + key + " (shift : " + shift + ")");

		for (final char letter : text.toUpperCase().toCharArray()) {

			char letterCode;

			if (encode) {
				// encode
				letterCode = (char) (letter + shift);
				// System.out.println((int) letter + "+" + shift + " = " + (int)
				// letterCode + " (" + letterCode + ")");
				if (letterCode > Z) {
					letterCode = (char) (letterCode - NB_LETTER_ALPHABET);
				}

			} else {
				// decode
				letterCode = (char) (letter - shift);
				// System.out.println((int) letter + "-" + shift + " = " + (int)
				// letterCode + " (" + letterCode + ")");
				if (letterCode < A) {
					letterCode = (char) (letterCode + NB_LETTER_ALPHABET);
				}

			}

			System.out.println("letterCode : " + letterCode + " (" + (int) letterCode + ")");

			sb.append(letterCode);
		}

		return sb.toString();
	}

}
