const slider_arrow_back=document.getElementById('back')
const slider_arrow_next=document.getElementById('next')
const slider_text=document.getElementById('slider-cont')
var cont=1;
slider_arrow_back.addEventListener("click",()=>{
    if(cont==1){
        
        slider_text.style.marginLeft='-400%'
        cont=5;

    }
    else if(cont==2){
        slider_text.style.marginLeft='400%'
        cont=1;
    }
    else if(cont==3){
        slider_text.style.marginLeft='200%'
        cont=2;
    }
    else if(cont==4){
        slider_text.style.marginLeft='0'
        cont=3;
    }
    else if(cont==5){
        slider_text.style.marginLeft='-200%'
        cont=4;
    }
   
})
slider_arrow_next.addEventListener("click",()=>{
    if(cont==1){
        
        slider_text.style.marginLeft='200%'
        cont=2;

    }
    else if(cont==2){
        slider_text.style.marginLeft='0'
        cont=3;
    }
    else if(cont==3){
        slider_text.style.marginLeft='-200%'
        cont=4;
    }
    else if(cont==4){
        slider_text.style.marginLeft='-400%'
        cont=5;
    }
    else if(cont==5){
        slider_text.style.marginLeft='400%'
        cont=1;
    }
   
})
