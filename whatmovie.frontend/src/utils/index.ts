export function hasValue<T>(value: T): boolean {
  if(typeof value === 'string' && value === '') {
    return false;  
  }
  return value !== null && typeof value !== 'undefined';
}

export function getQuerystringParams<T>(querystring: string): T | null {
  
  if(!hasValue(querystring)) {
    return null;  
  }

  if(querystring.indexOf('?') === 0) {
    querystring = querystring.replace('?', '');
  }

  const querystringParts = querystring.split('&');
  const response = {} as any;
  querystringParts.forEach(param => {
    const paramParts = param.split('=');
    if(paramParts.length === 2) {
      response[paramParts[0]] = paramParts[1];
    }
  })

  return response;
}