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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n/* harmony import */ var _providers_AuthProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/providers/AuthProvider */ \"(middleware)/./src/providers/AuthProvider.js\");\n\n\nasync function middleware(request) {\n    const url = request.nextUrl;\n    if (_providers_AuthProvider__WEBPACK_IMPORTED_MODULE_1__.isLogged) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL(\"/profile\"));\n    }\n}\nconst config = {\n    matcher: \"/signup\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyQztBQUNPO0FBQzNDLGVBQWVFLFdBQVdDLE9BQU87SUFDdEMsTUFBTUMsTUFBTUQsUUFBUUUsT0FBTztJQUUzQixJQUFJSiw2REFBUUEsRUFBQztRQUNYLE9BQU9ELHFEQUFZQSxDQUFDTSxRQUFRLENBQUMsSUFBSUMsSUFBSTtJQUN2QztBQUNGO0FBRU8sTUFBTUMsU0FBUztJQUNwQkMsU0FBUztBQUNYLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL21pZGRsZXdhcmUuanM/YTQ5YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQge2lzTG9nZ2VkfSBmcm9tICdAL3Byb3ZpZGVycy9BdXRoUHJvdmlkZXInO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxdWVzdCkge1xuICBjb25zdCB1cmwgPSByZXF1ZXN0Lm5leHRVcmw7XG5cbiAgaWYgKGlzTG9nZ2VkKXtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoJy9wcm9maWxlJykpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgbWF0Y2hlcjogJy9zaWdudXAnLCBcbn07XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiaXNMb2dnZWQiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsInVybCIsIm5leHRVcmwiLCJyZWRpcmVjdCIsIlVSTCIsImNvbmZpZyIsIm1hdGNoZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.js\n");

/***/ })

});