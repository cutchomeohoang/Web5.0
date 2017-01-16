class EnemyController {
  constructor(x,y,spriteName,configs) {
  this.sprite=Nakama.enemyGroup.create(
    x,
    y,
    "assets",
    spriteName
  );
  this.sprite.anchor=new Phaser.Point(0.5,0.5);
  this.sprite.body.collideWorldBounds=true;
  this.configs=configs;
  this.sprite.moveRight = true;
  this.sprite.moveLeft = false;
  }

  update(){
    if (this.sprite.position.x <= this.sprite.body.width / 2) {
        this.sprite.moveRight = true;
        this.sprite.moveLeft = false;
    }

    if (this.sprite.position.x >= 640 - this.sprite.body.width / 2) {
        this.sprite.moveLeft = true;
        this.sprite.moveRight = false;

    }

    if (this.sprite.moveRight) {
        this.sprite.body.velocity.x = Nakama.configs.enemySpeed;
    }

    if (this.sprite.moveLeft) {
        this.sprite.body.velocity.x = -Nakama.configs.enemySpeed;
    }


  }
}
