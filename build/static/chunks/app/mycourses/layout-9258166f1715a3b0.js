(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7721],{8721:function(e,t,n){Promise.resolve().then(n.bind(n,5257))},9376:function(e,t,n){"use strict";var r=n(5475);n.o(r,"useParams")&&n.d(t,{useParams:function(){return r.useParams}}),n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}}),n.o(r,"useRouter")&&n.d(t,{useRouter:function(){return r.useRouter}}),n.o(r,"useSearchParams")&&n.d(t,{useSearchParams:function(){return r.useSearchParams}})},8072:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var r=n(7437),u=n(208);function a(){return(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,r.jsx)(u.nI,{src:"https://lottie.host/2dfe3f56-1676-472e-b1b8-bfa43b7faba8/ONbpoVclRb.lottie",loop:!0,autoplay:!0,style:{width:"150px",height:"150px"}})})}},5257:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var r=n(7437),u=n(4864),a=n(8072),s=n(9376);function o(e){let{student:t,teacher:n}=e,{isLogged:o,role:i,loading:l}=(0,u.V)(),c=(0,s.useRouter)();return l?(0,r.jsx)(a.default,{}):o?"teacher"===i?n:"student"===i?t:(0,r.jsx)("span",{}):c.push("/signin")}},7645:function(e,t,n){"use strict";n.d(t,{hJ:function(){return r.hJ},ET:function(){return u.ET},I8:function(){return s},DI:function(){return u.hJ},Xb:function(){return r.Xb},db:function(){return o},Aj:function(){return r.Aj},cf:function(){return u.cf},Xo:function(){return u.Xo},IO:function(){return u.IO},LS:function(){return r.LS},e5:function(){return r.e5},rh:function(){return r.rh},w7:function(){return r.w7}});var r=n(4752),u=n(5978);let a=(0,n(738).ZF)({apiKey:"AIzaSyDrzFNmxdmIfVN2bqi9mp2g6vaz71AfEFE",authDomain:"axial-radius-436608-q6.firebaseapp.com",databaseURL:"https://axial-radius-436608-q6-default-rtdb.firebaseio.com",projectId:"axial-radius-436608-q6",storageBucket:"axial-radius-436608-q6.appspot.com",messagingSenderId:"128899871237",appId:"1:128899871237:web:30ded11d2a1dd26627226c",measurementId:"G-8W9YR4NBKP"}),s=(0,r.v0)(a),o=(0,u.ad)(a)},4864:function(e,t,n){"use strict";n.d(t,{V:function(){return o}});var r=n(7437),u=n(2265),a=n(7645);let s=(0,u.createContext)({userName:null,isLogged:!1,loading:!0,role:null,userId:null,email:null,accessToken:null,address:null}),o=()=>(0,u.useContext)(s);t.default=e=>{let{children:t}=e,[n,o]=(0,u.useState)(null),[i,l]=(0,u.useState)(null),[c,f]=(0,u.useState)(null),[d,h]=(0,u.useState)(!1),[m,p]=(0,u.useState)(!0),[g,b]=(0,u.useState)(null),[x,I]=(0,u.useState)(null),[S,E]=(0,u.useState)(null),v=async e=>{try{let t=await fetch("/api/getUser?userEmail=".concat(e),{method:"GET"});if(t.ok){let e=await t.json();I(e.id),b(e.role),f(e.email),o(e.name),l(e.address)}else console.error("Error fetching role:",t.statusText)}catch(e){console.error("Error in getUser:",e.message)}},P=async()=>{try{await (0,a.w7)(a.I8),h(!1),o(null),f(null),b(null),I(null),l(null),console.log("User logged out")}catch(e){console.error("Error logging out:",e)}};return(0,u.useEffect)(()=>{let e=(0,a.Aj)(a.I8,e=>{e?(E(e.getIdToken()),h(!0),v(e.email)):h(!1),p(!1)});return()=>e()},[]),(0,r.jsx)(s.Provider,{value:{userName:n,email:c,isLogged:d,address:i,loading:m,role:g,logout:P,userId:x,accessToken:S},children:t})}}},function(e){e.O(0,[4358,4533,2486,5434,2971,2117,1744],function(){return e(e.s=8721)}),_N_E=e.O()}]);