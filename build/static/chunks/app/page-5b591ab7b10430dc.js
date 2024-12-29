(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{8904:function(e,t,s){Promise.resolve().then(s.bind(s,8396))},8072:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return a}});var r=s(7437),l=s(208);function a(){return(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,r.jsx)(l.nI,{src:"https://lottie.host/2dfe3f56-1676-472e-b1b8-bfa43b7faba8/ONbpoVclRb.lottie",loop:!0,autoplay:!0,style:{width:"150px",height:"150px"}})})}},8396:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return x}});var r=s(7437),l=s(4864),a=s(3145),n={src:"/_next/static/media/SkyLearn_Without_Slogan.f3fcf42a.png",height:631,width:1378,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAMAAACEE47CAAAAHlBMVEUTfcgTfclMaXEAf8ATfMgUfcgUfMcSfskSfMYKf8Ts/GhcAAAACnRSTlM1QgACVZa8bZUXAMpygQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAACRJREFUeJwVxcERACAMAkE4iNp/xU72swo9l0ThzQCqbK1ulj8G+gBJSloXqQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:4},i=s(2265),d=s(3583),o=s(4449),c=s(7648);s(9376);var u=s(8264),f=s(8072),m=s(3032),h=s(222);function x(){let[e,t]=(0,i.useState)([]),[s,x]=(0,i.useState)(!0),[p,g]=(0,i.useState)("price"),[j,v]=(0,i.useState)("asc"),{userId:w,role:N,logout:b,isLogged:y}=(0,l.V)();(0,i.useEffect)(()=>{(async()=>{try{let e=await fetch("teacher"===N&&w?"/api/Course/getTutorCourses?tutorId=".concat(w):"/api/Course/getCourses"),s=await e.json();t(s),x(!1)}catch(e){console.error("Error fetching courses:",e)}})()},[w,N]);let A=e=>{if(!e)return 0;let t=e.match(/^(\d+)/);return t?parseInt(t[1],10):0},_=[...e].sort((e,t)=>{let s=0;if("price"===p)s=e.course_price-t.course_price;else if("deadline"===p)s=new Date(e.enrollment_deadline)-new Date(t.enrollment_deadline);else if("name"===p)s=e.course_name.localeCompare(t.course_name);else if("duration"===p)s=A(e.course_duration)-A(t.course_duration);else if("enrollments"===p)s=(null===e.course_enrolments?0:e.course_enrolments)-(null===t.course_enrolments?0:t.course_enrolments);else if("difficulty"===p){let r={basic:0,intermediate:1,advanced:2};s=r[e.difficulty]-r[t.difficulty]}return"asc"===j?s:-s});return s?(0,r.jsx)(f.default,{}):(0,r.jsx)(l.default,{children:(0,r.jsx)("div",{className:"flex justify-center font-[family-name:var(--font-geist-sans)]",children:(0,r.jsxs)("div",{className:"flex w-full min-h-screen max-h-full",children:[(0,r.jsx)("aside",{className:"w-64 h-full text-gray-700 p-6 bg-zinc-100",children:(0,r.jsxs)("div",{className:"fixed",children:[(0,r.jsx)("div",{className:"flex justify-center p-5 bg-white rounded-xl",children:(0,r.jsx)(a.default,{src:n,alt:"SkyLearn Logo",width:150,height:50,loading:"eager"})}),(0,r.jsx)("hr",{}),(0,r.jsxs)("nav",{className:"space-y-3 my-4 flex justify-between flex-col font-bold",children:[(0,r.jsxs)("div",{className:"flex items-center group p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#3371b8",className:"pb-1",children:(0,r.jsx)("path",{d:"M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"})}),(0,r.jsx)(c.default,{href:"/profile",children:"Profile"})]}),(0,r.jsxs)("div",{className:"flex items-center p-2 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300",children:[" ",(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#3371b8",className:"pb-1",children:(0,r.jsx)("path",{d:"M160-80q-17 0-28.5-11.5T120-120v-558q0-15 6-25.5t20-16.5l400-160q20-8 37 5.5t17 34.5v120h40q17 0 28.5 11.5T680-680v120h-80v-80H200v480h207l80 80H160Zm200-640h160v-62l-160 62ZM680-80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Zm-50-100 160-100-160-100v200Zm-430 20v-480 480Z"})})," ",(0,r.jsx)(c.default,{href:"/mycourses",children:"My Course"})]}),(0,r.jsxs)("div",{className:"flex items-center p-2 rounded-md hover:bg-primary-light transition-colors hover:text-white duration-300",children:[" ",(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#3371b8",className:"pb-1",children:(0,r.jsx)("path",{d:"M480-400q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400ZM320-240h320v-23q0-24-13-44t-36-30q-26-11-53.5-17t-57.5-6q-30 0-57.5 6T369-337q-23 10-36 30t-13 44v23ZM720-80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80Zm0-80v-446L526-800H240v640h480Zm-480 0v-640 640Z"})})," ",(0,r.jsx)(c.default,{href:"/contact",children:"Contact Us"})]}),!y&&(0,r.jsxs)("div",{children:[(0,r.jsx)(c.default,{href:"/signin",className:"block font-semibold p-2 my-2 rounded-md bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300",children:"Sign In"}),(0,r.jsx)(c.default,{href:"/signup",className:"block p-2 rounded-md my-2 bg-primary hover:bg-blue-800 text-center text-white transition-colors duration-300 font-semibold",children:"Sign Up"})]}),y&&(0,r.jsx)(o.z,{onClick:b,className:"cursor-pointer block font-semibold p-2 rounded-md bg-[#f55045] text-white text-center hover:bg-red-700 hover:text-white transition-colors duration-300",children:"Logout"})]})]})}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)(u.Z,{}),(0,r.jsx)("main",{className:"p-6 rounded-lg",children:(0,r.jsxs)("section",{children:[(0,r.jsx)("h3",{className:"text-2xl font-bold mb-4",children:"Courses "}),(0,r.jsxs)("div",{className:"mb-4 flex justify-end gap-4",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)(m._,{htmlFor:"sortBy",children:"Sort By: "}),(0,r.jsxs)(h.Ph,{value:p,onValueChange:e=>g(e),children:[(0,r.jsx)(h.i4,{id:"sortBy",className:"w-[200px]",children:(0,r.jsx)(h.ki,{placeholder:"Select an option"})}),(0,r.jsxs)(h.Bw,{children:[(0,r.jsx)(h.Ql,{value:"price",children:"Price"}),(0,r.jsx)(h.Ql,{value:"deadline",children:"Deadline"}),(0,r.jsx)(h.Ql,{value:"name",children:"Course Name"}),(0,r.jsx)(h.Ql,{value:"duration",children:"Duration"}),(0,r.jsx)(h.Ql,{value:"enrollments",children:"Enrollments"}),(0,r.jsx)(h.Ql,{value:"difficulty",children:"Difficulty"})]})]})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)(m._,{htmlFor:"sortOrder",children:"Order:"}),(0,r.jsxs)(h.Ph,{value:j,onValueChange:e=>v(e),children:[(0,r.jsx)(h.i4,{id:"sortOrder",className:"w-[200px]",children:(0,r.jsx)(h.ki,{placeholder:"Select order"})}),(0,r.jsxs)(h.Bw,{children:[(0,r.jsx)(h.Ql,{value:"asc",children:"Ascending"}),(0,r.jsx)(h.Ql,{value:"desc",children:"Descending"})]})]})]})]}),(0,r.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:_.map((e,t)=>(0,r.jsxs)(d.Zb,{className:"bg-white shadow-md border rounded-lg p-1",children:[(0,r.jsxs)(d.Ol,{children:[(0,r.jsx)(d.ll,{className:"text-primary text-md font-semibold",children:e.course_name}),(0,r.jsx)(d.SZ,{children:(0,r.jsxs)("span",{className:"text-base font-bold text-gray-800",children:["₹ ",e.course_price]})})]}),(0,r.jsxs)(d.aY,{children:[e.TEACHING.length>0&&e.TEACHING.map((e,t)=>(0,r.jsxs)("p",{className:"text-sm text-gray-500 font-semibold",children:["By: ",e.TUTOR.tutor_name]},t)),(0,r.jsxs)("p",{className:"text-sm text-gray-500 font-semibold",children:["Level: ",e.difficulty]}),(0,r.jsxs)("p",{className:"text-sm text-[#f55045] font-semibold",children:["Deadline:"," ",new Date(e.enrollment_deadline).toLocaleDateString("en-IN")]})]}),(0,r.jsx)(d.eW,{children:(0,r.jsx)(c.default,{href:"/courses/".concat(encodeURIComponent(e.course_id)),passHref:!0,className:"w-full",children:(0,r.jsx)(o.z,{className:"w-full",children:"View Course"})})})]},e.id||"".concat(e.course_id,"-").concat(t)))})]})})]})]})})})}},3583:function(e,t,s){"use strict";s.d(t,{Ol:function(){return i},SZ:function(){return o},Zb:function(){return n},aY:function(){return c},eW:function(){return u},ll:function(){return d}});var r=s(7437),l=s(2265),a=s(6474);let n=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("rounded-xl border bg-card text-card-foreground shadow",s),...l})});n.displayName="Card";let i=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",s),...l})});i.displayName="CardHeader";let d=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)("h3",{ref:t,className:(0,a.cn)("font-semibold leading-none tracking-tight",s),...l})});d.displayName="CardTitle";let o=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)("p",{ref:t,className:(0,a.cn)("text-sm text-muted-foreground",s),...l})});o.displayName="CardDescription";let c=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("p-6 pt-0",s),...l})});c.displayName="CardContent";let u=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)("div",{ref:t,className:(0,a.cn)("flex items-center p-6 pt-0",s),...l})});u.displayName="CardFooter"},3032:function(e,t,s){"use strict";s.d(t,{_:function(){return o}});var r=s(7437),l=s(2265),a=s(6394),n=s(535),i=s(6474);let d=(0,n.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),o=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)(a.f,{ref:t,className:(0,i.cn)(d(),s),...l})});o.displayName=a.f.displayName},222:function(e,t,s){"use strict";s.d(t,{Bw:function(){return h},DI:function(){return o},Ph:function(){return d},Ql:function(){return x},i4:function(){return u},ki:function(){return c}});var r=s(7437),l=s(2265),a=s(1264),n=s(6474),i=s(653);let d=a.fC,o=a.ZA,c=a.B4,u=l.forwardRef((e,t)=>{let{className:s,children:l,...d}=e;return(0,r.jsxs)(a.xz,{ref:t,className:(0,n.cn)("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",s),...d,children:[l,(0,r.jsx)(a.JO,{asChild:!0,children:(0,r.jsx)(i.v4q,{className:"h-4 w-4 opacity-50"})})]})});u.displayName=a.xz.displayName;let f=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)(a.u_,{ref:t,className:(0,n.cn)("flex cursor-default items-center justify-center py-1",s),...l,children:(0,r.jsx)(i.g8U,{className:"h-4 w-4"})})});f.displayName=a.u_.displayName;let m=l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)(a.$G,{ref:t,className:(0,n.cn)("flex cursor-default items-center justify-center py-1",s),...l,children:(0,r.jsx)(i.v4q,{className:"h-4 w-4"})})});m.displayName=a.$G.displayName;let h=l.forwardRef((e,t)=>{let{className:s,children:l,position:i="popper",...d}=e;return(0,r.jsx)(a.h_,{children:(0,r.jsxs)(a.VY,{ref:t,className:(0,n.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===i&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",s),position:i,...d,children:[(0,r.jsx)(f,{}),(0,r.jsx)(a.l_,{className:(0,n.cn)("p-1","popper"===i&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:l}),(0,r.jsx)(m,{})]})})});h.displayName=a.VY.displayName,l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)(a.__,{ref:t,className:(0,n.cn)("px-2 py-1.5 text-sm font-semibold",s),...l})}).displayName=a.__.displayName;let x=l.forwardRef((e,t)=>{let{className:s,children:l,...d}=e;return(0,r.jsxs)(a.ck,{ref:t,className:(0,n.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",s),...d,children:[(0,r.jsx)("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(a.wU,{children:(0,r.jsx)(i.nQG,{className:"h-4 w-4"})})}),(0,r.jsx)(a.eT,{children:l})]})});x.displayName=a.ck.displayName,l.forwardRef((e,t)=>{let{className:s,...l}=e;return(0,r.jsx)(a.Z0,{ref:t,className:(0,n.cn)("-mx-1 my-1 h-px bg-muted",s),...l})}).displayName=a.Z0.displayName}},function(e){e.O(0,[4358,4533,2486,8310,5434,9851,2972,9754,7531,3839,453,5726,8264,2971,2117,1744],function(){return e(e.s=8904)}),_N_E=e.O()}]);