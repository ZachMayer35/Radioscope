
// fetch() polyfill for making API calls.
import 'whatwg-fetch';

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
import objectAssign from 'object-assign';
Object.assign = objectAssign;
