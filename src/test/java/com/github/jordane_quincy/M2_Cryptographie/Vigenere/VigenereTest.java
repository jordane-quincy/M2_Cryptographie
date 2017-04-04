package com.github.jordane_quincy.M2_Cryptographie.Vigenere;

import org.junit.Test;

import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

import junit.framework.Assert;

public class VigenereTest {

	@Test
	public void testDecode() {
		final String encodedText = "b";
		final String key = "b";

		final String sourceText = Vigenere.decode(encodedText, key, Util.ALPHABET_FR_MIN);

		// assert encoding
		Assert.assertEquals("a", sourceText);
	}

	@Test
	public void testDecodeCM170208_01() {
		final String sourceText = "IRTGQTFTEFKENVRTOVLIGETDNVCITR" + "BXGLVHGKYXVTFPTXCSGCYBKJCTPKPP"
				+ "KEGACCJPKKTTPRGIFVQRGEBPKKPTOF" + "LICZRQTLGHURGIGKGCEVJPKK";
		final String key = "CRYP";

		final String encodedText = Vigenere.decode(sourceText, key, Util.ALPHABET_FR_MAJ);

		// assert encoding
		Assert.assertEquals("GAVROCHECOMPLETEMENTENVOLEETRA" + "DIEUXSETAITCHARGEDELAMISEENTRAI"
				+ "NILALLAITVENAITDESCENDAITREMO" + "NTAITBRUISSAITETINCELAIT", encodedText);
	}

	@Test
	public void testEncode() {
		final String sourceText = "a";
		final String key = "b";

		final String encodedText = Vigenere.encode(sourceText, key, Util.ALPHABET_FR_MIN);

		// assert encoding
		Assert.assertEquals("b", encodedText);
	}

	@Test
	public void testEncodeCM170208_01() {
		final String sourceText = "CAMARCHE";
		final String key = "ROI";

		final String encodedText = Vigenere.encode(sourceText, key, Util.ALPHABET_FR_MAJ);

		// assert encoding
		Assert.assertEquals("TOURFKYS", encodedText);
	}

	@Test
	public void testEncodePhraseSimple() {
		final String sourceText = "LACRYPTOESTSYMPA";
		final String key = "ABC";

		final String encodedText = Vigenere.encode(sourceText, key, Util.ALPHABET_FR_MAJ);

		// assert encoding
		Assert.assertEquals("LBERZRTPGSUUYNRA", encodedText);
	}

	@Test
	public void testEncodeSingleLetterKey() {
		final String sourceText = "aaa";
		final String key = "b";

		final String encodedText = Vigenere.encode(sourceText, key, Util.ALPHABET_FR_MIN);

		// assert encoding
		Assert.assertEquals("bbb", encodedText);
	}

	@Test
	public void testEncodeTwoLetterKey() {
		final String sourceText = "aaa";
		final String key = "bc";

		final String encodedText = Vigenere.encode(sourceText, key, Util.ALPHABET_FR_MIN);

		// assert encoding
		Assert.assertEquals("bcb", encodedText);
	}

}