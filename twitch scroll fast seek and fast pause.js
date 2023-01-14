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

//disable retarded BetterTTV chat colours which override Twitch' own readability setting
//Element.prototype.__bttvParsed=true

window.scaleList={};

window.twitchImprover = async function (){

    while(true){
        //setTimeout(()=>{
        //document.addEventListener('load', ()=>{
        'use strict';

        var video=document.querySelector("video");

        if(video==null){
            window.video=video;
            await new Promise(r => setTimeout(r, 100));
            continue;
        }

        if(window.video!==null ){
            try{
                video.eventListenerList["pause"].forEach((l)=>{video.removeEventListener("pause",l.listener,l.options)});
                video.eventListenerList["ratechange"].forEach((l)=>{video.removeEventListener("ratechange",l.listener,l.options)});
            }
            catch{}
            await new Promise(r => setTimeout(r, 1000));
            continue;
        }

        window.video=video;

        while(video.eventListenerList["pause"]==null){
            await new Promise(r => setTimeout(r, 1000));
        }
        video.eventListenerList["pause"].forEach((l)=>{video.removeEventListener("pause",l.listener,l.options)});
        video.eventListenerList["ratechange"].forEach((l)=>{video.removeEventListener("ratechange",l.listener,l.options)});

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
        document.querySelector(".click-handler").addEventListener("wheel", (e)=>{
            if(!e.shiftKey && !e.ctrlKey){
                var newTime = video.currentTime+3*(-Math.sign(e.deltaY));
                //video.fastSeek(Math.min(newTime,video.buffered.end(0)));
                //фаст ломает синхронизацию со звуком
                video.currentTime=Math.min(newTime,video.buffered.end(0));
            } else if(e.shiftKey) {
                if(e.deltaY<0){
                    video.playbackRate*=1.1;
                }else{
                    video.playbackRate/=1.1;
                }
            }
        } );
        document.querySelector(".click-handler").addEventListener("click", (e)=>{
            if (e.button == 0 && e.ctrlKey ){
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
            var r = video.getBoundingClientRect();
            if(
                e.clientX<r.left ||
                e.clientX>r.right ||
                e.clientY>r.bottom ||
                e.clientX<r.top
            ){
                return true;
            }
            if (e.button == 1 && !e.altKey ){
                if(video.paused){
                    video.play();
                }else{
                    video.pause();
                }
                return false;
            }
            if(e.button == 1 && e.altKey){
                //             switch(window.scaleVar){
                //                     video.style.transform="scaleY(1.111111111)";

                //             }

                if(video.style.transform==""){
                    video.style.transform="scaleY(1.111111111)";
                } else {
                    video.style.transform="";
                }
                return false;
            }
        };

        console.log("trying to remove iframe");
        try{
            document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
            console.log("removed iframe")
        } catch (e){
            await new Promise(r => setTimeout(r, 200));
        }

        await new Promise(r => setTimeout(r, 3000));

        try{
            document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
            console.log("removed iframe")
        } catch (e){
            await new Promise(r => setTimeout(r, 200));
        }
    }
}

window.twitchImprover();
