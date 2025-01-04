const util=require("./util.cjs"),abi=require("./abi.cjs"),TYPED_MESSAGE_SCHEMA={type:"object",properties:{types:{type:"object",additionalProperties:{type:"array",items:{type:"object",properties:{name:{type:"string"},type:{type:"string"}},required:["name","type"]}}},primaryType:{type:"string"},domain:{type:"object"},message:{type:"object"}},required:["types","primaryType","domain","message"]},TypedDataUtils={encodeData(e,t,i,r=!0){const n=["bytes32"],s=[this.hashType(e,i)];if(r){const a=(e,t,n)=>{if(void 0!==i[t])return["bytes32",null==n?"0x0000000000000000000000000000000000000000000000000000000000000000":util.keccak(this.encodeData(t,n,i,r))];if(void 0===n)throw new Error(`missing value for field ${e} of type ${t}`);if("bytes"===t)return["bytes32",util.keccak(n)];if("string"===t)return"string"===typeof n&&(n=Buffer.from(n,"utf8")),["bytes32",util.keccak(n)];if(t.lastIndexOf("]")===t.length-1){const i=t.slice(0,t.lastIndexOf("[")),r=n.map((t=>a(e,i,t)));return["bytes32",util.keccak(abi.rawEncode(r.map((([e])=>e)),r.map((([,e])=>e))))]}return[t,n]};for(const r of i[e]){const[e,i]=a(r.name,r.type,t[r.name]);n.push(e),s.push(i)}}else for(const a of i[e]){let e=t[a.name];if(void 0!==e)if("bytes"===a.type)n.push("bytes32"),e=util.keccak(e),s.push(e);else if("string"===a.type)n.push("bytes32"),"string"===typeof e&&(e=Buffer.from(e,"utf8")),e=util.keccak(e),s.push(e);else if(void 0!==i[a.type])n.push("bytes32"),e=util.keccak(this.encodeData(a.type,e,i,r)),s.push(e);else{if(a.type.lastIndexOf("]")===a.type.length-1)throw new Error("Arrays currently unimplemented in encodeData");n.push(a.type),s.push(e)}}return abi.rawEncode(n,s)},encodeType(e,t){let i="",r=this.findTypeDependencies(e,t).filter((t=>t!==e));r=[e].concat(r.sort());for(const n of r){if(!t[n])throw new Error("No type definition specified: "+n);i+=n+"("+t[n].map((({name:e,type:t})=>t+" "+e)).join(",")+")"}return i},findTypeDependencies(e,t,i=[]){if(e=e.match(/^\w*/)[0],i.includes(e)||void 0===t[e])return i;i.push(e);for(const r of t[e])for(const e of this.findTypeDependencies(r.type,t,i))!i.includes(e)&&i.push(e);return i},hashStruct(e,t,i,r=!0){return util.keccak(this.encodeData(e,t,i,r))},hashType(e,t){return util.keccak(this.encodeType(e,t))},sanitizeData(e){const t={};for(const i in TYPED_MESSAGE_SCHEMA.properties)e[i]&&(t[i]=e[i]);return t.types&&(t.types=Object.assign({EIP712Domain:[]},t.types)),t},hash(e,t=!0){const i=this.sanitizeData(e),r=[Buffer.from("1901","hex")];return r.push(this.hashStruct("EIP712Domain",i.domain,i.types,t)),"EIP712Domain"!==i.primaryType&&r.push(this.hashStruct(i.primaryType,i.message,i.types,t)),util.keccak(Buffer.concat(r))}};function typedSignatureHashLegacy(e){const t=new Error("Expect argument to be non-empty array");if("object"!==typeof e||!e.length)throw t;const i=e.map((function(e){return"bytes"===e.type?util.toBuffer(e.value):e.value})),r=e.map((function(e){return e.type})),n=e.map((function(e){if(!e.name)throw t;return e.type+" "+e.name}));return abi.soliditySHA3(["bytes32","bytes32"],[abi.soliditySHA3(new Array(e.length).fill("string"),n),abi.soliditySHA3(r,i)])}module.exports={TYPED_MESSAGE_SCHEMA:TYPED_MESSAGE_SCHEMA,TypedDataUtils:TypedDataUtils,hashForSignTypedDataLegacy:function(e){return typedSignatureHashLegacy(e.data)},hashForSignTypedData_v3:function(e){return TypedDataUtils.hash(e.data,!1)},hashForSignTypedData_v4:function(e){return TypedDataUtils.hash(e.data)}};