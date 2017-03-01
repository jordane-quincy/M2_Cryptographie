package com.github.jordane_quincy.M2_Cryptographie.utils;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class Util {

	public static Map<Character, Integer> countLetterOccurence(String text) {
		Map<Character, Integer> map = new HashMap<>();

		for (final char letter : text.toCharArray()) {
			System.out.println("letter : " + letter);
			Integer countLetter = map.get(letter) == null ? 0 : map.get(letter);
			countLetter++;
			map.put(letter, countLetter);
		}

		map = sortByLetterOccurenceDesc(map);
		System.out.println("map :" + map);
		return map;
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
}
