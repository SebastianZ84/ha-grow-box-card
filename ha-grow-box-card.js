/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$2=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$4,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$4(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$1=t$2.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n$1=`<${o$2}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$3.createTreeWalker(r$3,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1},r$2=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$2(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r$1(r){return n({...r,state:!0,attribute:!1})}

let HaGrowBoxCard = class HaGrowBoxCard extends i {
    constructor() {
        super(...arguments);
        this.plantInfoCache = new Map();
        this.plantDataCache = new Map();
        this.sliderValues = new Map();
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return editor; });
        return document.createElement('ha-grow-box-card-editor');
    }
    static getStubConfig() {
        return {
            type: 'custom:ha-grow-box-card',
            name: 'Grow Box',
            vpd: {
                enabled: true,
                show_phases: true
            },
            plants: [
                { name: 'Plant 1', position: 1 },
                { name: 'Plant 2', position: 2 },
                { name: 'Plant 3', position: 3 },
                { name: 'Plant 4', position: 4 }
            ]
        };
    }
    setConfig(config) {
        if (!config) {
            throw new Error('Invalid configuration');
        }
        this.config = config;
        // Clear caches when config changes
        this.plantInfoCache.clear();
        this.plantDataCache.clear();
    }
    async updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('hass') || changedProperties.has('config')) {
            await this.preloadPlantData();
        }
    }
    async preloadPlantData() {
        var _a;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.plants) || !this.hass)
            return;
        for (const plant of this.config.plants) {
            if (plant.entity && !this.plantDataCache.has(plant.entity)) {
                const plantEntity = this.hass.states[plant.entity];
                if (plantEntity) {
                    try {
                        const healthData = await this.calculatePlantHealth(plantEntity, plant);
                        const plantData = {
                            moisture: await this.getPlantSensorValue(plantEntity, 'moisture', plant),
                            light: await this.getPlantSensorValue(plantEntity, 'illuminance', plant),
                            temp: await this.getPlantSensorValue(plantEntity, 'temperature', plant),
                            ec: await this.getPlantSensorValue(plantEntity, 'conductivity', plant),
                            health: healthData.health,
                            status: healthData.status,
                            healthColor: healthData.color
                        };
                        this.plantDataCache.set(plant.entity, plantData);
                        this.requestUpdate(); // Trigger re-render with new data
                    }
                    catch (error) {
                        console.error(`Error preloading data for plant ${plant.entity}:`, error);
                    }
                }
            }
        }
    }
    getCardSize() {
        return 8;
    }
    calculateVPD() {
        if (!this.config.inner_temp_entity || !this.config.inner_humidity_entity || !this.config.leaf_temp_entity) {
            return { vpd: 0, phase: 'Unknown', color: '#666' };
        }
        const tempState = this.hass.states[this.config.inner_temp_entity];
        const humidityState = this.hass.states[this.config.inner_humidity_entity];
        const leafTempState = this.hass.states[this.config.leaf_temp_entity];
        if (!tempState || !humidityState || !leafTempState) {
            return { vpd: 0, phase: 'Unknown', color: '#666' };
        }
        const temp = parseFloat(tempState.state);
        const humidity = parseFloat(humidityState.state);
        const leafTemp = parseFloat(leafTempState.state);
        // VPD calculation
        const satVaporPressure = 610.7 * Math.exp(17.27 * temp / (temp + 237.3)) / 1000;
        const actualVaporPressure = satVaporPressure * (humidity / 100);
        const leafSatVaporPressure = 610.7 * Math.exp(17.27 * leafTemp / (leafTemp + 237.3)) / 1000;
        const vpd = leafSatVaporPressure - actualVaporPressure;
        // Determine growth phase based on VPD
        let phase = 'Unknown';
        let color = '#666';
        if (vpd < 0.4) {
            phase = 'Too Low';
            color = '#f44336';
        }
        else if (vpd <= 0.8) {
            phase = 'Seedling';
            color = '#4caf50';
        }
        else if (vpd <= 1.0) {
            phase = 'Vegetative';
            color = '#2196f3';
        }
        else if (vpd <= 1.3) {
            phase = 'Flowering';
            color = '#9c27b0';
        }
        else {
            phase = 'Too High';
            color = '#f44336';
        }
        return { vpd, phase, color };
    }
    renderStatusIndicator(entityId) {
        if (!entityId || !this.hass) {
            return x `<span class="status-indicator unknown">?</span>`;
        }
        const state = this.hass.states[entityId];
        if (!state) {
            return x `<span class="status-indicator unknown">?</span>`;
        }
        const isOn = state.state === 'on' || state.state === 'heat' || state.state === 'cool' || parseFloat(state.state) > 0;
        const className = isOn ? 'on' : 'off';
        const icon = isOn ? '●' : '○';
        return x `<span class="status-indicator ${className}">${icon}</span>`;
    }
    getLightBrightness() {
        var _a;
        if (!this.config.light_entity || !this.hass) {
            return 'N/A';
        }
        const state = this.hass.states[this.config.light_entity];
        if (!state)
            return 'N/A';
        if (state.state === 'off')
            return '0%';
        const brightness = (_a = state.attributes) === null || _a === void 0 ? void 0 : _a.brightness;
        if (brightness !== undefined) {
            return `${Math.round((brightness / 255) * 100)}%`;
        }
        return state.state === 'on' ? '100%' : '0%';
    }
    getFanSpeed(entityId) {
        var _a, _b, _c;
        if (!this.hass)
            return 'N/A';
        const state = this.hass.states[entityId];
        if (!state)
            return 'N/A';
        if (state.state === 'off')
            return '0%';
        const percentage = (_a = state.attributes) === null || _a === void 0 ? void 0 : _a.percentage;
        if (percentage !== undefined) {
            return `${Math.round(percentage)}%`;
        }
        const speed = ((_b = state.attributes) === null || _b === void 0 ? void 0 : _b.speed) || ((_c = state.attributes) === null || _c === void 0 ? void 0 : _c.preset_mode);
        if (speed) {
            // Convert named speeds to percentages
            const speedMap = {
                'low': 33,
                'medium': 66,
                'high': 100,
                'off': 0
            };
            return `${speedMap[speed.toLowerCase()] || 50}%`;
        }
        return state.state === 'on' ? '100%' : '0%';
    }
    getDeviceStatus(entityId) {
        if (!this.hass)
            return 'N/A';
        const state = this.hass.states[entityId];
        if (!state)
            return 'N/A';
        const stateValue = state.state.toLowerCase();
        if (stateValue === 'on' || stateValue === 'heat' || stateValue === 'cool') {
            return 'AN';
        }
        else if (stateValue === 'off') {
            return 'AUS';
        }
        else if (parseFloat(state.state) > 0) {
            return 'AN';
        }
        return 'AUS';
    }
    findPotentialSensorEntities(plantEntityId) {
        var _a, _b;
        if (!this.hass)
            return;
        console.log(`\n=== Looking for sensor entities related to ${plantEntityId} ===`);
        // Get plant name/species for matching
        const plantEntity = this.hass.states[plantEntityId];
        ((_b = (_a = plantEntity === null || plantEntity === void 0 ? void 0 : plantEntity.attributes) === null || _a === void 0 ? void 0 : _a.species) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
        const plantName = plantEntityId.replace('plant.', '').toLowerCase();
        // Search for related sensors
        const relatedSensors = Object.keys(this.hass.states).filter(entityId => {
            var _a, _b;
            if (!entityId.startsWith('sensor.'))
                return false;
            const entity = this.hass.states[entityId];
            const entityLower = entityId.toLowerCase();
            const friendlyName = ((_b = (_a = entity.attributes) === null || _a === void 0 ? void 0 : _a.friendly_name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
            // Check if sensor might be related to this plant
            return (entityLower.includes(plantName) ||
                entityLower.includes('purple') ||
                entityLower.includes('lemonade') ||
                entityLower.includes('cannabis') ||
                friendlyName.includes(plantName) ||
                friendlyName.includes('purple') ||
                friendlyName.includes('lemonade') ||
                // Common plant sensor types
                (entityLower.includes('moisture') || entityLower.includes('humidity')) ||
                (entityLower.includes('conductivity') || entityLower.includes('ec')) ||
                (entityLower.includes('light') || entityLower.includes('illuminance')) ||
                (entityLower.includes('temperature') && !entityLower.includes('cpu')));
        });
        console.log('Potential related sensor entities:');
        relatedSensors.forEach(sensorId => {
            var _a, _b;
            const sensor = this.hass.states[sensorId];
            console.log(`  ${sensorId}: ${sensor.state} ${((_a = sensor.attributes) === null || _a === void 0 ? void 0 : _a.unit_of_measurement) || ''} (${((_b = sensor.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || 'No friendly name'})`);
        });
        if (relatedSensors.length > 0) {
            console.log('\n💡 To use these sensors with your plant, add this to your configuration.yaml:');
            console.log(`plant:\n  ${plantEntityId.replace('plant.', '')}:`);
            console.log('    sensors:');
            relatedSensors.forEach(sensorId => {
                var _a, _b;
                const entityLower = sensorId.toLowerCase();
                ((_b = (_a = this.hass.states[sensorId].attributes) === null || _a === void 0 ? void 0 : _a.friendly_name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || '';
                if (entityLower.includes('moisture') || entityLower.includes('humidity')) {
                    console.log(`      moisture: ${sensorId}`);
                }
                else if (entityLower.includes('conductivity') || entityLower.includes('ec')) {
                    console.log(`      conductivity: ${sensorId}`);
                }
                else if (entityLower.includes('light') || entityLower.includes('illuminance')) {
                    console.log(`      illuminance: ${sensorId}`);
                }
                else if (entityLower.includes('temperature')) {
                    console.log(`      temperature: ${sensorId}`);
                }
            });
            console.log('    min_moisture: 15');
            console.log('    max_moisture: 60');
            console.log('    # Add other min/max values as needed');
        }
        else {
            console.log('❌ No related sensor entities found. You may need to:');
            console.log('  1. Set up plant sensors (MiFlora, ESPHome, etc.)');
            console.log('  2. Check if sensors have different naming patterns');
        }
        console.log('===============================================\n');
    }
    async getPlantInfo(entityId) {
        if (this.plantInfoCache.has(entityId)) {
            return this.plantInfoCache.get(entityId);
        }
        try {
            const plantInfo = await this.hass.callWS({
                type: "plant/get_info",
                entity_id: entityId,
            });
            console.log(`🌱 Plant info for ${entityId}:`, plantInfo);
            this.plantInfoCache.set(entityId, plantInfo);
            return plantInfo;
        }
        catch (err) {
            console.error(`Failed to get plant info for ${entityId}:`, err);
            this.plantInfoCache.set(entityId, { result: {} });
            return { result: {} };
        }
    }
    async getPlantSensorValue(plantEntity, sensorType, plantConfig) {
        var _a, _b;
        if (!plantEntity || !plantEntity.attributes)
            return 'N/A';
        // PRIORITY 1: Check for individual sensor entities in config (like lovelace flower card)
        if (plantConfig) {
            const sensorKey = `${sensorType}_sensor`;
            const individualSensorId = plantConfig[sensorKey];
            if (individualSensorId && this.hass.states[individualSensorId]) {
                console.log(`Using individual ${sensorType} sensor: ${individualSensorId} = ${this.hass.states[individualSensorId].state}`);
                return this.hass.states[individualSensorId].state;
            }
        }
        // PRIORITY 2: Try to get plant info with sensor entity references
        const plantInfo = await this.getPlantInfo(plantEntity.entity_id);
        if ((_a = plantInfo === null || plantInfo === void 0 ? void 0 : plantInfo.result) === null || _a === void 0 ? void 0 : _a.sensors) {
            const sensorEntityId = plantInfo.result.sensors[sensorType];
            if (sensorEntityId && this.hass.states[sensorEntityId]) {
                console.log(`Found ${sensorType} sensor: ${sensorEntityId} = ${this.hass.states[sensorEntityId].state}`);
                return this.hass.states[sensorEntityId].state;
            }
        }
        // Check for direct sensor entity references in plant attributes (fallback)
        const sensorEntityId = (_b = plantEntity.attributes.sensors) === null || _b === void 0 ? void 0 : _b[sensorType];
        if (sensorEntityId && this.hass.states[sensorEntityId]) {
            return this.hass.states[sensorEntityId].state;
        }
        // Check for direct attribute values (common in Home Assistant plant entities)
        const directValue = plantEntity.attributes[sensorType];
        if (directValue !== undefined && directValue !== null) {
            return directValue.toString();
        }
        // Check for sensor data in different attribute names
        const alternativeNames = {
            'moisture': ['soil_moisture', 'moisture_level', 'humidity', 'moisture'],
            'illuminance': ['light_intensity', 'light', 'brightness', 'illuminance'],
            'temperature': ['temp', 'temperature'],
            'conductivity': ['electrical_conductivity', 'ec', 'conductivity', 'fertility']
        };
        const alternatives = alternativeNames[sensorType] || [];
        for (const altName of alternatives) {
            const altValue = plantEntity.attributes[altName];
            if (altValue !== undefined && altValue !== null) {
                return altValue.toString();
            }
        }
        // Check if this plant has sensor entities defined but we need to fetch their values
        // Look for sensor IDs in plant attributes like sensor.moisture_sensor_id
        const possibleSensorKeys = Object.keys(plantEntity.attributes).filter(key => key.includes(sensorType) ||
            key.includes('sensor') ||
            (sensorType === 'illuminance' && (key.includes('light') || key.includes('brightness'))) ||
            (sensorType === 'conductivity' && (key.includes('ec') || key.includes('fertility'))));
        for (const key of possibleSensorKeys) {
            const sensorId = plantEntity.attributes[key];
            if (typeof sensorId === 'string' && sensorId.startsWith('sensor.') && this.hass.states[sensorId]) {
                console.log(`Found sensor ${sensorId} for ${sensorType} via key ${key}`);
                return this.hass.states[sensorId].state;
            }
        }
        // If plant has status but no values, show the status
        const statusKey = `${sensorType}_status`;
        const status = plantEntity.attributes[statusKey];
        if (status) {
            console.log(`Using status for ${sensorType}: ${status}`);
            return status === 'ok' ? 'OK' : status;
        }
        console.log(`No data found for ${sensorType} in plant ${plantEntity.entity_id}`);
        return 'N/A';
    }
    getPlantSensorValueSync(plantEntity, sensorType, plantConfig) {
        var _a;
        if (!plantEntity || !plantEntity.attributes)
            return 'N/A';
        // PRIORITY 1: Check for individual sensor entities in config (like lovelace flower card)
        if (plantConfig) {
            const sensorKey = `${sensorType}_sensor`;
            const individualSensorId = plantConfig[sensorKey];
            if (individualSensorId && this.hass.states[individualSensorId]) {
                console.log(`Using individual ${sensorType} sensor: ${individualSensorId} = ${this.hass.states[individualSensorId].state}`);
                return this.hass.states[individualSensorId].state;
            }
        }
        // PRIORITY 2: Check for direct sensor entity references in plant attributes
        const sensorEntityId = (_a = plantEntity.attributes.sensors) === null || _a === void 0 ? void 0 : _a[sensorType];
        if (sensorEntityId && this.hass.states[sensorEntityId]) {
            return this.hass.states[sensorEntityId].state;
        }
        // Check for direct attribute values (common in Home Assistant plant entities)
        const directValue = plantEntity.attributes[sensorType];
        if (directValue !== undefined && directValue !== null) {
            return directValue.toString();
        }
        // Check for sensor data in different attribute names
        const alternativeNames = {
            'moisture': ['soil_moisture', 'moisture_level', 'humidity', 'moisture'],
            'illuminance': ['light_intensity', 'light', 'brightness', 'illuminance'],
            'temperature': ['temp', 'temperature'],
            'conductivity': ['electrical_conductivity', 'ec', 'conductivity', 'fertility']
        };
        const alternatives = alternativeNames[sensorType] || [];
        for (const altName of alternatives) {
            const altValue = plantEntity.attributes[altName];
            if (altValue !== undefined && altValue !== null) {
                return altValue.toString();
            }
        }
        // If plant has status but no values, show the status
        const statusKey = `${sensorType}_status`;
        const status = plantEntity.attributes[statusKey];
        if (status) {
            return status === 'ok' ? 'OK' : status;
        }
        return 'N/A';
    }
    async calculatePlantHealth(plantEntity, plantConfig) {
        if (!plantEntity) {
            return { health: 0, status: 'Unbekannt', color: '#666' };
        }
        const state = plantEntity.state;
        // Check overall plant state first
        if (state === 'problem') {
            return { health: 30, status: 'Problem', color: '#f44336' };
        }
        else if (state === 'ok') {
            return { health: 85, status: 'Gesund', color: '#4caf50' };
        }
        // Calculate health based on individual sensor readings
        let healthScore = 100;
        const sensors = ['moisture', 'conductivity', 'illuminance', 'temperature'];
        for (const sensor of sensors) {
            const valueStr = await this.getPlantSensorValue(plantEntity, sensor, plantConfig);
            const value = parseFloat(valueStr);
            const min = plantEntity.attributes[`min_${sensor}`];
            const max = plantEntity.attributes[`max_${sensor}`];
            if (!isNaN(value) && min !== undefined && max !== undefined) {
                if (value < min || value > max) {
                    healthScore -= 20;
                }
            }
        }
        // Determine status and color based on health score
        if (healthScore >= 80) {
            return { health: healthScore, status: 'Gesund', color: '#4caf50' };
        }
        else if (healthScore >= 60) {
            return { health: healthScore, status: 'Gut', color: '#8bc34a' };
        }
        else if (healthScore >= 40) {
            return { health: healthScore, status: 'Achtung', color: '#ff9800' };
        }
        else {
            return { health: healthScore, status: 'Problem', color: '#f44336' };
        }
    }
    handleControlClick(entityId) {
        if (!this.hass || !entityId)
            return;
        const entity = this.hass.states[entityId];
        if (!entity)
            return;
        // Determine service based on entity domain
        const domain = entityId.split('.')[0];
        const isOn = entity.state === 'on' || entity.state === 'heat' || entity.state === 'cool' || parseFloat(entity.state) > 0;
        let service;
        let serviceData = { entity_id: entityId };
        switch (domain) {
            case 'light':
                service = isOn ? 'light.turn_off' : 'light.turn_on';
                break;
            case 'switch':
                service = isOn ? 'switch.turn_off' : 'switch.turn_on';
                break;
            case 'fan':
                service = isOn ? 'fan.turn_off' : 'fan.turn_on';
                break;
            case 'climate':
                // For climate entities, toggle between off and heat/cool
                if (entity.state === 'off') {
                    service = 'climate.set_hvac_mode';
                    serviceData.hvac_mode = 'heat'; // Default to heat mode
                }
                else {
                    service = 'climate.set_hvac_mode';
                    serviceData.hvac_mode = 'off';
                }
                break;
            case 'cover':
                // For covers/vents, toggle open/close
                service = entity.state === 'open' ? 'cover.close_cover' : 'cover.open_cover';
                break;
            default:
                // Generic toggle for other entities
                service = `${domain}.toggle`;
                break;
        }
        console.log(`Calling service: ${service} with data:`, serviceData);
        this.hass.callService(service.split('.')[0], service.split('.')[1], serviceData).catch(error => {
            console.error('Error calling service:', error);
        });
    }
    handleSliderInput(entityId, value) {
        // Update local slider state immediately for smooth UI
        this.sliderValues.set(entityId, value);
        this.requestUpdate();
    }
    handleSliderChange(entityId, value, type) {
        if (!this.hass || !entityId)
            return;
        // Update local state
        this.sliderValues.set(entityId, value);
        let service;
        let serviceData = { entity_id: entityId };
        if (type === 'light') {
            if (value === 0) {
                service = 'light.turn_off';
            }
            else {
                service = 'light.turn_on';
                serviceData.brightness_pct = value;
            }
        }
        else if (type === 'fan') {
            if (value === 0) {
                service = 'fan.turn_off';
            }
            else {
                service = 'fan.set_percentage';
                serviceData.percentage = value;
            }
        }
        else {
            return; // Unknown type
        }
        this.hass.callService(service.split('.')[0], service.split('.')[1], serviceData).then(() => {
            // Clear local state after successful service call to use actual entity state
            setTimeout(() => {
                this.sliderValues.delete(entityId);
                this.requestUpdate();
            }, 1000); // Wait 1 second for state to propagate
        }).catch(error => {
            console.error('Error calling service:', error);
            // Clear local state on error too
            this.sliderValues.delete(entityId);
            this.requestUpdate();
        });
    }
    getSliderValue(entityId, type) {
        // Return local slider value if being actively adjusted, otherwise use entity state
        if (this.sliderValues.has(entityId)) {
            return this.sliderValues.get(entityId);
        }
        if (type === 'light') {
            const currentBrightness = this.getLightBrightness();
            return parseInt(currentBrightness.replace('%', '')) || 0;
        }
        else if (type === 'fan') {
            const currentSpeed = this.getFanSpeed(entityId);
            return parseInt(currentSpeed.replace('%', '')) || 0;
        }
        return 0;
    }
    renderOptionalSensors() {
        var _a, _b, _c, _d, _e;
        const sensors = [];
        // Add environmental sensors only if configured
        if (this.config.inner_temp_entity) {
            const entity = this.hass.states[this.config.inner_temp_entity];
            const friendlyName = ((_a = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _a === void 0 ? void 0 : _a.friendly_name) || this.config.inner_temp_entity;
            const icon = this.config.inner_temp_icon || 'mdi:thermometer';
            sensors.push(x `
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${(entity === null || entity === void 0 ? void 0 : entity.state) || 'N/A'}°C
            </div>
          </div>
        </div>
      `);
        }
        if (this.config.inner_humidity_entity) {
            const entity = this.hass.states[this.config.inner_humidity_entity];
            const friendlyName = ((_b = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || this.config.inner_humidity_entity;
            const icon = this.config.inner_humidity_icon || 'mdi:water-percent';
            sensors.push(x `
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${(entity === null || entity === void 0 ? void 0 : entity.state) || 'N/A'}%
            </div>
          </div>
        </div>
      `);
        }
        if (this.config.outer_temp_entity) {
            const entity = this.hass.states[this.config.outer_temp_entity];
            const friendlyName = ((_c = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name) || this.config.outer_temp_entity;
            const icon = this.config.outer_temp_icon || 'mdi:thermometer-minus';
            sensors.push(x `
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${(entity === null || entity === void 0 ? void 0 : entity.state) || 'N/A'}°C
            </div>
          </div>
        </div>
      `);
        }
        if (this.config.outer_humidity_entity) {
            const entity = this.hass.states[this.config.outer_humidity_entity];
            const friendlyName = ((_d = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _d === void 0 ? void 0 : _d.friendly_name) || this.config.outer_humidity_entity;
            const icon = this.config.outer_humidity_icon || 'mdi:water-percent';
            sensors.push(x `
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${(entity === null || entity === void 0 ? void 0 : entity.state) || 'N/A'}%
            </div>
          </div>
        </div>
      `);
        }
        if (this.config.leaf_temp_entity) {
            const entity = this.hass.states[this.config.leaf_temp_entity];
            const friendlyName = ((_e = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _e === void 0 ? void 0 : _e.friendly_name) || this.config.leaf_temp_entity;
            const icon = this.config.leaf_temp_icon || 'mdi:leaf';
            sensors.push(x `
        <div class="sensor-card">
          <div class="sensor-icon">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="sensor-info">
            <div class="sensor-label">${friendlyName}</div>
            <div class="sensor-value">
              ${(entity === null || entity === void 0 ? void 0 : entity.state) || 'N/A'}°C
            </div>
          </div>
        </div>
      `);
        }
        return sensors;
    }
    renderOptionalControls() {
        var _a, _b, _c;
        const controls = [];
        // Add controls only if configured
        if (this.config.light_entity) {
            const entity = this.hass.states[this.config.light_entity];
            const friendlyName = ((_a = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _a === void 0 ? void 0 : _a.friendly_name) || this.config.light_entity;
            const icon = this.config.light_icon || 'mdi:lightbulb';
            const brightnessValue = this.getSliderValue(this.config.light_entity, 'light');
            const currentBrightness = this.sliderValues.has(this.config.light_entity)
                ? `${brightnessValue}%`
                : this.getLightBrightness();
            controls.push(x `
        <div class="control-card light">
          <div class="control-icon" @click="${() => this.handleControlClick(this.config.light_entity)}">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="control-info">
            <div class="control-label">${friendlyName}</div>
            <div class="control-value">${currentBrightness}</div>
            <div class="control-status">${this.renderStatusIndicator(this.config.light_entity)}</div>
            <div class="control-slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value="${brightnessValue}"
                @input="${(e) => {
                const target = e.target;
                this.handleSliderInput(this.config.light_entity, parseInt(target.value));
            }}"
                @change="${(e) => {
                const target = e.target;
                this.handleSliderChange(this.config.light_entity, parseInt(target.value), 'light');
            }}"
                class="brightness-slider"
              />
            </div>
          </div>
        </div>
      `);
        }
        if (this.config.ventilation_entity) {
            const entity = this.hass.states[this.config.ventilation_entity];
            const friendlyName = ((_b = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || this.config.ventilation_entity;
            const icon = this.config.ventilation_icon || 'mdi:fan';
            const speedValue = this.getSliderValue(this.config.ventilation_entity, 'fan');
            const currentSpeed = this.sliderValues.has(this.config.ventilation_entity)
                ? `${speedValue}%`
                : this.getFanSpeed(this.config.ventilation_entity);
            controls.push(x `
        <div class="control-card ventilation">
          <div class="control-icon" @click="${() => this.handleControlClick(this.config.ventilation_entity)}">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="control-info">
            <div class="control-label">${friendlyName}</div>
            <div class="control-value">${currentSpeed}</div>
            <div class="control-status">${this.renderStatusIndicator(this.config.ventilation_entity)}</div>
            <div class="control-slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value="${speedValue}"
                @input="${(e) => {
                const target = e.target;
                this.handleSliderInput(this.config.ventilation_entity, parseInt(target.value));
            }}"
                @change="${(e) => {
                const target = e.target;
                this.handleSliderChange(this.config.ventilation_entity, parseInt(target.value), 'fan');
            }}"
                class="speed-slider"
              />
            </div>
          </div>
        </div>
      `);
        }
        if (this.config.heating_entity) {
            const entity = this.hass.states[this.config.heating_entity];
            const friendlyName = ((_c = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name) || this.config.heating_entity;
            const icon = this.config.heating_icon || 'mdi:radiator';
            controls.push(x `
        <div class="control-card heating" @click="${() => this.handleControlClick(this.config.heating_entity)}">
          <div class="control-icon">
            ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
          </div>
          <div class="control-info">
            <div class="control-label">${friendlyName}</div>
            <div class="control-value">${this.getDeviceStatus(this.config.heating_entity)}</div>
            <div class="control-status">${this.renderStatusIndicator(this.config.heating_entity)}</div>
          </div>
        </div>
      `);
        }
        // Add vents if configured
        if (this.config.vents && this.config.vents.length > 0) {
            this.config.vents.forEach(vent => {
                var _a;
                if (!vent.entity) {
                    console.warn('Vent configuration missing entity:', vent);
                    return;
                }
                const entity = this.hass.states[vent.entity];
                const friendlyName = ((_a = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _a === void 0 ? void 0 : _a.friendly_name) || vent.name || vent.entity;
                const icon = vent.icon || 'mdi:air-filter';
                const domain = vent.entity.split('.')[0];
                if (domain === 'fan') {
                    // Fan vent with speed control
                    const speedValue = this.getSliderValue(vent.entity, 'fan');
                    const currentSpeed = this.sliderValues.has(vent.entity)
                        ? `${speedValue}%`
                        : this.getFanSpeed(vent.entity);
                    controls.push(x `
            <div class="control-card vent">
              <div class="control-icon" @click="${() => this.handleControlClick(vent.entity)}">
                ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
              </div>
              <div class="control-info">
                <div class="control-label">${friendlyName}</div>
                <div class="control-value">${currentSpeed}</div>
                <div class="control-status">${this.renderStatusIndicator(vent.entity)}</div>
                <div class="control-slider">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value="${speedValue}"
                    @input="${(e) => {
                        const target = e.target;
                        this.handleSliderInput(vent.entity, parseInt(target.value));
                    }}"
                    @change="${(e) => {
                        const target = e.target;
                        this.handleSliderChange(vent.entity, parseInt(target.value), 'fan');
                    }}"
                    class="speed-slider"
                  />
                </div>
              </div>
            </div>
          `);
                }
                else {
                    // Regular on/off vent
                    controls.push(x `
            <div class="control-card vent" @click="${() => this.handleControlClick(vent.entity)}">
              <div class="control-icon">
                ${icon.startsWith('mdi:') ? x `<ha-icon icon="${icon}"></ha-icon>` : icon}
              </div>
              <div class="control-info">
                <div class="control-label">${friendlyName}</div>
                <div class="control-value">${this.getDeviceStatus(vent.entity)}</div>
                <div class="control-status">${this.renderStatusIndicator(vent.entity)}</div>
              </div>
            </div>
          `);
                }
            });
        }
        return controls;
    }
    renderPlantsGrid() {
        const plants = this.config.plants || [];
        // Only render configured plants, no empty placeholders
        return plants.map(plant => {
            // Get cached data
            let plantData = {
                moisture: '23.0',
                temp: '16.7',
                light: 'OK',
                ec: 'OK',
                health: 30,
                status: 'Problem',
                healthColor: '#f44336'
            };
            if (plant.entity) {
                const cachedData = this.plantDataCache.get(plant.entity);
                if (cachedData) {
                    plantData = cachedData;
                }
            }
            // Only show sensors that have actual data (not N/A)
            const availableSensors = [];
            if (plantData.moisture && plantData.moisture !== 'N/A') {
                availableSensors.push(x `<div class="sensor">💧 ${plantData.moisture}%</div>`);
            }
            if (plantData.temp && plantData.temp !== 'N/A') {
                availableSensors.push(x `<div class="sensor">🌡️ ${plantData.temp}°C</div>`);
            }
            if (plantData.light && plantData.light !== 'N/A') {
                availableSensors.push(x `<div class="sensor">☀️ ${plantData.light}</div>`);
            }
            if (plantData.ec && plantData.ec !== 'N/A') {
                availableSensors.push(x `<div class="sensor">🧪 ${plantData.ec}</div>`);
            }
            const plantIcon = plant.icon || 'mdi:cannabis';
            return x `
        <div class="plant-card">
          <div class="plant-icon">
            ${plantIcon.startsWith('mdi:') ? x `<ha-icon icon="${plantIcon}"></ha-icon>` : plantIcon}
          </div>
          <div class="plant-name">${plant.name}</div>
          ${availableSensors.length > 0 ? x `
            <div class="plant-sensors">
              ${availableSensors}
            </div>
          ` : ''}
          <div class="plant-health">
            <div class="health-bar">
              <div class="health-fill" style="width: ${plantData.health}%; background: ${plantData.healthColor};"></div>
            </div>
            <div class="health-text">${plantData.status} - ${plantData.health}%</div>
          </div>
        </div>
      `;
        });
    }
    render() {
        var _a;
        if (!this.config || !this.hass) {
            return x ``;
        }
        const vpdData = this.calculateVPD();
        const optionalSensors = this.renderOptionalSensors();
        const optionalControls = this.renderOptionalControls();
        return x `
      <ha-card>
        <div class="card-header">
          <h2 class="card-title">🌱 ${this.config.name || 'Growbox'}</h2>
          ${((_a = this.config.vpd_calculation) === null || _a === void 0 ? void 0 : _a.enabled) ? x `
            <div class="vpd-indicator" style="background-color: ${vpdData.color}">
              VPD: ${vpdData.vpd.toFixed(2)} - ${vpdData.phase}
            </div>
          ` : ''}
        </div>
        
        <!-- Environmental Sensors (only show configured ones) -->
        ${optionalSensors.length > 0 ? x `
          <div class="sensors-grid">
            ${optionalSensors}
          </div>
        ` : ''}
        
        <!-- Controls Section (only show configured ones) -->
        ${optionalControls.length > 0 ? x `
          <div class="controls-container">
            <div class="controls-frame" style="background: #2d2d2d; border: 2px solid #4CAF50; border-radius: 12px; padding: 16px; position: relative; margin-bottom: 16px;">
              <div class="frame-label" style="position: absolute; top: -10px; left: 16px; background: #1a1a1a; padding: 0 8px; font-size: 12px; color: #4CAF50; font-weight: bold; z-index: 1;">Controls</div>
              <div class="controls-grid">
                ${optionalControls}
              </div>
            </div>
          </div>
        ` : ''}
        
        <!-- Plants Section (only show if plants are configured) -->
        ${this.config.plants && this.config.plants.length > 0 ? x `
          <div class="plants-container">
            <div class="plants-frame">
              <div class="frame-label">Plants</div>
              <div class="plants-grid">
                ${this.renderPlantsGrid()}
              </div>
            </div>
          </div>
        ` : ''}
        
        ${this.config.camera_entity ? x `
          <div class="camera-section">
            <div class="camera-header">📹 Kamera</div>
            <div class="camera-container">
              <img src="/api/camera_proxy/${this.config.camera_entity}" alt="Grow Box Camera" />
            </div>
          </div>
        ` : ''}
      </ha-card>
    `;
    }
    static get styles() {
        return i$3 `
      :host {
        display: block;
        font-family: var(--ha-card-font-family, inherit);
      }

      ha-card {
        background: var(--ha-card-background, #1a1a1a);
        border: 1px solid var(--divider-color, #2d2d2d);
        border-radius: 12px;
        padding: 16px;
        color: var(--primary-text-color, #ffffff);
      }

      /* Global ha-icon color override */
      ha-icon {
        color: inherit !important;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, #2d2d2d);
      }

      .card-title {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        color: var(--primary-color, #4CAF50);
      }

      .vpd-indicator {
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: bold;
        color: white;
      }

      .sensors-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }

      .sensor-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .sensor-icon {
        font-size: 24px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray800, #ffffff);
      }

      .sensor-icon ha-icon {
        --mdc-icon-size: 24px;
        color: var(--gray800, #ffffff) !important;
        --mdc-icon-color: var(--gray800, #ffffff);
        --ha-icon-color: var(--gray800, #ffffff);
        --iron-icon-fill-color: var(--gray800, #ffffff);
      }

      .sensor-info {
        flex: 1;
      }

      .sensor-label {
        font-size: 12px;
        color: var(--secondary-text-color, #888);
        margin-bottom: 4px;
      }

      .sensor-value {
        font-size: 18px;
        font-weight: bold;
        color: var(--primary-text-color, #ffffff);
      }

      :host .controls-container {
        margin-bottom: 16px !important;
        display: block !important;
      }

      :host .controls-frame {
        background: var(--card-background-color, #2d2d2d) !important;
        border: 2px solid var(--primary-color, #4CAF50) !important;
        border-radius: 12px !important;
        padding: 16px !important;
        position: relative !important;
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
      }

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
        margin-top: 8px;
      }

      .control-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        padding: 12px;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .control-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }

      .control-icon {
        font-size: 32px;
        margin-bottom: 8px;
        color: var(--gray800, #ffffff);
      }

      .control-icon ha-icon {
        --mdc-icon-size: 32px;
        color: var(--gray800, #ffffff) !important;
        --mdc-icon-color: var(--gray800, #ffffff);
        --ha-icon-color: var(--gray800, #ffffff);
        --iron-icon-fill-color: var(--gray800, #ffffff);
      }

      .control-label {
        font-size: 12px;
        color: var(--secondary-text-color, #888);
        margin-bottom: 4px;
      }

      .control-value {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-text-color, #ffffff);
        margin-bottom: 4px;
      }

      .control-status {
        font-size: 12px;
      }

      .status-indicator {
        display: inline-block;
        font-weight: bold;
      }

      .status-indicator.on {
        color: #4CAF50;
      }

      .status-indicator.off {
        color: #f44336;
      }

      .status-indicator.unknown {
        color: #888;
      }

      .plants-container {
        margin-bottom: 16px;
      }

      .plants-frame {
        background: var(--card-background-color, #2d2d2d);
        border: 2px solid var(--primary-color, #4CAF50);
        border-radius: 12px;
        padding: 16px;
        position: relative;
      }

      .controls-frame .frame-label,
      .plants-frame .frame-label {
        position: absolute !important;
        top: -10px !important;
        left: 16px !important;
        background: var(--ha-card-background, #1a1a1a) !important;
        padding: 0 8px !important;
        font-size: 12px !important;
        color: var(--primary-color, #4CAF50) !important;
        font-weight: bold !important;
        z-index: 1 !important;
      }

      .plants-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 12px;
        margin-top: 8px;
      }

      .plant-card {
        background: var(--card-background-color, #2d2d2d);
        border-radius: 8px;
        padding: 12px;
        border: 1px solid rgba(76, 175, 80, 0.3);
        transition: all 0.3s ease;
        min-height: 140px;
      }

      .plant-card:hover {
        border-color: var(--primary-color, #4CAF50);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
      }

      .control-slider {
        margin-top: 8px;
        width: 100%;
      }

      .brightness-slider,
      .speed-slider {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #444;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
      }

      .brightness-slider::-webkit-slider-thumb,
      .speed-slider::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--primary-color, #4CAF50);
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      }

      .brightness-slider::-moz-range-thumb,
      .speed-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--primary-color, #4CAF50);
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      }

      .plant-icon {
        font-size: 32px;
        text-align: center;
        margin-bottom: 8px;
        color: var(--gray800, #ffffff);
      }

      .plant-icon ha-icon {
        --mdc-icon-size: 32px;
        color: var(--gray800, #ffffff) !important;
        --mdc-icon-color: var(--gray800, #ffffff);
        --ha-icon-color: var(--gray800, #ffffff);
        --iron-icon-fill-color: var(--gray800, #ffffff);
      }

      .plant-name {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-color, #4CAF50);
        text-align: center;
        margin-bottom: 12px;
      }

      .plant-sensors {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        margin-bottom: 12px;
      }

      .sensor {
        font-size: 10px;
        color: var(--secondary-text-color, #888);
        white-space: nowrap;
      }

      .plant-health {
        margin-top: auto;
      }

      .health-bar {
        background: #444;
        border-radius: 3px;
        height: 6px;
        margin-bottom: 4px;
        overflow: hidden;
      }

      .health-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s ease;
      }

      .health-text {
        font-size: 9px;
        text-align: center;
        font-weight: bold;
      }

      .camera-section {
        margin-top: 16px;
      }

      .camera-header {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-color, #4CAF50);
        margin-bottom: 8px;
      }

      .camera-container {
        border-radius: 8px;
        overflow: hidden;
        background: #000;
      }

      .camera-container img {
        width: 100%;
        height: auto;
        display: block;
      }

      /* Responsive design */
      @media (max-width: 600px) {
        .sensors-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .controls-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .plants-grid {
          grid-template-columns: 1fr;
        }
        
        .control-card {
          min-width: 140px;
        }
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], HaGrowBoxCard.prototype, "hass", void 0);
__decorate([
    r$1()
], HaGrowBoxCard.prototype, "config", void 0);
__decorate([
    r$1()
], HaGrowBoxCard.prototype, "plantInfoCache", void 0);
__decorate([
    r$1()
], HaGrowBoxCard.prototype, "plantDataCache", void 0);
__decorate([
    r$1()
], HaGrowBoxCard.prototype, "sliderValues", void 0);
HaGrowBoxCard = __decorate([
    t$1('ha-grow-box-card')
], HaGrowBoxCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'ha-grow-box-card',
    name: 'Grow Box Card',
    description: 'A comprehensive card for monitoring cannabis grow tent systems'
});

var t,r;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(t||(t={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24";}(r||(r={}));var ne=function(e,t,r,n){n=n||{},r=null==r?{}:r;var i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=r,e.dispatchEvent(i),i};

let GrowBoxCardEditor = class GrowBoxCardEditor extends i {
    setConfig(config) {
        this._config = Object.assign({}, config);
    }
    get _name() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.name) || '';
    }
    render() {
        var _a;
        if (!this.hass || !this._config) {
            return x ``;
        }
        // Get all entities and filter by domain
        const allEntities = Object.keys(this.hass.states);
        const sensorEntities = allEntities.filter(entity => entity.startsWith('sensor.'));
        const lightEntities = allEntities.filter(entity => entity.startsWith('light.') || entity.startsWith('switch.'));
        const fanEntities = allEntities.filter(entity => entity.startsWith('fan.') || entity.startsWith('switch.'));
        const coverEntities = allEntities.filter(entity => entity.startsWith('cover.') || entity.startsWith('switch.'));
        const cameraEntities = allEntities.filter(entity => entity.startsWith('camera.'));
        const plantEntities = allEntities.filter(entity => entity.startsWith('plant.'));
        return x `
      <div class="card-config">
        <h3>Basic Configuration</h3>
        
        <div class="form-group">
          <label for="name">Name (Optional)</label>
          <input
            id="name"
            type="text"
            .value=${this._name}
            @input=${(ev) => this._valueChanged('name', ev.target.value)}
            placeholder="Grow Tent"
          />
        </div>

        <h3>Environmental Sensors</h3>
        
        <div class="form-group">
          <label for="inner_temp">Inner Temperature Entity</label>
          <select
            id="inner_temp"
            @change=${(ev) => this._valueChanged('inner_temp_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.inner_temp_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <div class="form-group">
          <label for="inner_humidity">Inner Humidity Entity</label>
          <select
            id="inner_humidity"
            @change=${(ev) => this._valueChanged('inner_humidity_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.inner_humidity_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <div class="form-group">
          <label for="outer_temp">Outer Temperature Entity</label>
          <select
            id="outer_temp"
            @change=${(ev) => this._valueChanged('outer_temp_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.outer_temp_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <div class="form-group">
          <label for="outer_humidity">Outer Humidity Entity</label>
          <select
            id="outer_humidity"
            @change=${(ev) => this._valueChanged('outer_humidity_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.outer_humidity_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <div class="form-group">
          <label for="leaf_temp">Leaf Temperature Entity</label>
          <select
            id="leaf_temp"
            @change=${(ev) => this._valueChanged('leaf_temp_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.leaf_temp_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <h3>Control Entities</h3>

        <div class="form-group">
          <label for="light">Light Entity</label>
          <select
            id="light"
            @change=${(ev) => this._valueChanged('light_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${lightEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.light_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <div class="form-group">
          <label for="heating">Heating Entity</label>
          <select
            id="heating"
            @change=${(ev) => this._valueChanged('heating_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${lightEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.heating_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <div class="form-group">
          <label for="ventilation">Ventilation Entity</label>
          <select
            id="ventilation"
            @change=${(ev) => this._valueChanged('ventilation_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${fanEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.ventilation_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <h3>Camera</h3>

        <div class="form-group">
          <label for="camera">Camera Entity</label>
          <select
            id="camera"
            @change=${(ev) => this._valueChanged('camera_entity', ev.target.value)}
          >
            <option value="">Select entity...</option>
            ${cameraEntities.map(entity => {
            var _a, _b;
            return x `
              <option 
                value=${entity} 
                ?selected=${entity === this._config.camera_entity}
              >
                ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
              </option>
            `;
        })}
          </select>
        </div>

        <h3>VPD Configuration</h3>
        <div class="form-group">
          <label>
            <input
              type="checkbox"
              .checked=${((_a = this._config.vpd_calculation) === null || _a === void 0 ? void 0 : _a.enabled) !== false}
              @change=${(ev) => this._vpdEnabledChanged(ev.target.checked)}
            />
            Enable VPD Calculation
          </label>
        </div>

        <h3>Vents Configuration</h3>
        ${this.renderVentConfiguration(coverEntities)}

        <h3>Plants Configuration</h3>
        ${this.renderPlantConfiguration(plantEntities, sensorEntities)}
      </div>
    `;
    }
    renderVentConfiguration(coverEntities) {
        const vents = this._config.vents || [];
        return x `
      <div class="vents-config">
        ${vents.map((vent, index) => x `
          <div class="vent-config">
            <div class="form-group">
              <label for="vent-name-${index}">Vent Name</label>
              <input
                id="vent-name-${index}"
                type="text"
                .value=${vent.name}
                @input=${(ev) => this._ventChanged(index, 'name', ev.target.value)}
                placeholder="Vent Name"
              />
            </div>
            
            <div class="form-group">
              <label for="vent-entity-${index}">Vent Entity</label>
              <select
                id="vent-entity-${index}"
                @change=${(ev) => this._ventChanged(index, 'entity', ev.target.value)}
              >
                <option value="">Select entity...</option>
                ${coverEntities.map(entity => {
            var _a, _b;
            return x `
                  <option 
                    value=${entity} 
                    ?selected=${entity === vent.entity}
                  >
                    ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
                  </option>
                `;
        })}
              </select>
            </div>

            <div class="form-group">
              <label for="vent-position-${index}">Position</label>
              <select
                id="vent-position-${index}"
                @change=${(ev) => this._ventChanged(index, 'position', ev.target.value)}
              >
                <option value="top" ?selected=${vent.position === 'top'}>Top</option>
                <option value="side" ?selected=${vent.position === 'side'}>Side</option>
                <option value="bottom" ?selected=${vent.position === 'bottom'}>Bottom</option>
              </select>
            </div>

            <button class="remove-button" @click=${() => this._removeVent(index)}>Remove Vent</button>
          </div>
        `)}
        
        <button class="add-button" @click=${this._addVent}>Add Vent</button>
      </div>
    `;
    }
    renderPlantConfiguration(plantEntities, sensorEntities) {
        const plants = this._config.plants || [];
        return x `
      <div class="plants-config">
        ${plants.map((plant, index) => x `
          <div class="plant-config">
            <div class="form-group">
              <label for="plant-name-${index}">Plant Name</label>
              <input
                id="plant-name-${index}"
                type="text"
                .value=${plant.name}
                @input=${(ev) => this._plantChanged(index, 'name', ev.target.value)}
                placeholder="Plant Name"
              />
            </div>
            
            <div class="form-group">
              <label for="plant-entity-${index}">Plant Entity</label>
              <select
                id="plant-entity-${index}"
                @change=${(ev) => this._plantChanged(index, 'entity', ev.target.value)}
              >
                <option value="">Select entity...</option>
                ${plantEntities.map(entity => {
            var _a, _b;
            return x `
                  <option 
                    value=${entity} 
                    ?selected=${entity === plant.entity}
                  >
                    ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
                  </option>
                `;
        })}
              </select>
            </div>

            <div class="form-group">
              <label for="plant-position-${index}">Position (1-4)</label>
              <input
                id="plant-position-${index}"
                type="number"
                min="1"
                max="4"
                .value=${plant.position || 1}
                @input=${(ev) => this._plantChanged(index, 'position', parseInt(ev.target.value))}
              />
            </div>

            <h4>Individual Sensors (Optional)</h4>
            
            <div class="form-group">
              <label for="plant-moisture-${index}">Moisture Sensor</label>
              <select
                id="plant-moisture-${index}"
                @change=${(ev) => this._plantChanged(index, 'moisture_sensor', ev.target.value)}
              >
                <option value="">Select sensor...</option>
                ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
                  <option 
                    value=${entity} 
                    ?selected=${entity === plant.moisture_sensor}
                  >
                    ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
                  </option>
                `;
        })}
              </select>
            </div>

            <div class="form-group">
              <label for="plant-temperature-${index}">Temperature Sensor</label>
              <select
                id="plant-temperature-${index}"
                @change=${(ev) => this._plantChanged(index, 'temperature_sensor', ev.target.value)}
              >
                <option value="">Select sensor...</option>
                ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
                  <option 
                    value=${entity} 
                    ?selected=${entity === plant.temperature_sensor}
                  >
                    ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
                  </option>
                `;
        })}
              </select>
            </div>

            <div class="form-group">
              <label for="plant-illuminance-${index}">Light Sensor</label>
              <select
                id="plant-illuminance-${index}"
                @change=${(ev) => this._plantChanged(index, 'illuminance_sensor', ev.target.value)}
              >
                <option value="">Select sensor...</option>
                ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
                  <option 
                    value=${entity} 
                    ?selected=${entity === plant.illuminance_sensor}
                  >
                    ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
                  </option>
                `;
        })}
              </select>
            </div>

            <div class="form-group">
              <label for="plant-conductivity-${index}">Conductivity Sensor</label>
              <select
                id="plant-conductivity-${index}"
                @change=${(ev) => this._plantChanged(index, 'conductivity_sensor', ev.target.value)}
              >
                <option value="">Select sensor...</option>
                ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
                  <option 
                    value=${entity} 
                    ?selected=${entity === plant.conductivity_sensor}
                  >
                    ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
                  </option>
                `;
        })}
              </select>
            </div>

            <div class="form-group">
              <label for="plant-battery-${index}">Battery Sensor</label>
              <select
                id="plant-battery-${index}"
                @change=${(ev) => this._plantChanged(index, 'battery_sensor', ev.target.value)}
              >
                <option value="">Select sensor...</option>
                ${sensorEntities.map(entity => {
            var _a, _b;
            return x `
                  <option 
                    value=${entity} 
                    ?selected=${entity === plant.battery_sensor}
                  >
                    ${entity} (${((_b = (_a = this.hass.states[entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity})
                  </option>
                `;
        })}
              </select>
            </div>

            <button class="remove-button" @click=${() => this._removePlant(index)}>Remove Plant</button>
          </div>
        `)}
        
        <button class="add-button" @click=${this._addPlant}>Add Plant</button>
      </div>
    `;
    }
    _valueChanged(configValue, value) {
        if (!this._config || !this.hass) {
            return;
        }
        if (this._config[configValue] === value) {
            return;
        }
        const newConfig = Object.assign(Object.assign({}, this._config), { [configValue]: value || undefined });
        ne(this, 'config-changed', { config: newConfig });
    }
    _vpdEnabledChanged(enabled) {
        const newConfig = Object.assign(Object.assign({}, this._config), { vpd_calculation: Object.assign(Object.assign({}, this._config.vpd_calculation), { enabled }) });
        ne(this, 'config-changed', { config: newConfig });
    }
    _ventChanged(index, field, value) {
        const vents = [...(this._config.vents || [])];
        vents[index] = Object.assign(Object.assign({}, vents[index]), { [field]: value });
        const newConfig = Object.assign(Object.assign({}, this._config), { vents });
        ne(this, 'config-changed', { config: newConfig });
    }
    _addVent() {
        const vents = [...(this._config.vents || [])];
        vents.push({ name: 'New Vent', entity: '', position: 'side' });
        const newConfig = Object.assign(Object.assign({}, this._config), { vents });
        ne(this, 'config-changed', { config: newConfig });
    }
    _removeVent(index) {
        const vents = [...(this._config.vents || [])];
        vents.splice(index, 1);
        const newConfig = Object.assign(Object.assign({}, this._config), { vents });
        ne(this, 'config-changed', { config: newConfig });
    }
    _plantChanged(index, field, value) {
        const plants = [...(this._config.plants || [])];
        plants[index] = Object.assign(Object.assign({}, plants[index]), { [field]: value });
        const newConfig = Object.assign(Object.assign({}, this._config), { plants });
        ne(this, 'config-changed', { config: newConfig });
    }
    _addPlant() {
        const plants = [...(this._config.plants || [])];
        const nextPosition = Math.max(0, ...plants.map(p => p.position || 0)) + 1;
        plants.push({
            name: `Plant ${nextPosition}`,
            entity: '',
            position: Math.min(4, nextPosition)
        });
        const newConfig = Object.assign(Object.assign({}, this._config), { plants });
        ne(this, 'config-changed', { config: newConfig });
    }
    _removePlant(index) {
        const plants = [...(this._config.plants || [])];
        plants.splice(index, 1);
        const newConfig = Object.assign(Object.assign({}, this._config), { plants });
        ne(this, 'config-changed', { config: newConfig });
    }
    static get styles() {
        return i$3 `
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      h3 {
        margin: 20px 0 12px 0;
        color: var(--primary-color);
        border-bottom: 1px solid var(--divider-color);
        padding-bottom: 4px;
        font-size: 16px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
      }

      label {
        font-weight: 500;
        color: var(--primary-text-color);
        font-size: 14px;
      }

      input, select {
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
      }

      input:focus, select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
      }

      input[type="checkbox"] {
        width: auto;
        margin-right: 8px;
      }

      .vents-config,
      .plants-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .vent-config,
      .plant-config {
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
        position: relative;
      }

      .add-button,
      .remove-button {
        padding: 8px 16px;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        background: var(--primary-color);
        color: white;
        cursor: pointer;
        font-size: 14px;
        margin-top: 8px;
      }

      .remove-button {
        background: #f44336;
        border-color: #f44336;
        position: absolute;
        top: 16px;
        right: 16px;
        padding: 4px 8px;
        font-size: 12px;
      }

      .add-button:hover,
      .remove-button:hover {
        opacity: 0.9;
      }

      select option {
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], GrowBoxCardEditor.prototype, "hass", void 0);
__decorate([
    r$1()
], GrowBoxCardEditor.prototype, "_config", void 0);
GrowBoxCardEditor = __decorate([
    t$1('ha-grow-box-card-editor')
], GrowBoxCardEditor);

var editor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get GrowBoxCardEditor () { return GrowBoxCardEditor; }
});

export { HaGrowBoxCard };
