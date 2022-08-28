// ==UserScript==
// @name         twitch video event listener hook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.twitch.tv/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
 // @run-at document-start
// ==/UserScript==

//alert("jsввыыыdkfdddddhsf");

//(function() {
(()=>{
    'use strict';

    //alert("jsввыыыdkfhsf");

    Element.prototype._addEventListener = Element.prototype.addEventListener;
    //var KEK = EventTarget.prototype.addEventListener;

    //Element.prototype.addEventListener = (a, b, c) => {
    Element.prototype.addEventListener = function(a, b, c) {
        debugger;
        if (c==undefined) c=false;
        //document.kik=this
        //alert(this.nodeName)
        if(this._addEventListener) this._addEventListener(a,b,c);
        else {
            console.log("shto");
        }
        //this._addEventListener(a,b,c);
        //KEK.call(this,a,b,c);
        //EventTarget.prototype._addEventListener.call(this,a,b,c);
        if(this.nodeName!="VIDEO") return;
        //alert("jsdkfhsf");
        if (! this.eventListenerList) this.eventListenerList = {};
        if (! this.eventListenerList[a]) this.eventListenerList[a] = [];
        this.eventListenerList[a].push({listener:b,options:c});
    };
    debugger;
    
})();

