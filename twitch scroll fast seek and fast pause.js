// ==UserScript==
// @name         twitch scroll fast seek and fast pause
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.twitch.tv/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-idle
// ==/UserScript==

window.scaleList={};

window.twitchImprover = async function (){

    while(true){
        //setTimeout(()=>{
        //document.addEventListener('load', ()=>{
        'use strict';

        var video=document.querySelector("video");
        console.log("improv" + "1");
        if(video==null){
            window.video=video;
            await new Promise(r => setTimeout(r, 100));
            continue;
        }
        console.log("improv" + "2");
        if(window.video!=null ){
            try{
                video.eventListenerList["pause"].forEach((l)=>{video.removeEventListener("pause",l.listener,l.options)});
                video.eventListenerList["ratechange"].forEach((l)=>{video.removeEventListener("ratechange",l.listener,l.options)});
            }
            catch{}
            try{
                await new Promise(r => setTimeout(r, 1000));
            }catch{}
            continue;
        }
        console.log("improv" + "3");

        try{
            video.eventListenerList["pause"].forEach((l)=>{video.removeEventListener("pause",l.listener,l.options)});
            video.eventListenerList["ratechange"].forEach((l)=>{video.removeEventListener("ratechange",l.listener,l.options)});
        }catch{}

        //while(false){
        //    console.log("trying to remove iframe");
        //    try{
        //        document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
        //        console.log("removed iframe")
        //        break;
        //    } catch (e){
        //        await new Promise(r => setTimeout(r, 200));
        //
        //    }
        //}
        //
        console.log("improv" + "4");

        console.log("trying to remove iframe");
        try{
            document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
            console.log("removed iframe")
        } catch (e){
            try{ await new Promise(r => setTimeout(r, 200));}catch{}
        }

        try{ await new Promise(r => setTimeout(r, 3000));}catch{}
        console.log("improv" + "5");
        try{
            document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
            console.log("removed iframe")
        } catch (e){
            try{ await new Promise(r => setTimeout(r, 200));}catch{}
        }
        window.video=video;
        console.log("improv" + "6");
    }
}

document.body.onmousedown = function(e) {
    var r = window.video.getBoundingClientRect();
    if(
        e.clientX<r.left ||
        e.clientX>r.right ||
        e.clientY>r.bottom ||
        e.clientX<r.top
    ){
        return true;
    }
    if (e.button == 1 && !e.altKey ){
        if(window.video.paused){
            window.video.play();
        }else{
            window.video.pause();
        }
        return false;
    }
    if(e.button == 1 && e.altKey){
        //             switch(window.scaleVar){
        //                     video.style.transform="scaleY(1.111111111)";

        //             }

        if(window.video.style.transform==""){
            window.video.style.transform="scaleY(1.111111111)";
        } else {
            window.video.style.transform="";
        }
        return false;
    }
};

while(true){
    try{
        document.querySelector(".click-handler").addEventListener("wheel", (e)=>{
            if(!e.shiftKey && !e.ctrlKey){
                var newTime = window.video.currentTime+3*(-Math.sign(e.deltaY));
                //video.fastSeek(Math.min(newTime,video.buffered.end(0)));
                //фаст ломает синхронизацию со звуком
                window.video.currentTime=Math.min(newTime,window.video.buffered.end(0));
            } else if(e.shiftKey) {
                if(e.deltaY<0){
                    window.video.playbackRate*=1.1;
                }else{
                    window.video.playbackRate/=1.1;
                }
            }
        } );
    } catch{
        await new Promise(r => setTimeout(r, 100));
        continue;
    }
    break;
}

document.querySelector(".click-handler").addEventListener("click", (e)=>{
    if (e.button == 0 && e.ctrlKey ){
        if(window.video.paused){
            window.video.play();
        }else{
            window.video.pause();
            window.video.eventListenerList["pause"].forEach((l)=>{l.listener(new Event("wtf"))});
        }
    }
    if (e.button === 0 && e.altKey ){
        video.playbackRate=1;

    }

} );



window.twitchImprover();
