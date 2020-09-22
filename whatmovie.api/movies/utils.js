function getQuerystringParam(event, parameter, defaultValue) {
  let value = null;
  if(
    event.hasOwnProperty('queryStringParameters') && 
    event.queryStringParameters.hasOwnProperty(parameter)
  ) {
    value = event.queryStringParameters[parameter];
  }
  
  if(event.hasOwnProperty(parameter)) {
    value = event[parameter];
  }

  if(!value) return defaultValue;

  if(typeof defaultValue === 'number') {
    try{
      return parseFloat(value);
    } catch(error) {
      return defaultValue;
    }
  }
  
  return value;
  
}

function hasValue(value) {
  if(typeof value === 'undefined' || value === null) {
    return false;
  }
  
  if(typeof value === 'string' && value === '') {
    return false;
  }
  
  return true;
}

function getUserId(event) {
  if(
    hasValue(event.requestContext) &&
    hasValue(event.requestContext.authorizer) &&
    hasValue(event.requestContext.authorizer.claims) &&
    hasValue(event.requestContext.authorizer.claims.sub)
  ) {
    return event.requestContext.authorizer.claims.sub;
  }
  return null;
}

module.exports = {
  hasValue: hasValue,
  getQuerystringParam: getQuerystringParam,
  getUserId: getUserId
}