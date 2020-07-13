
var container; var camera, scene, projector, renderer; var PI2 = Math.PI * 2;
var programFill = function (a) {
    a.beginPath();
    a.arc(0, 0, 1, 0, PI2, true);
    a.closePath(); a.fill()
};
var programStroke = function (a) {
    a.lineWidth = 0.05;
    a.beginPath();
    a.arc(0, 0, 1, 0, PI2, true);
    a.closePath();
    a.stroke()
};
var mouse = { x: 0, y: 0 },
    INTERSECTED;
init();
animate();
function init() {
    container = document.createElement("div");
    container.id = "bgc1";
    container.style.zIndex = "100";
    container.style.position="absolute";
    container.style.top="0";
    container.style.left="0";

    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 300, 500);
    scene = new THREE.Scene();
    for (var a = 0; a < 150; a++) {
        var b = new THREE.Particle(new THREE.ParticleCanvasMaterial({ color: Math.random() * 8421504 + 8421504, program: programStroke }));
        b.position.x = Math.random() * 800 - 400;
        b.position.y = Math.random() * 800 - 400;
        b.position.z = Math.random() * 800 - 400;
        b.scale.x = b.scale.y = Math.random() * 10 + 10; 
        scene.add(b)
    }
    projector = new THREE.Projector();
    renderer = new THREE.CanvasRenderer();
    
    var width=window.innerWidth>1300?(window.innerWidth-10):1300;
    var height=window.innerWidth>700?(window.innerHeight-10):700;
  
    renderer.setSize(width, height);
    //renderer.setSize(window.innerWidth-50, window.innerHeight-50);
    
    container.appendChild(renderer.domElement);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    window.addEventListener("resize", onWindowResize, false)
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    var width=window.innerWidth>1300?(window.innerWidth-10):1300;
    var height=window.innerWidth>700?(window.innerHeight-10):700;
    renderer.setSize(width, height)
}
function onDocumentMouseMove(a) {
    a.preventDefault();
    mouse.x = (a.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(a.clientY / window.innerHeight) * 2 + 1
}
function animate() {
    requestAnimationFrame(animate); render()
}
var radius = 600; var theta = 0;
function render() {
    theta += 0.2;
    camera.position.x = radius * Math.sin(theta * Math.PI / 360);
    camera.position.y = radius * Math.sin(theta * Math.PI / 360);
    camera.position.z = radius * Math.cos(theta * Math.PI / 360);
    camera.lookAt(scene.position); camera.updateMatrixWorld();
    var b = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    projector.unprojectVector(b, camera);
    var a = new THREE.Ray(camera.position, b.subSelf(camera.position).normalize());
    var c = a.intersectObjects(scene.children);
    if (c.length > 0) {
        if (INTERSECTED != c[0].object) {
            if (INTERSECTED) {
                INTERSECTED.material.program = programStroke
            }
            INTERSECTED = c[0].object;
            INTERSECTED.material.program = programFill
        }
    }
    else {
        if (INTERSECTED) {
            INTERSECTED.material.program = programStroke
        }
        INTERSECTED = null
    }
    renderer.render(scene, camera)
};