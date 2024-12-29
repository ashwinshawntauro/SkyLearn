(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7927],{4571:function(e,t,r){Promise.resolve().then(r.bind(r,6531))},7648:function(e,t,r){"use strict";r.d(t,{default:function(){return a.a}});var n=r(2972),a=r.n(n)},6531:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var n=r(7437),a=r(3583),s=r(4449),o=r(4864),l=r(8264),i=r(1298),d=r(322),c=r(2265),u=r(3032),f=r(7648);function m(){let{userName:e,email:t,role:r,address:m,logout:p,isLogged:x}=(0,o.V)(),[g,h]=(0,c.useState)([]),{userId:j}=(0,o.V)(),[y,N]=(0,c.useState)(!0),[v,b]=(0,c.useState)(!1);(0,c.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/Course/getSupervisingCourses?userId=".concat(j)),t=await e.json();e.ok?h(t):console.error(t.error)}catch(e){console.error("Error fetching courses:",e)}finally{N(!1)}})()},[j]);let[w,C]=(0,c.useState)(t),[D,R]=(0,c.useState)(e),[k,_]=(0,c.useState)(m),[I,E]=(0,c.useState)(e),[O,F]=(0,c.useState)(m),[S,M]=(0,c.useState)(!1),V=()=>M(!1);if(!x)return(0,n.jsx)("div",{children:"Sign In"});let P=async()=>{b(!0);try{let e=await fetch("/api/updateData/updateTutorData",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({newUserName:I,newAdd:O,userId:j})}),t=await e.json();e.ok?(console.log("User updated:",t),R(t.tutor_name),_(t.address),V()):console.error("Error updating user:",t.error)}catch(e){console.error("Error saving changes:",e)}finally{b(!1)}};return(0,n.jsxs)("div",{className:"container-fluid mx-auto",children:[(0,n.jsx)(l.Z,{}),(0,n.jsxs)("div",{className:"container mx-auto",children:[(0,n.jsxs)("header",{className:"flex justify-between items-center py-4 px-6 border-b bg-white shadow-sm",children:[(0,n.jsx)("h1",{className:"text-2xl font-semibold text-gray-800",children:"My Profile"}),(0,n.jsx)(s.z,{className:"lg:hidden p-2 border rounded-md text-gray-700 hover:text-gray-900 focus:outline-none",children:"☰"})]}),(0,n.jsxs)("main",{className:"mt-6 space-y-6",children:[(0,n.jsx)("section",{className:"grid lg:grid-cols-2 gap-4",children:(0,n.jsxs)(a.Zb,{className:"ml-10 shadow-lg rounded-lg overflow-hidden bg-white",children:[(0,n.jsxs)(a.Ol,{className:"px-6 py-4 border-b border-gray-200",children:[(0,n.jsxs)(a.ll,{className:"inline-flex justify-between items-center text-lg font-semibold text-gray-800",children:[(0,n.jsx)("span",{children:"User Details"}),(0,n.jsxs)(i.Vq,{open:S,onOpenChange:M,children:[(0,n.jsx)(i.hg,{children:(0,n.jsx)("span",{onClick:()=>M(!0),className:"cursor-pointer text-gray-600 hover:text-gray-900 transition duration-300",children:(0,n.jsx)("svg",{className:"w-6 h-6","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",children:(0,n.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"})})})}),(0,n.jsxs)(i.cZ,{className:"px-6 py-4",children:[(0,n.jsxs)(i.fK,{children:[(0,n.jsx)(i.$N,{className:"text-center text-xl font-semibold text-gray-800",children:"Edit your Account Info"}),(0,n.jsxs)(i.Be,{className:"mt-4 space-y-4",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)(u._,{htmlFor:"userName",className:"block text-sm font-medium text-gray-700",children:"Full Name"}),(0,n.jsx)(d.I,{id:"userName",value:I,onChange:e=>E(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(u._,{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email Id"}),(0,n.jsx)(d.I,{id:"email",value:w,onChange:e=>C(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full",disabled:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(u._,{htmlFor:"address",className:"block text-sm font-medium text-gray-700",children:"Address"}),(0,n.jsx)(d.I,{id:"address",value:O,onChange:e=>F(e.target.value),className:"mt-1 p-2 border border-gray-300 rounded-md w-full"})]})]})]}),(0,n.jsx)(s.z,{onClick:P,className:"mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2",disabled:v,children:v?(0,n.jsxs)("div",{className:"flex justify-center items-center space-x-2",children:[(0,n.jsxs)("svg",{className:"w-5 h-5 animate-spin text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,n.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,n.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8h8a8 8 0 11-8-8z"})]}),(0,n.jsx)("span",{children:"Saving..."})]}):"Save Changes"})]})]})]}),(0,n.jsx)(a.SZ,{className:"text-sm text-gray-500",children:"Your profile details are displayed here."})]}),(0,n.jsxs)(a.aY,{className:"px-6 py-4 space-y-2",children:[(0,n.jsxs)("p",{className:"text-sm text-gray-700",children:["Full Name:"," ",(0,n.jsx)("span",{className:"font-semibold text-gray-900",children:D})]}),(0,n.jsxs)("p",{className:"text-sm text-gray-700",children:["Email Id:"," ",(0,n.jsx)("span",{className:"font-semibold text-gray-900",children:t})]}),(0,n.jsxs)("p",{className:"text-sm text-gray-700",children:["Role:"," ",(0,n.jsx)("span",{className:"font-semibold text-gray-900",children:r})]}),(0,n.jsxs)("p",{className:"text-sm text-gray-700",children:["Address:"," ",(0,n.jsx)("span",{className:"font-semibold text-gray-900",children:k||"N/A"})]})]})]})}),(0,n.jsxs)("section",{className:"mt-8 p-8",children:[(0,n.jsx)("h2",{className:"text-lg font-semibold m-4",children:"Supervised Courses"}),y?(0,n.jsx)("div",{className:"text-center",children:(0,n.jsx)("p",{children:"Loading courses..."})}):(0,n.jsx)("div",{className:"m-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4",children:0===g.length?(0,n.jsx)("p",{children:"No courses registered yet."}):g.map(e=>(0,n.jsxs)(a.Zb,{className:"shadow-md",children:[(0,n.jsxs)(a.Ol,{children:[(0,n.jsx)(a.ll,{children:e.course_name}),(0,n.jsx)(a.SZ,{children:e.course_description})]}),(0,n.jsxs)(a.aY,{children:[(0,n.jsxs)("p",{className:"text-xs text-gray-500",children:["Duration: ",e.course_duration]}),(0,n.jsx)(f.default,{href:"/courses/".concat(encodeURIComponent(e.course_id)),passHref:!0,children:(0,n.jsx)(s.z,{className:"mt-4",children:"View Course"})})]})]},e.course_id))})]})]})]})]})}},3583:function(e,t,r){"use strict";r.d(t,{Ol:function(){return l},SZ:function(){return d},Zb:function(){return o},aY:function(){return c},eW:function(){return u},ll:function(){return i}});var n=r(7437),a=r(2265),s=r(6474);let o=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("rounded-xl border bg-card text-card-foreground shadow",r),...a})});o.displayName="Card";let l=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("flex flex-col space-y-1.5 p-6",r),...a})});l.displayName="CardHeader";let i=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("h3",{ref:t,className:(0,s.cn)("font-semibold leading-none tracking-tight",r),...a})});i.displayName="CardTitle";let d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("p",{ref:t,className:(0,s.cn)("text-sm text-muted-foreground",r),...a})});d.displayName="CardDescription";let c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("p-6 pt-0",r),...a})});c.displayName="CardContent";let u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("flex items-center p-6 pt-0",r),...a})});u.displayName="CardFooter"},1298:function(e,t,r){"use strict";r.d(t,{$N:function(){return x},Be:function(){return g},Vq:function(){return i},cN:function(){return p},cZ:function(){return f},fK:function(){return m},hg:function(){return d}});var n=r(7437),a=r(2265),s=r(9027),o=r(6474),l=r(653);let i=s.fC,d=s.xz,c=s.h_;s.x8;let u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.aV,{ref:t,className:(0,o.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",r),...a})});u.displayName=s.aV.displayName;let f=a.forwardRef((e,t)=>{let{className:r,children:a,...i}=e;return(0,n.jsxs)(c,{children:[(0,n.jsx)(u,{}),(0,n.jsxs)(s.VY,{ref:t,className:(0,o.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",r),...i,children:[a,(0,n.jsxs)(s.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,n.jsx)(l.Pxu,{className:"h-4 w-4"}),(0,n.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});f.displayName=s.VY.displayName;let m=e=>{let{className:t,...r}=e;return(0,n.jsx)("div",{className:(0,o.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...r})};m.displayName="DialogHeader";let p=e=>{let{className:t,...r}=e;return(0,n.jsx)("div",{className:(0,o.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...r})};p.displayName="DialogFooter";let x=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.Dx,{ref:t,className:(0,o.cn)("text-lg font-semibold leading-none tracking-tight",r),...a})});x.displayName=s.Dx.displayName;let g=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.dk,{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",r),...a})});g.displayName=s.dk.displayName},3032:function(e,t,r){"use strict";r.d(t,{_:function(){return d}});var n=r(7437),a=r(2265),s=r(6394),o=r(535),l=r(6474);let i=(0,o.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.f,{ref:t,className:(0,l.cn)(i(),r),...a})});d.displayName=s.f.displayName},9027:function(e,t,r){"use strict";r.d(t,{Dx:function(){return er},VY:function(){return et},aV:function(){return ee},dk:function(){return en},fC:function(){return X},h_:function(){return Q},jm:function(){return q},p8:function(){return v},x8:function(){return ea},xz:function(){return G}});var n=r(2265),a=r(6741),s=r(8575),o=r(3966),l=r(9255),i=r(886),d=r(2308),c=r(9103),u=r(3832),f=r(1599),m=r(6840),p=r(6097),x=r(7922),g=r(5478),h=r(7053),j=r(7437),y="Dialog",[N,v]=(0,o.b)(y),[b,w]=N(y),C=e=>{let{__scopeDialog:t,children:r,open:a,defaultOpen:s,onOpenChange:o,modal:d=!0}=e,c=n.useRef(null),u=n.useRef(null),[f=!1,m]=(0,i.T)({prop:a,defaultProp:s,onChange:o});return(0,j.jsx)(b,{scope:t,triggerRef:c,contentRef:u,contentId:(0,l.M)(),titleId:(0,l.M)(),descriptionId:(0,l.M)(),open:f,onOpenChange:m,onOpenToggle:n.useCallback(()=>m(e=>!e),[m]),modal:d,children:r})};C.displayName=y;var D="DialogTrigger",R=n.forwardRef((e,t)=>{let{__scopeDialog:r,...n}=e,o=w(D,r),l=(0,s.e)(t,o.triggerRef);return(0,j.jsx)(m.WV.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":L(o.open),...n,ref:l,onClick:(0,a.M)(e.onClick,o.onOpenToggle)})});R.displayName=D;var k="DialogPortal",[_,I]=N(k,{forceMount:void 0}),E=e=>{let{__scopeDialog:t,forceMount:r,children:a,container:s}=e,o=w(k,t);return(0,j.jsx)(_,{scope:t,forceMount:r,children:n.Children.map(a,e=>(0,j.jsx)(f.z,{present:r||o.open,children:(0,j.jsx)(u.h,{asChild:!0,container:s,children:e})}))})};E.displayName=k;var O="DialogOverlay",F=n.forwardRef((e,t)=>{let r=I(O,e.__scopeDialog),{forceMount:n=r.forceMount,...a}=e,s=w(O,e.__scopeDialog);return s.modal?(0,j.jsx)(f.z,{present:n||s.open,children:(0,j.jsx)(S,{...a,ref:t})}):null});F.displayName=O;var S=n.forwardRef((e,t)=>{let{__scopeDialog:r,...n}=e,a=w(O,r);return(0,j.jsx)(x.Z,{as:h.g7,allowPinchZoom:!0,shards:[a.contentRef],children:(0,j.jsx)(m.WV.div,{"data-state":L(a.open),...n,ref:t,style:{pointerEvents:"auto",...n.style}})})}),M="DialogContent",V=n.forwardRef((e,t)=>{let r=I(M,e.__scopeDialog),{forceMount:n=r.forceMount,...a}=e,s=w(M,e.__scopeDialog);return(0,j.jsx)(f.z,{present:n||s.open,children:s.modal?(0,j.jsx)(P,{...a,ref:t}):(0,j.jsx)(z,{...a,ref:t})})});V.displayName=M;var P=n.forwardRef((e,t)=>{let r=w(M,e.__scopeDialog),o=n.useRef(null),l=(0,s.e)(t,r.contentRef,o);return n.useEffect(()=>{let e=o.current;if(e)return(0,g.Ry)(e)},[]),(0,j.jsx)(W,{...e,ref:l,trapFocus:r.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,a.M)(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),null===(t=r.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:(0,a.M)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,r=0===t.button&&!0===t.ctrlKey;(2===t.button||r)&&e.preventDefault()}),onFocusOutside:(0,a.M)(e.onFocusOutside,e=>e.preventDefault())})}),z=n.forwardRef((e,t)=>{let r=w(M,e.__scopeDialog),a=n.useRef(!1),s=n.useRef(!1);return(0,j.jsx)(W,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var n,o;null===(n=e.onCloseAutoFocus)||void 0===n||n.call(e,t),t.defaultPrevented||(a.current||null===(o=r.triggerRef.current)||void 0===o||o.focus(),t.preventDefault()),a.current=!1,s.current=!1},onInteractOutside:t=>{var n,o;null===(n=e.onInteractOutside)||void 0===n||n.call(e,t),t.defaultPrevented||(a.current=!0,"pointerdown"!==t.detail.originalEvent.type||(s.current=!0));let l=t.target;(null===(o=r.triggerRef.current)||void 0===o?void 0:o.contains(l))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&s.current&&t.preventDefault()}})}),W=n.forwardRef((e,t)=>{let{__scopeDialog:r,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:l,...i}=e,u=w(M,r),f=n.useRef(null),m=(0,s.e)(t,f);return(0,p.EW)(),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(c.M,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:o,onUnmountAutoFocus:l,children:(0,j.jsx)(d.XB,{role:"dialog",id:u.contentId,"aria-describedby":u.descriptionId,"aria-labelledby":u.titleId,"data-state":L(u.open),...i,ref:m,onDismiss:()=>u.onOpenChange(!1)})}),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)($,{titleId:u.titleId}),(0,j.jsx)(J,{contentRef:f,descriptionId:u.descriptionId})]})]})}),Z="DialogTitle",A=n.forwardRef((e,t)=>{let{__scopeDialog:r,...n}=e,a=w(Z,r);return(0,j.jsx)(m.WV.h2,{id:a.titleId,...n,ref:t})});A.displayName=Z;var T="DialogDescription",B=n.forwardRef((e,t)=>{let{__scopeDialog:r,...n}=e,a=w(T,r);return(0,j.jsx)(m.WV.p,{id:a.descriptionId,...n,ref:t})});B.displayName=T;var Y="DialogClose",H=n.forwardRef((e,t)=>{let{__scopeDialog:r,...n}=e,s=w(Y,r);return(0,j.jsx)(m.WV.button,{type:"button",...n,ref:t,onClick:(0,a.M)(e.onClick,()=>s.onOpenChange(!1))})});function L(e){return e?"open":"closed"}H.displayName=Y;var U="DialogTitleWarning",[q,K]=(0,o.k)(U,{contentName:M,titleName:Z,docsSlug:"dialog"}),$=e=>{let{titleId:t}=e,r=K(U),a="`".concat(r.contentName,"` requires a `").concat(r.titleName,"` for the component to be accessible for screen reader users.\n\nIf you want to hide the `").concat(r.titleName,"`, you can wrap it with our VisuallyHidden component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/").concat(r.docsSlug);return n.useEffect(()=>{t&&!document.getElementById(t)&&console.error(a)},[a,t]),null},J=e=>{let{contentRef:t,descriptionId:r}=e,a=K("DialogDescriptionWarning"),s="Warning: Missing `Description` or `aria-describedby={undefined}` for {".concat(a.contentName,"}.");return n.useEffect(()=>{var e;let n=null===(e=t.current)||void 0===e?void 0:e.getAttribute("aria-describedby");r&&n&&!document.getElementById(r)&&console.warn(s)},[s,t,r]),null},X=C,G=R,Q=E,ee=F,et=V,er=A,en=B,ea=H},6394:function(e,t,r){"use strict";r.d(t,{f:function(){return l}});var n=r(2265),a=r(6840),s=r(7437),o=n.forwardRef((e,t)=>(0,s.jsx)(a.WV.label,{...e,ref:t,onMouseDown:t=>{var r;t.target.closest("button, input, select, textarea")||(null===(r=e.onMouseDown)||void 0===r||r.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));o.displayName="Label";var l=o}},function(e){e.O(0,[4358,4533,8310,5434,9851,2972,9754,7531,3839,8264,2971,2117,1744],function(){return e(e.s=4571)}),_N_E=e.O()}]);