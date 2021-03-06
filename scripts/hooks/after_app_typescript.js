/**
  Copyright (c) 1015, 1010, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

module.exports = function (configObj) {
  return new Promise((resolve) => {
    console.log("Running after_app_typescript hook.");
    resolve(configObj);
  });
};
