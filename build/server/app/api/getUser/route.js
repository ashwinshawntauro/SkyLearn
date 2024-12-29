"use strict";(()=>{var e={};e.id=118,e.ids=[118],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},11401:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>_,requestAsyncStorage:()=>m,routeModule:()=>l,serverHooks:()=>g,staticGenerationAsyncStorage:()=>c});var s={};r.r(s),r.d(s,{GET:()=>p});var n=r(73278),a=r(45002),i=r(54877),o=r(53524),u=r(71309);let d=new o.PrismaClient;async function p(e){let{searchParams:t}=new URL(e.url),r=t.get("userEmail");if(!r)return u.NextResponse.json({error:"Missing userEmail parameter"},{status:400});try{let e=await d.sTUDENT.findUnique({where:{student_email:r},select:{student_email:!0,student_id:!0,student_name:!0,address:!0}});if(e)return u.NextResponse.json({id:e.student_id,email:e.student_email,name:e.student_name,role:"student",address:e.address});let t=await d.tUTOR.findUnique({where:{tutor_email:r},select:{tutor_email:!0,tutor_id:!0,tutor_name:!0,address:!0}});if(t)return u.NextResponse.json({id:t.tutor_id,email:t.tutor_email,name:t.tutor_name,address:t.address,role:"teacher"});return u.NextResponse.json({error:"No user found"},{status:400})}catch(e){return console.error("Error fetching user:",e),u.NextResponse.json({error:"Internal Server Error"},{status:500})}}let l=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/getUser/route",pathname:"/api/getUser",filename:"route",bundlePath:"app/api/getUser/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\getUser\\route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:m,staticGenerationAsyncStorage:c,serverHooks:g}=l,x="/api/getUser/route";function _(){return(0,i.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:c})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9379,4833],()=>r(11401));module.exports=s})();