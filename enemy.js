AFRAME.registerComponent('enemy',{
    init: function(){
        setInterval(this.shootEnemy(),2000)
    },
    shootEnemy: function(){
        var scene= document.querySelector('#scene');

        var enemy= document.querySelectorAll('.enemy');

        for(var i=0; i<enemy.length; i++){
            var fireball= document.createElement('a-entity');
            fireball.setAttribute('class','fireball');
            fireball.setAttribute('gltf-model','./165_models/fireball/scene.gltf');
            fireball.setAttribute('dynamic-body',{mass:0});

            var pos= enemy[i].getAttribute('position');

            fireball.setAttribute('position',{
                x:pos.x,
                y:pos.y,
                z:pos.z
            });

            fireball.setAttribute('scale',{
                x:0.05,
                y:0.05,
                z:0.05
            });

            scene.appendChild(fireball);

            var position1= new THREE.Vector3();
            var position2= new THREE.Vector3();

            var player= document.querySelector('#weapon').object3D;
            var enemy_fireball= fireball.object3D;
            player.getWorldPosition(position1);
            enemy_fireball.getWorldPosition(position2);

            var direction= new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();

            fireball.setAttribute('velocity',direction.multiplyScalar(20));

            var element= document.querySelector('#countLife');
            var playerLife= parseInt(element.getAttribute('text').value);

            fireball.addEventListener('collide',function(e){
                if(e.detail.body.el.id === "weapon"){
                    if(playerLife >0){
                        playerLife -=1;
                        element.setAttribute('text',{
                            value: playerLife
                        });
                    }
                    if(playerLife <= 0){
                        var txt= document.querySelector('#over');
                        txt.setAttribute('visible',true);
    
                        var el= document.querySelectorAll('.enemy');
                        for(var a=0; a< el.length; a++){
                            scene.removeChild(el);
                        }
                    }
                }
            });
        }
    },
})