/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/generate-object-property";
exports.ids = ["vendor-chunks/generate-object-property"];
exports.modules = {

/***/ "(ssr)/./node_modules/generate-object-property/index.js":
/*!********************************************************!*\
  !*** ./node_modules/generate-object-property/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isProperty = __webpack_require__(/*! is-property */ \"(ssr)/./node_modules/is-property/is-property.js\")\n\nvar gen = function(obj, prop) {\n  return isProperty(prop) ? obj+'.'+prop : obj+'['+JSON.stringify(prop)+']'\n}\n\ngen.valid = isProperty\ngen.property = function (prop) {\n return isProperty(prop) ? prop : JSON.stringify(prop)\n}\n\nmodule.exports = gen\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2VuZXJhdGUtb2JqZWN0LXByb3BlcnR5L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQixtQkFBTyxDQUFDLG9FQUFhOztBQUV0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWxsby1uZWFyLy4vbm9kZV9tb2R1bGVzL2dlbmVyYXRlLW9iamVjdC1wcm9wZXJ0eS9pbmRleC5qcz85MjQwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpc1Byb3BlcnR5ID0gcmVxdWlyZSgnaXMtcHJvcGVydHknKVxuXG52YXIgZ2VuID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7XG4gIHJldHVybiBpc1Byb3BlcnR5KHByb3ApID8gb2JqKycuJytwcm9wIDogb2JqKydbJytKU09OLnN0cmluZ2lmeShwcm9wKSsnXSdcbn1cblxuZ2VuLnZhbGlkID0gaXNQcm9wZXJ0eVxuZ2VuLnByb3BlcnR5ID0gZnVuY3Rpb24gKHByb3ApIHtcbiByZXR1cm4gaXNQcm9wZXJ0eShwcm9wKSA/IHByb3AgOiBKU09OLnN0cmluZ2lmeShwcm9wKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdlblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/generate-object-property/index.js\n");

/***/ })

};
;