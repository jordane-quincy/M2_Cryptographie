package com.github.jordane_quincy.M2_Cryptographie.Permutation;

import org.junit.Test;

import junit.framework.Assert;

public class PermutationTest {

	@Test
	public void testCM1_slide10() {
		final String sourceText = "Veni, Vidi, Vici";
		final String newAlphabet = "rgecvjuaspoimbwdtzxfhyklnq";

		final String encodedText = Permutation.encode(sourceText, newAlphabet);

		Assert.assertEquals("YVBSYSCSYSES", encodedText);
	}
}
