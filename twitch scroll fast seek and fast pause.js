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

async function run(){
    //setTimeout(()=>{
    //document.addEventListener('load', ()=>{
    'use strict';
    var video=document.querySelector("video");
    while(video==null){
        video=document.querySelector("video");
        await new Promise(r => setTimeout(r, 100));
    }

    while(video.eventListenerList["pause"]==null){
        await new Promise(r => setTimeout(r, 100));
    }
    video.eventListenerList["pause"].forEach((l)=>{video.removeEventListener("pause",l.listener,l.options)});
    video.eventListenerList["ratechange"].forEach((l)=>{video.removeEventListener("ratechange",l.listener,l.options)});

    while(true){
        try{
            document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
            break;
        } catch (e){
            await new Promise(r => setTimeout(r, 100));
        }
    }

    document.querySelector(".click-handler").addEventListener("wheel", (e)=>{
        if(!e.altKey){
            var newTime = video.currentTime+3*(-Math.sign(e.deltaY));
            video.fastSeek(Math.min(newTime,video.buffered.end(0)));
        } else {
            if(e.deltaY<0){
                video.playbackRate*=1.1;
            }else{
                video.playbackRate/=1.1;
            }
        }
    } );
    document.querySelector(".click-handler").addEventListener("click", (e)=>{
        if (e.button === 0 && e.ctrlKey ){
            if(video.paused){
                video.play();
            }else{
                video.pause();
                video.eventListenerList["pause"].forEach((l)=>{l.listener(new Event("wtf"))});
            }
        }
        if (e.button === 0 && e.altKey ){
            video.playbackRate=1;

        }

    } );
    document.body.onmousedown = function(e) {
        if (e.button === 1 && !e.altKey){
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }
            return false;
        }
        if(e.button === 1 && e.altKey){
            if(video.style.transform==""){
                video.style.transform="scaleY(1.111111111)";
            } else {
                video.style.transform="";
            }
            return false;
        }
    };


    // Your code here...
    //},4000);
    //});
}

run();
