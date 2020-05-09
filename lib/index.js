import{Children as t,isValidElement as r,cloneElement as e}from"react";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */const o=(t,o,n)=>{if(null!=o&&r(o)){const{props:r}=o,c=function(t,r){var e={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.indexOf(o)<0&&(e[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(t);n<o.length;n++)r.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(t,o[n])&&(e[o[n]]=t[o[n]])}return e}(o,["props"]),s="function"==typeof t?t(r,n):Object.assign(Object.assign({},r),Object.assign({},t));if(s.constructor!==Object)throw new Error(`Invalid props returned : expected Object, got ${s.constructor.name}.`);return e(Object.assign(Object.assign({},c),{props:{}}),s)}if(null==o||["string","number"].includes(o.constructor.name.toLowerCase()))return null==o?null:o;throw new Error(o.constructor.name+" is not a valid React child.")},n=(r,e)=>{if(null==e)throw new Error("props cannot be set to null : please pass a valid javascript object.");if(e.constructor!==Object&&e.constructor!==Function)throw new Error(`Non valid properties : expected Object, got ${e.constructor.name}.`);return null==r?null:r.constructor===Array?t.map(r,(t,r)=>o(e,t,r)):o(e,r,0)},c=(t,r)=>new Promise(e=>{t.setState(r,e)});export{n as addPropsToChildren,c as setStateAsync};
