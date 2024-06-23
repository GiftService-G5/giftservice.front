const textarea=document.getElementById("textarea")

const labelarea=document.getElementById("labelarea")
const btn=document.getElementById("enviar")
const btn_menu=document.getElementById("btn-menu")
const slider=document.getElementById("content-slider")
const btn_vermas_ios=document.getElementById("btn-vermas-ios")
const btn_vermas_android=document.getElementById("btn-vermas-android")
const video_ios=document.getElementById("video-ios")
const video_android=document.getElementById("video-android")
const equis_android=document.getElementById("equis-android")
const equis_ios=document.getElementById("equis-ios")
const btn_prot_ios=document.getElementById("btn-prot-ios")
const btn_prot_android=document.getElementById("btn-prot-android")
const filtro=document.getElementById("filtro")
const btn_know=document.getElementById("btn-know")

var appear=false;
btn_know.addEventListener("click",()=>{
    window.open("https://youtu.be/3R1A_D8OpTQ")
})
btn_prot_ios.addEventListener("click",()=>{
    window.open("https://www.figma.com/proto/YmE0YtigekucaNxW3GRwW8/iOS-VERSION?type=design&scaling=scale-down&page-id=0%3A1&starting-point-node-id=115%3A3271&node-id=115-3271")
})
btn_prot_android.addEventListener("click",()=>{
    window.open("https://www.figma.com/proto/6Ygz29RN9oqIX6CJKSBmMo/ANDROID-VERSION?type=design&node-id=115-3271&scaling=scale-down&page-id=0%3A1&starting-point-node-id=115%3A3271")
})
btn_vermas_android.addEventListener("click",()=>{
    filtro.style.display="block";
    video_android.style.display="flex";
})
btn_vermas_ios.addEventListener("click",()=>{
    filtro.style.display="block";
    video_ios.style.display="flex";
})
equis_android.addEventListener("click",()=>{
    const video_yt2=document.getElementById("youtube_player1")
    filtro.style.display="none";
    
    video_android.style.display="none";
    video_yt2.remove();
    newvideo=document.createElement('iframe');
    newvideo.setAttribute("src", "https://youtu.be/-FTp1TpY9XE");
    newvideo.setAttribute("id","youtube_player1");
    newvideo.setAttribute("class","frame");
    video_android.appendChild(newvideo)
    
})
equis_ios.addEventListener("click",()=>{
    const video_yt1=document.getElementById("youtube_player")
    var newvideo;
    filtro.style.display="none";
    video_ios.style.display="none";
    video_yt1.remove();
    newvideo=document.createElement('iframe');
    newvideo.setAttribute("src", "https://youtu.be/S7ca783scPg");
    newvideo.setAttribute("id","youtube_player");
    newvideo.setAttribute("class","frame");
    video_ios.appendChild(newvideo)
})
btn_menu.addEventListener("click",()=>{

    if(appear==false){
    slider.style.display="flex !important"
    slider.style="height:300px !important"
    slider.style.border="#412009";
    slider.style.border="3px"
    slider.style.border="solid"
    

    appear=true;
    }
    else if(appear==true){
        slider.style.transition="height 1s ease-out"
        slider.style="height:0px !important"
        slider.style.border="none"
        appear=false
    }
    console.log("Hola")
})

