/**
 * PUSHSTATE
 *
 */

const pushstate = require('./pushstate/pushstate');
const backspace = require('./keypress/backspace');

module.exports = function() {

    $(backspace);

    $(pushstate);

};
