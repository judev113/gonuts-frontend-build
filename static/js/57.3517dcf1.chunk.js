"use strict";(globalThis.webpackChunkreact_project=globalThis.webpackChunkreact_project||[]).push([[57],{11057:(e,a,t)=>{t.d(a,{offchainLookup:()=>w,offchainLookupSignature:()=>m});var s=t(10852),r=t(32102),n=t(30170),o=t(27612);class c extends n.C{constructor({callbackSelector:e,cause:a,data:t,extraData:s,sender:r,urls:n}){super(a.shortMessage||"An error occurred while fetching for an offchain result.",{cause:a,metaMessages:[...a.metaMessages||[],a.metaMessages?.length?"":[],"Offchain Gateway Call:",n&&["  Gateway URL(s):",...n.map((e=>`    ${(0,o.I)(e)}`))],`  Sender: ${r}`,`  Data: ${t}`,`  Callback selector: ${e}`,`  Extra data: ${s}`].flat(),name:"OffchainLookupError"})}}class d extends n.C{constructor({result:e,url:a}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${(0,o.I)(a)}`,`Response: ${(0,r.A)(e)}`],name:"OffchainLookupResponseMalformedError"})}}class l extends n.C{constructor({sender:e,to:a}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${a}`,`OffchainLookup sender address: ${e}`],name:"OffchainLookupSenderMismatchError"})}}var u=t(19284),i=t(13531),p=t(93110),h=t(50230),f=t(51546),y=t(64537);const m="0x556f1830",b={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function w(e,{blockNumber:a,blockTag:t,data:r,to:n}){const{args:o}=(0,i.W)({data:r,abi:[b]}),[d,u,y,m,w]=o,{ccipRead:k}=e,x=k&&"function"===typeof k?.request?k.request:g;try{if(!(0,h.h)(n,d))throw new l({sender:d,to:n});const r=await x({data:y,sender:d,urls:u}),{data:o}=await(0,s.T)(e,{blockNumber:a,blockTag:t,data:(0,f.xW)([m,(0,p.h)([{type:"bytes"},{type:"bytes"}],[r,w])]),to:n});return o}catch(C){throw new c({callbackSelector:m,cause:C,data:r,extraData:w,sender:d,urls:u})}}async function g({data:e,sender:a,urls:t}){let s=new Error("An unknown error occurred.");for(let o=0;o<t.length;o++){const c=t[o],l=c.includes("{data}")?"GET":"POST",i="POST"===l?{data:e,sender:a}:void 0,p="POST"===l?{"Content-Type":"application/json"}:{};try{const t=await fetch(c.replace("{sender}",a).replace("{data}",e),{body:JSON.stringify(i),headers:p,method:l});let n;if(n=t.headers.get("Content-Type")?.startsWith("application/json")?(await t.json()).data:await t.text(),!t.ok){s=new u.Ci({body:i,details:n?.error?(0,r.A)(n.error):t.statusText,headers:t.headers,status:t.status,url:c});continue}if(!(0,y.q)(n)){s=new d({result:n,url:c});continue}return n}catch(n){s=new u.Ci({body:i,details:n.message,url:c})}}throw s}}}]);
//# sourceMappingURL=57.3517dcf1.chunk.js.map