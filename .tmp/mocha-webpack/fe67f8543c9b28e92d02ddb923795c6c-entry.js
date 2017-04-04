
    // This gets replaced by webpack with the updated files on rebuild
    var __webpackManifest__ = [];

    var testsContext = require.context("../../test", false);

    function inManifest(path) {
      return __webpackManifest__.indexOf(path) >= 0;
    }

    var runnable = testsContext.keys().filter(inManifest);

    runnable.forEach(testsContext);
    