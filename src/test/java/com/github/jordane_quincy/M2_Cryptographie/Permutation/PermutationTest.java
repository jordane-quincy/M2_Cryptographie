package com.github.jordane_quincy.M2_Cryptographie.Permutation;

import org.junit.Test;

import com.github.jordane_quincy.M2_Cryptographie.Switch.Permutation;
import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

import junit.framework.Assert;

public class PermutationTest {

	@Test
	public void test_encode_sansChiffreCaracteresSpeciaux() {
		final String sourceText = "Texte en francais";

		final String oldAlphabet = Util.convertCharacterListToString(Util.ALPHABET_FR_FULL); // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		// +
		// "abcdefghijklmnopqrstuvwxyz";
		final String newAlphabet = "RGECVJUASPOIMBWDTZXFHYKLNQ" + "rgecvjuaspoimbwdtzxfhyklnq";

		final String encodedText = Permutation.decode(sourceText, oldAlphabet, newAlphabet);

		Assert.assertEquals("Fvlfvvbjzrbersx", encodedText);
	}

	@Test
	public void testCM1_slide10_decode() {
		final String sourceText = "YVBSYSCSYSES";

		final String oldAlphabet = "RGECVJUASPOIMBWDTZXFHYKLNQ" + "rgecvjuaspoimbwdtzxfhyklnq";
		final String newAlphabet = Util.convertCharacterListToString(Util.ALPHABET_FR_FULL);

		final String encodedText = Permutation.decode(sourceText, oldAlphabet, newAlphabet);

		Assert.assertEquals("VENIVIDIVICI", encodedText);
	}

	@Test
	public void testCM1_slide10_encode() {
		final String sourceText = "Veni, Vidi, Vici";

		final String oldAlphabet = Util.convertCharacterListToString(Util.ALPHABET_FR_FULL);

		final String newAlphabet = "RGECVJUASPOIMBWDTZXFHYKLNQ" + "rgecvjuaspoimbwdtzxfhyklnq";

		final String encodedText = Permutation.encode(sourceText, oldAlphabet, newAlphabet);

		Assert.assertEquals("YvbsYscsYses", encodedText);
	}
}
