"use strict";exports.id=8467,exports.ids=[8467],exports.modules={51313:(e,r,n)=>{n.d(r,{F$:()=>h,Q5:()=>w,qE:()=>g});var t=n(28964),o=n(20732),a=n(85090),u=n(9537),l=n(22251),i=n(97247),d="Avatar",[s,c]=(0,o.b)(d),[p,f]=s(d),g=t.forwardRef((e,r)=>{let{__scopeAvatar:n,...o}=e,[a,u]=t.useState("idle");return(0,i.jsx)(p,{scope:n,imageLoadingStatus:a,onImageLoadingStatusChange:u,children:(0,i.jsx)(l.WV.span,{...o,ref:r})})});g.displayName=d;var v="AvatarImage",h=t.forwardRef((e,r)=>{let{__scopeAvatar:n,src:o,onLoadingStatusChange:d=()=>{},...s}=e,c=f(v,n),p=function(e,r){let[n,o]=t.useState("idle");return(0,u.b)(()=>{if(!e){o("error");return}let n=!0,t=new window.Image,a=e=>()=>{n&&o(e)};return o("loading"),t.onload=a("loaded"),t.onerror=a("error"),t.src=e,r&&(t.referrerPolicy=r),()=>{n=!1}},[e,r]),n}(o,s.referrerPolicy),g=(0,a.W)(e=>{d(e),c.onImageLoadingStatusChange(e)});return(0,u.b)(()=>{"idle"!==p&&g(p)},[p,g]),"loaded"===p?(0,i.jsx)(l.WV.img,{...s,ref:r,src:o}):null});h.displayName=v;var m="AvatarFallback",w=t.forwardRef((e,r)=>{let{__scopeAvatar:n,delayMs:o,...a}=e,u=f(m,n),[d,s]=t.useState(void 0===o);return t.useEffect(()=>{if(void 0!==o){let e=window.setTimeout(()=>s(!0),o);return()=>window.clearTimeout(e)}},[o]),d&&"loaded"!==u.imageLoadingStatus?(0,i.jsx)(l.WV.span,{...a,ref:r}):null});w.displayName=m},16921:(e,r,n)=>{n.d(r,{oC:()=>e5,VY:()=>e2,ZA:()=>e7,ck:()=>e6,wU:()=>e4,__:()=>e9,Uv:()=>e1,Ee:()=>e8,Rk:()=>e3,fC:()=>eJ,Z0:()=>re,Tr:()=>rr,tu:()=>rt,fF:()=>rn,xz:()=>e0});var t=n(28964),o=n(70319),a=n(93191),u=n(20732),l=n(28469),i=n(22251),d=n(31829),s=n(71310),c=n(56186),p=n(3402),f=n(60018),g=n(27015),v=n(57896),h=n(28611),m=n(67264),w=n(47403),x=n(69008),M=n(85090),y=n(58529),C=n(6100),j=n(97247),b=["Enter"," "],R=["ArrowUp","PageDown","End"],D=["ArrowDown","PageUp","Home",...R],_={ltr:[...b,"ArrowRight"],rtl:[...b,"ArrowLeft"]},k={ltr:["ArrowLeft"],rtl:["ArrowRight"]},P="Menu",[I,E,T]=(0,d.B)(P),[S,N]=(0,u.b)(P,[T,v.D7,w.Pc]),O=(0,v.D7)(),F=(0,w.Pc)(),[L,A]=S(P),[K,V]=S(P),W=e=>{let{__scopeMenu:r,open:n=!1,children:o,dir:a,onOpenChange:u,modal:l=!0}=e,i=O(r),[d,c]=t.useState(null),p=t.useRef(!1),f=(0,M.W)(u),g=(0,s.gm)(a);return t.useEffect(()=>{let e=()=>{p.current=!0,document.addEventListener("pointerdown",r,{capture:!0,once:!0}),document.addEventListener("pointermove",r,{capture:!0,once:!0})},r=()=>p.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",r,{capture:!0}),document.removeEventListener("pointermove",r,{capture:!0})}},[]),(0,j.jsx)(v.fC,{...i,children:(0,j.jsx)(L,{scope:r,open:n,onOpenChange:f,content:d,onContentChange:c,children:(0,j.jsx)(K,{scope:r,onClose:t.useCallback(()=>f(!1),[f]),isUsingKeyboardRef:p,dir:g,modal:l,children:o})})})};W.displayName=P;var G=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e,o=O(n);return(0,j.jsx)(v.ee,{...o,...t,ref:r})});G.displayName="MenuAnchor";var U="MenuPortal",[B,z]=S(U,{forceMount:void 0}),X=e=>{let{__scopeMenu:r,forceMount:n,children:t,container:o}=e,a=A(U,r);return(0,j.jsx)(B,{scope:r,forceMount:n,children:(0,j.jsx)(m.z,{present:n||a.open,children:(0,j.jsx)(h.h,{asChild:!0,container:o,children:t})})})};X.displayName=U;var Y="MenuContent",[Z,H]=S(Y),q=t.forwardRef((e,r)=>{let n=z(Y,e.__scopeMenu),{forceMount:t=n.forceMount,...o}=e,a=A(Y,e.__scopeMenu),u=V(Y,e.__scopeMenu);return(0,j.jsx)(I.Provider,{scope:e.__scopeMenu,children:(0,j.jsx)(m.z,{present:t||a.open,children:(0,j.jsx)(I.Slot,{scope:e.__scopeMenu,children:u.modal?(0,j.jsx)(Q,{...o,ref:r}):(0,j.jsx)($,{...o,ref:r})})})})}),Q=t.forwardRef((e,r)=>{let n=A(Y,e.__scopeMenu),u=t.useRef(null),l=(0,a.e)(r,u);return t.useEffect(()=>{let e=u.current;if(e)return(0,y.Ry)(e)},[]),(0,j.jsx)(J,{...e,ref:l,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:(0,o.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),$=t.forwardRef((e,r)=>{let n=A(Y,e.__scopeMenu);return(0,j.jsx)(J,{...e,ref:r,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),J=t.forwardRef((e,r)=>{let{__scopeMenu:n,loop:u=!1,trapFocus:l,onOpenAutoFocus:i,onCloseAutoFocus:d,disableOutsidePointerEvents:s,onEntryFocus:g,onEscapeKeyDown:h,onPointerDownOutside:m,onFocusOutside:M,onInteractOutside:y,onDismiss:b,disableOutsideScroll:_,...k}=e,P=A(Y,n),I=V(Y,n),T=O(n),S=F(n),N=E(n),[L,K]=t.useState(null),W=t.useRef(null),G=(0,a.e)(r,W,P.onContentChange),U=t.useRef(0),B=t.useRef(""),z=t.useRef(0),X=t.useRef(null),H=t.useRef("right"),q=t.useRef(0),Q=_?C.Z:t.Fragment,$=_?{as:x.g7,allowPinchZoom:!0}:void 0,J=e=>{let r=B.current+e,n=N().filter(e=>!e.disabled),t=document.activeElement,o=n.find(e=>e.ref.current===t)?.textValue,a=function(e,r,n){var t;let o=r.length>1&&Array.from(r).every(e=>e===r[0])?r[0]:r,a=(t=Math.max(n?e.indexOf(n):-1,0),e.map((r,n)=>e[(t+n)%e.length]));1===o.length&&(a=a.filter(e=>e!==n));let u=a.find(e=>e.toLowerCase().startsWith(o.toLowerCase()));return u!==n?u:void 0}(n.map(e=>e.textValue),r,o),u=n.find(e=>e.textValue===a)?.ref.current;(function e(r){B.current=r,window.clearTimeout(U.current),""!==r&&(U.current=window.setTimeout(()=>e(""),1e3))})(r),u&&setTimeout(()=>u.focus())};t.useEffect(()=>()=>window.clearTimeout(U.current),[]),(0,p.EW)();let ee=t.useCallback(e=>H.current===X.current?.side&&function(e,r){return!!r&&function(e,r){let{x:n,y:t}=e,o=!1;for(let e=0,a=r.length-1;e<r.length;a=e++){let u=r[e].x,l=r[e].y,i=r[a].x,d=r[a].y;l>t!=d>t&&n<(i-u)*(t-l)/(d-l)+u&&(o=!o)}return o}({x:e.clientX,y:e.clientY},r)}(e,X.current?.area),[]);return(0,j.jsx)(Z,{scope:n,searchRef:B,onItemEnter:t.useCallback(e=>{ee(e)&&e.preventDefault()},[ee]),onItemLeave:t.useCallback(e=>{ee(e)||(W.current?.focus(),K(null))},[ee]),onTriggerLeave:t.useCallback(e=>{ee(e)&&e.preventDefault()},[ee]),pointerGraceTimerRef:z,onPointerGraceIntentChange:t.useCallback(e=>{X.current=e},[]),children:(0,j.jsx)(Q,{...$,children:(0,j.jsx)(f.M,{asChild:!0,trapped:l,onMountAutoFocus:(0,o.M)(i,e=>{e.preventDefault(),W.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:d,children:(0,j.jsx)(c.XB,{asChild:!0,disableOutsidePointerEvents:s,onEscapeKeyDown:h,onPointerDownOutside:m,onFocusOutside:M,onInteractOutside:y,onDismiss:b,children:(0,j.jsx)(w.fC,{asChild:!0,...S,dir:I.dir,orientation:"vertical",loop:u,currentTabStopId:L,onCurrentTabStopIdChange:K,onEntryFocus:(0,o.M)(g,e=>{I.isUsingKeyboardRef.current||e.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,j.jsx)(v.VY,{role:"menu","aria-orientation":"vertical","data-state":e_(P.open),"data-radix-menu-content":"",dir:I.dir,...T,...k,ref:G,style:{outline:"none",...k.style},onKeyDown:(0,o.M)(k.onKeyDown,e=>{let r=e.target.closest("[data-radix-menu-content]")===e.currentTarget,n=e.ctrlKey||e.altKey||e.metaKey,t=1===e.key.length;r&&("Tab"===e.key&&e.preventDefault(),!n&&t&&J(e.key));let o=W.current;if(e.target!==o||!D.includes(e.key))return;e.preventDefault();let a=N().filter(e=>!e.disabled).map(e=>e.ref.current);R.includes(e.key)&&a.reverse(),function(e){let r=document.activeElement;for(let n of e)if(n===r||(n.focus(),document.activeElement!==r))return}(a)}),onBlur:(0,o.M)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout(U.current),B.current="")}),onPointerMove:(0,o.M)(e.onPointerMove,eI(e=>{let r=e.target,n=q.current!==e.clientX;if(e.currentTarget.contains(r)&&n){let r=e.clientX>q.current?"right":"left";H.current=r,q.current=e.clientX}}))})})})})})})});q.displayName=Y;var ee=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e;return(0,j.jsx)(i.WV.div,{role:"group",...t,ref:r})});ee.displayName="MenuGroup";var er=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e;return(0,j.jsx)(i.WV.div,{...t,ref:r})});er.displayName="MenuLabel";var en="MenuItem",et="menu.itemSelect",eo=t.forwardRef((e,r)=>{let{disabled:n=!1,onSelect:u,...l}=e,d=t.useRef(null),s=V(en,e.__scopeMenu),c=H(en,e.__scopeMenu),p=(0,a.e)(r,d),f=t.useRef(!1);return(0,j.jsx)(ea,{...l,ref:p,disabled:n,onClick:(0,o.M)(e.onClick,()=>{let e=d.current;if(!n&&e){let r=new CustomEvent(et,{bubbles:!0,cancelable:!0});e.addEventListener(et,e=>u?.(e),{once:!0}),(0,i.jH)(e,r),r.defaultPrevented?f.current=!1:s.onClose()}}),onPointerDown:r=>{e.onPointerDown?.(r),f.current=!0},onPointerUp:(0,o.M)(e.onPointerUp,e=>{f.current||e.currentTarget?.click()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let r=""!==c.searchRef.current;!n&&(!r||" "!==e.key)&&b.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})})});eo.displayName=en;var ea=t.forwardRef((e,r)=>{let{__scopeMenu:n,disabled:u=!1,textValue:l,...d}=e,s=H(en,n),c=F(n),p=t.useRef(null),f=(0,a.e)(r,p),[g,v]=t.useState(!1),[h,m]=t.useState("");return t.useEffect(()=>{let e=p.current;e&&m((e.textContent??"").trim())},[d.children]),(0,j.jsx)(I.ItemSlot,{scope:n,disabled:u,textValue:l??h,children:(0,j.jsx)(w.ck,{asChild:!0,...c,focusable:!u,children:(0,j.jsx)(i.WV.div,{role:"menuitem","data-highlighted":g?"":void 0,"aria-disabled":u||void 0,"data-disabled":u?"":void 0,...d,ref:f,onPointerMove:(0,o.M)(e.onPointerMove,eI(e=>{u?s.onItemLeave(e):(s.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eI(e=>s.onItemLeave(e))),onFocus:(0,o.M)(e.onFocus,()=>v(!0)),onBlur:(0,o.M)(e.onBlur,()=>v(!1))})})})}),eu=t.forwardRef((e,r)=>{let{checked:n=!1,onCheckedChange:t,...a}=e;return(0,j.jsx)(eg,{scope:e.__scopeMenu,checked:n,children:(0,j.jsx)(eo,{role:"menuitemcheckbox","aria-checked":ek(n)?"mixed":n,...a,ref:r,"data-state":eP(n),onSelect:(0,o.M)(a.onSelect,()=>t?.(!!ek(n)||!n),{checkForDefaultPrevented:!1})})})});eu.displayName="MenuCheckboxItem";var el="MenuRadioGroup",[ei,ed]=S(el,{value:void 0,onValueChange:()=>{}}),es=t.forwardRef((e,r)=>{let{value:n,onValueChange:t,...o}=e,a=(0,M.W)(t);return(0,j.jsx)(ei,{scope:e.__scopeMenu,value:n,onValueChange:a,children:(0,j.jsx)(ee,{...o,ref:r})})});es.displayName=el;var ec="MenuRadioItem",ep=t.forwardRef((e,r)=>{let{value:n,...t}=e,a=ed(ec,e.__scopeMenu),u=n===a.value;return(0,j.jsx)(eg,{scope:e.__scopeMenu,checked:u,children:(0,j.jsx)(eo,{role:"menuitemradio","aria-checked":u,...t,ref:r,"data-state":eP(u),onSelect:(0,o.M)(t.onSelect,()=>a.onValueChange?.(n),{checkForDefaultPrevented:!1})})})});ep.displayName=ec;var ef="MenuItemIndicator",[eg,ev]=S(ef,{checked:!1}),eh=t.forwardRef((e,r)=>{let{__scopeMenu:n,forceMount:t,...o}=e,a=ev(ef,n);return(0,j.jsx)(m.z,{present:t||ek(a.checked)||!0===a.checked,children:(0,j.jsx)(i.WV.span,{...o,ref:r,"data-state":eP(a.checked)})})});eh.displayName=ef;var em=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e;return(0,j.jsx)(i.WV.div,{role:"separator","aria-orientation":"horizontal",...t,ref:r})});em.displayName="MenuSeparator";var ew=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e,o=O(n);return(0,j.jsx)(v.Eh,{...o,...t,ref:r})});ew.displayName="MenuArrow";var ex="MenuSub",[eM,ey]=S(ex),eC=e=>{let{__scopeMenu:r,children:n,open:o=!1,onOpenChange:a}=e,u=A(ex,r),l=O(r),[i,d]=t.useState(null),[s,c]=t.useState(null),p=(0,M.W)(a);return t.useEffect(()=>(!1===u.open&&p(!1),()=>p(!1)),[u.open,p]),(0,j.jsx)(v.fC,{...l,children:(0,j.jsx)(L,{scope:r,open:o,onOpenChange:p,content:s,onContentChange:c,children:(0,j.jsx)(eM,{scope:r,contentId:(0,g.M)(),triggerId:(0,g.M)(),trigger:i,onTriggerChange:d,children:n})})})};eC.displayName=ex;var ej="MenuSubTrigger",eb=t.forwardRef((e,r)=>{let n=A(ej,e.__scopeMenu),u=V(ej,e.__scopeMenu),l=ey(ej,e.__scopeMenu),i=H(ej,e.__scopeMenu),d=t.useRef(null),{pointerGraceTimerRef:s,onPointerGraceIntentChange:c}=i,p={__scopeMenu:e.__scopeMenu},f=t.useCallback(()=>{d.current&&window.clearTimeout(d.current),d.current=null},[]);return t.useEffect(()=>f,[f]),t.useEffect(()=>{let e=s.current;return()=>{window.clearTimeout(e),c(null)}},[s,c]),(0,j.jsx)(G,{asChild:!0,...p,children:(0,j.jsx)(ea,{id:l.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":l.contentId,"data-state":e_(n.open),...e,ref:(0,a.F)(r,l.onTriggerChange),onClick:r=>{e.onClick?.(r),e.disabled||r.defaultPrevented||(r.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:(0,o.M)(e.onPointerMove,eI(r=>{i.onItemEnter(r),r.defaultPrevented||e.disabled||n.open||d.current||(i.onPointerGraceIntentChange(null),d.current=window.setTimeout(()=>{n.onOpenChange(!0),f()},100))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eI(e=>{f();let r=n.content?.getBoundingClientRect();if(r){let t=n.content?.dataset.side,o="right"===t,a=r[o?"left":"right"],u=r[o?"right":"left"];i.onPointerGraceIntentChange({area:[{x:e.clientX+(o?-5:5),y:e.clientY},{x:a,y:r.top},{x:u,y:r.top},{x:u,y:r.bottom},{x:a,y:r.bottom}],side:t}),window.clearTimeout(s.current),s.current=window.setTimeout(()=>i.onPointerGraceIntentChange(null),300)}else{if(i.onTriggerLeave(e),e.defaultPrevented)return;i.onPointerGraceIntentChange(null)}})),onKeyDown:(0,o.M)(e.onKeyDown,r=>{let t=""!==i.searchRef.current;!e.disabled&&(!t||" "!==r.key)&&_[u.dir].includes(r.key)&&(n.onOpenChange(!0),n.content?.focus(),r.preventDefault())})})})});eb.displayName=ej;var eR="MenuSubContent",eD=t.forwardRef((e,r)=>{let n=z(Y,e.__scopeMenu),{forceMount:u=n.forceMount,...l}=e,i=A(Y,e.__scopeMenu),d=V(Y,e.__scopeMenu),s=ey(eR,e.__scopeMenu),c=t.useRef(null),p=(0,a.e)(r,c);return(0,j.jsx)(I.Provider,{scope:e.__scopeMenu,children:(0,j.jsx)(m.z,{present:u||i.open,children:(0,j.jsx)(I.Slot,{scope:e.__scopeMenu,children:(0,j.jsx)(J,{id:s.contentId,"aria-labelledby":s.triggerId,...l,ref:p,align:"start",side:"rtl"===d.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{d.isUsingKeyboardRef.current&&c.current?.focus(),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,o.M)(e.onFocusOutside,e=>{e.target!==s.trigger&&i.onOpenChange(!1)}),onEscapeKeyDown:(0,o.M)(e.onEscapeKeyDown,e=>{d.onClose(),e.preventDefault()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let r=e.currentTarget.contains(e.target),n=k[d.dir].includes(e.key);r&&n&&(i.onOpenChange(!1),s.trigger?.focus(),e.preventDefault())})})})})})});function e_(e){return e?"open":"closed"}function ek(e){return"indeterminate"===e}function eP(e){return ek(e)?"indeterminate":e?"checked":"unchecked"}function eI(e){return r=>"mouse"===r.pointerType?e(r):void 0}eD.displayName=eR;var eE="DropdownMenu",[eT,eS]=(0,u.b)(eE,[N]),eN=N(),[eO,eF]=eT(eE),eL=e=>{let{__scopeDropdownMenu:r,children:n,dir:o,open:a,defaultOpen:u,onOpenChange:i,modal:d=!0}=e,s=eN(r),c=t.useRef(null),[p=!1,f]=(0,l.T)({prop:a,defaultProp:u,onChange:i});return(0,j.jsx)(eO,{scope:r,triggerId:(0,g.M)(),triggerRef:c,contentId:(0,g.M)(),open:p,onOpenChange:f,onOpenToggle:t.useCallback(()=>f(e=>!e),[f]),modal:d,children:(0,j.jsx)(W,{...s,open:p,onOpenChange:f,dir:o,modal:d,children:n})})};eL.displayName=eE;var eA="DropdownMenuTrigger",eK=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,disabled:t=!1,...u}=e,l=eF(eA,n),d=eN(n);return(0,j.jsx)(G,{asChild:!0,...d,children:(0,j.jsx)(i.WV.button,{type:"button",id:l.triggerId,"aria-haspopup":"menu","aria-expanded":l.open,"aria-controls":l.open?l.contentId:void 0,"data-state":l.open?"open":"closed","data-disabled":t?"":void 0,disabled:t,...u,ref:(0,a.F)(r,l.triggerRef),onPointerDown:(0,o.M)(e.onPointerDown,e=>{t||0!==e.button||!1!==e.ctrlKey||(l.onOpenToggle(),l.open||e.preventDefault())}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{!t&&(["Enter"," "].includes(e.key)&&l.onOpenToggle(),"ArrowDown"===e.key&&l.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})})});eK.displayName=eA;var eV=e=>{let{__scopeDropdownMenu:r,...n}=e,t=eN(r);return(0,j.jsx)(X,{...t,...n})};eV.displayName="DropdownMenuPortal";var eW="DropdownMenuContent",eG=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...a}=e,u=eF(eW,n),l=eN(n),i=t.useRef(!1);return(0,j.jsx)(q,{id:u.contentId,"aria-labelledby":u.triggerId,...l,...a,ref:r,onCloseAutoFocus:(0,o.M)(e.onCloseAutoFocus,e=>{i.current||u.triggerRef.current?.focus(),i.current=!1,e.preventDefault()}),onInteractOutside:(0,o.M)(e.onInteractOutside,e=>{let r=e.detail.originalEvent,n=0===r.button&&!0===r.ctrlKey,t=2===r.button||n;(!u.modal||t)&&(i.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});eG.displayName=eW;var eU=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(ee,{...o,...t,ref:r})});eU.displayName="DropdownMenuGroup";var eB=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(er,{...o,...t,ref:r})});eB.displayName="DropdownMenuLabel";var ez=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(eo,{...o,...t,ref:r})});ez.displayName="DropdownMenuItem";var eX=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(eu,{...o,...t,ref:r})});eX.displayName="DropdownMenuCheckboxItem";var eY=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(es,{...o,...t,ref:r})});eY.displayName="DropdownMenuRadioGroup";var eZ=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(ep,{...o,...t,ref:r})});eZ.displayName="DropdownMenuRadioItem";var eH=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(eh,{...o,...t,ref:r})});eH.displayName="DropdownMenuItemIndicator";var eq=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(em,{...o,...t,ref:r})});eq.displayName="DropdownMenuSeparator",t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(ew,{...o,...t,ref:r})}).displayName="DropdownMenuArrow";var eQ=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(eb,{...o,...t,ref:r})});eQ.displayName="DropdownMenuSubTrigger";var e$=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eN(n);return(0,j.jsx)(eD,{...o,...t,ref:r,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});e$.displayName="DropdownMenuSubContent";var eJ=eL,e0=eK,e1=eV,e2=eG,e7=eU,e9=eB,e6=ez,e5=eX,e8=eY,e3=eZ,e4=eH,re=eq,rr=e=>{let{__scopeDropdownMenu:r,children:n,open:t,onOpenChange:o,defaultOpen:a}=e,u=eN(r),[i=!1,d]=(0,l.T)({prop:t,defaultProp:a,onChange:o});return(0,j.jsx)(eC,{...u,open:i,onOpenChange:d,children:n})},rn=eQ,rt=e$}};