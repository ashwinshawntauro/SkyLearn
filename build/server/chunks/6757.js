"use strict";exports.id=6757,exports.ids=[6757],exports.modules={83615:(t,e,n)=>{var s,o,i,a,r,l,c,d,u,h,f,g;n.d(e,{$D:()=>V}),function(t){t.STRING="string",t.NUMBER="number",t.INTEGER="integer",t.BOOLEAN="boolean",t.ARRAY="array",t.OBJECT="object"}(s||(s={})),function(t){t.LANGUAGE_UNSPECIFIED="language_unspecified",t.PYTHON="python"}(o||(o={})),function(t){t.OUTCOME_UNSPECIFIED="outcome_unspecified",t.OUTCOME_OK="outcome_ok",t.OUTCOME_FAILED="outcome_failed",t.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"}(i||(i={}));let E=["user","model","function","system"];(function(t){t.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",t.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",t.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",t.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",t.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(a||(a={})),function(t){t.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",t.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",t.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",t.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",t.BLOCK_NONE="BLOCK_NONE"}(r||(r={})),function(t){t.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",t.NEGLIGIBLE="NEGLIGIBLE",t.LOW="LOW",t.MEDIUM="MEDIUM",t.HIGH="HIGH"}(l||(l={})),function(t){t.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",t.SAFETY="SAFETY",t.OTHER="OTHER"}(c||(c={})),function(t){t.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",t.STOP="STOP",t.MAX_TOKENS="MAX_TOKENS",t.SAFETY="SAFETY",t.RECITATION="RECITATION",t.LANGUAGE="LANGUAGE",t.OTHER="OTHER"}(d||(d={})),function(t){t.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",t.RETRIEVAL_QUERY="RETRIEVAL_QUERY",t.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",t.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",t.CLASSIFICATION="CLASSIFICATION",t.CLUSTERING="CLUSTERING"}(u||(u={})),function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.AUTO="AUTO",t.ANY="ANY",t.NONE="NONE"}(h||(h={})),function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.MODE_DYNAMIC="MODE_DYNAMIC"}(f||(f={}));class p extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class C extends p{constructor(t,e){super(t),this.response=e}}class m extends p{constructor(t,e,n,s){super(t),this.status=e,this.statusText=n,this.errorDetails=s}}class y extends p{}!function(t){t.GENERATE_CONTENT="generateContent",t.STREAM_GENERATE_CONTENT="streamGenerateContent",t.COUNT_TOKENS="countTokens",t.EMBED_CONTENT="embedContent",t.BATCH_EMBED_CONTENTS="batchEmbedContents"}(g||(g={}));class O{constructor(t,e,n,s,o){this.model=t,this.task=e,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var t,e;let n=(null===(t=this.requestOptions)||void 0===t?void 0:t.apiVersion)||"v1beta",s=(null===(e=this.requestOptions)||void 0===e?void 0:e.baseUrl)||"https://generativelanguage.googleapis.com",o=`${s}/${n}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}}async function v(t){var e;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(t){let e=[];return(null==t?void 0:t.apiClient)&&e.push(t.apiClient),e.push("genai-js/0.21.0"),e.join(" ")}(t.requestOptions)),n.append("x-goog-api-key",t.apiKey);let s=null===(e=t.requestOptions)||void 0===e?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(t){throw new y(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${t.message}`)}for(let[t,e]of s.entries()){if("x-goog-api-key"===t)throw new y(`Cannot set reserved header name ${t}`);if("x-goog-api-client"===t)throw new y(`Header name ${t} can only be set using the apiClient field`);n.append(t,e)}}return n}async function _(t,e,n,s,o,i){let a=new O(t,e,n,s,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},function(t){let e={};if((null==t?void 0:t.signal)!==void 0||(null==t?void 0:t.timeout)>=0){let n=new AbortController;(null==t?void 0:t.timeout)>=0&&setTimeout(()=>n.abort(),t.timeout),(null==t?void 0:t.signal)&&t.signal.addEventListener("abort",()=>{n.abort()}),e.signal=n.signal}return e}(i)),{method:"POST",headers:await v(a),body:o})}}async function I(t,e,n,s,o,i={},a=fetch){let{url:r,fetchOptions:l}=await _(t,e,n,s,o,i);return T(r,l,a)}async function T(t,e,n=fetch){let s;try{s=await n(t,e)}catch(e){(function(t,e){let n=t;throw t instanceof m||t instanceof y||((n=new p(`Error fetching from ${e.toString()}: ${t.message}`)).stack=t.stack),n})(e,t)}return s.ok||await N(s,t),s}async function N(t,e){let n,s="";try{let e=await t.json();s=e.error.message,e.error.details&&(s+=` ${JSON.stringify(e.error.details)}`,n=e.error.details)}catch(t){}throw new m(`Error fetching from ${e.toString()}: [${t.status} ${t.statusText}] ${s}`,t.status,t.statusText,n)}function R(t){return t.text=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),S(t.candidates[0]))throw new C(`${w(t)}`,t);return function(t){var e,n,s,o;let i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(let e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.text&&i.push(e.text),e.executableCode&&i.push("\n```"+e.executableCode.language+"\n"+e.executableCode.code+"\n```\n"),e.codeExecutionResult&&i.push("\n```\n"+e.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}(t)}if(t.promptFeedback)throw new C(`Text not available. ${w(t)}`,t);return""},t.functionCall=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),S(t.candidates[0]))throw new C(`${w(t)}`,t);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),A(t)[0]}if(t.promptFeedback)throw new C(`Function call not available. ${w(t)}`,t)},t.functionCalls=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),S(t.candidates[0]))throw new C(`${w(t)}`,t);return A(t)}if(t.promptFeedback)throw new C(`Function call not available. ${w(t)}`,t)},t}function A(t){var e,n,s,o;let i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(let e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.functionCall&&i.push(e.functionCall);return i.length>0?i:void 0}let b=[d.RECITATION,d.SAFETY,d.LANGUAGE];function S(t){return!!t.finishReason&&b.includes(t.finishReason)}function w(t){var e,n,s;let o="";if((!t.candidates||0===t.candidates.length)&&t.promptFeedback)o+="Response was blocked",(null===(e=t.promptFeedback)||void 0===e?void 0:e.blockReason)&&(o+=` due to ${t.promptFeedback.blockReason}`),(null===(n=t.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${t.promptFeedback.blockReasonMessage}`);else if(null===(s=t.candidates)||void 0===s?void 0:s[0]){let e=t.candidates[0];S(e)&&(o+=`Candidate was blocked due to ${e.finishReason}`,e.finishMessage&&(o+=`: ${e.finishMessage}`))}return o}function M(t){return this instanceof M?(this.v=t,this):new M(t)}"function"==typeof SuppressedError&&SuppressedError;let x=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function D(t){let e=[],n=t.getReader();for(;;){let{done:t,value:s}=await n.read();if(t)return R(function(t){let e=t[t.length-1],n={promptFeedback:null==e?void 0:e.promptFeedback};for(let e of t){if(e.candidates)for(let t of e.candidates){let e=t.index;if(n.candidates||(n.candidates=[]),n.candidates[e]||(n.candidates[e]={index:t.index}),n.candidates[e].citationMetadata=t.citationMetadata,n.candidates[e].groundingMetadata=t.groundingMetadata,n.candidates[e].finishReason=t.finishReason,n.candidates[e].finishMessage=t.finishMessage,n.candidates[e].safetyRatings=t.safetyRatings,t.content&&t.content.parts){n.candidates[e].content||(n.candidates[e].content={role:t.content.role||"user",parts:[]});let s={};for(let o of t.content.parts)o.text&&(s.text=o.text),o.functionCall&&(s.functionCall=o.functionCall),o.executableCode&&(s.executableCode=o.executableCode),o.codeExecutionResult&&(s.codeExecutionResult=o.codeExecutionResult),0===Object.keys(s).length&&(s.text=""),n.candidates[e].content.parts.push(s)}}e.usageMetadata&&(n.usageMetadata=e.usageMetadata)}return n}(e));e.push(s)}}async function L(t,e,n,s){return function(t){let[e,n]=(function(t){let e=t.getReader();return new ReadableStream({start(t){let n="";return function s(){return e.read().then(({value:e,done:o})=>{let i;if(o){if(n.trim()){t.error(new p("Failed to parse stream"));return}t.close();return}let a=(n+=e).match(x);for(;a;){try{i=JSON.parse(a[1])}catch(e){t.error(new p(`Error parsing JSON response: "${a[1]}"`));return}t.enqueue(i),a=(n=n.substring(a[0].length)).match(x)}return s()})}()}})})(t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(t){return function(t,e,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(t,e||[]),i=[];return s={},a("next"),a("throw"),a("return"),s[Symbol.asyncIterator]=function(){return this},s;function a(t){o[t]&&(s[t]=function(e){return new Promise(function(n,s){i.push([t,e,n,s])>1||r(t,e)})})}function r(t,e){try{var n;(n=o[t](e)).value instanceof M?Promise.resolve(n.value.v).then(l,c):d(i[0][2],n)}catch(t){d(i[0][3],t)}}function l(t){r("next",t)}function c(t){r("throw",t)}function d(t,e){t(e),i.shift(),i.length&&r(i[0][0],i[0][1])}}(this,arguments,function*(){let e=t.getReader();for(;;){let{value:t,done:n}=yield M(e.read());if(n)break;yield yield M(R(t))}})}(e),response:D(n)}}(await I(e,g.STREAM_GENERATE_CONTENT,t,!0,JSON.stringify(n),s))}async function H(t,e,n,s){let o=await I(e,g.GENERATE_CONTENT,t,!1,JSON.stringify(n),s);return{response:R(await o.json())}}function j(t){if(null!=t){if("string"==typeof t)return{role:"system",parts:[{text:t}]};if(t.text)return{role:"system",parts:[t]};if(t.parts)return t.role?t:{role:"system",parts:t.parts}}}function F(t){let e=[];if("string"==typeof t)e=[{text:t}];else for(let n of t)"string"==typeof n?e.push({text:n}):e.push(n);return function(t){let e={role:"user",parts:[]},n={role:"function",parts:[]},s=!1,o=!1;for(let i of t)"functionResponse"in i?(n.parts.push(i),o=!0):(e.parts.push(i),s=!0);if(s&&o)throw new p("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new p("No content is provided for sending chat message.");return s?e:n}(e)}function P(t){let e;return e=t.contents?t:{contents:[F(t)]},t.systemInstruction&&(e.systemInstruction=j(t.systemInstruction)),e}let U=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],$={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]},G="SILENT_ERROR";class K{constructor(t,e,n,s={}){this.model=e,this.params=n,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,(null==n?void 0:n.history)&&(function(t){let e=!1;for(let n of t){let{role:t,parts:s}=n;if(!e&&"user"!==t)throw new p(`First content should be with role 'user', got ${t}`);if(!E.includes(t))throw new p(`Each item should include role field. Got ${t} but valid roles are: ${JSON.stringify(E)}`);if(!Array.isArray(s))throw new p("Content should have 'parts' property with an array of Parts");if(0===s.length)throw new p("Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let t of s)for(let e of U)e in t&&(o[e]+=1);let i=$[t];for(let e of U)if(!i.includes(e)&&o[e]>0)throw new p(`Content with role '${t}' can't contain '${e}' part`);e=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,e={}){var n,s,o,i,a,r;let l;await this._sendPromise;let c=F(t),d={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,c]},u=Object.assign(Object.assign({},this._requestOptions),e);return this._sendPromise=this._sendPromise.then(()=>H(this._apiKey,this.model,d,u)).then(t=>{var e;if(t.response.candidates&&t.response.candidates.length>0){this._history.push(c);let n=Object.assign({parts:[],role:"model"},null===(e=t.response.candidates)||void 0===e?void 0:e[0].content);this._history.push(n)}else{let e=w(t.response);e&&console.warn(`sendMessage() was unsuccessful. ${e}. Inspect response object for details.`)}l=t}),await this._sendPromise,l}async sendMessageStream(t,e={}){var n,s,o,i,a,r;await this._sendPromise;let l=F(t),c={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,l]},d=Object.assign(Object.assign({},this._requestOptions),e),u=L(this._apiKey,this.model,c,d);return this._sendPromise=this._sendPromise.then(()=>u).catch(t=>{throw Error(G)}).then(t=>t.response).then(t=>{if(t.candidates&&t.candidates.length>0){this._history.push(l);let e=Object.assign({},t.candidates[0].content);e.role||(e.role="model"),this._history.push(e)}else{let e=w(t);e&&console.warn(`sendMessageStream() was unsuccessful. ${e}. Inspect response object for details.`)}}).catch(t=>{t.message!==G&&console.error(t)}),u}}async function Y(t,e,n,s){return(await I(e,g.COUNT_TOKENS,t,!1,JSON.stringify(n),s)).json()}async function k(t,e,n,s){return(await I(e,g.EMBED_CONTENT,t,!1,JSON.stringify(n),s)).json()}async function B(t,e,n,s){let o=n.requests.map(t=>Object.assign(Object.assign({},t),{model:e}));return(await I(e,g.BATCH_EMBED_CONTENTS,t,!1,JSON.stringify({requests:o}),s)).json()}class q{constructor(t,e,n={}){this.apiKey=t,this._requestOptions=n,e.model.includes("/")?this.model=e.model:this.model=`models/${e.model}`,this.generationConfig=e.generationConfig||{},this.safetySettings=e.safetySettings||[],this.tools=e.tools,this.toolConfig=e.toolConfig,this.systemInstruction=j(e.systemInstruction),this.cachedContent=e.cachedContent}async generateContent(t,e={}){var n;let s=P(t),o=Object.assign(Object.assign({},this._requestOptions),e);return H(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}async generateContentStream(t,e={}){var n;let s=P(t),o=Object.assign(Object.assign({},this._requestOptions),e);return L(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}startChat(t){var e;return new K(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(e=this.cachedContent)||void 0===e?void 0:e.name},t),this._requestOptions)}async countTokens(t,e={}){let n=function(t,e){var n;let s={model:null==e?void 0:e.model,generationConfig:null==e?void 0:e.generationConfig,safetySettings:null==e?void 0:e.safetySettings,tools:null==e?void 0:e.tools,toolConfig:null==e?void 0:e.toolConfig,systemInstruction:null==e?void 0:e.systemInstruction,cachedContent:null===(n=null==e?void 0:e.cachedContent)||void 0===n?void 0:n.name,contents:[]},o=null!=t.generateContentRequest;if(t.contents){if(o)throw new y("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=t.contents}else if(o)s=Object.assign(Object.assign({},s),t.generateContentRequest);else{let e=F(t);s.contents=[e]}return{generateContentRequest:s}}(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),e);return Y(this.apiKey,this.model,n,s)}async embedContent(t,e={}){let n="string"==typeof t||Array.isArray(t)?{content:F(t)}:t,s=Object.assign(Object.assign({},this._requestOptions),e);return k(this.apiKey,this.model,n,s)}async batchEmbedContents(t,e={}){let n=Object.assign(Object.assign({},this._requestOptions),e);return B(this.apiKey,this.model,t,n)}}class V{constructor(t){this.apiKey=t}getGenerativeModel(t,e){if(!t.model)throw new p("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new q(this.apiKey,t,e)}getGenerativeModelFromCachedContent(t,e,n){if(!t.name)throw new y("Cached content must contain a `name` field.");if(!t.model)throw new y("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==e?void 0:e[n])&&t[n]&&(null==e?void 0:e[n])!==t[n]){if("model"===n&&(e.model.startsWith("models/")?e.model.replace("models/",""):e.model)===(t.model.startsWith("models/")?t.model.replace("models/",""):t.model))continue;throw new y(`Different value for "${n}" specified in modelParams (${e[n]}) and cachedContent (${t[n]})`)}let s=Object.assign(Object.assign({},e),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new q(this.apiKey,s,n)}}},8754:(t,e,n)=>{n.d(e,{VY:()=>M,aV:()=>S,fC:()=>b,xz:()=>w});var s=n(28964),o=n(70319),i=n(20732),a=n(47403),r=n(67264),l=n(22251),c=n(71310),d=n(28469),u=n(27015),h=n(97247),f="Tabs",[g,E]=(0,i.b)(f,[a.Pc]),p=(0,a.Pc)(),[C,m]=g(f),y=s.forwardRef((t,e)=>{let{__scopeTabs:n,value:s,onValueChange:o,defaultValue:i,orientation:a="horizontal",dir:r,activationMode:f="automatic",...g}=t,E=(0,c.gm)(r),[p,m]=(0,d.T)({prop:s,onChange:o,defaultProp:i});return(0,h.jsx)(C,{scope:n,baseId:(0,u.M)(),value:p,onValueChange:m,orientation:a,dir:E,activationMode:f,children:(0,h.jsx)(l.WV.div,{dir:E,"data-orientation":a,...g,ref:e})})});y.displayName=f;var O="TabsList",v=s.forwardRef((t,e)=>{let{__scopeTabs:n,loop:s=!0,...o}=t,i=m(O,n),r=p(n);return(0,h.jsx)(a.fC,{asChild:!0,...r,orientation:i.orientation,dir:i.dir,loop:s,children:(0,h.jsx)(l.WV.div,{role:"tablist","aria-orientation":i.orientation,...o,ref:e})})});v.displayName=O;var _="TabsTrigger",I=s.forwardRef((t,e)=>{let{__scopeTabs:n,value:s,disabled:i=!1,...r}=t,c=m(_,n),d=p(n),u=R(c.baseId,s),f=A(c.baseId,s),g=s===c.value;return(0,h.jsx)(a.ck,{asChild:!0,...d,focusable:!i,active:g,children:(0,h.jsx)(l.WV.button,{type:"button",role:"tab","aria-selected":g,"aria-controls":f,"data-state":g?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:u,...r,ref:e,onMouseDown:(0,o.M)(t.onMouseDown,t=>{i||0!==t.button||!1!==t.ctrlKey?t.preventDefault():c.onValueChange(s)}),onKeyDown:(0,o.M)(t.onKeyDown,t=>{[" ","Enter"].includes(t.key)&&c.onValueChange(s)}),onFocus:(0,o.M)(t.onFocus,()=>{let t="manual"!==c.activationMode;g||i||!t||c.onValueChange(s)})})})});I.displayName=_;var T="TabsContent",N=s.forwardRef((t,e)=>{let{__scopeTabs:n,value:o,forceMount:i,children:a,...c}=t,d=m(T,n),u=R(d.baseId,o),f=A(d.baseId,o),g=o===d.value,E=s.useRef(g);return s.useEffect(()=>{let t=requestAnimationFrame(()=>E.current=!1);return()=>cancelAnimationFrame(t)},[]),(0,h.jsx)(r.z,{present:i||g,children:({present:n})=>(0,h.jsx)(l.WV.div,{"data-state":g?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":u,hidden:!n,id:f,tabIndex:0,...c,ref:e,style:{...t.style,animationDuration:E.current?"0s":void 0},children:n&&a})})});function R(t,e){return`${t}-trigger-${e}`}function A(t,e){return`${t}-content-${e}`}N.displayName=T;var b=y,S=v,w=I,M=N}};