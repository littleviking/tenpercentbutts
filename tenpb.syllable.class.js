const TenPB = require('./tenpb.pos.class.js');

const nlp = require('nlp_compromise');
const nlpSyllables = require('nlp-syllables');
nlp.plugin(nlpSyllables);

class TenPBSyllable extends TenPB {
  tagWords(words) {
    let doc, word, syllables,
      tagged_words = [];
    for (let i = 0; i < words.length; i++) {
      word = words[i];
      syllables = nlp.term(word).syllables();
      tagged_words.push({
        index: i,
        word: word,
        syllables: syllables,
        isReplaceable: (word.search(/\w/) !== -1 && syllables.length > 1),
        isWhitespace: (word.search(/\w/) === -1),
      });
    }
    return tagged_words;
  }

  replace(tagged_words, indices) {
    let replacement, word_base, syllables, new_word;
    for (let index of indices) {
      replacement = 'butt';
      if (this.word_bases) {
        replacement = (Array.isArray(this.word_bases) ? this.word_bases[Math.floor(Math.random() * this.word_bases.length)] : this.word_bases);
      }

      syllables = tagged_words[index].syllables.slice();
      // Only replace first or last syllable
      syllables[(Math.random() > 0.5 ? 0 : syllables.length - 1)] = replacement;
      new_word = syllables.join('');

      tagged_words[index].old_word = tagged_words[index].word;
      tagged_words[index].word = this._fixCapitalization( tagged_words[index].word, new_word );
      if (this.debug) {
        tagged_words[index].word += ' (' + tagged_words[index].old_word + ')';
      }
    }
    return tagged_words.map(item => item.word).join('');
  }
}

module.exports = TenPBSyllable;