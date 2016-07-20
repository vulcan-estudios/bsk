/**
 * PUSHSTATE
 *
 */

const pushstate = require('./pushstate/pushstate');
const backspace = require('./keypress/backspace');
const switcher  = require('./checkbox/switch');
const upload    = require('./upload/image');

module.exports = function() {

    $(backspace);

    $(pushstate);

    $(switcher);

    $(upload);

};
