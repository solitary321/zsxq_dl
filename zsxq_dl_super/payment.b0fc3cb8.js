import{c as o}from"./config.e27a43c6.js";const l=chrome&&chrome.storage&&!!chrome.storage.sync;function u(e){return l?new Promise((t,s)=>{chrome.storage.sync.set(e,()=>{chrome.runtime.lastError?s(chrome.runtime.lastError):t()})}):(localStorage.setItem("__storage__",JSON.stringify(e)),Promise.resolve())}function n(e){if(l)return new Promise((t,s)=>{chrome.storage.sync.get(e,r=>{chrome.runtime.lastError?s(chrome.runtime.lastError):t(e?r&&r[e]:r)})});{const t=JSON.parse(localStorage.getItem("__storage__"));return Promise.resolve(e?t&&t[e]:t)}}async function m(e){const t=await n(`${e}_download_history`);return t||{}}async function h(e,t){await u({[`${e}_download_history`]:t})}function i(e,t=2){let s=e.toString();for(let r=0;r<t;r++)s="0"+s;return s.substring(s.length-t)}function _(){var a;const e=window.navigator.userAgent||"",t=e.indexOf("Chrome")!==-1&&e.indexOf("Safari")!==-1,s=t&&e.indexOf("Edg")!==-1,r=((a=chrome.runtime)==null?void 0:a.id)||"";return t?`${s?"https://microsoftedge.microsoft.com/addons/detail":"https://chrome.google.com/webstore/detail/"}/${r}`:o.website_home}function w(e,t){t=Math.floor(t);let s=t<0?"-":"+",r="00"+Math.abs(t);return r=r.substring(r.length-2),new Date(e.getTime()+60*60*1e3*t).toISOString().replace("Z",`${s}${r}:00`)}function g(e){return e.state==="success"?{valid:!0,expire_at:e.expire_at}:e.state==="invalid"?{valid:e.re&&e.re.state==="success",expire_at:e.re?e.re.expire_at:e.expire_at}:{valid:!1,expire_at:e.expire_at}}function p(e){if(e<=0)return"--";const t=new Date(e*1e3);return`${i(t.getFullYear(),4)}-${i(t.getMonth()+1)}-${i(t.getDate())}`}function v(){const e=`${o.server_host}`;window.open(e,"_blank")}async function x(){let e=await n("detail");if(!e)return{validated:!1};if((await n("savedAt")||1)+o.cache_max_age>Date.now())return f(e);const r=await(await fetch(`${o.server_host}/license?key=${e.orderid}`)).json();return r.code===0&&(e=r.data,await u({detail:e,savedAt:Date.now()})),f(e)}function f(e){if(!e)return null;const t=g(e),s=t.valid,r=t.expire_at,a=e.orderid,c=e.urlkey;return{validated:s,expire_at:r,key:a,urlkey:c}}export{v as a,x as b,_ as c,n as d,u as e,p as f,m as g,g as h,h as s,w as t};
