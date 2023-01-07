import { update_scene, render_scene} from "./game.js"

function main_loop(){
    update_scene()
    render_scene()

    window.requestAnimationFrame(main_loop)
}

main_loop()
