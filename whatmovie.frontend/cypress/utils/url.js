const BASE_URL = 'http://localhost:9000';

export default function url(pathName) {
 return `${BASE_URL}${pathName}`;
}