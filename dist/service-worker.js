if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const d={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return d;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./service-worker.js",["./workbox-15dd0bab"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/favicon.ico",revision:"1e3b603eb3ca35f18134124cb14a65ff"},{url:"/index.html",revision:"dfdd41274a9992d9a857949b1ec36d4c"},{url:"/main.bundle.js",revision:"5137d3e4f9125ecc576d49f05320e8b5"},{url:"/manifest.json",revision:"1be4886a415b03a3c4c5cdfb696d0284"},{url:"/react.bundle.js",revision:"44c5b307ddbce8dcc0340d3b03da20d4"},{url:"/react.bundle.js.LICENSE.txt",revision:"ca4958d6077c463bd517a446b4e2b484"},{url:"/vender.bundle.js",revision:"53f85ffcdabf19076efd884a6fcc209a"},{url:"/vender.bundle.js.LICENSE.txt",revision:"e2417c77fa0d0e193f97f4361a998d08"}],{})}));
