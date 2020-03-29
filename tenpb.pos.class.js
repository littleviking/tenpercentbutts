const POSTagger = require('./jspos-0.2.2/POSTagger');
const _und = require('underscore');

class TenPB {
  constructor(word_list, input_text, options) {
    this.word_list = word_list;
    this.input_text = input_text;
    this.percent = options.percent || 10;
    if (options.word_bases) { this.word_bases = options.word_bases; }
    if (options.debug) { this.debug = options.debug; }
  }

  parseInput(input_text) {
    return input_text.toString().match(/[\w']+|\s+|[^\w\s]+/g);
  }

  tagWords(words) {
    let word, pos,
      tagged_words = [];
    const pos_tagged = new POSTagger().tag(words);
    for (let i = 0; i < pos_tagged.length; i++) {
      [ word, pos ] = pos_tagged[i];
      tagged_words.push({
        index: i,
        word: word,
        pos: pos,
        isReplaceable: (word.search(/\w/) !== -1 && this.word_list.hasOwnProperty(pos) && this.word_list[pos].length > 0),
        isWhitespace: (word.search(/\w/) === -1),
      });
    }
    return tagged_words;
  }

  selectReplacementIndices(tagged_words) {
    const word_count = tagged_words.filter(item => !item.isWhitespace).length;
    const num_to_replace = Math.ceil(word_count * this.percent / 100);
    const replaceable_words = tagged_words.filter(item => item.isReplaceable);
    return _und.sample(replaceable_words, num_to_replace).map(item => item.index);
  }

  replace(tagged_words, indices) {
    let replacements, replacement, word_base;
    for (let index of indices) {
      replacements = this.word_list[tagged_words[index].pos];
      replacement = replacements[ Math.floor( Math.random() * replacements.length ) ];

      if (this.word_bases) {
        word_base = (Array.isArray(this.word_bases) ? this.word_bases[Math.floor(Math.random() * this.word_bases.length)] : this.word_bases);
        replacement = replacement.replace(/butt/gi, word_base);
      }

      tagged_words[index].old_word = tagged_words[index].word;
      tagged_words[index].word = this._fixCapitalization( tagged_words[index].word, replacement );
      if (this.debug) {
        tagged_words[index].word += ' (' + tagged_words[index].pos + ' ' + tagged_words[index].old_word + ')';
      }
    }
    return tagged_words.map(item => item.word).join('');
  }

  output(new_text) {
    return new_text;
  }

  _fixCapitalization(source, target) {
  if (source.toLowerCase() === source) {
    // All lower case.
    target = target.toLowerCase();
  }
  else if (source.length > 1 && (source.toUpperCase() === source)) {
    // All caps.
    target = target.toUpperCase();
  }
  else if (source[0].toUpperCase() === source[0]) {
    // First letter capitalized.
    target = target[0].toUpperCase() + target.slice(1).toLowerCase();
  }
  // If none of the above cases matched, return original target.
  return target;
};

  execute() {
    let parsed_input = this.parseInput(this.input_text);
    let tagged_words = this.tagWords(parsed_input);
    let replacement_indices = this.selectReplacementIndices(tagged_words);
    let new_text = this.replace(tagged_words, replacement_indices);
    return this.output(new_text);
  }
}

module.exports = TenPB;