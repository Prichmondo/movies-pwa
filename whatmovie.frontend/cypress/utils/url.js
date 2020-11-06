const baseUrl = 'http://localhost:9000';

export default function url(pathName) {
 return `${baseUrl}${pathName}`;
}