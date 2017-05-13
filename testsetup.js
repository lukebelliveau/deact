const jsdom = require('jsdom').jsdom;

global.document = jsdom('<!DOCTYPE html><div id="root"></div>');
global.window = document.defaultView;
window.console = global.console;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
