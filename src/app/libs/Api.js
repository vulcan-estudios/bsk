/**
 * API Connection
 *
 * host: see config/connections.js
 *
 * GET:
 *
 * Api.get('endpoint).done(function(rs) {
 *
 * }).fail(function() {
 *
 * }).always(function() {
 *
 * });
 *
 *
 * POST:
 *
 * Api.post('endpoint', { data }).done(function(rs) {
 *
 * }).fail(function() {
 *
 * }).always(function() {
 *
 * });
 *
 */

const config = require('../config/config');

module.exports = {


    get: function (endpoint) {

        var _this   = this;
        var ajax    = _this._send(endpoint, 'GET');
        ajax.fail(function (xhr, text) {

            //TODO
            _this.error(endpoint, xhr, text);
        });
        return ajax;

    },

    post: function (endpoint, data) {

        var _this   = this;
        var ajax    = _this._send(endpoint, 'POST', data);
        ajax.fail(function (xhr, text) {

            //TODO
            _this.error(endpoint, xhr, text);
        });
        return ajax;

    },

    update: function (endpoint, data) {

        var _this   = this;
        var ajax    = _this._send(endpoint, 'POST', data);
        ajax.fail(function (xhr, text) {

            //TODO
            _this.error(endpoint, xhr, text);
        });
        return ajax;

    },

    destroy: function (endpoint) {

        var _this   = this;
        var ajax    = _this._send(endpoint, 'DELETE');
        ajax.fail(function (xhr, text) {

            //TODO
            _this.error(endpoint, xhr, text);
        });
        return ajax;

    },

    error: function (endpoint, xhr, text) {
        var error = {
            'statusCode':   xhr.statusCode().status,
            'error':        text,
            'endpoint':     endpoint
        };
        return $.parseJSON(JSON.stringify(error));
    },

    _send: function(endpoint, type, params) {

        //Url
        var url         = App.Filter.get(config.SERVER.host, 'rtrim', '/') +'/'+ App.Filter.get(endpoint, 'trim', '/');
        var headers     = config.SERVER.headers;

        //Check type
        return $.ajax({
            url:        url,
            async:      true,
            dataType:   'json',
            type:       type,
            data:       (type === 'GET') ? undefined : params,
            beforeSend: function(req) {
                if(headers) {
                    for(i in headers) {
                        req.setRequestHeader(i, headers[i]);
                    }
                }
            }
        });

    }

};