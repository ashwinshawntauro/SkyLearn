"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/signup/page",{

/***/ "(app-pages-browser)/./src/providers/AuthProvider.js":
/*!***************************************!*\
  !*** ./src/providers/AuthProvider.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthContext: function() { return /* binding */ AuthContext; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/firebase/auth */ \"(app-pages-browser)/./src/lib/firebase/auth.js\");\n/* __next_internal_client_entry_do_not_use__ AuthContext,default auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n// Create the context\nconst Context = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\n// AuthProvider component to wrap your app and provide auth state\nconst AuthProvider = (param)=>{\n    let { children } = param;\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isLogged, setIsLogged] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const unsubscribe = (0,_lib_firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(_lib_firebase_auth__WEBPACK_IMPORTED_MODULE_2__.auth, (user)=>{\n            if (user) {\n                // User is logged in\n                setUser(user);\n                setIsLogged(true);\n            } else {\n                // User is not logged in\n                setUser(null);\n                setIsLogged(false);\n            }\n        });\n        // Cleanup the listener on unmount\n        return ()=>unsubscribe();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Context.Provider, {\n        value: {\n            user,\n            isLogged\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\skylearn\\\\src\\\\providers\\\\AuthProvider.js\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, undefined);\n};\n_s(AuthProvider, \"rZnUarsKbGbZyRy5UqQ2xccZXUw=\");\n_c = AuthProvider;\n// Hook to use auth context in components\nconst AuthContext = ()=>{\n    _s1();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Context);\n};\n_s1(AuthContext, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\n_c1 = AuthContext;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthProvider);\nvar _c, _c1;\n$RefreshReg$(_c, \"AuthProvider\");\n$RefreshReg$(_c1, \"AuthContext\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9wcm92aWRlcnMvQXV0aFByb3ZpZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFdUU7QUFDUjtBQUUvRCxxQkFBcUI7QUFDckIsTUFBTU0sd0JBQVVMLG9EQUFhQSxDQUFDLENBRTlCO0FBRUEsaUVBQWlFO0FBQ2pFLE1BQU1NLGVBQWU7UUFBQyxFQUFFQyxRQUFRLEVBQUU7O0lBQ2hDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNRLFVBQVVDLFlBQVksR0FBR1QsK0NBQVFBLENBQUM7SUFFekNELGdEQUFTQSxDQUFDO1FBQ1IsTUFBTVcsY0FBY1Isc0VBQWtCQSxDQUFDRCxvREFBSUEsRUFBRSxDQUFDSztZQUM1QyxJQUFJQSxNQUFNO2dCQUNSLG9CQUFvQjtnQkFDcEJDLFFBQVFEO2dCQUNSRyxZQUFZO1lBQ2QsT0FBTztnQkFDTCx3QkFBd0I7Z0JBQ3hCRixRQUFRO2dCQUNSRSxZQUFZO1lBQ2Q7UUFDRjtRQUVBLGtDQUFrQztRQUNsQyxPQUFPLElBQU1DO0lBQ2YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNQLFFBQVFRLFFBQVE7UUFBQ0MsT0FBTztZQUFFTjtZQUFNRTtRQUFTO2tCQUN2Q0g7Ozs7OztBQUdQO0dBMUJNRDtLQUFBQTtBQTRCTix5Q0FBeUM7QUFDbEMsTUFBTVMsY0FBYzs7SUFBTWhCLE9BQUFBLGlEQUFVQSxDQUFDTTtBQUFPLEVBQUU7SUFBeENVO01BQUFBO0FBRWIsK0RBQWVULFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3Byb3ZpZGVycy9BdXRoUHJvdmlkZXIuanM/NDQyMyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCB7IHVzZUNvbnRleHQsIGNyZWF0ZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgYXV0aCwgb25BdXRoU3RhdGVDaGFuZ2VkIH0gZnJvbSBcIkAvbGliL2ZpcmViYXNlL2F1dGhcIjtcclxuXHJcbi8vIENyZWF0ZSB0aGUgY29udGV4dFxyXG5jb25zdCBDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7XHJcbiAgICBcclxufSk7XHJcblxyXG4vLyBBdXRoUHJvdmlkZXIgY29tcG9uZW50IHRvIHdyYXAgeW91ciBhcHAgYW5kIHByb3ZpZGUgYXV0aCBzdGF0ZVxyXG5jb25zdCBBdXRoUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2lzTG9nZ2VkLCBzZXRJc0xvZ2dlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IG9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoLCAodXNlcikgPT4ge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIC8vIFVzZXIgaXMgbG9nZ2VkIGluXHJcbiAgICAgICAgc2V0VXNlcih1c2VyKTtcclxuICAgICAgICBzZXRJc0xvZ2dlZCh0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBVc2VyIGlzIG5vdCBsb2dnZWQgaW5cclxuICAgICAgICBzZXRVc2VyKG51bGwpO1xyXG4gICAgICAgIHNldElzTG9nZ2VkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2xlYW51cCB0aGUgbGlzdGVuZXIgb24gdW5tb3VudFxyXG4gICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgaXNMb2dnZWQgfX0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gSG9vayB0byB1c2UgYXV0aCBjb250ZXh0IGluIGNvbXBvbmVudHNcclxuZXhwb3J0IGNvbnN0IEF1dGhDb250ZXh0ID0gKCkgPT4gdXNlQ29udGV4dChDb250ZXh0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dGhQcm92aWRlcjtcclxuIl0sIm5hbWVzIjpbInVzZUNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJhdXRoIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJpc0xvZ2dlZCIsInNldElzTG9nZ2VkIiwidW5zdWJzY3JpYmUiLCJQcm92aWRlciIsInZhbHVlIiwiQXV0aENvbnRleHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/providers/AuthProvider.js\n"));

/***/ })

});