class Player{
constructor(name,nameColor,size,x,y,color,speed,velocity,direction){
  this.name = name;
  this.nameColor = nameColor;
  this.size = size;
  this.x = x;
  this.y = y;
  this.color = color;
  this.speed = speed;
  this.velocity = velocity;
  this.direction = direction;
}
snareBoundry(){
  if (this.x < 0 + this.size){
    this.x = 0 + this.size;
  }
  else if (this.x > canvas.width - this.size) {
    this.x = canvas.width - this.size;
  }

  if (this.y < 0 + this.size){
    this.y = 0 + this.size;
  }
  else if (this.y > canvas.height - this.size){
    this.y = canvas.height - this.size;
  }
}
render(){
  ctx.beginPath();
  ctx.moveTo(this.x,this.y);
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = this.nameColor;
  let centerWeight = ctx.measureText(this.name).width;
  ctx.fillText(this.name, this.x - centerWeight /2, this.y - 10);
}
update(){
  if (this.direction.x == 0 && this.direction.y == 0){
    this.velocity.x *= 0.97;
    this.velocity.y *= 0.97;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    let stopThreashold = 0.01;
    if ((this.velocity.x < stopThreashold && this.velocity.x > 0 || this.velocity.y < stopThreashold && this.velocity.y > 0)|| (this.velocity.x > stopThreashold * -1 && this.velocity.x < 0 || this.velocity.y > stopThreashold * -1 && this.velocity.y < 0)){
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
    this.snareBoundry();
    return
  }
  let mag = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y)
  this.direction.x = this.direction.x / mag;
  this.direction.y = this.direction.y / mag;
  this.velocity.x = this.direction.x * this.speed;
  this.velocity.y = this.direction.y * this.speed;
  this.velocity.x = this.velocity.x * (upInterval / 10);
  this.velocity.y = this.velocity.y * (upInterval / 10);
  this.x += this.velocity.x;
  this.y += this.velocity.y;

  this.snareBoundry();
}
}
