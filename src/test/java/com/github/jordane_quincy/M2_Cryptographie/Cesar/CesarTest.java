package com.github.jordane_quincy.M2_Cryptographie.Cesar;

import org.junit.Test;

import junit.framework.Assert;

public class CesarTest {

	@Test
	public void testDecode() {
		final String encodedText = "BCDE";
		final char key = 'b';

		final String sourceText = Cesar.decode(encodedText, key);

		// assert encoding
		Assert.assertEquals("ABCD", sourceText);
	}

	@Test
	public void testDecodeWithBatAlphabetEnd() {
		final String sourceText = "XYZA";
		final char key = 'B';

		final String encodedText = Cesar.decode(sourceText, key);

		// assert encoding
		Assert.assertEquals("WXYZ", encodedText);
	}

	@Test
	public void testDecodeWithZkey() {
		final String sourceText = "ZABC";
		final char key = 'Z';

		final String encodedText = Cesar.decode(sourceText, key);

		// assert encoding
		Assert.assertEquals("ABCD", encodedText);
	}

	@Test
	public void testEncode() {
		final String sourceText = "abcd";
		final char key = 'b';

		final String encodedText = Cesar.encode(sourceText, key);

		// assert encoding
		Assert.assertEquals("BCDE", encodedText);
	}

	@Test
	public void testEncodeWhenLowercase() {
		final String sourceText = "abcd";
		final char key = 'a';

		final String encodedText = Cesar.encode(sourceText, key);

		Assert.assertEquals("ABCD", encodedText);
	}

	@Test
	public void testEncodeWhenUppercase() {
		final String sourceText = "ABCD";
		final char key = 'A';

		final String encodedText = Cesar.encode(sourceText, key);

		Assert.assertEquals(sourceText, encodedText);
	}

	@Test
	public void testEncodeWithBatAlphabetEnd() {
		final String sourceText = "wxyz";
		final char key = 'b';

		final String encodedText = Cesar.encode(sourceText, key);

		// assert encoding
		Assert.assertEquals("XYZA", encodedText);
	}

	@Test
	public void testEncodeWithZkey() {
		final String sourceText = "abcd";
		final char key = 'z';

		final String encodedText = Cesar.encode(sourceText, key);

		// assert encoding
		Assert.assertEquals("ZABC", encodedText);
	}

}
