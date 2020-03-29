import argparse, math, random, re, spacy, sys

def setNewWord(token, newWord):
   token._._newWord = newWord

spacy.tokens.Token.set_extension('isReplaceable', getter=lambda token: bool(re.search("\w", token.text)) and token.tag_ in word_list and len(word_list[token.tag_]) > 0)
spacy.tokens.Token.set_extension('isWhitespace', getter=lambda token: not re.search("\w", token.text))
spacy.tokens.Token.set_extension('_newWord', default=False)
spacy.tokens.Token.set_extension('newWord', getter=lambda token: token._._newWord if token._._newWord else token.text, setter=setNewWord)

word_list = {
    "JJ":   ['butty', 'buttish', 'butted', 'butting'],  # Adjective
    "JJR":  ['buttier'],  # Adjective, comparative
    "JJS":  ['buttiest'],  # Adjective, superlative
    "NN":   ['butt'],  # Noun, singular or mass
    "NNP":  ['Butt'],  # Proper noun, singular
    "NNPS": ['Butts'],  # Proper noun, plural
    "NNS":  ['butts'],  # Noun, plural
    "RB":   ['buttingly', 'buttedly', 'buttly'],  # Adverb
    "VB":   ['butt'],  # Verb, base form (I think)
    "VBD":  ['butted'],  # Verb, past tense (they thought)
    "VBG":  ['butting'],  # Verb, gerund or present participle (thinking is fun)
    "VBN":  ['butted'],  # Verb, past participle (a *sunken* ship)
    #  "CD":   ['butt'],  # Cardinal number (quantity: one, two, three)
    #  "EX":   ['butt'],  # Existential there ("there" as in there is, there are)
    #  "IN":   ['butt'],  # Preposition or subordinating conjunction (under, through, although, because)
    #  "PRP$": ["butt's"],  # Possessive pronoun (my, your, our)
    # "CC":   [],  # Coordinating conjunction (and, but, or)
    # "DT":   [],  # Determiner (the, a, these)
    # "FW":   [],  # Foreign word
    # "LS":   [],  # List item marker
    # "MD":   [],  # Verb, modal auxillary (may, should)
    # "PDT":  [],  # Predeterminer (*both* his children, a lot of)
    # "POS":  [],  # Possessive ending ('s)
    # "PRP":  [],  # Personal pronoun (me, you, it)
    # "RBR":  [],  # Adverb, comparative
    # "RBS":  [],  # Adverb, superlative
    # "RP":   [],  # Adverb, particle (about, off, up)
    # "SYM":  [],  # Symbol (%)
    # "TO":   [],  # Infinitival to (what *to* do, *to* the market)
    # "UH":   [],  # Interjection (oh, oops, gosh)
    # "VBP":  [],  # Verb, non-3rd person singular present (I think)
    # "VBZ":  [],  # Verb, 3rd person singular present (she thinks)
    # "WDT":  [],  # Wh-determiner (which, whatever, whichever)
    # "WP":   [],  # Wh-pronoun (what, who, whom)
    # "WP$":  [],  # Possessive wh-pronoun (whose, whosever)
    # "WRB":  []  # Wh-adverb (where, when)
}

# parse input
parser = argparse.ArgumentParser()
parser.add_argument("input", nargs='?')
parser.add_argument('infile', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
parser.add_argument("-p", "--percent", default=10)
parser.add_argument("-d", "--debug", action='store_true')
args = parser.parse_args()
if args.infile:
    args.input = args.infile.read()
    del(args.infile)

def _fix_capitalization(source, target):
    if source.islower():
        target = target.lower()
    elif len(source) > 1 and source.isupper():
        target = target.upper()
    elif source[0].isupper():
        target = target[0].upper() + target[1:]
    return target

def tenpb(input, word_list, percent=10, debug=False):
    # tag words
    nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
    doc = nlp(input)

    # select replacement indices
    word_count = len(list(filter(lambda item: not item._.isWhitespace, doc)))
    replaceable_words = list(filter(lambda item: item._.isReplaceable, doc))
    num_to_replace = min(len(replaceable_words), math.ceil(word_count * float(percent) / 100));
    replacement_indices = list(map(lambda item: item.i, random.sample(replaceable_words, num_to_replace)))

    # replace
    for index in replacement_indices:
        replacement = random.choice(word_list[doc[index].tag_])
        replacement = _fix_capitalization(doc[index].text, replacement)
        doc[index]._.newWord = replacement if not debug else "%s (%s %s)" % (replacement, doc[index].tag_, doc[index].text)

    return ''.join(list(map(lambda item: item._.newWord + item.whitespace_, doc)));

print(tenpb(args.input, word_list, args.percent, args.debug))