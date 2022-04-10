AFRAME.registerComponent('player-movement',{
    init: function(){
        this.walk()
    },
    walk: function(){
        window.addEventListener('keydown',(e)=>{
            if(
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ){
                var entity= document.querySelector('#sound2');
                entity.components.sound.playSound();
            }
        });
    }
});