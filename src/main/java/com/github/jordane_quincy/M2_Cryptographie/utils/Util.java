package com.github.jordane_quincy.M2_Cryptographie.utils;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Util {

	private static final Logger LOG = LogManager.getLogger(Util.class);

	public static final List<Character> ALPHABET_FR_FULL = Arrays.asList('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
			'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', //
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
			'v', 'w', 'x', 'y', 'z');

	public static final List<Character> ALPHABET_FR_MAJ = Arrays.asList('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
			'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

	public static final List<Character> ALPHABET_FR_MIN = Arrays.asList('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
			'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

	public static final String QUIT = "quit";
	public static final String PIPE = "|";

	public static String convertCharacterListToString(List<Character> charList) {
		final StringBuilder sb = new StringBuilder();

		for (final Character lettre : charList) {
			sb.append(lettre);
		}

		return sb.toString();
	}

	public static Map<Character, Integer> countLetterOccurence(String text) {
		Map<Character, Integer> map = new HashMap<>();

		for (final char letter : text.toCharArray()) {
			// System.out.println("letter : " + letter);
			Integer countLetter = map.get(letter) == null ? 0 : map.get(letter);
			countLetter++;
			map.put(letter, countLetter);
		}

		map = sortByLetterOccurenceDesc(map);
		LOG.debug("countLetterOccurence : " + map);
		return map;
	}

	public static String detectLang(String texte) {
		String lang = null;
		final int nbCarMax = 5; // arbitraire, "ELLES" étant le plus grand

		final List<String> WORD_FR = Arrays.asList("JE", "TU", "IL", "ELLE", "NOUS", "VOUS", "ILS", "ELLES", "CE",
				"QUE", "QUI");
		for (int i = 1; i <= nbCarMax; i++) {
			final String mot = texte.substring(0, i);
			if (WORD_FR.contains(mot)) {
				lang = "FR";
			}
		}

		return lang;

	}

	/**
	 * Get the letter with the biggest occurence in the text.
	 *
	 * @param text
	 * @return the Character and the number of occurence
	 */
	public static Entry<Character, Integer> getLetterWithMaxOccurence(String text) {
		final Map<Character, Integer> mapLetterOccurence = countLetterOccurence(text);
		return mapLetterOccurence.entrySet().iterator().next();
	}

	public static String removeAllNonAlphabeticalCharacters(String textOriginal) {
		if (textOriginal == null) {
			return null;
		} else {
			return textOriginal.replaceAll("[^a-zA-Z]", "").toUpperCase();
		}
	}

	public static <K, V extends Comparable<? super V>> Map<K, V> sortByLetterOccurenceDesc(Map<K, V> map) {
		final List<Map.Entry<K, V>> list = new LinkedList<>(map.entrySet());
		Collections.sort(list, new Comparator<Map.Entry<K, V>>() {
			@Override
			public int compare(Map.Entry<K, V> e1, Map.Entry<K, V> e2) {
				// -1 * to reserver order
				return -1 * e1.getValue().compareTo(e2.getValue());
			}
		});

		final Map<K, V> result = new LinkedHashMap<>();
		for (final Map.Entry<K, V> entry : list) {
			result.put(entry.getKey(), entry.getValue());
		}

		return result;
	}

	public static String switchChar(char oldChar, char newChar, String text) {
		// On utilise un charactere temporaire
		final char forbiddenChar = Util.PIPE.charAt(0);

		return text.replace(newChar, forbiddenChar).replace(oldChar, newChar).replace(forbiddenChar, oldChar);
	}
}
