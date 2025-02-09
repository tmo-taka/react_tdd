import '@testing-library/jest-dom';

const { TextEncoder, TextDecoder } = require('node:util');
declare global {
  // biome-ignore lint/suspicious/noRedeclare: <explanation>
  var TextEncoder: typeof TextEncoder;
  // biome-ignore lint/suspicious/noRedeclare: <explanation>
  var TextDecoder: typeof TextDecoder;
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// import '@testing-library/jest-dom/extend-expect';
