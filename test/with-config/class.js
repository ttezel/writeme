/*
Testing code for writeme
 */

/**
 * Class description
 * 
 * @param {string} foo      foo description
 * @param {string} bar      bar description
 */
function Class (foo, bar) {

}

/**
 * publicMethod description
 * 
 * @param  {string} baz     baz description
 * @return {boolean}        bool description
 */
Class.prototype.publicMethod = function (baz) {
    return true
}
/**
 * privateMethod description
 * 
 * @param  {string} baz     baz description
 * @return {boolean}        bool description
 * @api private
 */
Class.prototype.publicMethod = function (baz) {
    return true
}

