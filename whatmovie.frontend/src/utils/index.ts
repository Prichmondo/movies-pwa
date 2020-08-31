export function hasValue<T>(value: T): boolean {
  if(typeof value === 'string' && value === '') {
    return false;  
  }
  return value !== null && typeof value !== 'undefined';
}