package com.github.jordane_quincy.M2_Cryptographie.utils;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.Test;

import junit.framework.Assert;

public class UtilTest {

	@Test
	public void testConvertCharacterListToString() {
		final List<Character> charList = Arrays.asList('A', 'B', 'C');

		final String string = Util.convertCharacterListToString(charList);

		assertEquals("ABC", string);
	}

	@Test
	public void testCountLetterOccurence() {
		final String text = "abcdaab";

		final Map<Character, Integer> mapCount = Util.countLetterOccurence(text);

		final Map<Character, Integer> mapExpected = new HashMap<>();
		mapExpected.put('a', 3);
		mapExpected.put('b', 2);
		mapExpected.put('c', 1);
		mapExpected.put('d', 1);

		Assert.assertEquals(mapExpected, mapCount);
	}

	@Test
	public void testCountLetterOccurenceOrderedByOccurence() {
		final String text = "abcbbbdc";

		final Map<Character, Integer> mapCount = Util.countLetterOccurence(text);

		Assert.assertEquals(4, mapCount.entrySet().size());

		final Iterator<Entry<Character, Integer>> it = mapCount.entrySet().iterator();

		// b has more occurrences than any other letter so it's the first
		// element
		final Entry<Character, Integer> entry1 = it.next();
		Assert.assertEquals('b', entry1.getKey().charValue());
		Assert.assertEquals(4, entry1.getValue().intValue());

		final Entry<Character, Integer> entry2 = it.next();
		Assert.assertEquals('c', entry2.getKey().charValue());
		Assert.assertEquals(2, entry2.getValue().intValue());

		// a and d have the same occurrences count so now alphabetical order
		final Entry<Character, Integer> entry3 = it.next();
		Assert.assertEquals('a', entry3.getKey().charValue());
		Assert.assertEquals(1, entry3.getValue().intValue());

		final Entry<Character, Integer> entry4 = it.next();
		Assert.assertEquals('d', entry4.getKey().charValue());
		Assert.assertEquals(1, entry4.getValue().intValue());
	}

	@Test
	public void testGetLetterWithMaxOccurence() {
		final String text = "AABAC";

		final Entry<Character, Integer> letterWithMaxOccurence = Util.getLetterWithMaxOccurence(text);

		assertNotNull(letterWithMaxOccurence);
		// A has more occurence than any other char
		assertEquals('A', letterWithMaxOccurence.getKey().charValue());
		// A is present 3 times in the text
		assertEquals(3, letterWithMaxOccurence.getValue().intValue());
	}

}
