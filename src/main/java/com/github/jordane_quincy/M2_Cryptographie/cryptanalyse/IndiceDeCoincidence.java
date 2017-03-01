package com.github.jordane_quincy.M2_Cryptographie.cryptanalyse;

import java.util.ArrayList;
import java.util.Map.Entry;

import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

public class IndiceDeCoincidence {

	public static float getIndiceDeCoincidence(String texteChiffre, int longeurCle) {
		final float ic = 0f;
		final String texte = Util.removeAllNonAlphabeticalCharacters(texteChiffre);

		final ArrayList<ArrayList<Character>> lstSequence = getLstSequence(texte, longeurCle);

		for (final ArrayList<Character> sequence : lstSequence) {
			System.out.println(sequence);
			final String sequenceString = Util.convertCharacterListToString(sequence);
			System.out.println("sequenceString : " + sequenceString);
			final Entry<Character, Integer> entryMaxOccurence = Util.getLetterWithMaxOccurence(sequenceString);
			System.out.println("entryMaxOccurence :" + entryMaxOccurence);
		}

		return ic;
	}

	protected static ArrayList<ArrayList<Character>> getLstSequence(String texte, int longeurCle) {
		// on sait qu'on va avoir autant de sequence que la longeur de la cle
		final ArrayList<ArrayList<Character>> lstSequence = new ArrayList<>(longeurCle);

		for (int i = 0; i < texte.length(); i++) {
			final char lettre = texte.charAt(i);
			final int idxCle = i % longeurCle;
			// System.out.println("lettre : " + lettre + ", idxCle : " +
			// idxCle);

			final ArrayList<Character> sequence = getSequence(lstSequence, idxCle);

			sequence.add(lettre);
		}

		return lstSequence;
	}

	private static ArrayList<Character> getSequence(ArrayList<ArrayList<Character>> lstSequence, int idxSequence) {
		ArrayList<Character> sequence = null;
		try {
			sequence = lstSequence.get(idxSequence);
		} catch (final IndexOutOfBoundsException e) {
			// TODO : chaque sequence contient seulement une partie du texte,
			// au maximum :
			// (texte.length() / longeurCle ) + reste
			sequence = new ArrayList<>();

			lstSequence.add(sequence);
		}

		return sequence;
	}
}
