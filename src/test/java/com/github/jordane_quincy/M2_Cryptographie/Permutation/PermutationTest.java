package com.github.jordane_quincy.M2_Cryptographie.Permutation;

import org.junit.Test;

import junit.framework.Assert;

public class PermutationTest {

	@Test
	public void testCM1_slide10_decode() {
		final String sourceText = "YVBSYSCSYSES";

		final String oldAlphabet = "rgecvjuaspoimbwdtzxfhyklnq";
		final String newAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		final String encodedText = Permutation.decode(sourceText, oldAlphabet, newAlphabet);

		Assert.assertEquals("VENIVIDIVICI", encodedText);
	}

	@Test
	public void testCM1_slide10_encode() {
		final String sourceText = "Veni, Vidi, Vici";

		final String oldAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		final String newAlphabet = "rgecvjuaspoimbwdtzxfhyklnq";

		final String encodedText = Permutation.encode(sourceText, oldAlphabet, newAlphabet);

		Assert.assertEquals("YVBSYSCSYSES", encodedText);
	}
}
