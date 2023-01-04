const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let gamefield_Width = ctx.canvas.clientWidth;
let gamefield_Height = ctx.canvas.clientHeight;

document.addEventListener('keydown', get_direction)
let direction = null

const background_image = new Image()
background_image.src = 'src/background.png'

const hero_image = new Image()
hero_image.src = 'src/hero.png'

const block_image = new Image()
block_image.src = 'src/block.png'

const step = 10
let block_size = 36

let parking_area = {}

let score = {
    value: 0, 
    x: 10, 
    y: 50
}

let garage_pos = {
    x: Math.floor(10 + Math.random() * gamefield_Height / 4),
    y: Math.floor(gamefield_Width / 4 + Math.random() * gamefield_Width / 4)
}

let hero = {
    size_x: 95,
    size_y: 65,
    x: gamefield_Width - 98, 
    y: gamefield_Height - 68
}

let garage = []
function generate_garage(start_x, start_y){
    garage[0]= {
        x: start_x,
        y: start_y
    }

    for (let i = 1; i < 6; i++){
        garage[i]= {
            x: garage[i-1].x,
            y: garage[i-1].y - block_size / 1
        }
    }
  
    for (let i = 6; i < 12; i++){
        garage[i]= {
            x: garage[i-1].x + block_size / 1,
            y: garage[i-1].y 
        }
    }

    for (let i = 12; i < 17; i++){
        garage[i]= {
            x: garage[i-1].x,
            y: garage[i-1].y + block_size / 1
        }
    }
}

function check_garage_collisions(){
    for (let i = 0; i < garage.length; i++){
        if (garage[i].x >= hero.x && 
            garage[i].y >= hero.y &&
            garage[i].x + block_size <= hero.x + hero.size_x && 
            garage[i].y + block_size <= hero.y + hero.size_y) {
                score.value = 0
                hero.x = gamefield_Width - 98
                hero.y = gamefield_Height - 68
            }  
    }
}

function check_correct_parking(){
    parking_area = {
        x_0: garage[5].x + block_size, 
        y_0: garage[5].y + block_size,
        x_side: 5 * block_size, 
        y_side: 5 * block_size
    }
    
    if (hero.y + hero.size_y <= parking_area.y_0 + parking_area.y_side && 
        hero.x + hero.size_x <= parking_area.x_0 + parking_area.x_side &&
        hero.x >= parking_area.x_0 &&
        hero.y >= parking_area.y_0)  {
        score.value += 10
        direction = null
        hero.x = gamefield_Width - 98
        hero.y = gamefield_Height - 68
    }
}

function get_direction(event){
    if(event.keyCode == 37 || event.keyCode == 65)
        direction = 'left'
    else if(event.keyCode == 38 || event.keyCode == 87)
        direction = 'up'
    else if(event.keyCode == 39 || event.keyCode == 68)
        direction = 'right'
    else if(event.keyCode == 40 || event.keyCode == 83)
        direction = 'down'
    else if(event.keyCode == 32)
        direction = null
}

function check_border_collisions(){
    if (hero.x >= gamefield_Width - hero.size_x) hero.x = gamefield_Width - hero.size_x
    if (hero.x <= 0 ) hero.x = 0
    if (hero.y >= gamefield_Height - hero.size_y) hero.y = gamefield_Height - hero.size_y
    if (hero.y <= 0 ) hero.y = 0
}

function move_hero(direction){
    if (direction == 'left') hero.x -= step
    if (direction == 'right') hero.x += step
    if (direction == 'up') hero.y -= step
    if (direction == 'down') hero.y += step
}

function draw_score(){
    ctx.fillStyle = 'White'
    ctx.font = "50px Arial"
    ctx.fillText(score.value, score.x, score.y)
}

function render_scene(){
    ctx.drawImage(background_image, 0, 0)
    for (let i = 0; i < garage.length; i++){
        ctx.drawImage(block_image, garage[i].x, garage[i].y, block_size, block_size)
        //ctx.strokeRect( garage[i].x,garage[i].y, block_size, block_size)
    }
    ctx.drawImage(hero_image, hero.x - 3, hero.y - 13, 100, 100)
    //ctx.strokeRect(hero.x, hero.y, hero.size_x, hero.size_y)
    //ctx.strokeRect(parking_area.x_0, parking_area.y_0, parking_area.x_side, parking_area.y_side)
    draw_score()
}
function update_scene(){
    generate_garage(garage_pos.x, garage_pos.y)
    check_border_collisions()
    check_garage_collisions()
    check_correct_parking()
    move_hero(direction)
}

export { update_scene, render_scene }
