(()=>{var e={};e.id=408,e.ids=[408],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},84770:e=>{"use strict";e.exports=require("crypto")},80665:e=>{"use strict";e.exports=require("dns")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},98216:e=>{"use strict";e.exports=require("net")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},35816:e=>{"use strict";e.exports=require("process")},76162:e=>{"use strict";e.exports=require("stream")},74026:e=>{"use strict";e.exports=require("string_decoder")},82452:e=>{"use strict";e.exports=require("tls")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},98061:e=>{"use strict";e.exports=require("node:assert")},92761:e=>{"use strict";e.exports=require("node:async_hooks")},72254:e=>{"use strict";e.exports=require("node:buffer")},40027:e=>{"use strict";e.exports=require("node:console")},6005:e=>{"use strict";e.exports=require("node:crypto")},65714:e=>{"use strict";e.exports=require("node:diagnostics_channel")},15673:e=>{"use strict";e.exports=require("node:events")},88849:e=>{"use strict";e.exports=require("node:http")},42725:e=>{"use strict";e.exports=require("node:http2")},87503:e=>{"use strict";e.exports=require("node:net")},38846:e=>{"use strict";e.exports=require("node:perf_hooks")},39630:e=>{"use strict";e.exports=require("node:querystring")},84492:e=>{"use strict";e.exports=require("node:stream")},31764:e=>{"use strict";e.exports=require("node:tls")},41041:e=>{"use strict";e.exports=require("node:url")},47261:e=>{"use strict";e.exports=require("node:util")},93746:e=>{"use strict";e.exports=require("node:util/types")},24086:e=>{"use strict";e.exports=require("node:worker_threads")},65628:e=>{"use strict";e.exports=require("node:zlib")},7835:(e,r,s)=>{"use strict";s.r(r),s.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>x,tree:()=>c}),s(57193),s(59333),s(70749),s(21272),s(66786),s(90649),s(90300),s(12626),s(86272),s(78993);var t=s(30170),a=s(45002),o=s(83876),i=s.n(o),n=s(66299),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(r,l);let c=["",{children:["courses",{children:["[courseId]",{children:["classroom",{teacher:["children",{children:["[assignments]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,57193)),"D:\\skylearn\\src\\app\\courses\\[courseId]\\classroom\\@teacher\\[assignments]\\page.js"]}]},{}]},{}],children:["__DEFAULT__",{},{defaultPage:[()=>Promise.resolve().then(s.t.bind(s,59333,23)),"next/dist/client/components/parallel-route-default.js"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,70749)),"D:\\skylearn\\src\\app\\courses\\[courseId]\\classroom\\layout.js"],error:[()=>Promise.resolve().then(s.bind(s,21272)),"D:\\skylearn\\src\\app\\courses\\[courseId]\\classroom\\error.js"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,66786)),"D:\\skylearn\\src\\app\\courses\\[courseId]\\layout.js"],loading:[()=>Promise.resolve().then(s.bind(s,90649)),"D:\\skylearn\\src\\app\\courses\\[courseId]\\loading.js"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,90300)),"D:\\skylearn\\src\\app\\layout.js"],error:[()=>Promise.resolve().then(s.bind(s,12626)),"D:\\skylearn\\src\\app\\error.js"],loading:[()=>Promise.resolve().then(s.bind(s,86272)),"D:\\skylearn\\src\\app\\loading.js"],"not-found":[()=>Promise.resolve().then(s.bind(s,78993)),"D:\\skylearn\\src\\app\\not-found.js"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["D:\\skylearn\\src\\app\\courses\\[courseId]\\classroom\\@teacher\\[assignments]\\page.js"],u="/courses/[courseId]/classroom/@teacher/[assignments]/page",p={require:s,loadChunk:()=>Promise.resolve()},x=new t.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/courses/[courseId]/classroom/@teacher/[assignments]/page",pathname:"/courses/[courseId]/classroom/[assignments]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},65673:(e,r,s)=>{Promise.resolve().then(s.bind(s,70501))},65080:(e,r,s)=>{Promise.resolve().then(s.bind(s,59638))},55612:(e,r,s)=>{Promise.resolve().then(s.bind(s,23860))},58659:(e,r,s)=>{Promise.resolve().then(s.bind(s,31456))},35303:()=>{},70501:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>d});var t=s(97247),a=s(28964),o=s(81914),i=s(5857),n=s(34178),l=s(25139),c=s(75140);function d(){let{toast:e}=(0,c.pm)(),{assignments:r,courseId:s}=(0,n.useParams)();r.split("-")[0],r.split("-")[1];let[d,u]=(0,a.useState)([]),[p,x]=(0,a.useState)(!0),m=async()=>{for(let r of d){let t=r.studentEmail,a=r.grade;try{let r=await fetch(`/api/getUser?userEmail=${encodeURIComponent(t)}`,{method:"GET"}),o=await r.json();r.ok&&o.id?(async()=>{let r=await fetch("/api/updateLeaderboard",{method:"PUT",body:JSON.stringify({studentId:o.id,courseId:s,Score:a}),headers:{"Content-Type":"application/json"}});if(r.ok)e({variant:"success",title:"SkyLearn",description:"Leaderboard updated successfully!"});else{let s=await r.json();e({variant:"failure",title:"SkyLearn",description:`Error: ${s.message}`})}})():console.error(`Error fetching student ID for ${t}`)}catch(e){console.error("Error fetching user data:",e)}}};return p?t.jsx("div",{className:"container mx-auto p-6 max-w-4xl",children:t.jsx("div",{className:"bg-card rounded-lg shadow-lg p-6",children:t.jsx("p",{children:"Loading student data..."})})}):(0,t.jsxs)(t.Fragment,{children:[t.jsx(l.Z,{}),t.jsx("div",{className:"container mx-auto p-6 max-w-4xl",children:(0,t.jsxs)("div",{className:"bg-card rounded-lg shadow-lg p-6",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[t.jsx("h2",{className:"text-2xl font-semibold text-card-foreground",children:"Student Marks"}),t.jsx(o.z,{onClick:m,className:"bg-primary hover:bg-primary/90",children:"Submit All Marks"})]}),t.jsx("div",{className:"overflow-x-auto",children:(0,t.jsxs)(i.iA,{children:[t.jsx(i.xD,{children:(0,t.jsxs)(i.SC,{children:[t.jsx(i.ss,{className:"w-[100px]",children:"S.No"}),t.jsx(i.ss,{children:"Student Name"}),t.jsx(i.ss,{children:"Student Email"}),t.jsx(i.ss,{className:"w-[150px]",children:"Marks Scored"})]})}),t.jsx(i.RM,{children:d&&d.length>0?d.map((e,r)=>(0,t.jsxs)(i.SC,{children:[t.jsx(i.pj,{className:"font-medium",children:r+1}),t.jsx(i.pj,{children:e.studentName}),t.jsx(i.pj,{children:e.studentEmail}),t.jsx(i.pj,{children:e.grade})]},e.studentEmail)):t.jsx("tr",{children:t.jsx("td",{colSpan:"4",className:"text-center",children:"No students available"})})})]})})]})})]})}},59638:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>a});var t=s(97247);function a(){return t.jsx("div",{children:t.jsx("h2",{children:"Access Denied!"})})}},23860:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>c});var t=s(97247),a=s(6031),o=s(31456),i=s(34178),n=s(28964),l=s(81914);function c({teacher:e}){let{isLogged:r,role:s,loading:c,userId:d}=(0,a.V)(),[u,p]=(0,n.useState)(null),[x,m]=(0,n.useState)(!0),f=(0,i.useRouter)();return((0,i.usePathname)().split("/")[2],c||x)?t.jsx(o.default,{}):r?"teacher"===s?u?e:t.jsx("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700",children:(0,t.jsxs)("div",{className:"text-center",children:[t.jsx("h1",{className:"text-4xl font-bold text-red-500",children:"Access Denied"}),t.jsx("p",{className:"mt-4 text-lg",children:"You do not have permission to access this page."}),t.jsx("div",{className:"mt-6 flex space-x-4",children:t.jsx(l.z,{onClick:()=>f.back(),className:"px-4 py-2 text-sm w-full font-semibold text-white bg-primary rounded-lg hover:bg-primary-light",children:"Go Back"})})]})}):null:(f.push("/signin"),null)}},31456:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>o});var t=s(97247),a=s(22215);function o(){return t.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:t.jsx(a.nI,{src:"https://lottie.host/2dfe3f56-1676-472e-b1b8-bfa43b7faba8/ONbpoVclRb.lottie",loop:!0,autoplay:!0,style:{width:"150px",height:"150px"}})})}},5857:(e,r,s)=>{"use strict";s.d(r,{RM:()=>l,Rn:()=>p,SC:()=>c,iA:()=>i,pj:()=>u,ss:()=>d,xD:()=>n});var t=s(97247),a=s(28964),o=s(25294);let i=a.forwardRef(({className:e,...r},s)=>t.jsx("div",{className:"relative w-full overflow-auto",children:t.jsx("table",{ref:s,className:(0,o.cn)("w-full caption-bottom text-sm",e),...r})}));i.displayName="Table";let n=a.forwardRef(({className:e,...r},s)=>t.jsx("thead",{ref:s,className:(0,o.cn)("[&_tr]:border-b",e),...r}));n.displayName="TableHeader";let l=a.forwardRef(({className:e,...r},s)=>t.jsx("tbody",{ref:s,className:(0,o.cn)("[&_tr:last-child]:border-0",e),...r}));l.displayName="TableBody",a.forwardRef(({className:e,...r},s)=>t.jsx("tfoot",{ref:s,className:(0,o.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",e),...r})).displayName="TableFooter";let c=a.forwardRef(({className:e,...r},s)=>t.jsx("tr",{ref:s,className:(0,o.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",e),...r}));c.displayName="TableRow";let d=a.forwardRef(({className:e,...r},s)=>t.jsx("th",{ref:s,className:(0,o.cn)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...r}));d.displayName="TableHead";let u=a.forwardRef(({className:e,...r},s)=>t.jsx("td",{ref:s,className:(0,o.cn)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...r}));u.displayName="TableCell";let p=a.forwardRef(({className:e,...r},s)=>t.jsx("caption",{ref:s,className:(0,o.cn)("mt-4 text-sm text-muted-foreground",e),...r}));p.displayName="TableCaption"},76868:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var s in r)Object.defineProperty(e,s,{enumerable:!0,get:r[s]})}(r,{isNotFoundError:function(){return a},notFound:function(){return t}});let s="NEXT_NOT_FOUND";function t(){let e=Error(s);throw e.digest=s,e}function a(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===s}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},59333:(e,r,s)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var s in r)Object.defineProperty(e,s,{enumerable:!0,get:r[s]})}(r,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return a},default:function(){return o}});let t=s(76868),a="next/dist/client/components/parallel-route-default.js";function o(){(0,t.notFound)()}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},57193:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>t});let t=(0,s(45347).createProxy)(String.raw`D:\skylearn\src\app\courses\[courseId]\classroom\@teacher\[assignments]\page.js#default`)},21272:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>t});let t=(0,s(45347).createProxy)(String.raw`D:\skylearn\src\app\courses\[courseId]\classroom\error.js#default`)},70749:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>t});let t=(0,s(45347).createProxy)(String.raw`D:\skylearn\src\app\courses\[courseId]\classroom\layout.js#default`)},66786:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>a});var t=s(72051);function a({children:e}){return t.jsx("section",{children:e})}},90649:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>t});let t=(0,s(45347).createProxy)(String.raw`D:\skylearn\src\app\courses\[courseId]\loading.js#default`)}};var r=require("../../../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[9379,809,2252,6034,8467,6434,5139],()=>s(7835));module.exports=t})();