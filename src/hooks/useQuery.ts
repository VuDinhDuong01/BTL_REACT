import queryString from 'query-string';

export const queryStringSearch=()=>{
    return queryString.parse(location.search);
}