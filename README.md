# Ten Percent Butts

Provides butts. Provides a script to replace approximately 10% of the words in a selection with the word "butts." We do our best to respect sentence structure and capitalization.

## Javascript Library

Front-end:
    <script type="text/javascript" src="tenpb/tenpb.js"></script>
    <script type="text/javascript">
      var container = document.body;
      tenpb.initModule(container, { percent: 10 });
      // tenpb.detachModule(container);
    </script>

Node:
    var tenpb = require('./tenpb.js');
    var my_sentence = "We do our best to respect sentence structure and capitalization.";
    tenpb.initPlainText(my_sentence, { percent: 10 });

## Chrome Extension

https://chrome.google.com/webstore/detail/ten-percent-butts/kcejaippmcihfdohmlhdgadgjgpdkggl

Provides a toggle button with percent slider (0-100%) and option to run automatically on each page load. Try 1% and Run at startup! You'll forget the script is even running until butt get replaced unexpectedly.

## Shell Script

Requires Node.

    alias tenpb="node /path/to/tenpb/tenpb.sh.js"
    fortune | tenpb | cowsay
