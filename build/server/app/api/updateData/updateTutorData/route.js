"use strict";(()=>{var e={};e.id=3868,e.ids=[3868],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79022:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>D,patchFetch:()=>h,requestAsyncStorage:()=>c,routeModule:()=>l,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var a={};r.r(a),r.d(a,{PUT:()=>d});var u=r(73278),o=r(45002),s=r(54877),n=r(53524),p=r(71309);let i=new n.PrismaClient;async function d(e){try{let{newUserName:t,newAdd:r,userId:a}=await e.json();if(!t||!r||!a)return p.NextResponse.json({error:"Missing required fields"},{status:400});let u=await i.tUTOR.update({where:{tutor_id:a},data:{tutor_name:t,address:r}});return p.NextResponse.json(u)}catch(e){return console.error("Error updating user:",e),p.NextResponse.json({error:"Internal Server Error"},{status:500})}}let l=new u.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/updateData/updateTutorData/route",pathname:"/api/updateData/updateTutorData",filename:"route",bundlePath:"app/api/updateData/updateTutorData/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\updateData\\updateTutorData\\route.js",nextConfigOutput:"",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:x}=l,D="/api/updateData/updateTutorData/route";function h(){return(0,s.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[9379,4833],()=>r(79022));module.exports=a})();