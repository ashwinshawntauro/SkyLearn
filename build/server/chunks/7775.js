exports.id=7775,exports.ids=[7775],exports.modules={56347:(e,s,a)=>{Promise.resolve().then(a.bind(a,99992))},36647:(e,s,a)=>{Promise.resolve().then(a.bind(a,89428))},23897:(e,s,a)=>{Promise.resolve().then(a.bind(a,52325))},68994:(e,s,a)=>{Promise.resolve().then(a.bind(a,41916))},35303:()=>{},99992:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>u});var t=a(97247),r=a(35887),l=a(81914),d=a(6031),n=a(25139),i=a(82355),o=a(62898),c=a(28964),m=a(78221),x=a(79906);function u(){let{userName:e,email:s,role:a,address:u,isLogged:h}=(0,d.V)(),[p,f]=(0,c.useState)([]),{userId:g}=(0,d.V)(),[j,N]=(0,c.useState)(!1),[y,b]=(0,c.useState)(s),[v,w]=(0,c.useState)(e),[C,k]=(0,c.useState)(u),[S,_]=(0,c.useState)(e),[R,D]=(0,c.useState)(u),[Z,I]=(0,c.useState)(!1),V=()=>I(!1);if(!h)return t.jsx("div",{children:"Sign In"});let z=async()=>{N(!0);try{let e=await fetch("/api/updateData/updateUserData",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({newUserName:S,newAdd:R,userId:g})}),s=await e.json();e.ok?(console.log("User updated:",s),w(s.student_name),k(s.address),V()):console.error("Error updating user:",s.error)}catch(e){console.error("Error saving changes:",e)}finally{N(!1)}};return(0,t.jsxs)("div",{className:"container-fluid mx-auto",children:[t.jsx(n.Z,{}),(0,t.jsxs)("div",{className:"container mx-auto",children:[(0,t.jsxs)("header",{className:"flex justify-between items-center py-4 px-6 border-b bg-white shadow-sm",children:[t.jsx("h1",{className:"text-2xl font-semibold text-gray-800",children:"My Profile"}),t.jsx(l.z,{className:"lg:hidden p-2 border rounded-md text-gray-700 hover:text-gray-900 focus:outline-none",children:"☰"})]}),(0,t.jsxs)("main",{className:"mt-6 space-y-6",children:[t.jsx("section",{className:"grid lg:grid-cols-2 gap-4",children:(0,t.jsxs)(r.Zb,{className:"ml-10 shadow-lg rounded-lg overflow-hidden bg-white",children:[(0,t.jsxs)(r.Ol,{className:"px-6 py-4 border-b border-gray-200",children:[(0,t.jsxs)(r.ll,{className:"inline-flex justify-between items-center text-lg font-semibold text-gray-800",children:[t.jsx("span",{children:"User Details"}),(0,t.jsxs)(i.Vq,{open:Z,onOpenChange:I,children:[t.jsx(i.hg,{children:t.jsx("span",{onClick:()=>I(!0),className:"cursor-pointer text-gray-600 hover:text-gray-900 transition duration-300",children:t.jsx("svg",{className:"w-6 h-6","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",children:t.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"})})})}),(0,t.jsxs)(i.cZ,{className:"px-6 py-4",children:[(0,t.jsxs)(i.fK,{children:[t.jsx(i.$N,{className:"text-center text-xl font-semibold text-gray-800",children:"Edit your Account Info"}),(0,t.jsxs)(i.Be,{className:"mt-4 space-y-4",children:[(0,t.jsxs)("div",{children:[t.jsx(m._,{htmlFor:"userName",className:"block text-sm font-medium text-gray-700",children:"Full Name"}),t.jsx(o.I,{id:"userName",value:S,onChange:e=>_(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full"})]}),(0,t.jsxs)("div",{children:[t.jsx(m._,{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email Id"}),t.jsx(o.I,{id:"email",value:y,onChange:e=>b(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full",disabled:!0})]}),(0,t.jsxs)("div",{children:[t.jsx(m._,{htmlFor:"address",className:"block text-sm font-medium text-gray-700",children:"Address"}),t.jsx(o.I,{id:"address",value:R,onChange:e=>D(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full"})]})]})]}),t.jsx(l.z,{onClick:z,className:"mt-4 w-full bg-primary text-white hover:bg-primary-light rounded-md py-2",disabled:j,children:j?(0,t.jsxs)("div",{className:"flex justify-center items-center space-x-2",children:[(0,t.jsxs)("svg",{className:"w-5 h-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[t.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),t.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8h8a8 8 0 11-8-8z"})]}),t.jsx("span",{children:"Saving..."})]}):"Save Changes"})]})]})]}),t.jsx(r.SZ,{className:"text-sm text-gray-500",children:"Your profile details are displayed here."})]}),(0,t.jsxs)(r.aY,{className:"px-6 py-4 space-y-2",children:[(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Full Name:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:v})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Email Id:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:s})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Role:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:a})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Address:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:C||"N/A"})]})]})]})}),(0,t.jsxs)("section",{className:"mt-8 p-8",children:[t.jsx("h2",{className:"text-lg font-semibold m-4",children:"Registered Courses"}),t.jsx("div",{className:"m-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4",children:0===p.length?t.jsx("p",{children:"No courses registered yet."}):p.map(e=>(0,t.jsxs)(r.Zb,{className:"shadow-md",children:[(0,t.jsxs)(r.Ol,{children:[t.jsx(r.ll,{children:e.course_name}),t.jsx(r.SZ,{children:e.course_description})]}),t.jsx(r.aY,{children:(0,t.jsxs)("p",{className:"text-sm text-gray-500",children:["Duration: ",e.course_duration," weeks"]})}),t.jsx(r.eW,{children:t.jsx(x.default,{href:`/courses/${encodeURIComponent(e.course_id)}`,passHref:!0,className:"w-full",children:t.jsx(l.z,{className:"mt-4",children:"View Course"})})})]},e.course_id))})]})]})]})]})}},89428:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>u});var t=a(97247),r=a(35887),l=a(81914),d=a(6031),n=a(25139),i=a(82355),o=a(62898),c=a(28964),m=a(78221),x=a(79906);function u(){let{userName:e,email:s,role:a,address:u,logout:h,isLogged:p}=(0,d.V)(),[f,g]=(0,c.useState)([]),{userId:j}=(0,d.V)(),[N,y]=(0,c.useState)(!0),[b,v]=(0,c.useState)(!1),[w,C]=(0,c.useState)(s),[k,S]=(0,c.useState)(e),[_,R]=(0,c.useState)(u),[D,Z]=(0,c.useState)(e),[I,V]=(0,c.useState)(u),[z,F]=(0,c.useState)(!1),P=()=>F(!1);if(!p)return t.jsx("div",{children:"Sign In"});let E=async()=>{v(!0);try{let e=await fetch("/api/updateData/updateTutorData",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({newUserName:D,newAdd:I,userId:j})}),s=await e.json();e.ok?(console.log("User updated:",s),S(s.tutor_name),R(s.address),P()):console.error("Error updating user:",s.error)}catch(e){console.error("Error saving changes:",e)}finally{v(!1)}};return(0,t.jsxs)("div",{className:"container-fluid mx-auto",children:[t.jsx(n.Z,{}),(0,t.jsxs)("div",{className:"container mx-auto",children:[(0,t.jsxs)("header",{className:"flex justify-between items-center py-4 px-6 border-b bg-white shadow-sm",children:[t.jsx("h1",{className:"text-2xl font-semibold text-gray-800",children:"My Profile"}),t.jsx(l.z,{className:"lg:hidden p-2 border rounded-md text-gray-700 hover:text-gray-900 focus:outline-none",children:"☰"})]}),(0,t.jsxs)("main",{className:"mt-6 space-y-6",children:[t.jsx("section",{className:"grid lg:grid-cols-2 gap-4",children:(0,t.jsxs)(r.Zb,{className:"ml-10 shadow-lg rounded-lg overflow-hidden bg-white",children:[(0,t.jsxs)(r.Ol,{className:"px-6 py-4 border-b border-gray-200",children:[(0,t.jsxs)(r.ll,{className:"inline-flex justify-between items-center text-lg font-semibold text-gray-800",children:[t.jsx("span",{children:"User Details"}),(0,t.jsxs)(i.Vq,{open:z,onOpenChange:F,children:[t.jsx(i.hg,{children:t.jsx("span",{onClick:()=>F(!0),className:"cursor-pointer text-gray-600 hover:text-gray-900 transition duration-300",children:t.jsx("svg",{className:"w-6 h-6","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",children:t.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"})})})}),(0,t.jsxs)(i.cZ,{className:"px-6 py-4",children:[(0,t.jsxs)(i.fK,{children:[t.jsx(i.$N,{className:"text-center text-xl font-semibold text-gray-800",children:"Edit your Account Info"}),(0,t.jsxs)(i.Be,{className:"mt-4 space-y-4",children:[(0,t.jsxs)("div",{children:[t.jsx(m._,{htmlFor:"userName",className:"block text-sm font-medium text-gray-700",children:"Full Name"}),t.jsx(o.I,{id:"userName",value:D,onChange:e=>Z(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full"})]}),(0,t.jsxs)("div",{children:[t.jsx(m._,{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email Id"}),t.jsx(o.I,{id:"email",value:w,onChange:e=>C(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full",disabled:!0})]}),(0,t.jsxs)("div",{children:[t.jsx(m._,{htmlFor:"address",className:"block text-sm font-medium text-gray-700",children:"Address"}),t.jsx(o.I,{id:"address",value:I,onChange:e=>V(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full"})]})]})]}),t.jsx(l.z,{onClick:E,className:"mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2",disabled:b,children:b?(0,t.jsxs)("div",{className:"flex justify-center items-center space-x-2",children:[(0,t.jsxs)("svg",{className:"w-5 h-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[t.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),t.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8h8a8 8 0 11-8-8z"})]}),t.jsx("span",{children:"Saving..."})]}):"Save Changes"})]})]})]}),t.jsx(r.SZ,{className:"text-sm text-gray-500",children:"Your profile details are displayed here."})]}),(0,t.jsxs)(r.aY,{className:"px-6 py-4 space-y-2",children:[(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Full Name:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:k})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Email Id:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:s})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Role:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:a})]}),(0,t.jsxs)("p",{className:"text-sm text-gray-700",children:["Address:"," ",t.jsx("span",{className:"font-semibold text-gray-900",children:_||"N/A"})]})]})]})}),(0,t.jsxs)("section",{className:"mt-8 p-8",children:[t.jsx("h2",{className:"text-lg font-semibold m-4",children:"Supervised Courses"}),N?t.jsx("div",{className:"text-center",children:t.jsx("p",{children:"Loading courses..."})}):t.jsx("div",{className:"m-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4",children:0===f.length?t.jsx("p",{children:"No courses registered yet."}):f.map(e=>(0,t.jsxs)(r.Zb,{className:"shadow-md",children:[(0,t.jsxs)(r.Ol,{children:[t.jsx(r.ll,{children:e.course_name}),t.jsx(r.SZ,{children:e.course_description})]}),(0,t.jsxs)(r.aY,{children:[(0,t.jsxs)("p",{className:"text-xs text-gray-500",children:["Duration: ",e.course_duration]}),t.jsx(x.default,{href:`/courses/${encodeURIComponent(e.course_id)}`,passHref:!0,children:t.jsx(l.z,{className:"mt-4",children:"View Course"})})]})]},e.course_id))})]})]})]})]})}},52325:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>r});var t=a(97247);function r({error:e,reset:s}){return(0,t.jsxs)("div",{children:[t.jsx("h2",{children:"Something went wrong!"}),t.jsx("button",{onClick:s,children:"Try again"})]})}a(28964)},41916:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>n});var t=a(97247),r=a(6031),l=a(66862),d=a(34178);function n({student:e,teacher:s}){let{isLogged:a,role:n,loading:i}=(0,r.V)(),o=(0,d.useRouter)();return i?t.jsx(l.default,{}):a?"teacher"===n?s:"student"===n?e:t.jsx("span",{}):o.push("/signin")}},35887:(e,s,a)=>{"use strict";a.d(s,{Ol:()=>n,SZ:()=>o,Zb:()=>d,aY:()=>c,eW:()=>m,ll:()=>i});var t=a(97247),r=a(28964),l=a(25294);let d=r.forwardRef(({className:e,...s},a)=>t.jsx("div",{ref:a,className:(0,l.cn)("rounded-xl border bg-card text-card-foreground shadow",e),...s}));d.displayName="Card";let n=r.forwardRef(({className:e,...s},a)=>t.jsx("div",{ref:a,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",e),...s}));n.displayName="CardHeader";let i=r.forwardRef(({className:e,...s},a)=>t.jsx("h3",{ref:a,className:(0,l.cn)("font-semibold leading-none tracking-tight",e),...s}));i.displayName="CardTitle";let o=r.forwardRef(({className:e,...s},a)=>t.jsx("p",{ref:a,className:(0,l.cn)("text-sm text-muted-foreground",e),...s}));o.displayName="CardDescription";let c=r.forwardRef(({className:e,...s},a)=>t.jsx("div",{ref:a,className:(0,l.cn)("p-6 pt-0",e),...s}));c.displayName="CardContent";let m=r.forwardRef(({className:e,...s},a)=>t.jsx("div",{ref:a,className:(0,l.cn)("flex items-center p-6 pt-0",e),...s}));m.displayName="CardFooter"},82355:(e,s,a)=>{"use strict";a.d(s,{$N:()=>p,Be:()=>f,Vq:()=>i,cN:()=>h,cZ:()=>x,fK:()=>u,hg:()=>o});var t=a(97247),r=a(28964),l=a(50400),d=a(25294),n=a(2095);let i=l.fC,o=l.xz,c=l.h_;l.x8;let m=r.forwardRef(({className:e,...s},a)=>t.jsx(l.aV,{ref:a,className:(0,d.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...s}));m.displayName=l.aV.displayName;let x=r.forwardRef(({className:e,children:s,...a},r)=>(0,t.jsxs)(c,{children:[t.jsx(m,{}),(0,t.jsxs)(l.VY,{ref:r,className:(0,d.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...a,children:[s,(0,t.jsxs)(l.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[t.jsx(n.Pxu,{className:"h-4 w-4"}),t.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));x.displayName=l.VY.displayName;let u=({className:e,...s})=>t.jsx("div",{className:(0,d.cn)("flex flex-col space-y-1.5 text-center sm:text-left",e),...s});u.displayName="DialogHeader";let h=({className:e,...s})=>t.jsx("div",{className:(0,d.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...s});h.displayName="DialogFooter";let p=r.forwardRef(({className:e,...s},a)=>t.jsx(l.Dx,{ref:a,className:(0,d.cn)("text-lg font-semibold leading-none tracking-tight",e),...s}));p.displayName=l.Dx.displayName;let f=r.forwardRef(({className:e,...s},a)=>t.jsx(l.dk,{ref:a,className:(0,d.cn)("text-sm text-muted-foreground",e),...s}));f.displayName=l.dk.displayName},78221:(e,s,a)=>{"use strict";a.d(s,{_:()=>o});var t=a(97247),r=a(28964),l=a(40768),d=a(87972),n=a(25294);let i=(0,d.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),o=r.forwardRef(({className:e,...s},a)=>t.jsx(l.f,{ref:a,className:(0,n.cn)(i(),e),...s}));o.displayName=l.f.displayName},69606:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});let t=(0,a(45347).createProxy)(String.raw`D:\skylearn\src\app\profile\@student\page.js#default`)},21702:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});let t=(0,a(45347).createProxy)(String.raw`D:\skylearn\src\app\profile\@teacher\page.js#default`)},14901:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});let t=(0,a(45347).createProxy)(String.raw`D:\skylearn\src\app\profile\error.js#default`)},96532:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});let t=(0,a(45347).createProxy)(String.raw`D:\skylearn\src\app\profile\layout.js#default`)},79950:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>n});var t=a(72051),r=a(36272),l=a(51472);function d({className:e,...s}){return t.jsx("div",{className:function(...e){return(0,l.m6)((0,r.W)(e))}("animate-pulse rounded-md bg-primary/10",e),...s})}function n(){return t.jsx("div",{children:t.jsx(d,{className:"w-[500px] h-[20px] rounded-full"})})}},43811:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>l});var t=a(72051),r=a(92349);function l(){return(0,t.jsxs)("div",{children:[t.jsx("h2",{children:"Not Found"}),t.jsx("p",{children:"Could not find requested resource"}),t.jsx(r.default,{href:"/",children:"Return Home"})]})}}};