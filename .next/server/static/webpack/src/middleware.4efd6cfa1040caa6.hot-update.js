"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/middleware.js":
/*!***************************!*\
  !*** ./src/middleware.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nasync function middleware(request) {\n    const url = request.nextUrl;\n    url.pathname = \"/profile\";\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(url);\n}\nconst config = {\n    matcher: \"/\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBRXBDLGVBQWVDLFdBQVdDLE9BQU87SUFDdEMsTUFBTUMsTUFBTUQsUUFBUUUsT0FBTztJQUMzQkQsSUFBSUUsUUFBUSxHQUFHO0lBQ2YsT0FBT0wscURBQVlBLENBQUNNLFFBQVEsQ0FBQ0g7QUFDL0I7QUFFTyxNQUFNSSxTQUFTO0lBQ3BCQyxTQUFTO0FBQ1gsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbWlkZGxld2FyZS5qcz9hNDlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxdWVzdCkge1xuICBjb25zdCB1cmwgPSByZXF1ZXN0Lm5leHRVcmxcbiAgdXJsLnBhdGhuYW1lID0gJy9wcm9maWxlJztcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdCh1cmwpO1xufVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBtYXRjaGVyOiAnLycsIC8vIFRoaXMgbWlkZGxld2FyZSB3aWxsIHJ1biBmb3IgdGhlIHJvb3QgVVJMIG9ubHlcbn07XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJ1cmwiLCJuZXh0VXJsIiwicGF0aG5hbWUiLCJyZWRpcmVjdCIsImNvbmZpZyIsIm1hdGNoZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.js\n");

/***/ })

});