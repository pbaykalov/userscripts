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

window.mouseClicked=false;

//window.mousedown=function(e) {
window.mousedown=(e)=>{
    console.log('lol1'+(document.querySelector('video')===window.video))
    var r = window.video.getBoundingClientRect();
    if(
        e.clientX<r.left ||
        e.clientX>r.right ||
        e.clientY>r.bottom ||
        e.clientX<r.top
    ){
        return true;
    }
    window.mouseClicked=true;
    if (e.button == 1 && !e.altKey ){
        if(document.URL.match('/videos/')!==null){
            document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
        } else {
            if(window.video.paused){
                if(document.hidden){
                    document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
                } else {
                    window.video.play();
                }
            }else{
                if(document.hidden){
                    document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
                } else {
                    window.video.pause();
                }
            }
        }
        return false;
    }
    if(e.button == 1 && e.altKey){
        //             switch(window.scaleVar){
        //                     video.style.transform="scaleY(1.111111111)";

        //             }

        if(window.video.style.transform==""){
            window.video.style.transform="scaleY(1.11111)";
        } else if(window.video.style.transform=="scaleY(1.11111)"){
            window.video.style.transform="scaleY(1.3333333333)";
        } else {
            window.video.style.transform="";
        }
        return false;
    }
};

window.clicked=(e)=>{
    //console.log('lol2'+(document.querySelector('video')===window.video))
    window.mouseClicked=true;
    if (e.button == 0 && e.ctrlKey ){
        // if(window.video.paused){
        //     window.video.play();
        // }else{
        //     window.video.pause();
        //     window.video.eventListenerList["pause"].forEach((l)=>{l.listener(new Event("wtf"))});
        // }
        document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
    }
    if (e.button === 0 && e.altKey ){
        video.playbackRate=1;

    }
}

//не работает всё равно
window.pauseHandler = e => {
    console.log('handler '+window.mouseClicked);
    window.video.playbackRate=1;
    if(!window.mouseClicked && window.video.paused){
        window.video.eventListenerList["pause"].forEach((l)=>{video.removeEventListener("pause",l.listener,l.options)});
        window.video.eventListenerList["ratechange"].forEach((l)=>{video.removeEventListener("ratechange",l.listener,l.options)});
    }
    window.mouseClicked=false;
}

window.playHandler = e => {
    window.mouseClicked=false;
}


window.twitchImprover = async function (){
    // document.body.onkeydown =
    console.log("improving?")
    keylistener = (e) =>
    {
        var tb = document.querySelectorAll(".chat-wysiwyg-input__editor")[0];
        var pausedFooter = document.querySelectorAll(".chat-paused-footer button")[0];
        if(e.key=="Enter" && !e.ctrlKey){
            if(document.activeElement == tb){
                try{
                    window.highlighteLine.style.background=""
                } catch {}
                try{
                    // pausedFooter.click()
                } catch {}
            }
            return true;
        }
        if(e.key=="Enter" && e.ctrlKey){
            try{
                document.querySelectorAll("div.chat-paused-footer--button")[0].click();
            } catch{}
            if(document.activeElement == tb){
                try{
                    document.querySelectorAll("button[aria-label=\"Закрыть\"")[0].click();
                } catch {}
                try{
                    window.highlighteLine.style.background=""
                } catch {}
                window.replyButtons=undefined
                // document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                return false;
            }
            if(document.activeElement !== tb && document.activeElement.tagName.toLowerCase()!=="INPUT" ){
                try{
                    window.highlighteLine.style.background=""
                } catch {}
                try{
                    pausedFooter.click()
                } catch {}
                tb.focus();
                e.stopPropagation()
                e.preventDefault()
                return false;
            } else {
                return true;
            }
        }
        if(e.key=="Enter" && !e.ctrlKey){
            console.log('cleared');
            window.replyButtons=undefined;
            return true;
        }
        if(e.key=="ArrowUp" && e.ctrlKey){
            try{
                window.highlighteLine.style.background=""
            } catch {}
            if(window.replyButtons===undefined){
                window.replyButtons = Array.from(document.querySelectorAll("button[aria-label=\"Щелкните, чтобы ответить\"], button[aria-label=\"См. ветку\"")).slice(10); //чтобы сразу не отменялось когда верхние сообщения уходят
                window.replyButtonsIdx=window.replyButtons.length
            }
            try{
                window.replyButtonsIdx--;
                var b = window.replyButtons[window.replyButtonsIdx]
                b.click();
                do{
                    b=b.parentElement
                } while(b!=document && !b.classList.contains("chat-line__message"));
                if(b.classList.contains("chat-line__message")){
                    b.style.background="#808080";
                    window.highlighteLine=b;
                    b.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
                }
            } catch {
                window.replyButtons=undefined;
            }
            return false;
        }
        if(e.key=="ArrowDown" && e.ctrlKey){
            try{
                window.highlighteLine.style.background=""
            } catch {}
            if(window.replyButtons===undefined || !window.replyButtons[0].isConnected){
                window.replyButtons = Array.from(document.querySelectorAll("button[aria-label=\"Щелкните, чтобы ответить\"], button[aria-label=\"См. ветку\"")).slice(10); //чтобы сразу не отменялось когда верхние сообщения уходят
                window.replyButtonsIdx=window.replyButtons.length
            }
            if(window.replyButtons!==undefined){
                try{
                    window.replyButtonsIdx++;
                    var b = window.replyButtons[window.replyButtonsIdx]
                    if(window.replyButtonsIdx===window.replyButtons.length){
                        window.replyButtons=undefined;
                        document.querySelectorAll("button[aria-label=\"Закрыть\"")[0].click();
                    }
                    b.click()
                    do{
                        b=b.parentElement
                    } while(b!=document && !b.classList.contains("chat-line__message"));
                    if(b.classList.contains("chat-line__message")){
                        b.style.background="#808080";
                        window.highlighteLine=b;
                        b.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
                    }
                } catch {
                    window.replyButtons=undefined;
                }
                return false;
            }
        }
        if(e.code=="Space" && e.ctrlKey && !e.altKey){
            // tb.focus(); всё равно плей-паузу жмёт
            document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
            return false;
        }
        if(e.code=="KeyX" && !e.ctrlKey && e.altKey){
            // tb.focus(); всё равно плей-паузу жмёт
            document.querySelectorAll("button[data-a-target=\"player-clip-button\"]")[0].click();
            return false;
        }
        if(e.ctrlKey && e.altKey){
            if(e.code=="Space"){
                console.log('ctrl alt space');
                if(document.URL.match('/videos/')!==null){
                    document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
                } else {
                    if(window.video.paused){
                        if(document.hidden){
                            document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
                        } else {
                            window.video.play();
                        }
                    }else{
                        if(document.hidden){
                            document.querySelectorAll("button[data-a-target=\"player-play-pause-button\"]")[0].click();
                        } else {
                            window.video.pause();
                        }
                    }
                }
                return false;
            }
            if(e.code=="KeyR"){
                document.querySelectorAll("button[data-a-target=\"right-column__toggle-collapse-btn\"]")[0].click();
                return false;
            }
            if(e.code=="KeyZ"){
                var newTime = window.video.currentTime-3
                //video.fastSeek(Math.min(newTime,video.buffered.end(0)));
                //фаст ломает синхронизацию со звуком
                window.video.currentTime=Math.min(newTime,window.video.buffered.end(0)-1.1);
                return false;
            }
            if(e.code=="KeyX"){
                var newTime = window.video.currentTime+3
                //video.fastSeek(Math.min(newTime,video.buffered.end(0)));
                //фаст ломает синхронизацию со звуком
                window.video.currentTime=Math.min(newTime,window.video.buffered.end(0)-1.1);
                return false;
            }

            if(e.code=="KeyD"){
                //document.querySelectorAll("button[data-a-target=\"player-theatre-mode-button\"]")[0].click();

                //document.querySelectorAll("button[data-a-target=\"player-fullscreen-button\"]")[0].click();
                document.querySelectorAll("div[data-a-page-loaded-name=\"ChannelWatchPage\"]")[0].requestFullscreen();
                return false;
            }

            if(e.code=="KeyB"){
                //document.querySelectorAll("button[data-a-target=\"player-theatre-mode-button\"]")[0].click();
                document.querySelectorAll("button[aria-label*=\"alt+t\"]")[0].click();
                return false;
            }
            if(e.code=="KeyM"){
                document.querySelectorAll("button[data-a-target=\"player-mute-unmute-button\"]")[0].click();
                return false;
            }
            if(e.code=="KeyN"){
                if(window.video.style.transform==""){
                    window.video.style.transform="scaleY(1.11111)";
                } else if(window.video.style.transform=="scaleY(1.11111)"){
                    window.video.style.transform="scaleY(1.3333333333)";
                } else {
                    window.video.style.transform="";
                }
                return false;
            }
            if(e.code=="KeyV"){
                tb.focus()
                return false;
            }
        }
    }

    document.body.addEventListener("keydown",keylistener,true)

    while(true){
        //console.log('assigned')
        document.body.onmousedown = window.mousedown
        try{
            document.querySelector(".click-handler").addEventListener("click", window.clicked );
        } catch {
            await new Promise(r => setTimeout(r, 100));
            continue;
        }
        //setTimeout(()=>{
        //document.addEventListener('load', ()=>{
        'use strict';

        var video=document.querySelector("video");
        //console.log("improv" + "1");
        if(video===null && document.URL.match('/popout/')===null){
            window.video=video;
            await new Promise(r => setTimeout(r, 100));
            continue;
        }
        //console.log("improv" + "2");
        if(window.video!=null && window.video.isConnected){
            try{
                video.eventListenerList["pause"].forEach((l)=>{video.removeEventListener("pause",l.listener,l.options)});
            }
            catch{}
            try{
                video.eventListenerList["ratechange"].forEach((l)=>{video.removeEventListener("ratechange",l.listener,l.options)});
            }
            catch{}
            try{
                await new Promise(r => setTimeout(r, 1000));
            }catch{}
            continue;

        }
        //console.log("improv" + "3");

        try{
            video._addEventListener('pause',window.pauseHandler)
            video._addEventListener('play',window.pauseHandler)
            video._addEventListener("waiting", (e) => {  console.log("Video is waiting for more data."); window.video.playbackRate=1;});

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
        //console.log("improv" + "4");

        console.log("trying to remove iframe");
        try{
            document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
            console.log("removed iframe")
        } catch (e){
            try{ await new Promise(r => setTimeout(r, 200));}catch{}
        }

        try{ await new Promise(r => setTimeout(r, 3000));}catch{}
        //console.log("improv" + "5");
        try{
            document.querySelectorAll(".extension-view__iframe")[0].parentNode.removeChild(document.querySelectorAll(".extension-view__iframe")[0]);
            console.log("removed iframe")
        } catch (e){
            try{ await new Promise(r => setTimeout(r, 200));}catch{}
        }
        window.video=video;
        // video.style.object-fit="scale-down"
        //console.log("improv" + "6");
    }
}


while(true){
    try{
        document.querySelector(".click-handler").addEventListener("wheel", (e)=>{
            if(!e.shiftKey && !e.ctrlKey){
                var newTime = window.video.currentTime+3*(Math.sign(e.deltaY));
                //video.fastSeek(Math.min(newTime,video.buffered.end(0)));
                //фаст ломает синхронизацию со звуком
                window.video.currentTime=Math.min(newTime,window.video.buffered.end(0)-1.1);
            } else if(e.shiftKey) {
                if(e.deltaY<0){
                    window.video.playbackRate*=1.05;
                }else{
                    window.video.playbackRate/=1.05;
                }
            }
        } );
    } catch{
        await new Promise(r => setTimeout(r, 100));
        continue;
    }
    break;
}

// while(true){
//     try{
//         document.querySelectorAll(".chat-wysiwyg-input__editor")[0].focus();
//         break;
//     } catch {
//         await new Promise(r => setTimeout(r, 100));
//     }
// }


// navigator.mediaSession.setActionHandler("play",e=>{
//     if(e.action==='pause'){
//         //window.video.eventListenerList["pause"].forEach((l)=>{l.listener(new Event("wtf"))});
//         console.log('pause pressed');
//     }
// });

    console.log("improving??")

window.twitchImprover();
