/**
* Returns the options correctly formatted as query parameters
* @param { Object } options - The options to be included as query parameters
* @param { number } options.limit - The limit of returned elements
* @param { number } options.offset - The offset for the returned elements (intended for pagination)
* @param { Object } options.search - The search object
* @param { string } options.search.pattern - The pattern to search in the database
* @param { string[] } options.search.columns - The columns in which to search the patterns
* @param { Object } options.orderby - The Order By object
* @param { string } options.orderby.column - The column for which to order the data
* @param { string } options.orderby.direction - Either 'ASC' or 'DESC'
*
*/
function addQueryParameters( options ) {
    let newURL = '?';
    if ( options.limit ) {
        newURL += 'limit=' + options.limit;
    } else {
        newURL += 'limit=25';
    }
            
    if ( options.offset ) {
        newURL += '&offset=' + options.offset;
    } else {
        newURL += '&offset=0';
    }
            
    newURL += '&q={'

    // If there is search, a comma will be needed for the orderby section
    let trailingComma = false;

    if ( options.search ) {
        const pattern = options.search.pattern;
        const columns = options.search.columns;
        if ( columns.length > 0 ) {
            newURL += '"$or":['
            for ( let i = 0; i < columns.length; i++ ) {
                if ( i != 0 ) {
                    newURL += ',';
                }
                newURL += `{"${ columns[ i ].toUpperCase() }":{"$instr":"${ pattern }"}}`;
            }
            newURL += ']}'
            trailingComma = true;
        }
    }

    if ( options.orderby ) {
        if ( trailingComma ) {
            newURL += ','
        }
        newURL += `"$orderby":{"${ options.orderby.column.toUpperCase() }":"${ options.orderby.direction.toUpperCase() }"}`;
    }

    newURL += '}'
    return newURL;
}