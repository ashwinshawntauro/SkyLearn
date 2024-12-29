"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9754],{9376:function(e,t,n){var r=n(5475);n.o(r,"useParams")&&n.d(t,{useParams:function(){return r.useParams}}),n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}}),n.o(r,"useRouter")&&n.d(t,{useRouter:function(){return r.useRouter}}),n.o(r,"useSearchParams")&&n.d(t,{useSearchParams:function(){return r.useSearchParams}})},6741:function(e,t,n){n.d(t,{M:function(){return r}});function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}},9863:function(e,t,n){n.d(t,{B:function(){return l}});var r=n(2265),o=n(7437),u=n(8575),i=n(7053);function l(e){let t=e+"CollectionProvider",[n,l]=function(e,t=[]){let n=[],u=()=>{let t=n.map(e=>r.createContext(e));return function(n){let o=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return u.scopeName=e,[function(t,u){let i=r.createContext(u),l=n.length;function c(t){let{scope:n,children:u,...c}=t,a=n?.[e][l]||i,s=r.useMemo(()=>c,Object.values(c));return(0,o.jsx)(a.Provider,{value:s,children:u})}return n=[...n,u],c.displayName=t+"Provider",[c,function(n,o){let c=o?.[e][l]||i,a=r.useContext(c);if(a)return a;if(void 0!==u)return u;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return n.scopeName=t.scopeName,n}(u,...t)]}(t),[c,a]=n(t,{collectionRef:{current:null},itemMap:new Map}),s=e=>{let{scope:t,children:n}=e,u=r.useRef(null),i=r.useRef(new Map).current;return(0,o.jsx)(c,{scope:t,itemMap:i,collectionRef:u,children:n})};s.displayName=t;let f=e+"CollectionSlot",d=r.forwardRef((e,t)=>{let{scope:n,children:r}=e,l=a(f,n),c=(0,u.e)(t,l.collectionRef);return(0,o.jsx)(i.g7,{ref:c,children:r})});d.displayName=f;let m=e+"CollectionItemSlot",p="data-radix-collection-item",v=r.forwardRef((e,t)=>{let{scope:n,children:l,...c}=e,s=r.useRef(null),f=(0,u.e)(t,s),d=a(m,n);return r.useEffect(()=>(d.itemMap.set(s,{ref:s,...c}),()=>void d.itemMap.delete(s))),(0,o.jsx)(i.g7,{[p]:"",ref:f,children:l})});return v.displayName=m,[{Provider:s,Slot:d,ItemSlot:v},function(t){let n=a(e+"CollectionConsumer",t);return r.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(p,"]")));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},l]}},8575:function(e,t,n){n.d(t,{F:function(){return o},e:function(){return u}});var r=n(2265);function o(...e){return t=>e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}function u(...e){return r.useCallback(o(...e),e)}},3966:function(e,t,n){n.d(t,{b:function(){return i},k:function(){return u}});var r=n(2265),o=n(7437);function u(e,t){let n=r.createContext(t),u=e=>{let{children:t,...u}=e,i=r.useMemo(()=>u,Object.values(u));return(0,o.jsx)(n.Provider,{value:i,children:t})};return u.displayName=e+"Provider",[u,function(o){let u=r.useContext(n);if(u)return u;if(void 0!==t)return t;throw Error(`\`${o}\` must be used within \`${e}\``)}]}function i(e,t=[]){let n=[],u=()=>{let t=n.map(e=>r.createContext(e));return function(n){let o=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return u.scopeName=e,[function(t,u){let i=r.createContext(u),l=n.length;n=[...n,u];let c=t=>{let{scope:n,children:u,...c}=t,a=n?.[e]?.[l]||i,s=r.useMemo(()=>c,Object.values(c));return(0,o.jsx)(a.Provider,{value:s,children:u})};return c.displayName=t+"Provider",[c,function(n,o){let c=o?.[e]?.[l]||i,a=r.useContext(c);if(a)return a;if(void 0!==u)return u;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return n.scopeName=t.scopeName,n}(u,...t)]}},9114:function(e,t,n){n.d(t,{gm:function(){return u}});var r=n(2265);n(7437);var o=r.createContext(void 0);function u(e){let t=r.useContext(o);return e||t||"ltr"}},9255:function(e,t,n){n.d(t,{M:function(){return c}});var r,o=n(2265),u=n(1188),i=(r||(r=n.t(o,2)))["useId".toString()]||(()=>void 0),l=0;function c(e){let[t,n]=o.useState(i());return(0,u.b)(()=>{e||n(e=>e??String(l++))},[e]),e||(t?`radix-${t}`:"")}},1599:function(e,t,n){n.d(t,{z:function(){return i}});var r=n(2265),o=n(8575),u=n(1188),i=e=>{var t,n;let i,c;let{present:a,children:s}=e,f=function(e){var t,n;let[o,i]=r.useState(),c=r.useRef({}),a=r.useRef(e),s=r.useRef("none"),[f,d]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},r.useReducer((e,t)=>{let r=n[e][t];return null!=r?r:e},t));return r.useEffect(()=>{let e=l(c.current);s.current="mounted"===f?e:"none"},[f]),(0,u.b)(()=>{let t=c.current,n=a.current;if(n!==e){let r=s.current,o=l(t);e?d("MOUNT"):"none"===o||(null==t?void 0:t.display)==="none"?d("UNMOUNT"):n&&r!==o?d("ANIMATION_OUT"):d("UNMOUNT"),a.current=e}},[e,d]),(0,u.b)(()=>{if(o){var e;let t;let n=null!==(e=o.ownerDocument.defaultView)&&void 0!==e?e:window,r=e=>{let r=l(c.current).includes(e.animationName);if(e.target===o&&r&&(d("ANIMATION_END"),!a.current)){let e=o.style.animationFillMode;o.style.animationFillMode="forwards",t=n.setTimeout(()=>{"forwards"===o.style.animationFillMode&&(o.style.animationFillMode=e)})}},u=e=>{e.target===o&&(s.current=l(c.current))};return o.addEventListener("animationstart",u),o.addEventListener("animationcancel",r),o.addEventListener("animationend",r),()=>{n.clearTimeout(t),o.removeEventListener("animationstart",u),o.removeEventListener("animationcancel",r),o.removeEventListener("animationend",r)}}d("ANIMATION_END")},[o,d]),{isPresent:["mounted","unmountSuspended"].includes(f),ref:r.useCallback(e=>{e&&(c.current=getComputedStyle(e)),i(e)},[])}}(a),d="function"==typeof s?s({present:f.isPresent}):r.Children.only(s),m=(0,o.e)(f.ref,(i=null===(t=Object.getOwnPropertyDescriptor(d.props,"ref"))||void 0===t?void 0:t.get)&&"isReactWarning"in i&&i.isReactWarning?d.ref:(i=null===(n=Object.getOwnPropertyDescriptor(d,"ref"))||void 0===n?void 0:n.get)&&"isReactWarning"in i&&i.isReactWarning?d.props.ref:d.props.ref||d.ref);return"function"==typeof s||f.isPresent?r.cloneElement(d,{ref:m}):null};function l(e){return(null==e?void 0:e.animationName)||"none"}i.displayName="Presence"},6840:function(e,t,n){n.d(t,{WV:function(){return l},jH:function(){return c}});var r=n(2265),o=n(4887),u=n(7053),i=n(7437),l=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=r.forwardRef((e,n)=>{let{asChild:r,...o}=e,l=r?u.g7:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,i.jsx)(l,{...o,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function c(e,t){e&&o.flushSync(()=>e.dispatchEvent(t))}},4545:function(e,t,n){n.d(t,{ck:function(){return A},fC:function(){return _},Pc:function(){return y}});var r=n(2265),o=n(6741),u=n(9863),i=n(8575),l=n(7437),c=n(9255),a=n(6840),s=n(6606),f=n(886),d=n(9114),m="rovingFocusGroup.onEntryFocus",p={bubbles:!1,cancelable:!0},v="RovingFocusGroup",[N,g,w]=(0,u.B)(v),[h,y]=function(e,t=[]){let n=[],o=()=>{let t=n.map(e=>r.createContext(e));return function(n){let o=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return o.scopeName=e,[function(t,o){let u=r.createContext(o),i=n.length;function c(t){let{scope:n,children:o,...c}=t,a=n?.[e][i]||u,s=r.useMemo(()=>c,Object.values(c));return(0,l.jsx)(a.Provider,{value:s,children:o})}return n=[...n,o],c.displayName=t+"Provider",[c,function(n,l){let c=l?.[e][i]||u,a=r.useContext(c);if(a)return a;if(void 0!==o)return o;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return n.scopeName=t.scopeName,n}(o,...t)]}(v,[w]),[b,M]=h(v),R=r.forwardRef((e,t)=>(0,l.jsx)(N.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,l.jsx)(N.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,l.jsx)(x,{...e,ref:t})})}));R.displayName=v;var x=r.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,orientation:u,loop:c=!1,dir:v,currentTabStopId:N,defaultCurrentTabStopId:w,onCurrentTabStopIdChange:h,onEntryFocus:y,preventScrollOnEntryFocus:M=!1,...R}=e,x=r.useRef(null),C=(0,i.e)(t,x),E=(0,d.gm)(v),[P=null,_]=(0,f.T)({prop:N,defaultProp:w,onChange:h}),[A,j]=r.useState(!1),O=(0,s.W)(y),T=g(n),I=r.useRef(!1),[F,D]=r.useState(0);return r.useEffect(()=>{let e=x.current;if(e)return e.addEventListener(m,O),()=>e.removeEventListener(m,O)},[O]),(0,l.jsx)(b,{scope:n,orientation:u,dir:E,loop:c,currentTabStopId:P,onItemFocus:r.useCallback(e=>_(e),[_]),onItemShiftTab:r.useCallback(()=>j(!0),[]),onFocusableItemAdd:r.useCallback(()=>D(e=>e+1),[]),onFocusableItemRemove:r.useCallback(()=>D(e=>e-1),[]),children:(0,l.jsx)(a.WV.div,{tabIndex:A||0===F?-1:0,"data-orientation":u,...R,ref:C,style:{outline:"none",...e.style},onMouseDown:(0,o.M)(e.onMouseDown,()=>{I.current=!0}),onFocus:(0,o.M)(e.onFocus,e=>{let t=!I.current;if(e.target===e.currentTarget&&t&&!A){let t=new CustomEvent(m,p);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=T().filter(e=>e.focusable);S([e.find(e=>e.active),e.find(e=>e.id===P),...e].filter(Boolean).map(e=>e.ref.current),M)}}I.current=!1}),onBlur:(0,o.M)(e.onBlur,()=>j(!1))})})}),C="RovingFocusGroupItem",E=r.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,focusable:u=!0,active:i=!1,tabStopId:s,...f}=e,d=(0,c.M)(),m=s||d,p=M(C,n),v=p.currentTabStopId===m,w=g(n),{onFocusableItemAdd:h,onFocusableItemRemove:y}=p;return r.useEffect(()=>{if(u)return h(),()=>y()},[u,h,y]),(0,l.jsx)(N.ItemSlot,{scope:n,id:m,focusable:u,active:i,children:(0,l.jsx)(a.WV.span,{tabIndex:v?0:-1,"data-orientation":p.orientation,...f,ref:t,onMouseDown:(0,o.M)(e.onMouseDown,e=>{u?p.onItemFocus(m):e.preventDefault()}),onFocus:(0,o.M)(e.onFocus,()=>p.onItemFocus(m)),onKeyDown:(0,o.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){p.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,n){var r;let o=(r=e.key,"rtl"!==n?r:"ArrowLeft"===r?"ArrowRight":"ArrowRight"===r?"ArrowLeft":r);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(o))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(o)))return P[o]}(e,p.orientation,p.dir);if(void 0!==t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let o=w().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)o.reverse();else if("prev"===t||"next"===t){var n,r;"prev"===t&&o.reverse();let u=o.indexOf(e.currentTarget);o=p.loop?(n=o,r=u+1,n.map((e,t)=>n[(r+t)%n.length])):o.slice(u+1)}setTimeout(()=>S(o))}})})})});E.displayName=C;var P={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function S(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.activeElement;for(let r of e)if(r===n||(r.focus({preventScroll:t}),document.activeElement!==n))return}var _=R,A=E},7053:function(e,t,n){n.d(t,{A4:function(){return c},g7:function(){return i}});var r=n(2265),o=n(8575),u=n(7437),i=r.forwardRef((e,t)=>{let{children:n,...o}=e,i=r.Children.toArray(n),c=i.find(a);if(c){let e=c.props.children,n=i.map(t=>t!==c?t:r.Children.count(e)>1?r.Children.only(null):r.isValidElement(e)?e.props.children:null);return(0,u.jsx)(l,{...o,ref:t,children:r.isValidElement(e)?r.cloneElement(e,void 0,n):null})}return(0,u.jsx)(l,{...o,ref:t,children:n})});i.displayName="Slot";var l=r.forwardRef((e,t)=>{let{children:n,...u}=e;if(r.isValidElement(n)){let e,i;let l=(e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.props.ref:n.props.ref||n.ref;return r.cloneElement(n,{...function(e,t){let n={...t};for(let r in t){let o=e[r],u=t[r];/^on[A-Z]/.test(r)?o&&u?n[r]=(...e)=>{u(...e),o(...e)}:o&&(n[r]=o):"style"===r?n[r]={...o,...u}:"className"===r&&(n[r]=[o,u].filter(Boolean).join(" "))}return{...e,...n}}(u,n.props),ref:t?(0,o.F)(t,l):l})}return r.Children.count(n)>1?r.Children.only(null):null});l.displayName="SlotClone";var c=({children:e})=>(0,u.jsx)(u.Fragment,{children:e});function a(e){return r.isValidElement(e)&&e.type===c}},6606:function(e,t,n){n.d(t,{W:function(){return o}});var r=n(2265);function o(e){let t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...e)=>t.current?.(...e),[])}},886:function(e,t,n){n.d(t,{T:function(){return u}});var r=n(2265),o=n(6606);function u({prop:e,defaultProp:t,onChange:n=()=>{}}){let[u,i]=function({defaultProp:e,onChange:t}){let n=r.useState(e),[u]=n,i=r.useRef(u),l=(0,o.W)(t);return r.useEffect(()=>{i.current!==u&&(l(u),i.current=u)},[u,i,l]),n}({defaultProp:t,onChange:n}),l=void 0!==e,c=l?e:u,a=(0,o.W)(n);return[c,r.useCallback(t=>{if(l){let n="function"==typeof t?t(e):t;n!==e&&a(n)}else i(t)},[l,e,i,a])]}},1188:function(e,t,n){n.d(t,{b:function(){return o}});var r=n(2265),o=globalThis?.document?r.useLayoutEffect:()=>{}}}]);