function getQuerystringParam(event, parameter, defaultValue) {
  if(
    event.hasOwnProperty('queryStringParameters') && 
    event.queryStringParameters.hasOwnProperty(parameter)
  ) {
    return event.queryStringParameters[parameter];
  }
  
  if(event.hasOwnProperty(parameter)) {
    return event[parameter];
  }
  
  return defaultValue || null;
  
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