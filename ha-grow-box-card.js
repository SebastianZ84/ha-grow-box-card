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

var t,r;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(t||(t={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24";}(r||(r={}));var ne=function(e,t,r,n){n=n||{},r=null==r?{}:r;var i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=r,e.dispatchEvent(i),i};function _e(e,t,r){if(t.has("config")||r)return !0;if(e.config.entity){var n=t.get("hass");return !n||n.states[e.config.entity]!==e.hass.states[e.config.entity]}return !1}

class VPDCalculator {
    static calculateVPD(leafTemp, airTemp, humidity) {
        // VPD calculation using standard formula
        const VPleaf = 610.7 * Math.exp(17.27 * leafTemp / (leafTemp + 237.3)) / 1000;
        const VPair = 610.7 * Math.exp(17.27 * airTemp / (airTemp + 237.3)) / 1000 * humidity / 100;
        return VPleaf - VPair;
    }
    static getVPDPhase(vpd, customPhases) {
        const phases = customPhases || this.DEFAULT_PHASES;
        for (const [phaseName, phase] of Object.entries(phases)) {
            const p = phase;
            if (vpd >= p.min && vpd < p.max) {
                return {
                    vpd,
                    phase: phaseName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    color: p.color
                };
            }
        }
        return {
            vpd,
            phase: 'Unknown',
            color: '#888888'
        };
    }
    static formatVPD(vpd) {
        return vpd.toFixed(2) + ' kPa';
    }
}
VPDCalculator.DEFAULT_PHASES = {
    under_transpiration: { min: 0, max: 0.4, color: '#0066cc' },
    early_vegetation: { min: 0.4, max: 0.8, color: '#00cc66' },
    late_vegetation: { min: 0.8, max: 1.2, color: '#66cc00' },
    mid_late_flowering: { min: 1.2, max: 1.6, color: '#ffcc00' },
    danger_zone: { min: 1.6, max: Infinity, color: '#cc0000' }
};

let GrowBoxCard = class GrowBoxCard extends i {
    static async getConfigElement() {
        await Promise.resolve().then(function () { return editor; });
        return document.createElement('ha-grow-box-card-editor');
    }
    static getStubConfig() {
        return {
            type: 'custom:ha-grow-box-card',
            name: 'Grow Tent',
            inner_temp_entity: 'sensor.grow_tent_temperature',
            inner_humidity_entity: 'sensor.grow_tent_humidity',
            outer_temp_entity: 'sensor.room_temperature',
            outer_humidity_entity: 'sensor.room_humidity',
            leaf_temp_entity: 'sensor.leaf_temperature',
            light_entity: 'light.grow_light',
            heating_entity: 'switch.grow_tent_heater',
            ventilation_entity: 'fan.grow_tent_exhaust',
            camera_entity: 'camera.grow_tent_cam',
            vents: [
                { name: 'Top Vent', entity: 'cover.top_vent', position: 'top' },
                { name: 'Side Vent', entity: 'cover.side_vent', position: 'side' }
            ],
            plants: [
                { name: 'Plant 1', entity: 'plant.cannabis_1', position: 1 },
                { name: 'Plant 2', entity: 'plant.cannabis_2', position: 2 }
            ],
            vpd_calculation: { enabled: true }
        };
    }
    setConfig(config) {
        if (!config) {
            throw new Error('Invalid configuration');
        }
        this.config = config;
    }
    shouldUpdate(changedProps) {
        if (!this.config) {
            return false;
        }
        return _e(this, changedProps, false);
    }
    willUpdate(changedProps) {
        var _a;
        if (!this.hass || !this.config)
            return;
        // Calculate VPD if enabled and entities are available
        if (((_a = this.config.vpd_calculation) === null || _a === void 0 ? void 0 : _a.enabled) !== false) {
            this.updateVPD();
        }
    }
    updateVPD() {
        var _a, _b, _c, _d;
        const leafTempEntity = this.config.leaf_temp_entity;
        const innerTempEntity = this.config.inner_temp_entity;
        const innerHumidityEntity = this.config.inner_humidity_entity;
        if (!leafTempEntity || !innerTempEntity || !innerHumidityEntity)
            return;
        const leafTemp = parseFloat((_a = this.hass.states[leafTempEntity]) === null || _a === void 0 ? void 0 : _a.state);
        const airTemp = parseFloat((_b = this.hass.states[innerTempEntity]) === null || _b === void 0 ? void 0 : _b.state);
        const humidity = parseFloat((_c = this.hass.states[innerHumidityEntity]) === null || _c === void 0 ? void 0 : _c.state);
        if (isNaN(leafTemp) || isNaN(airTemp) || isNaN(humidity))
            return;
        const vpd = VPDCalculator.calculateVPD(leafTemp, airTemp, humidity);
        this.vpdResult = VPDCalculator.getVPDPhase(vpd, (_d = this.config.vpd_calculation) === null || _d === void 0 ? void 0 : _d.phases);
    }
    renderEnvironmentalSensors() {
        return x `
      <div class="environmental-sensors">
        <div class="sensor-group">
          <h3>Inner Environment</h3>
          <div class="sensors">
            ${this.renderSensor(this.config.inner_temp_entity, '°C', 'temperature')}
            ${this.renderSensor(this.config.inner_humidity_entity, '%', 'humidity')}
            ${this.renderSensor(this.config.leaf_temp_entity, '°C', 'leaf-temperature')}
          </div>
        </div>
        <div class="sensor-group">
          <h3>Outer Environment</h3>
          <div class="sensors">
            ${this.renderSensor(this.config.outer_temp_entity, '°C', 'temperature')}
            ${this.renderSensor(this.config.outer_humidity_entity, '%', 'humidity')}
          </div>
        </div>
      </div>
    `;
    }
    renderSensor(entityId, unit, type) {
        if (!entityId || !this.hass.states[entityId]) {
            return x `<div class="sensor unavailable">N/A</div>`;
        }
        const state = this.hass.states[entityId];
        const value = parseFloat(state.state);
        const displayValue = isNaN(value) ? state.state : value.toFixed(1);
        return x `
      <div class="sensor ${type}">
        <span class="value">${displayValue}</span>
        <span class="unit">${unit}</span>
        <span class="name">${state.attributes.friendly_name || entityId}</span>
      </div>
    `;
    }
    renderVPD() {
        var _a;
        if (!this.vpdResult || ((_a = this.config.vpd_calculation) === null || _a === void 0 ? void 0 : _a.enabled) === false) {
            return x ``;
        }
        return x `
      <div class="vpd-display" style="--vpd-color: ${this.vpdResult.color}">
        <h3>VPD Status</h3>
        <div class="vpd-value">${VPDCalculator.formatVPD(this.vpdResult.vpd)}</div>
        <div class="vpd-phase">${this.vpdResult.phase}</div>
      </div>
    `;
    }
    renderControls() {
        return x `
      <div class="controls">
        <h3>Controls</h3>
        <div class="control-grid">
          ${this.renderControl(this.config.light_entity, 'Light', 'lightbulb')}
          ${this.renderControl(this.config.heating_entity, 'Heating', 'radiator')}
          ${this.renderControl(this.config.ventilation_entity, 'Ventilation', 'fan')}
        </div>
        ${this.renderVents()}
      </div>
    `;
    }
    renderControl(entityId, name, icon) {
        if (!entityId || !this.hass.states[entityId]) {
            return x `<div class="control unavailable">${name}: N/A</div>`;
        }
        const state = this.hass.states[entityId];
        const isOn = ['on', 'open', 'home'].includes(state.state.toLowerCase());
        return x `
      <div class="control ${isOn ? 'on' : 'off'}" @click=${() => this.toggleEntity(entityId)}>
        <div class="control-icon ${icon}"></div>
        <div class="control-name">${name}</div>
        <div class="control-state">${state.state}</div>
      </div>
    `;
    }
    renderVents() {
        var _a;
        if (!((_a = this.config.vents) === null || _a === void 0 ? void 0 : _a.length))
            return x ``;
        return x `
      <div class="vents">
        <h4>Vents</h4>
        <div class="vent-controls">
          ${this.config.vents.map(vent => this.renderVentControl(vent))}
        </div>
      </div>
    `;
    }
    renderVentControl(vent) {
        const state = this.hass.states[vent.entity];
        if (!state)
            return x `<div class="vent unavailable">${vent.name}: N/A</div>`;
        const isOpen = state.state === 'open';
        return x `
      <div class="vent-control ${isOpen ? 'open' : 'closed'}" @click=${() => this.toggleEntity(vent.entity)}>
        <span class="vent-name">${vent.name}</span>
        <span class="vent-state">${state.state}</span>
      </div>
    `;
    }
    renderPlants() {
        var _a;
        if (!((_a = this.config.plants) === null || _a === void 0 ? void 0 : _a.length))
            return x ``;
        return x `
      <div class="plants">
        <h3>Plants</h3>
        <div class="plant-grid">
          ${this.config.plants.map(plant => this.renderPlant(plant))}
        </div>
      </div>
    `;
    }
    renderPlant(plant) {
        const state = this.hass.states[plant.entity];
        if (!state)
            return x `<div class="plant unavailable">${plant.name}</div>`;
        return x `
      <div class="plant" data-position="${plant.position}">
        <div class="plant-name">${plant.name}</div>
        <div class="plant-state">${state.state}</div>
        <div class="plant-attributes">
          ${Object.entries(state.attributes || {}).map(([key, value]) => x `<div class="attribute"><span class="key">${key}:</span> <span class="value">${value}</span></div>`)}
        </div>
      </div>
    `;
    }
    renderCamera() {
        if (!this.config.camera_entity)
            return x ``;
        return x `
      <div class="camera">
        <h3>Live View</h3>
        <ha-camera-stream
          .hass=${this.hass}
          .stateObj=${this.hass.states[this.config.camera_entity]}
          allow-exoplayer
        ></ha-camera-stream>
      </div>
    `;
    }
    toggleEntity(entityId) {
        var _a;
        const domain = entityId.split('.')[0];
        const service = ((_a = this.hass.states[entityId]) === null || _a === void 0 ? void 0 : _a.state) === 'on' ? 'turn_off' : 'turn_on';
        this.hass.callService(domain, service, { entity_id: entityId });
    }
    render() {
        if (!this.config || !this.hass) {
            return x ``;
        }
        return x `
      <ha-card .header=${this.config.name}>
        <div class="card-content">
          <div class="grow-tent-layout">
            <div class="tent-visual">
              <div class="tent-frame">
                <div class="tent-interior">
                  ${this.renderPlants()}
                  ${this.renderCamera()}
                </div>
              </div>
            </div>
            
            <div class="monitoring-panel">
              ${this.renderEnvironmentalSensors()}
              ${this.renderVPD()}
              ${this.renderControls()}
            </div>
          </div>
        </div>
      </ha-card>
    `;
    }
    static get styles() {
        return i$3 `
      ha-card {
        padding: 16px;
      }

      .card-content {
        padding: 0;
      }

      .grow-tent-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        min-height: 400px;
      }

      .tent-visual {
        border: 2px solid #333;
        border-radius: 8px;
        padding: 10px;
        background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
        position: relative;
      }

      .tent-frame {
        border: 3px solid #666;
        border-radius: 4px;
        height: 100%;
        background: linear-gradient(45deg, #2a2a2a 25%, transparent 25%), 
                    linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #2a2a2a 75%), 
                    linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      }

      .tent-interior {
        background: rgba(0, 0, 0, 0.1);
        height: 100%;
        border-radius: 2px;
        padding: 10px;
        position: relative;
      }

      .monitoring-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .environmental-sensors {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .sensor-group h3 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--primary-color);
      }

      .sensors {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .sensor {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: 4px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
      }

      .sensor.temperature { border-left: 4px solid #ff6b6b; }
      .sensor.humidity { border-left: 4px solid #4ecdc4; }
      .sensor.leaf-temperature { border-left: 4px solid #45b7d1; }

      .sensor.unavailable {
        opacity: 0.5;
        border-left: 4px solid #ccc;
      }

      .sensor .value {
        font-weight: bold;
        font-size: 18px;
      }

      .sensor .unit {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .sensor .name {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-left: auto;
      }

      .vpd-display {
        text-align: center;
        padding: 16px;
        border-radius: 8px;
        background: var(--card-background-color);
        border: 2px solid var(--vpd-color, #ccc);
      }

      .vpd-display h3 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
      }

      .vpd-value {
        font-size: 24px;
        font-weight: bold;
        color: var(--vpd-color, #333);
      }

      .vpd-phase {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .controls h3 {
        margin: 0 0 12px 0;
        color: var(--primary-color);
      }

      .control-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 8px;
        margin-bottom: 16px;
      }

      .control {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
      }

      .control.on {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: white;
      }

      .control.off {
        border-color: #ccc;
      }

      .control.unavailable {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .control:hover:not(.unavailable) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      .control-icon {
        width: 24px;
        height: 24px;
        margin-bottom: 8px;
      }

      .control-icon.lightbulb::before { content: '💡'; }
      .control-icon.radiator::before { content: '🔥'; }
      .control-icon.fan::before { content: '💨'; }

      .control-name {
        font-size: 12px;
        font-weight: bold;
      }

      .control-state {
        font-size: 10px;
        opacity: 0.8;
        margin-top: 2px;
      }

      .vents h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--primary-color);
      }

      .vent-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .vent-control {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 16px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
      }

      .vent-control.open {
        background: #4caf50;
        color: white;
      }

      .vent-control.closed {
        background: #f44336;
        color: white;
      }

      .plants {
        margin-top: 16px;
      }

      .plants h3 {
        margin: 0 0 12px 0;
        color: var(--primary-color);
        font-size: 14px;
      }

      .plant-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .plant {
        padding: 8px;
        border-radius: 4px;
        background: rgba(76, 175, 80, 0.1);
        border: 1px solid #4caf50;
        font-size: 12px;
      }

      .plant.unavailable {
        background: rgba(255, 255, 255, 0.1);
        border-color: #ccc;
        opacity: 0.5;
      }

      .plant-name {
        font-weight: bold;
        margin-bottom: 4px;
      }

      .plant-state {
        color: var(--primary-color);
        margin-bottom: 4px;
      }

      .plant-attributes {
        font-size: 10px;
        color: var(--secondary-text-color);
      }

      .attribute {
        margin-bottom: 2px;
      }

      .attribute .key {
        font-weight: bold;
      }

      .camera {
        margin-top: auto;
      }

      .camera h3 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
        font-size: 14px;
      }

      ha-camera-stream {
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
      }

      @media (max-width: 768px) {
        .grow-tent-layout {
          grid-template-columns: 1fr;
        }
        
        .environmental-sensors {
          grid-template-columns: 1fr;
        }
      }
    `;
    }
};
__decorate([
    n({ attribute: false })
], GrowBoxCard.prototype, "hass", void 0);
__decorate([
    r$1()
], GrowBoxCard.prototype, "config", void 0);
__decorate([
    r$1()
], GrowBoxCard.prototype, "vpdResult", void 0);
GrowBoxCard = __decorate([
    t$1('ha-grow-box-card')
], GrowBoxCard);
// Register the card
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'ha-grow-box-card',
    name: 'Grow Box Card',
    description: 'A card for monitoring and controlling cannabis grow tents'
});
console.info(`%c  HA-GROW-BOX-CARD  %c  Version 1.0.0  `, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');

let GrowBoxCardEditor = class GrowBoxCardEditor extends i {
    setConfig(config) {
        this._config = Object.assign({}, config);
    }
    get _name() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.name) || '';
    }
    get _inner_temp_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.inner_temp_entity) || '';
    }
    get _inner_humidity_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.inner_humidity_entity) || '';
    }
    get _outer_temp_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.outer_temp_entity) || '';
    }
    get _outer_humidity_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.outer_humidity_entity) || '';
    }
    get _leaf_temp_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.leaf_temp_entity) || '';
    }
    get _light_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.light_entity) || '';
    }
    get _heating_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.heating_entity) || '';
    }
    get _ventilation_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.ventilation_entity) || '';
    }
    get _camera_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.camera_entity) || '';
    }
    render() {
        var _a;
        if (!this.hass || !this._config) {
            return x ``;
        }
        Object.keys(this.hass.states).map(entity => ({
            value: entity,
            label: `${entity} (${this.hass.states[entity].attributes.friendly_name || entity})`
        }));
        return x `
      <div class="card-config">
        <h3>Basic Configuration</h3>
        
        <paper-input
          label="Name (Optional)"
          .value=${this._name}
          .configValue=${'name'}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <h3>Environmental Sensors</h3>
        
        <ha-entity-picker
          label="Inner Temperature Entity"
          .hass=${this.hass}
          .value=${this._inner_temp_entity}
          .configValue=${'inner_temp_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Inner Humidity Entity"
          .hass=${this.hass}
          .value=${this._inner_humidity_entity}
          .configValue=${'inner_humidity_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Outer Temperature Entity"
          .hass=${this.hass}
          .value=${this._outer_temp_entity}
          .configValue=${'outer_temp_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Outer Humidity Entity"
          .hass=${this.hass}
          .value=${this._outer_humidity_entity}
          .configValue=${'outer_humidity_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Leaf Temperature Entity"
          .hass=${this.hass}
          .value=${this._leaf_temp_entity}
          .configValue=${'leaf_temp_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['sensor']}
          allow-custom-entity
        ></ha-entity-picker>

        <h3>Control Entities</h3>

        <ha-entity-picker
          label="Light Entity"
          .hass=${this.hass}
          .value=${this._light_entity}
          .configValue=${'light_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['light', 'switch']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Heating Entity"
          .hass=${this.hass}
          .value=${this._heating_entity}
          .configValue=${'heating_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['switch', 'climate']}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="Ventilation Entity"
          .hass=${this.hass}
          .value=${this._ventilation_entity}
          .configValue=${'ventilation_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['fan', 'switch']}
          allow-custom-entity
        ></ha-entity-picker>

        <h3>Camera</h3>

        <ha-entity-picker
          label="Camera Entity"
          .hass=${this.hass}
          .value=${this._camera_entity}
          .configValue=${'camera_entity'}
          @value-changed=${this._valueChanged}
          .includeDomains=${['camera']}
          allow-custom-entity
        ></ha-entity-picker>

        <h3>Vents Configuration</h3>
        ${this.renderVentConfiguration()}

        <h3>Plants Configuration</h3>
        ${this.renderPlantConfiguration()}

        <h3>VPD Configuration</h3>
        <ha-formfield label="Enable VPD Calculation">
          <ha-checkbox
            .checked=${((_a = this._config.vpd_calculation) === null || _a === void 0 ? void 0 : _a.enabled) !== false}
            .configValue=${'vpd_enabled'}
            @change=${this._vpdEnabledChanged}
          ></ha-checkbox>
        </ha-formfield>
      </div>
    `;
    }
    renderVentConfiguration() {
        const vents = this._config.vents || [];
        return x `
      <div class="vents-config">
        ${vents.map((vent, index) => x `
          <div class="vent-config">
            <paper-input
              label="Vent Name"
              .value=${vent.name}
              @value-changed=${(ev) => this._ventChanged(index, 'name', ev.detail.value)}
            ></paper-input>
            
            <ha-entity-picker
              label="Vent Entity"
              .hass=${this.hass}
              .value=${vent.entity}
              @value-changed=${(ev) => this._ventChanged(index, 'entity', ev.detail.value)}
              .includeDomains=${['cover', 'switch']}
              allow-custom-entity
            ></ha-entity-picker>

            <paper-dropdown-menu label="Position">
              <paper-listbox
                slot="dropdown-content"
                .selected=${['top', 'side', 'bottom'].indexOf(vent.position || 'side')}
                @selected-changed=${(ev) => this._ventChanged(index, 'position', ['top', 'side', 'bottom'][ev.detail.value])}
              >
                <paper-item>Top</paper-item>
                <paper-item>Side</paper-item>
                <paper-item>Bottom</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>

            <mwc-button @click=${() => this._removeVent(index)}>Remove Vent</mwc-button>
          </div>
        `)}
        
        <mwc-button @click=${this._addVent}>Add Vent</mwc-button>
      </div>
    `;
    }
    renderPlantConfiguration() {
        const plants = this._config.plants || [];
        return x `
      <div class="plants-config">
        ${plants.map((plant, index) => x `
          <div class="plant-config">
            <paper-input
              label="Plant Name"
              .value=${plant.name}
              @value-changed=${(ev) => this._plantChanged(index, 'name', ev.detail.value)}
            ></paper-input>
            
            <ha-entity-picker
              label="Plant Entity"
              .hass=${this.hass}
              .value=${plant.entity}
              @value-changed=${(ev) => this._plantChanged(index, 'entity', ev.detail.value)}
              .includeDomains=${['plant', 'sensor']}
              allow-custom-entity
            ></ha-entity-picker>

            <paper-input
              label="Position (1-4)"
              type="number"
              min="1"
              max="4"
              .value=${plant.position || 1}
              @value-changed=${(ev) => this._plantChanged(index, 'position', parseInt(ev.detail.value))}
            ></paper-input>

            <mwc-button @click=${() => this._removePlant(index)}>Remove Plant</mwc-button>
          </div>
        `)}
        
        <mwc-button @click=${this._addPlant}>Add Plant</mwc-button>
      </div>
    `;
    }
    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        const configValue = target.configValue;
        const value = target.value;
        if (this[`_${configValue}`] === value) {
            return;
        }
        const newConfig = Object.assign(Object.assign({}, this._config), { [configValue]: value });
        ne(this, 'config-changed', { config: newConfig });
    }
    _vpdEnabledChanged(ev) {
        const value = ev.target.checked;
        const newConfig = Object.assign(Object.assign({}, this._config), { vpd_calculation: Object.assign(Object.assign({}, this._config.vpd_calculation), { enabled: value }) });
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
        gap: 12px;
      }

      h3 {
        margin: 16px 0 8px 0;
        color: var(--primary-color);
        border-bottom: 1px solid var(--divider-color);
        padding-bottom: 4px;
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
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      paper-input,
      ha-entity-picker,
      paper-dropdown-menu {
        width: 100%;
      }

      mwc-button {
        margin-top: 8px;
        align-self: flex-start;
      }

      ha-formfield {
        margin: 8px 0;
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

export { GrowBoxCard };
