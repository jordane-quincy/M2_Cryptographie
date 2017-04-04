package com.github.jordane_quincy.M2_Cryptographie.Cesar;

import org.junit.Test;

import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

import junit.framework.Assert;

public class CesarTest {

	@Test
	public void testCM170208_01() {
		final String sourceText = "PREMIEREXEMPLE";
		final char key = 'Y';

		final String encodedText = Cesar.encode(sourceText, Util.ALPHABET_FR_MAJ, key);

		Assert.assertEquals("NPCKGCPCVCKNJC", encodedText);
	}

	@Test
	public void testCM170208_02() {
		final String sourceText = "MZMVCVDFULCVUVTIPGKF";
		final char key = 'R';

		final String encodedText = Cesar.decode(sourceText, Util.ALPHABET_FR_MAJ, key);

		Assert.assertEquals("VIVELEMODULEDECRYPTO", encodedText);
	}

	@Test
	public void testCM170208_02_encode() {
		final String sourceText = "VIVELEMODULEDECRYPTO";
		final char key = 'R';

		final String encodedText = Cesar.encode(sourceText, Util.ALPHABET_FR_MAJ, key);

		Assert.assertEquals("MZMVCVDFULCVUVTIPGKF", encodedText);
	}

	@Test
	public void testCM170208_03() {
		final String sourceText = "KNSIZUWJRNJWJCT";
		final char key = 'F';

		final String encodedText = Cesar.decode(sourceText, Util.ALPHABET_FR_MAJ, key);

		Assert.assertEquals("FINDUPREMIEREXO", encodedText);
	}

	@Test
	public void testDecode() {
		final String encodedText = "BCDE";
		final char key = 'B';

		final String sourceText = Cesar.decode(encodedText, Util.ALPHABET_FR_MAJ, key);

		// assert encoding
		Assert.assertEquals("ABCD", sourceText);
	}

	@Test
	public void testDecodeWithBatAlphabetEnd() {
		final String sourceText = "XYZA";
		final char key = 'B';

		final String encodedText = Cesar.decode(sourceText, Util.ALPHABET_FR_MAJ, key);

		// assert encoding
		Assert.assertEquals("WXYZ", encodedText);
	}

	@Test
	public void testDecodeWithZkey() {
		final String sourceText = "ZABC";
		final char key = 'Z';

		final String encodedText = Cesar.decode(sourceText, Util.ALPHABET_FR_MAJ, key);

		// assert encoding
		Assert.assertEquals("ABCD", encodedText);
	}

	@Test
	public void testEncodeWhenLowercase() {
		final String sourceText = "abcd";
		final char key = 'b';

		final String encodedText = Cesar.encode(sourceText, Util.ALPHABET_FR_MIN, key);

		// assert encoding
		Assert.assertEquals("bcde", encodedText);
	}

	@Test
	public void testEncodeWhenLowercaseWithKeyUppercase() {
		final String sourceText = "ABCD";
		final char key = 'A';

		final String encodedText = Cesar.encode(sourceText, Util.ALPHABET_FR_FULL, key);

		Assert.assertEquals("ABCD", encodedText);
	}

	@Test
	public void testEncodeWhenUppercaseWithKeyUppercase() {
		final String sourceText = "ABCD";
		final char key = 'A';

		final String encodedText = Cesar.encode(sourceText, Util.ALPHABET_FR_FULL, key);

		Assert.assertEquals("ABCD", encodedText);
	}

	@Test
	public void testEncodeWithBatAlphabetEnd() {
		final String sourceText = "WXYZ";
		final char key = 'B';

		final String encodedText = Cesar.encode(sourceText, Util.ALPHABET_FR_MAJ, key);

		// assert encoding
		Assert.assertEquals("XYZA", encodedText);
	}

	@Test
	public void testEncodeWithZkey() {
		final String sourceText = "ABCD";
		final char key = 'Z';

		final String encodedText = Cesar.encode(sourceText, Util.ALPHABET_FR_MAJ, key);

		// assert encoding
		Assert.assertEquals("ZABC", encodedText);
	}

}
