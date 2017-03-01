package com.github.jordane_quincy.M2_Cryptographie.cryptanalyse;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;

import org.junit.Test;

public class IndiceDeCoincidenceTest {

	@Test
	public void testGetIndiceDeCoincidence() {
		// fail("Not yet implemented");
		final String texteChiffre = "QODBS WWOFO LOFMW MSZFK HSEES FWCSK JOFST SSBEE SVSCP KGOGC CXHKQ AISGO G";
		final int longeurCle = 2;
		final float ic = IndiceDeCoincidence.getIndiceDeCoincidence(texteChiffre, longeurCle);
		// TODO: faire un vrai test !
	}

	@Test
	public void testGetLstSequence() {
		final String texte = "QODBSWWOFOLOFMWMSZFKHSEESFWCSKJOFSTSSBEESVSCPKGOGCCXHKQAISGOG";
		final int longeurCle = 2;
		final ArrayList<ArrayList<Character>> lstSequence = IndiceDeCoincidence.getLstSequence(texte, longeurCle);

		// longeurCle == 2 donc on a deux sequences
		assertNotNull(lstSequence);
		assertEquals(longeurCle, lstSequence.size());

		final String seq0 = "[Q, D, S, W, F, L, F, W, S, F, H, E, S, W, S, J, F, T, S, E, S, S, P, G, G, C, H, Q, I, G, G]";
		assertEquals(seq0, lstSequence.get(0).toString());
		final String seq1 = "[O, B, W, O, O, O, M, M, Z, K, S, E, F, C, K, O, S, S, B, E, V, C, K, O, C, X, K, A, S, O]";
		assertEquals(seq1, lstSequence.get(1).toString());

	}

}
