/*! For license information please see b28802bd.f52e4541.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[251],{1664:e=>{var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(e,o){for(var i,u,a=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),s=1;s<arguments.length;s++){for(var c in i=Object(arguments[s]))n.call(i,c)&&(a[c]=i[c]);if(t){u=t(i);for(var l=0;l<u.length;l++)r.call(i,u[l])&&(a[u[l]]=i[u[l]])}}return a}},2192:(e,t,n)=>{n(1664);var r=n(3696),o=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),t.Fragment=i("react.fragment")}var u=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a=Object.prototype.hasOwnProperty,s={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,i={},c=null,l=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(l=t.ref),t)a.call(t,r)&&!s.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===i[r]&&(i[r]=t[r]);return{$$typeof:o,type:e,key:c,ref:l,props:i,_owner:u.current}}t.jsx=c,t.jsxs=c},4403:(e,t,n)=>{var r=n(1664),o=60103,i=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var u=60109,a=60110,s=60112;t.Suspense=60113;var c=60115,l=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;o=f("react.element"),i=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),u=f("react.provider"),a=f("react.context"),s=f("react.forward_ref"),t.Suspense=f("react.suspense"),c=f("react.memo"),l=f("react.lazy")}var d="function"==typeof Symbol&&Symbol.iterator;function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y={};function m(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||h}function v(){}function b(e,t,n){this.props=e,this.context=t,this.refs=y,this.updater=n||h}m.prototype.isReactComponent={},m.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(p(85));this.updater.enqueueSetState(this,e,t,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=m.prototype;var w=b.prototype=new v;w.constructor=b,r(w,m.prototype),w.isPureReactComponent=!0;var g={current:null},_=Object.prototype.hasOwnProperty,j={key:!0,ref:!0,__self:!0,__source:!0};function x(e,t,n){var r,i={},u=null,a=null;if(null!=t)for(r in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(u=""+t.key),t)_.call(t,r)&&!j.hasOwnProperty(r)&&(i[r]=t[r]);var s=arguments.length-2;if(1===s)i.children=n;else if(1<s){for(var c=Array(s),l=0;l<s;l++)c[l]=arguments[l+2];i.children=c}if(e&&e.defaultProps)for(r in s=e.defaultProps)void 0===i[r]&&(i[r]=s[r]);return{$$typeof:o,type:e,key:u,ref:a,props:i,_owner:g.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var O=/\/+/g;function S(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function C(e,t,n,r,u){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var s=!1;if(null===e)s=!0;else switch(a){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case o:case i:s=!0}}if(s)return u=u(s=e),e=""===r?"."+S(s,0):r,Array.isArray(u)?(n="",null!=e&&(n=e.replace(O,"$&/")+"/"),C(u,t,n,"",(function(e){return e}))):null!=u&&(k(u)&&(u=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(u,n+(!u.key||s&&s.key===u.key?"":(""+u.key).replace(O,"$&/")+"/")+e)),t.push(u)),1;if(s=0,r=""===r?".":r+":",Array.isArray(e))for(var c=0;c<e.length;c++){var l=r+S(a=e[c],c);s+=C(a,t,n,l,u)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),c=0;!(a=e.next()).done;)s+=C(a=a.value,t,n,l=r+S(a,c++),u);else if("object"===a)throw t=""+e,Error(p(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return s}function E(e,t,n){if(null==e)return e;var r=[],o=0;return C(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function R(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var P={current:null};function $(){var e=P.current;if(null===e)throw Error(p(321));return e}var I={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:g,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:E,forEach:function(e,t,n){E(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return E(e,(function(){t++})),t},toArray:function(e){return E(e,(function(e){return e}))||[]},only:function(e){if(!k(e))throw Error(p(143));return e}},t.Component=m,t.PureComponent=b,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I,t.cloneElement=function(e,t,n){if(null==e)throw Error(p(267,e));var i=r({},e.props),u=e.key,a=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,s=g.current),void 0!==t.key&&(u=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)_.call(t,l)&&!j.hasOwnProperty(l)&&(i[l]=void 0===t[l]&&void 0!==c?c[l]:t[l])}var l=arguments.length-2;if(1===l)i.children=n;else if(1<l){c=Array(l);for(var f=0;f<l;f++)c[f]=arguments[f+2];i.children=c}return{$$typeof:o,type:e.type,key:u,ref:a,props:i,_owner:s}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:a,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:u,_context:e},e.Consumer=e},t.createElement=x,t.createFactory=function(e){var t=x.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:s,render:e}},t.isValidElement=k,t.lazy=function(e){return{$$typeof:l,_payload:{_status:-1,_result:e},_init:R}},t.memo=function(e,t){return{$$typeof:c,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return $().useCallback(e,t)},t.useContext=function(e,t){return $().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return $().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return $().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return $().useLayoutEffect(e,t)},t.useMemo=function(e,t){return $().useMemo(e,t)},t.useReducer=function(e,t,n){return $().useReducer(e,t,n)},t.useRef=function(e){return $().useRef(e)},t.useState=function(e){return $().useState(e)},t.version="17.0.2"},3696:(e,t,n)=>{e.exports=n(4403)},2540:(e,t,n)=>{e.exports=n(2192)},5152:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>u,default:()=>f,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=n(2540),o=n(8453);const i={},u="Introduction",a={id:"development/introduction",title:"Introduction",description:"Overview",source:"@site/../docs/development/introduction.md",sourceDirName:"development",slug:"/development/introduction",permalink:"/launcher/docs/development/introduction",draft:!1,unlisted:!1,editUrl:"https://github.com/FlashpointProject/launcher/edit/develop/website/../docs/development/introduction.md",tags:[],version:"current",lastUpdatedAt:1712390049e3,frontMatter:{},sidebar:"docs",previous:{title:"Credits",permalink:"/launcher/docs/configuration/credits"},next:{title:"Setup",permalink:"/launcher/docs/development/setup"}},s={},c=[{value:"Overview",id:"overview",level:3},{value:"Setup and Contributions",id:"setup-and-contributions",level:2},{value:"Future Considerations",id:"future-considerations",level:2},{value:"Essential Reading",id:"essential-reading",level:2}];function l(e){const t={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"introduction",children:"Introduction"}),"\n",(0,r.jsx)(t.h3,{id:"overview",children:"Overview"}),"\n",(0,r.jsx)(t.p,{children:"This section is here to explain the architecture of the Flashpoint Launcher at a technical level, and the common practices you'll probably use when making contributions."}),"\n",(0,r.jsx)(t.p,{children:"It's been written to document the techniques and systems that have been developed over time to create the launcher software. Try not to treat it as a hard and fast rule on what is accepted, but more of a helpful reference."}),"\n",(0,r.jsx)(t.p,{children:"The documentation assumes you have a basic understanding of Typescript, React and Nodejs. Whilst it will sometimes point out specific functions from these APIs and mention what they do, you are expected to either understand them already or be willing to look them up in their own documentation."}),"\n",(0,r.jsx)(t.h2,{id:"setup-and-contributions",children:"Setup and Contributions"}),"\n",(0,r.jsxs)(t.p,{children:["See ",(0,r.jsx)(t.a,{href:"setup",children:"Setup"})," to set up your development environment."]}),"\n",(0,r.jsxs)(t.p,{children:["See ",(0,r.jsx)(t.a,{href:"gitworkflow",children:"Git Workflow"})," to learn how to start committing and merging your contributions."]}),"\n",(0,r.jsx)(t.h2,{id:"future-considerations",children:"Future Considerations"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"React 17"})," - React 18 comes with breaking changes, so hasn't been worked on. A migratory pull request would be welcome, otherwise the plan is to wait for React 19 so we can reap the benefits of the React Compiler."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Electron 19"})," - Electron 19 is very outdated now but does the job fine.If there becomes a need for more modern Chromium functionality, then Electron will have to update and drop the Flash support in browser mode."]}),"\n",(0,r.jsx)(t.h2,{id:"essential-reading",children:"Essential Reading"}),"\n",(0,r.jsx)(t.p,{children:"Whilst some concepts are only used on occasion, there are some things you'll want to come back and reference frequently."}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"communication",children:"Front / Back Communication"})," - Almost everything you do will involve sending data between the frontend and backend, so this is vital to understand."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"database",children:"Database API"})," - Interacting with the Database API is common place in the backend."]}),"\n"]})]})}function f(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>u,x:()=>a});var r=n(6540);const o={},i=r.createContext(o);function u(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:u(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);