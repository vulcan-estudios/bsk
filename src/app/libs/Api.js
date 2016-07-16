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

const Config = require('../config/config');

// Support cors
$.support.cors = true;

module.exports = {

    lastError: {

    },

    get: function (endpoint) {

        return this._send(endpoint, 'GET');

    },

    post: function (endpoint, data) {

        return this._send(endpoint, 'POST', data);

    },

    put: function (endpoint, data) {

        return this._send(endpoint, 'PUT', data);

    },

    destroy: function (endpoint) {

       return this._send(endpoint, 'DELETE');

    },

    setError: function (endpoint, xhr, text) {

        let data = {
            'statusCode':   xhr.statusCode().status,
            'error':        text,
            'endpoint':     endpoint
        };

        let error = (!xhr.responseJSON) ? data : $.extend(data, xhr.responseJSON);
        if(error.error === 'error') {
            error.error  = 'Se ha producido un error en la comunicación con el servidor. Por favor intenta más tarde.';
        }

        this.lastError  = error;

        return this.lastError;

    },

    _send: function(endpoint, type, params) {

        var _this       = this;

        _this.lastError = {};

        //Url
        var url         = App.Filter.get(Config.SERVER.host, 'rtrim', '/') +'/'+ App.Filter.get(endpoint, 'trim', '/');
        var headers     = Config.SERVER.headers;

        // Config
        var prop        = {
            'url':          url,
            'async':        true,
            'dataType':     'json',
            'type':         type.toUpperCase(),
            'data':         (type === 'GET') ? undefined : params,
            beforeSend: function(req) {
                if(headers) {
                    let i;
                    for(i in headers) {
                        req.setRequestHeader(i, headers[i]);
                    }
                }
            }
        };

        //Request
        const request = $.ajax(prop);

        request.done(function () {

        }).fail(function (xhr, text) {

            // Set error
            _this.setError(endpoint, xhr, text);
        }).always(function () {

        });

        return request;

    }

};