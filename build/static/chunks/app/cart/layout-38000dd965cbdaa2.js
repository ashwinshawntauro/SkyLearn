(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2993],{8861:function(e,t,n){Promise.resolve().then(n.bind(n,5877))},3515:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{cancelIdleCallback:function(){return u},requestIdleCallback:function(){return n}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},u="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5877:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});var u=n(7437),r=n(4864),l=n(9376),a=n(7900),o=n(8072);function i(e){let{children:t}=e,{isLogged:n,loading:i}=(0,r.V)(),s=(0,l.useRouter)();return!n&!i&&s.replace("/signin"),(0,u.jsx)(u.Fragment,{children:n?(0,u.jsxs)("section",{children:[(0,u.jsx)(a.default,{id:"razorpay-checkout-js",src:"https://checkout.razorpay.com/v2/checkout.js"}),t]}):i?(0,u.jsx)(o.default,{}):(0,u.jsx)("section",{children:"Please Login In"})})}},8072:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var u=n(7437),r=n(208);function l(){return(0,u.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,u.jsx)(r.nI,{src:"https://lottie.host/2dfe3f56-1676-472e-b1b8-bfa43b7faba8/ONbpoVclRb.lottie",loop:!0,autoplay:!0,style:{width:"150px",height:"150px"}})})}},7645:function(e,t,n){"use strict";n.d(t,{hJ:function(){return u.hJ},ET:function(){return r.ET},I8:function(){return a},DI:function(){return r.hJ},Xb:function(){return u.Xb},db:function(){return o},Aj:function(){return u.Aj},cf:function(){return r.cf},Xo:function(){return r.Xo},IO:function(){return r.IO},LS:function(){return u.LS},e5:function(){return u.e5},rh:function(){return u.rh},w7:function(){return u.w7}});var u=n(4752),r=n(5978);let l=(0,n(738).ZF)({apiKey:"AIzaSyDrzFNmxdmIfVN2bqi9mp2g6vaz71AfEFE",authDomain:"axial-radius-436608-q6.firebaseapp.com",databaseURL:"https://axial-radius-436608-q6-default-rtdb.firebaseio.com",projectId:"axial-radius-436608-q6",storageBucket:"axial-radius-436608-q6.appspot.com",messagingSenderId:"128899871237",appId:"1:128899871237:web:30ded11d2a1dd26627226c",measurementId:"G-8W9YR4NBKP"}),a=(0,u.v0)(l),o=(0,r.ad)(l)},4864:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var u=n(7437),r=n(2265),l=n(7645);let a=(0,r.createContext)({userName:null,isLogged:!1,loading:!0,role:null,userId:null,email:null,accessToken:null,address:null}),o=()=>(0,r.useContext)(a);t.default=e=>{let{children:t}=e,[n,o]=(0,r.useState)(null),[i,s]=(0,r.useState)(null),[c,f]=(0,r.useState)(null),[d,h]=(0,r.useState)(!1),[p,b]=(0,r.useState)(!0),[m,g]=(0,r.useState)(null),[I,j]=(0,r.useState)(null),[x,y]=(0,r.useState)(null),k=async e=>{try{let t=await fetch("/api/getUser?userEmail=".concat(e),{method:"GET"});if(t.ok){let e=await t.json();j(e.id),g(e.role),f(e.email),o(e.name),s(e.address)}else console.error("Error fetching role:",t.statusText)}catch(e){console.error("Error in getUser:",e.message)}},v=async()=>{try{await (0,l.w7)(l.I8),h(!1),o(null),f(null),g(null),j(null),s(null),console.log("User logged out")}catch(e){console.error("Error logging out:",e)}};return(0,r.useEffect)(()=>{let e=(0,l.Aj)(l.I8,e=>{e?(y(e.getIdToken()),h(!0),k(e.email)):h(!1),b(!1)});return()=>e()},[]),(0,u.jsx)(a.Provider,{value:{userName:n,email:c,isLogged:d,address:i,loading:p,role:m,logout:v,userId:I,accessToken:x},children:t})}}},function(e){e.O(0,[4358,4533,2486,5434,2782,2971,2117,1744],function(){return e(e.s=8861)}),_N_E=e.O()}]);