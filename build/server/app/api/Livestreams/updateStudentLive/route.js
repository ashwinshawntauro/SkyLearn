"use strict";(()=>{var e={};e.id=9005,e.ids=[9005],e.modules={53524:e=>{e.exports=require("@prisma/client")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},95793:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>S,patchFetch:()=>x,requestAsyncStorage:()=>c,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>v});var a={};r.r(a),r.d(a,{POST:()=>p});var s=r(73278),n=r(45002),i=r(54877),o=r(53524),u=r(71309);let d=new o.PrismaClient;async function p(e){let{duration:t,liveId:r}=await e.json();try{let e=await d.sTUDENTCLASSES.findFirst({where:{livestreaming_id:parseInt(r)},select:{id:!0,attended_duration:!0}});if(!e)return u.NextResponse.json({error:"Livestreaming record not found"},{status:404});let a=e.attended_duration+parseInt(t),s=await d.sTUDENTCLASSES.update({where:{id:e.id},data:{attended_duration:parseInt(a)}});return u.NextResponse.json(s,{status:200})}catch(e){return console.error("Error updating course:",e),u.NextResponse.json({error:"Internal Server Error"},{status:500})}}let l=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/Livestreams/updateStudentLive/route",pathname:"/api/Livestreams/updateStudentLive",filename:"route",bundlePath:"app/api/Livestreams/updateStudentLive/route"},resolvedPagePath:"D:\\skylearn\\src\\app\\api\\Livestreams\\updateStudentLive\\route.js",nextConfigOutput:"",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:v,serverHooks:m}=l,S="/api/Livestreams/updateStudentLive/route";function x(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:v})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[9379,4833],()=>r(95793));module.exports=a})();