/*! For license information please see 4947be7a.fda4be18.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[998],{1664:e=>{var n=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var n={},t=0;t<10;t++)n["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(n).map((function(e){return n[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(e,o){for(var s,i,a=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var l in s=Object(arguments[c]))t.call(s,l)&&(a[l]=s[l]);if(n){i=n(s);for(var u=0;u<i.length;u++)r.call(s,i[u])&&(a[i[u]]=s[i[u]])}}return a}},2192:(e,n,t)=>{t(1664);var r=t(3696),o=60103;if(n.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var s=Symbol.for;o=s("react.element"),n.Fragment=s("react.fragment")}var i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a=Object.prototype.hasOwnProperty,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,n,t){var r,s={},l=null,u=null;for(r in void 0!==t&&(l=""+t),void 0!==n.key&&(l=""+n.key),void 0!==n.ref&&(u=n.ref),n)a.call(n,r)&&!c.hasOwnProperty(r)&&(s[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===s[r]&&(s[r]=n[r]);return{$$typeof:o,type:e,key:l,ref:u,props:s,_owner:i.current}}n.jsx=l,n.jsxs=l},4403:(e,n,t)=>{var r=t(1664),o=60103,s=60106;n.Fragment=60107,n.StrictMode=60108,n.Profiler=60114;var i=60109,a=60110,c=60112;n.Suspense=60113;var l=60115,u=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;o=f("react.element"),s=f("react.portal"),n.Fragment=f("react.fragment"),n.StrictMode=f("react.strict_mode"),n.Profiler=f("react.profiler"),i=f("react.provider"),a=f("react.context"),c=f("react.forward_ref"),n.Suspense=f("react.suspense"),l=f("react.memo"),u=f("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function h(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g={};function m(e,n,t){this.props=e,this.context=n,this.refs=g,this.updater=t||d}function v(){}function y(e,n,t){this.props=e,this.context=n,this.refs=g,this.updater=t||d}m.prototype.isReactComponent={},m.prototype.setState=function(e,n){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(h(85));this.updater.enqueueSetState(this,e,n,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=m.prototype;var j=y.prototype=new v;j.constructor=y,r(j,m.prototype),j.isPureReactComponent=!0;var x={current:null},b=Object.prototype.hasOwnProperty,w={key:!0,ref:!0,__self:!0,__source:!0};function _(e,n,t){var r,s={},i=null,a=null;if(null!=n)for(r in void 0!==n.ref&&(a=n.ref),void 0!==n.key&&(i=""+n.key),n)b.call(n,r)&&!w.hasOwnProperty(r)&&(s[r]=n[r]);var c=arguments.length-2;if(1===c)s.children=t;else if(1<c){for(var l=Array(c),u=0;u<c;u++)l[u]=arguments[u+2];s.children=l}if(e&&e.defaultProps)for(r in c=e.defaultProps)void 0===s[r]&&(s[r]=c[r]);return{$$typeof:o,type:e,key:i,ref:a,props:s,_owner:x.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var k=/\/+/g;function P(e,n){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return n[e]}))}(""+e.key):n.toString(36)}function O(e,n,t,r,i){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var c=!1;if(null===e)c=!0;else switch(a){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case o:case s:c=!0}}if(c)return i=i(c=e),e=""===r?"."+P(c,0):r,Array.isArray(i)?(t="",null!=e&&(t=e.replace(k,"$&/")+"/"),O(i,n,t,"",(function(e){return e}))):null!=i&&(S(i)&&(i=function(e,n){return{$$typeof:o,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}(i,t+(!i.key||c&&c.key===i.key?"":(""+i.key).replace(k,"$&/")+"/")+e)),n.push(i)),1;if(c=0,r=""===r?".":r+":",Array.isArray(e))for(var l=0;l<e.length;l++){var u=r+P(a=e[l],l);c+=O(a,n,t,u,i)}else if(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof u)for(e=u.call(e),l=0;!(a=e.next()).done;)c+=O(a=a.value,n,t,u=r+P(a,l++),i);else if("object"===a)throw n=""+e,Error(h(31,"[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n));return c}function R(e,n,t){if(null==e)return e;var r=[],o=0;return O(e,r,"","",(function(e){return n.call(t,e,o++)})),r}function C(e){if(-1===e._status){var n=e._result;n=n(),e._status=0,e._result=n,n.then((function(n){0===e._status&&(n=n.default,e._status=1,e._result=n)}),(function(n){0===e._status&&(e._status=2,e._result=n)}))}if(1===e._status)return e._result;throw e._result}var E={current:null};function F(){var e=E.current;if(null===e)throw Error(h(321));return e}var $={ReactCurrentDispatcher:E,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:x,IsSomeRendererActing:{current:!1},assign:r};n.Children={map:R,forEach:function(e,n,t){R(e,(function(){n.apply(this,arguments)}),t)},count:function(e){var n=0;return R(e,(function(){n++})),n},toArray:function(e){return R(e,(function(e){return e}))||[]},only:function(e){if(!S(e))throw Error(h(143));return e}},n.Component=m,n.PureComponent=y,n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,n.cloneElement=function(e,n,t){if(null==e)throw Error(h(267,e));var s=r({},e.props),i=e.key,a=e.ref,c=e._owner;if(null!=n){if(void 0!==n.ref&&(a=n.ref,c=x.current),void 0!==n.key&&(i=""+n.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in n)b.call(n,u)&&!w.hasOwnProperty(u)&&(s[u]=void 0===n[u]&&void 0!==l?l[u]:n[u])}var u=arguments.length-2;if(1===u)s.children=t;else if(1<u){l=Array(u);for(var f=0;f<u;f++)l[f]=arguments[f+2];s.children=l}return{$$typeof:o,type:e.type,key:i,ref:a,props:s,_owner:c}},n.createContext=function(e,n){return void 0===n&&(n=null),(e={$$typeof:a,_calculateChangedBits:n,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},n.createElement=_,n.createFactory=function(e){var n=_.bind(null,e);return n.type=e,n},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:c,render:e}},n.isValidElement=S,n.lazy=function(e){return{$$typeof:u,_payload:{_status:-1,_result:e},_init:C}},n.memo=function(e,n){return{$$typeof:l,type:e,compare:void 0===n?null:n}},n.useCallback=function(e,n){return F().useCallback(e,n)},n.useContext=function(e,n){return F().useContext(e,n)},n.useDebugValue=function(){},n.useEffect=function(e,n){return F().useEffect(e,n)},n.useImperativeHandle=function(e,n,t){return F().useImperativeHandle(e,n,t)},n.useLayoutEffect=function(e,n){return F().useLayoutEffect(e,n)},n.useMemo=function(e,n){return F().useMemo(e,n)},n.useReducer=function(e,n,t){return F().useReducer(e,n,t)},n.useRef=function(e){return F().useRef(e)},n.useState=function(e){return F().useState(e)},n.version="17.0.2"},3696:(e,n,t)=>{e.exports=t(4403)},2540:(e,n,t)=>{e.exports=t(2192)},2689:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>f,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var r=t(2540),o=t(8453);const s={},i="Services",a={id:"configuration/services",title:"Services",description:"Overview",source:"@site/../docs/configuration/services.md",sourceDirName:"configuration",slug:"/configuration/services",permalink:"/launcher/docs/configuration/services",draft:!1,unlisted:!1,editUrl:"https://github.com/FlashpointProject/launcher/edit/develop/website/../docs/configuration/services.md",tags:[],version:"current",lastUpdatedAt:1712257858e3,frontMatter:{},sidebar:"docs",previous:{title:"Getting Started",permalink:"/launcher/docs/introduction"},next:{title:"Keyboard Shortcuts",permalink:"/launcher/docs/configuration/shortcuts"}},c={},l=[{value:"Overview",id:"overview",level:2},{value:"Watch",id:"watch",level:3},{value:"Server",id:"server",level:3},{value:"Stop / Start / Daemon",id:"stop--start--daemon",level:3},{value:"Substitutions",id:"substitutions",level:3},{value:"Example Configuration",id:"example-configuration",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"services",children:"Services"}),"\n",(0,r.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,r.jsx)(n.p,{children:"Flashpoint Launcher supports a few methods of running background processes:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Watch"})," - Starts a watcher for a file and prints the new content to the logs page"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Server"})," - A single server can run at a time, this can be selected on the Config page or forced by a Game's launch parameters"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Start"})," - Runs when the launcher starts"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Stop"})," - Runs when the launcher is about to close"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Daemon"})," - Runs when the launcher starts as a managed process and killed when the launcher is about to close"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"watch",children:"Watch"}),"\n",(0,r.jsx)(n.p,{children:"Watch is a list of file paths. A tail will be started on each and any changed will be printed to the logs page under the Log Watcher source. This is useful for tracking log files from external applications."}),"\n",(0,r.jsx)(n.h3,{id:"server",children:"Server"}),"\n",(0,r.jsx)(n.p,{children:"A server is started alongside the launcher. Multiple servers can be defined but a single one is chosen via the Config page."}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Name"})," - Name that is shown in the Config page"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Path"})," - Path to set as the working directory when executing."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Filename"})," - Filename relative to the Path to execute."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Arguments"})," - A list of arguments to pass to the process on execution."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Kill"})," - Whether to kill the process when the launcher closes or not."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"MAD4FP"})," - (Optional) - Whether this is a MAD4FP enabled server. This server will be used when ",(0,r.jsx)(n.code,{children:"Run With MAD4FP"})," is used from the Curate page."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "name": "NameInConfigPage",\n  "path": "DirectoryToRunIn",\n  "filename": "FileToRun",\n  "arguments": ["arguments", "to", "pass"],\n  "kill": true,\n  "mad4fp": true\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"stop--start--daemon",children:"Stop / Start / Daemon"}),"\n",(0,r.jsx)(n.p,{children:"Stop / Start processes and Daemon services can be given to run with the launcher. Start / Stop processes are run exactly once during startup and shutdown of the launcher. Daemon processes and started at startup can be controlled via the Developer page."}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Path"})," - Path to set as the working directory when executing."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Filename"})," - Filename relative to the Path to execute."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Arguments"})," - A list of arguments to pass to the server on execution."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "path": "DirectoryToRunIn",\n  "filename": "FileToRun",\n  "arguments": ["arguments", "to", "pass"]\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"substitutions",children:"Substitutions"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"path"}),", ",(0,r.jsx)(n.code,{children:"filename"})," and ",(0,r.jsx)(n.code,{children:"arguments"})," fields of all of these also support a few subtitutions:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<fpPath>"})," - Flashpoint Path as defined in the Config page"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<cwd>"})," - Working directory of the Launcher executable"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"<os>"})," - Operating system of the host (",(0,r.jsx)(n.code,{children:"win32"}),", ",(0,r.jsx)(n.code,{children:"darwin"})," or ",(0,r.jsx)(n.code,{children:"linux"}),")"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["e.g. ",(0,r.jsx)(n.code,{children:"<fpPath>/Server/config.yaml"})," can be a useful tool when passing a config file as an argument."]}),"\n",(0,r.jsx)(n.h2,{id:"example-configuration",children:"Example Configuration"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "watch": [\n    "<fpPath>/Server/logs/stripped.log"\n  ],\n  "server": [\n    {\n      "name": "PHP Router",\n      "path": "Server",\n      "filename": "php",\n      "arguments": ["-S", "127.0.0.1:22500", "router.php"],\n      "kill": true\n    },\n    {\n      "name": "Apache Webserver",\n      "path": "Server",\n      "filename": "httpd",\n      "arguments": ["-f", "<fpPath>/Server/conf/httpd.conf", "-X"],\n      "kill": true\n    }\n  ],\n  "start": [\n    {\n      "path": "Server",\n      "filename": "php",\n      "arguments": ["-f", "update_httpdconf_main_dir.php"]\n    }\n  ],\n  "stop": [\n    {\n      "path": "Server",\n      "filename": "php",\n      "arguments": ["-f", "reset_httpdconf_main_dir.php"]\n    },\n    {\n      "path": "FPSoftware/Redirector",\n      "filename": "Redirect.exe",\n      "arguments": ["/close"]\n    },\n    {\n      "path": "FPSoftware/Fiddler2Portable/App/Fiddler",\n      "filename": "ExecAction.exe",\n      "arguments": ["quit"]\n    }\n  ]\n}\n'})})]})}function f(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var r=t(6540);const o={},s=r.createContext(o);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);