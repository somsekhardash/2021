if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const c={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return c;default:return e(r)}}))).then((e=>{const r=n(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-15dd0bab"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/index.html",revision:"953352e8aa7f1159bec5157558791584"},{url:"/main.bundle.js",revision:"fb57cf84c504563f023f6f6e43dd2148"},{url:"/manifest.json",revision:"1be4886a415b03a3c4c5cdfb696d0284"},{url:"/react.bundle.js",revision:"ff1eed3ce170326e662d4dc59b52e5df"},{url:"/react.bundle.js.LICENSE.txt",revision:"84e8476f3add7ac9cc4fb4e90e321a69"},{url:"/vender.bundle.js",revision:"ef8acdc0c75d3046f1c96b71cb599755"},{url:"/vender.bundle.js.LICENSE.txt",revision:"d072ce79cf368e7a64eed7dfc47407f9"}],{})}));
