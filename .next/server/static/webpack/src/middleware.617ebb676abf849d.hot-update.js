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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n/* harmony import */ var _providers_AuthProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/providers/AuthProvider */ \"(middleware)/./src/providers/AuthProvider.js\");\n\n\nasync function middleware(request) {\n    const url = request.nextUrl;\n    await _providers_AuthProvider__WEBPACK_IMPORTED_MODULE_1__.isLogged;\n    if (_providers_AuthProvider__WEBPACK_IMPORTED_MODULE_1__.isLogged) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(\"/profile\");\n    }\n}\nconst config = {\n    matcher: \"/signup\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyQztBQUNPO0FBQzNDLGVBQWVFLFdBQVdDLE9BQU87SUFDdEMsTUFBTUMsTUFBTUQsUUFBUUUsT0FBTztJQUMzQixNQUFNSiw2REFBUUE7SUFDZCxJQUFJQSw2REFBUUEsRUFBQztRQUNYLE9BQU9ELHFEQUFZQSxDQUFDTSxRQUFRLENBQUM7SUFDL0I7QUFDRjtBQUVPLE1BQU1DLFNBQVM7SUFDcEJDLFNBQVM7QUFDWCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9taWRkbGV3YXJlLmpzP2E0OWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHtpc0xvZ2dlZH0gZnJvbSAnQC9wcm92aWRlcnMvQXV0aFByb3ZpZGVyJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcXVlc3QpIHtcbiAgY29uc3QgdXJsID0gcmVxdWVzdC5uZXh0VXJsO1xuICBhd2FpdCBpc0xvZ2dlZDtcbiAgaWYgKGlzTG9nZ2VkKXtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KCcvcHJvZmlsZScpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIG1hdGNoZXI6ICcvc2lnbnVwJywgXG59O1xuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImlzTG9nZ2VkIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJ1cmwiLCJuZXh0VXJsIiwicmVkaXJlY3QiLCJjb25maWciLCJtYXRjaGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.js\n");

/***/ })

});