/**
 *
 * <h3>Sentence Case</h3>
 *  <div>
 *    <label>What is your favorite quote?</label>
 *    <input type="text" data-capitalize="sentences">
 *    <p class="sublabel">Sentence case will capitalize words after a period. Like this.</p>
 *  </div>
 *
 *  <h3>Word Case</h3>
 *  <div>
 *    <label>What is your favorite quote?</label>
 *    <input type="text" data-capitalize="words">
 *    <p class="sublabel">Word Case Will Capitalize Every Word. Like This.</p>
 *  </div>
 *
 *  <h3>Character Case</h3>
 *  <div>
 *    <label>What is your favorite quote?</label>
 *    <input type="text" data-capitalize="characters">
 *    <p class="sublabel">CHARACTER CASE IS LIKE ANGRY.</p>
 *  </div>
 *  http://stackoverflow.com/questions/2017456/with-jquery-how-do-i-capitalize-the-first-letter-of-a-text-field-while-the-user
 */

module.exports   = {

    /**
     * Init
     *
     * @param {string} element class or id to make as currency
     */
    init: function() {

        this.bind();

    },

    bind: function() {

        this.sentences($('[data-capitalize]').filter(function() {
            let type = $(this).attr('data-capitalize');
            return  type === '' || type === 'sentences';
        }));
        this.words($('[data-capitalize="words"]'));
        this.characters($('[data-capitalize="characters"]'));

    },

    sentences: function($inputs) {

        $inputs.on('keyup', function(event) {
            var box     = event.target;
            var txt     = $(this).val();
            var start   = box.selectionStart;
            var end     = box.selectionEnd;

            $(this).val(txt.replace(/^(.)|(\.+\s)(.)/g, function($word) {
                return $word.toUpperCase();
            }));

            box.setSelectionRange(start, end);
        });

    },

    words: function($inputs) {
        $inputs.on('keyup', function(event) {
            var box     = event.target;
            var txt     = $(this).val();
            var start   = box.selectionStart;
            var end     = box.selectionEnd;

            $(this).val(txt.toLowerCase().replace(/^(.)|(\s|\-)(.)/g, function(c) {
                return c.toUpperCase();
            }));

            box.setSelectionRange(start, end);
        });
    },

    characters: function($inputs) {
        $inputs.on('keyup', function(event) {
            var box = event.target;
            var txt = $(this).val();
            var start = box.selectionStart;
            var end = box.selectionEnd;

            $(this).val(txt.toUpperCase());

            box.setSelectionRange(start, end);
        });
    }

};

/*(function ($) {
    $.fn.extend({

    // With every keystroke capitalize first letter of ALL words in the text
    upperFirstAll: function() {
        $(this).keyup(function(event) {
            var box = event.target;
            var txt = $(this).val();
            var start = box.selectionStart;
            var end = box.selectionEnd;

            $(this).val(txt.toLowerCase().replace(/^(.)|(\s|\-)(.)/g,
            function(c) {
                return c.toUpperCase();
            }));
            box.setSelectionRange(start, end);
        });
        return this;
    },

    // With every keystroke capitalize first letter of the FIRST word in the text
    upperFirst: function() {
        $(this).keyup(function(event) {
            var box = event.target;
            var txt = $(this).val();
            var start = box.selectionStart;
            var end = box.selectionEnd;

            $(this).val(txt.toLowerCase().replace(/^(.)/g,
            function(c) {
                return c.toUpperCase();
            }));
            box.setSelectionRange(start, end);
        });
        return this;
    },

    // Converts with every keystroke the hole text to lowercase
    lowerCase: function() {
        $(this).keyup(function(event) {
            var box = event.target;
            var txt = $(this).val();
            var start = box.selectionStart;
            var end = box.selectionEnd;

            $(this).val(txt.toLowerCase());
            box.setSelectionRange(start, end);
        });
        return this;
    },

    // Converts with every keystroke the hole text to uppercase
    upperCase: function() {
        $(this).keyup(function(event) {
            var box = event.target;
            var txt = $(this).val();
            var start = box.selectionStart;
            var end = box.selectionEnd;

            $(this).val(txt.toUpperCase());
            box.setSelectionRange(start, end);
        });
        return this;
    }

    });
}(jQuery));*/