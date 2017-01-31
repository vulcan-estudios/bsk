module.exports  = {

    // Convert an objecto to query string
    'toQueryString': function (parameters) {
        var queryString = _.reduce(parameters, function (components, value, key) {
            if(value !== undefined) {
                components.push( key + '=' + encodeURIComponent( value ) );
            }
            return components;
        },[]).join( '&' );
        if (queryString.length > 0) {
            queryString = '?' + queryString;
        }
        return queryString;
    }

};