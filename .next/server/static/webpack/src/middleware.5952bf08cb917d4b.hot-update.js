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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n/* harmony import */ var _providers_AuthProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/providers/AuthProvider */ \"(middleware)/./src/providers/AuthProvider.js\");\n\n\nasync function middleware(request) {\n    const url = request.nextUrl;\n    if (url === \"/signup\" && _providers_AuthProvider__WEBPACK_IMPORTED_MODULE_1__.isLogged) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/profile\", request.url));\n    }\n}\nconst config = {\n    matcher: \"/signup\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyQztBQUNPO0FBQzNDLGVBQWVFLFdBQVdDLE9BQU87SUFDdEMsTUFBTUMsTUFBTUQsUUFBUUUsT0FBTztJQUUzQixJQUFJRCxRQUFRLGFBQWFILDZEQUFRQSxFQUFDO1FBQ2hDLE9BQU9ELHFEQUFZQSxDQUFDTSxRQUFRLENBQUMsSUFBSUMsSUFBSSxZQUFXSixRQUFRQyxHQUFHO0lBQzdEO0FBQ0Y7QUFFTyxNQUFNSSxTQUFTO0lBQ3BCQyxTQUFTO0FBQ1gsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvbWlkZGxld2FyZS5qcz9hNDlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7aXNMb2dnZWR9IGZyb20gJ0AvcHJvdmlkZXJzL0F1dGhQcm92aWRlcic7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWlkZGxld2FyZShyZXF1ZXN0KSB7XG4gIGNvbnN0IHVybCA9IHJlcXVlc3QubmV4dFVybDtcblxuICBpZiAodXJsID09PSAnL3NpZ251cCcgJiYgaXNMb2dnZWQpe1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL3Byb2ZpbGUnLHJlcXVlc3QudXJsKSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBtYXRjaGVyOiAnL3NpZ251cCcsIC8vIFRoaXMgbWlkZGxld2FyZSB3aWxsIHJ1biBmb3IgdGhlIHJvb3QgVVJMIG9ubHlcbn07XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiaXNMb2dnZWQiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsInVybCIsIm5leHRVcmwiLCJyZWRpcmVjdCIsIlVSTCIsImNvbmZpZyIsIm1hdGNoZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.js\n");

/***/ })

});