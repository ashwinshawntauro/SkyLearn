"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/courses/[courseId]/livestream/page",{

/***/ "(app-pages-browser)/./src/app/courses/[courseId]/livestream/page.js":
/*!*******************************************************!*\
  !*** ./src/app/courses/[courseId]/livestream/page.js ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./src/components/ui/button.jsx\");\n/* harmony import */ var _components_ui_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/textarea */ \"(app-pages-browser)/./src/components/ui/textarea.jsx\");\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./src/components/ui/card.jsx\");\n/* harmony import */ var _components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/tabs */ \"(app-pages-browser)/./src/components/ui/tabs.jsx\");\n/* harmony import */ var _components_ui_navbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/ui/navbar */ \"(app-pages-browser)/./src/components/ui/navbar.jsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction Page() {\n    _s();\n    const myVideoRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        navigator.mediaDevices.getUserMedia({\n            video: true\n        }).then((stream)=>{\n            if (myVideoRef.current) {\n                myVideoRef.current.srcObject = stream;\n            }\n        }).catch((err)=>{\n            console.error(\"Error accessing media devices.\", err);\n        });\n    }, []);\n    const handleSendMessage = ()=>{\n        if (input.trim() !== \"\") {\n            setMessages((prev)=>[\n                    ...prev,\n                    input\n                ]);\n            setInput(\"\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid custom-grid justify-center p-12\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                        className: \"w-full h-full p-5 rounded round-5\" // Full width of the grid\n                        ,\n                        playsInline: true,\n                        ref: myVideoRef,\n                        autoPlay: true,\n                        muted: true\n                    }, void 0, false, {\n                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                        lineNumber: 46,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-4\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.Card, {\n                            className: \"w-[350px] h-[650px] flex flex-col\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardHeader, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardTitle, {\n                                            children: \"Live Chat\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                            lineNumber: 56,\n                                            columnNumber: 15\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardDescription, {\n                                            children: \"Engage with your viewers in real-time.\"\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                            lineNumber: 57,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                    lineNumber: 55,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardContent, {\n                                    className: \"flex-1 overflow-y-auto\",\n                                    children: messages.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"text-center text-gray-500\",\n                                        children: \"No messages yet. Be the first to chat!\"\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                        lineNumber: 63,\n                                        columnNumber: 17\n                                    }, this) : messages.map((msg, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"p-2 mb-2 bg-gray-100 rounded-md text-sm\",\n                                            children: msg\n                                        }, index, false, {\n                                            fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                            lineNumber: 68,\n                                            columnNumber: 19\n                                        }, this))\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                    lineNumber: 61,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardFooter, {\n                                    className: \"mt-auto\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"grid w-full gap-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_textarea__WEBPACK_IMPORTED_MODULE_3__.Textarea, {\n                                                placeholder: \"Type your message here.\",\n                                                value: input,\n                                                onChange: (e)=>setInput(e.target.value)\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                                lineNumber: 79,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                                                onClick: handleSendMessage,\n                                                children: \"Send message\"\n                                            }, void 0, false, {\n                                                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                                lineNumber: 84,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                        lineNumber: 78,\n                                        columnNumber: 15\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                    lineNumber: 77,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                            lineNumber: 54,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.Tabs, {\n                defaultValue: \"agenda\",\n                className: \"w-full\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsList, {\n                        className: \"grid w-full grid-cols-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsTrigger, {\n                                value: \"announcement\",\n                                children: \"Announcement\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                lineNumber: 92,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsTrigger, {\n                                value: \"agenda\",\n                                children: \"Agenda\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                lineNumber: 93,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsTrigger, {\n                                value: \"notes\",\n                                children: \"Notes\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                lineNumber: 94,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsTrigger, {\n                                value: \"doubt\",\n                                children: \"Raise a Doubt\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                                lineNumber: 95,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                        lineNumber: 91,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsContent, {\n                        value: \"announcement\",\n                        children: \"No Announcements from tutor yet!\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                        lineNumber: 97,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsContent, {\n                        value: \"agenda\",\n                        children: \"Live stream agenda will be displayed here.\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                        lineNumber: 100,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsContent, {\n                        value: \"notes\",\n                        children: \"Take down notes\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                        lineNumber: 103,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_5__.TabsContent, {\n                        value: \"doubt\",\n                        children: \"Ask a question from tutor\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                        lineNumber: 106,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n                lineNumber: 90,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\skylearn\\\\src\\\\app\\\\courses\\\\[courseId]\\\\livestream\\\\page.js\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, this);\n}\n_s(Page, \"e/+FwpbpG9TreWMnOp1B/nOe3yM=\");\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY291cnNlcy9bY291cnNlSWRdL2xpdmVzdHJlYW0vcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNvRDtBQUNKO0FBQ0k7QUFRdEI7QUFDa0Q7QUFDcEM7QUFFN0IsU0FBU2dCOztJQUN0QixNQUFNQyxhQUFhaEIsNkNBQU1BO0lBQ3pCLE1BQU0sQ0FBQ2lCLFVBQVVDLFlBQVksR0FBR2pCLCtDQUFRQSxDQUFDLEVBQUU7SUFDM0MsTUFBTSxDQUFDa0IsT0FBT0MsU0FBUyxHQUFHbkIsK0NBQVFBLENBQUM7SUFFbkNGLGdEQUFTQSxDQUFDO1FBQ1JzQixVQUFVQyxZQUFZLENBQ25CQyxZQUFZLENBQUM7WUFDWkMsT0FBTztRQUNULEdBQ0NDLElBQUksQ0FBQyxDQUFDQztZQUNMLElBQUlWLFdBQVdXLE9BQU8sRUFBRTtnQkFDdEJYLFdBQVdXLE9BQU8sQ0FBQ0MsU0FBUyxHQUFHRjtZQUNqQztRQUNGLEdBQ0NHLEtBQUssQ0FBQyxDQUFDQztZQUNOQyxRQUFRQyxLQUFLLENBQUMsa0NBQWtDRjtRQUNsRDtJQUNKLEdBQUcsRUFBRTtJQUVMLE1BQU1HLG9CQUFvQjtRQUN4QixJQUFJZCxNQUFNZSxJQUFJLE9BQU8sSUFBSTtZQUN2QmhCLFlBQVksQ0FBQ2lCLE9BQVM7dUJBQUlBO29CQUFNaEI7aUJBQU07WUFDdENDLFNBQVM7UUFDWDtJQUNGO0lBRUEscUJBQ0UsOERBQUNnQjs7MEJBQ0MsOERBQUNBO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ2I7d0JBQ0NhLFdBQVUsb0NBQW9DLHlCQUF5Qjs7d0JBQ3ZFQyxXQUFXO3dCQUNYQyxLQUFLdkI7d0JBQ0x3QixRQUFRO3dCQUNSQyxLQUFLOzs7Ozs7a0NBRVAsOERBQUNMO3dCQUFJQyxXQUFVO2tDQUNiLDRFQUFDakMscURBQUlBOzRCQUFDaUMsV0FBVTs7OENBQ2QsOERBQUM3QiwyREFBVUE7O3NEQUNULDhEQUFDQywwREFBU0E7c0RBQUM7Ozs7OztzREFDWCw4REFBQ0gsZ0VBQWVBO3NEQUFDOzs7Ozs7Ozs7Ozs7OENBSW5CLDhEQUFDRCw0REFBV0E7b0NBQUNnQyxXQUFVOzhDQUNwQnBCLFNBQVN5QixNQUFNLEtBQUssa0JBQ25CLDhEQUFDTjt3Q0FBSUMsV0FBVTtrREFBNEI7Ozs7OytDQUkzQ3BCLFNBQVMwQixHQUFHLENBQUMsQ0FBQ0MsS0FBS0Msc0JBQ2pCLDhEQUFDVDs0Q0FFQ0MsV0FBVTtzREFFVE87MkNBSElDOzs7Ozs7Ozs7OzhDQVFiLDhEQUFDdEMsMkRBQVVBO29DQUFDOEIsV0FBVTs4Q0FDcEIsNEVBQUNEO3dDQUFJQyxXQUFVOzswREFDYiw4REFBQ2xDLDZEQUFRQTtnREFDUDJDLGFBQVk7Z0RBQ1pDLE9BQU81QjtnREFDUDZCLFVBQVUsQ0FBQ0MsSUFBTTdCLFNBQVM2QixFQUFFQyxNQUFNLENBQUNILEtBQUs7Ozs7OzswREFFMUMsOERBQUM3Qyx5REFBTUE7Z0RBQUNpRCxTQUFTbEI7MERBQW1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQU05Qyw4REFBQ3ZCLHFEQUFJQTtnQkFBQzBDLGNBQWE7Z0JBQVNmLFdBQVU7O2tDQUNwQyw4REFBQ3pCLHlEQUFRQTt3QkFBQ3lCLFdBQVU7OzBDQUNsQiw4REFBQ3hCLDREQUFXQTtnQ0FBQ2tDLE9BQU07MENBQWU7Ozs7OzswQ0FDbEMsOERBQUNsQyw0REFBV0E7Z0NBQUNrQyxPQUFNOzBDQUFTOzs7Ozs7MENBQzVCLDhEQUFDbEMsNERBQVdBO2dDQUFDa0MsT0FBTTswQ0FBUTs7Ozs7OzBDQUMzQiw4REFBQ2xDLDREQUFXQTtnQ0FBQ2tDLE9BQU07MENBQVE7Ozs7Ozs7Ozs7OztrQ0FFN0IsOERBQUNwQyw0REFBV0E7d0JBQUNvQyxPQUFNO2tDQUFlOzs7Ozs7a0NBR2xDLDhEQUFDcEMsNERBQVdBO3dCQUFDb0MsT0FBTTtrQ0FBUzs7Ozs7O2tDQUc1Qiw4REFBQ3BDLDREQUFXQTt3QkFBQ29DLE9BQU07a0NBQVE7Ozs7OztrQ0FHM0IsOERBQUNwQyw0REFBV0E7d0JBQUNvQyxPQUFNO2tDQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNbkM7R0FoR3dCaEM7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jb3Vyc2VzL1tjb3Vyc2VJZF0vbGl2ZXN0cmVhbS9wYWdlLmpzPzlhOWIiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvdGV4dGFyZWFcIjtcclxuaW1wb3J0IHtcclxuICBDYXJkLFxyXG4gIENhcmRDb250ZW50LFxyXG4gIENhcmREZXNjcmlwdGlvbixcclxuICBDYXJkRm9vdGVyLFxyXG4gIENhcmRIZWFkZXIsXHJcbiAgQ2FyZFRpdGxlLFxyXG59IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvY2FyZFwiO1xyXG5pbXBvcnQgeyBUYWJzLCBUYWJzQ29udGVudCwgVGFic0xpc3QsIFRhYnNUcmlnZ2VyIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS90YWJzXCI7XHJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIkAvY29tcG9uZW50cy91aS9uYXZiYXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UoKSB7XHJcbiAgY29uc3QgbXlWaWRlb1JlZiA9IHVzZVJlZigpO1xyXG4gIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtpbnB1dCwgc2V0SW5wdXRdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXHJcbiAgICAgIC5nZXRVc2VyTWVkaWEoe1xyXG4gICAgICAgIHZpZGVvOiB0cnVlLFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoc3RyZWFtKSA9PiB7XHJcbiAgICAgICAgaWYgKG15VmlkZW9SZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgbXlWaWRlb1JlZi5jdXJyZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFjY2Vzc2luZyBtZWRpYSBkZXZpY2VzLlwiLCBlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbmRNZXNzYWdlID0gKCkgPT4ge1xyXG4gICAgaWYgKGlucHV0LnRyaW0oKSAhPT0gXCJcIikge1xyXG4gICAgICBzZXRNZXNzYWdlcygocHJldikgPT4gWy4uLnByZXYsIGlucHV0XSk7XHJcbiAgICAgIHNldElucHV0KFwiXCIpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgY3VzdG9tLWdyaWQganVzdGlmeS1jZW50ZXIgcC0xMlwiPlxyXG4gICAgICAgIDx2aWRlb1xyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBwLTUgcm91bmRlZCByb3VuZC01XCIgLy8gRnVsbCB3aWR0aCBvZiB0aGUgZ3JpZFxyXG4gICAgICAgICAgcGxheXNJbmxpbmVcclxuICAgICAgICAgIHJlZj17bXlWaWRlb1JlZn1cclxuICAgICAgICAgIGF1dG9QbGF5XHJcbiAgICAgICAgICBtdXRlZFxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00XCI+XHJcbiAgICAgICAgICA8Q2FyZCBjbGFzc05hbWU9XCJ3LVszNTBweF0gaC1bNjUwcHhdIGZsZXggZmxleC1jb2xcIj5cclxuICAgICAgICAgICAgPENhcmRIZWFkZXI+XHJcbiAgICAgICAgICAgICAgPENhcmRUaXRsZT5MaXZlIENoYXQ8L0NhcmRUaXRsZT5cclxuICAgICAgICAgICAgICA8Q2FyZERlc2NyaXB0aW9uPlxyXG4gICAgICAgICAgICAgICAgRW5nYWdlIHdpdGggeW91ciB2aWV3ZXJzIGluIHJlYWwtdGltZS5cclxuICAgICAgICAgICAgICA8L0NhcmREZXNjcmlwdGlvbj5cclxuICAgICAgICAgICAgPC9DYXJkSGVhZGVyPlxyXG4gICAgICAgICAgICA8Q2FyZENvbnRlbnQgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0b1wiPlxyXG4gICAgICAgICAgICAgIHttZXNzYWdlcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtZ3JheS01MDBcIj5cclxuICAgICAgICAgICAgICAgICAgTm8gbWVzc2FnZXMgeWV0LiBCZSB0aGUgZmlyc3QgdG8gY2hhdCFcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5tYXAoKG1zZywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIG1iLTIgYmctZ3JheS0xMDAgcm91bmRlZC1tZCB0ZXh0LXNtXCJcclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHttc2d9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L0NhcmRDb250ZW50PlxyXG4gICAgICAgICAgICA8Q2FyZEZvb3RlciBjbGFzc05hbWU9XCJtdC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIHctZnVsbCBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgICAgPFRleHRhcmVhXHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB5b3VyIG1lc3NhZ2UgaGVyZS5cIlxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXR9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SW5wdXQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17aGFuZGxlU2VuZE1lc3NhZ2V9PlNlbmQgbWVzc2FnZTwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L0NhcmRGb290ZXI+XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8VGFicyBkZWZhdWx0VmFsdWU9XCJhZ2VuZGFcIiBjbGFzc05hbWU9XCJ3LWZ1bGxcIj5cclxuICAgICAgICA8VGFic0xpc3QgY2xhc3NOYW1lPVwiZ3JpZCB3LWZ1bGwgZ3JpZC1jb2xzLTRcIj5cclxuICAgICAgICAgIDxUYWJzVHJpZ2dlciB2YWx1ZT1cImFubm91bmNlbWVudFwiPkFubm91bmNlbWVudDwvVGFic1RyaWdnZXI+XHJcbiAgICAgICAgICA8VGFic1RyaWdnZXIgdmFsdWU9XCJhZ2VuZGFcIj5BZ2VuZGE8L1RhYnNUcmlnZ2VyPlxyXG4gICAgICAgICAgPFRhYnNUcmlnZ2VyIHZhbHVlPVwibm90ZXNcIj5Ob3RlczwvVGFic1RyaWdnZXI+XHJcbiAgICAgICAgICA8VGFic1RyaWdnZXIgdmFsdWU9XCJkb3VidFwiPlJhaXNlIGEgRG91YnQ8L1RhYnNUcmlnZ2VyPlxyXG4gICAgICAgIDwvVGFic0xpc3Q+XHJcbiAgICAgICAgPFRhYnNDb250ZW50IHZhbHVlPVwiYW5ub3VuY2VtZW50XCI+XHJcbiAgICAgICAgICBObyBBbm5vdW5jZW1lbnRzIGZyb20gdHV0b3IgeWV0IVxyXG4gICAgICAgIDwvVGFic0NvbnRlbnQ+XHJcbiAgICAgICAgPFRhYnNDb250ZW50IHZhbHVlPVwiYWdlbmRhXCI+XHJcbiAgICAgICAgICBMaXZlIHN0cmVhbSBhZ2VuZGEgd2lsbCBiZSBkaXNwbGF5ZWQgaGVyZS5cclxuICAgICAgICA8L1RhYnNDb250ZW50PlxyXG4gICAgICAgIDxUYWJzQ29udGVudCB2YWx1ZT1cIm5vdGVzXCI+XHJcbiAgICAgICAgICBUYWtlIGRvd24gbm90ZXNcclxuICAgICAgICA8L1RhYnNDb250ZW50PlxyXG4gICAgICAgIDxUYWJzQ29udGVudCB2YWx1ZT1cImRvdWJ0XCI+XHJcbiAgICAgICAgICBBc2sgYSBxdWVzdGlvbiBmcm9tIHR1dG9yXHJcbiAgICAgICAgPC9UYWJzQ29udGVudD5cclxuICAgICAgPC9UYWJzPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJCdXR0b24iLCJUZXh0YXJlYSIsIkNhcmQiLCJDYXJkQ29udGVudCIsIkNhcmREZXNjcmlwdGlvbiIsIkNhcmRGb290ZXIiLCJDYXJkSGVhZGVyIiwiQ2FyZFRpdGxlIiwiVGFicyIsIlRhYnNDb250ZW50IiwiVGFic0xpc3QiLCJUYWJzVHJpZ2dlciIsIk5hdmJhciIsIlBhZ2UiLCJteVZpZGVvUmVmIiwibWVzc2FnZXMiLCJzZXRNZXNzYWdlcyIsImlucHV0Iiwic2V0SW5wdXQiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJ2aWRlbyIsInRoZW4iLCJzdHJlYW0iLCJjdXJyZW50Iiwic3JjT2JqZWN0IiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJoYW5kbGVTZW5kTWVzc2FnZSIsInRyaW0iLCJwcmV2IiwiZGl2IiwiY2xhc3NOYW1lIiwicGxheXNJbmxpbmUiLCJyZWYiLCJhdXRvUGxheSIsIm11dGVkIiwibGVuZ3RoIiwibWFwIiwibXNnIiwiaW5kZXgiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0Iiwib25DbGljayIsImRlZmF1bHRWYWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/courses/[courseId]/livestream/page.js\n"));

/***/ })

});