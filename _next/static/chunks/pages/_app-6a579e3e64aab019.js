(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{5017:function(n,t,e){"use strict";e.d(t,{ZP:function(){return d},wW:function(){return p}});var r=e(1720),o=e(4298),i=e(1752),u=e(3454);const l=(n,...t)=>{var e,r;let o=null!==(e=n.basePath)&&void 0!==e?e:"";return n.subdirectory&&(o+=`/${n.subdirectory}`),`${o}/js/${[null!==(r=n.scriptName)&&void 0!==r?r:"script",...t.sort().filter((n=>null!==n))].join(".")}.js`},c="https://plausible.io",a=(n,t)=>t||n===c?"plausible":"index",s=n=>{var t;return null!==(t=n.customDomain)&&void 0!==t?t:c},f=n=>{var t,e;return`${null!==(t=n.basePath)&&void 0!==t?t:""}/${null!==(e=n.subdirectory)&&void 0!==e?e:"proxy"}/api/event${n.trailingSlash?"/":""}`};function d(n){var t,e;const{enabled:c=!u.env.NEXT_PUBLIC_VERCEL_ENV||"production"===u.env.NEXT_PUBLIC_VERCEL_ENV}=n,d=s(n),p=null===(e=null===(t=(0,i.default)())||void 0===t?void 0:t.publicRuntimeConfig)||void 0===e?void 0:e.nextPlausiblePublicProxyOptions;return r.default.createElement(r.default.Fragment,null,c&&r.default.createElement(o.default,Object.assign({async:!0,defer:!0,"data-api":p?f(p):void 0,"data-domain":n.domain,"data-exclude":n.exclude,src:(p?"":d)+l(Object.assign(Object.assign({},p),{scriptName:p?p.scriptName:a(d,n.selfHosted)}),n.trackLocalhost?"local":null,n.manualPageviews?"manual":null,n.trackOutboundLinks?"outbound-links":null,n.exclude?"exclusions":null,n.trackFileDownloads?"file-downloads":null),integrity:n.integrity,crossOrigin:n.integrity?"anonymous":void 0},n.scriptProps)),c&&r.default.createElement(o.default,{id:"next-plausible-init",dangerouslySetInnerHTML:{__html:"window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }"}}),n.children)}function p(){return(0,r.useCallback)((function(n,...t){var e,r;return null===(r=(e=window).plausible)||void 0===r?void 0:r.call(e,n,t[0])}),[])}},1752:function(n,t,e){n.exports=e(8027)},3454:function(n,t,e){"use strict";var r,o;n.exports=(null===(r=e.g.process)||void 0===r?void 0:r.env)&&"object"===typeof(null===(o=e.g.process)||void 0===o?void 0:o.env)?e.g.process:e(7663)},1780:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return e(8510)}])},8510:function(n,t,e){"use strict";e.r(t);var r=e(7997),o=e(5017);e(5482);function i(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function u(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})))),r.forEach((function(t){i(n,t,e[t])}))}return n}t.default=function(n){var t=n.Component,e=n.pageProps;return(0,r.tZ)(o.ZP,{domain:"garrit.xyz",customDomain:"https://analytics.slashdev.space",selfHosted:!0,trackOutboundLinks:!0,children:(0,r.tZ)(t,u({},e))})}},5482:function(){},7663:function(n){!function(){var t={162:function(n){var t,e,r=n.exports={};function o(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function u(n){if(t===setTimeout)return setTimeout(n,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(n,0);try{return t(n,0)}catch(r){try{return t.call(null,n,0)}catch(r){return t.call(this,n,0)}}}!function(){try{t="function"===typeof setTimeout?setTimeout:o}catch(n){t=o}try{e="function"===typeof clearTimeout?clearTimeout:i}catch(n){e=i}}();var l,c=[],a=!1,s=-1;function f(){a&&l&&(a=!1,l.length?c=l.concat(c):s=-1,c.length&&d())}function d(){if(!a){var n=u(f);a=!0;for(var t=c.length;t;){for(l=c,c=[];++s<t;)l&&l[s].run();s=-1,t=c.length}l=null,a=!1,function(n){if(e===clearTimeout)return clearTimeout(n);if((e===i||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(n);try{e(n)}catch(t){try{return e.call(null,n)}catch(t){return e.call(this,n)}}}(n)}}function p(n,t){this.fun=n,this.array=t}function v(){}r.nextTick=function(n){var t=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)t[e-1]=arguments[e];c.push(new p(n,t)),1!==c.length||a||u(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=v,r.addListener=v,r.once=v,r.off=v,r.removeListener=v,r.removeAllListeners=v,r.emit=v,r.prependListener=v,r.prependOnceListener=v,r.listeners=function(n){return[]},r.binding=function(n){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(n){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}},u=!0;try{t[n](i,i.exports,r),u=!1}finally{u&&delete e[n]}return i.exports}r.ab="//";var o=r(162);n.exports=o}()},4298:function(n,t,e){n.exports=e(699)},7997:function(n,t,e){"use strict";e.d(t,{HY:function(){return r.HY},tZ:function(){return i},BX:function(){return i}});e(1720);var r=e(6400),o=0;function i(n,t,e,i,u){var l,c,a={};for(c in t)"ref"==c?l=t[c]:a[c]=t[c];var s={type:n,props:a,key:e,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--o,__source:u,__self:i};if("function"==typeof n&&(l=n.defaultProps))for(c in l)void 0===a[c]&&(a[c]=l[c]);return r.YM.vnode&&r.YM.vnode(s),s}}},function(n){var t=function(t){return n(n.s=t)};n.O(0,[179],(function(){return t(1780),t(387)}));var e=n.O();_N_E=e}]);