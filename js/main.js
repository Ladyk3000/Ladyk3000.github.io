import { update_scene, render_scene} from "./game.js"
//import { setup_scene} from "./setup_scene.js"

function main_loop(){
    //update_scene(main_scene)
    //render_scene(main_scene)
    update_scene()
    render_scene()
}

//main_scene = setup_scene()
//let game = setInterval(main_loop(main_scene), 20)
let game = setInterval(main_loop, 20)