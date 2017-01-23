var Nakama = {};
Nakama.configs = {
  bulletSpeed : 1000,
  shipSpeed   : 500,

};

window.onload = function(){
  Nakama.game = new Phaser.Game(640,960,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.background = Nakama.game.add.tileSprite(0, 0, 700, 1000, "background");
  Nakama.playerBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.players = [];
  Nakama.players.push(
    new ShipType2Controller(200,400,{
      up        : Phaser.Keyboard.UP,
      down      : Phaser.Keyboard.DOWN,
      left      : Phaser.Keyboard.LEFT,
      right     : Phaser.Keyboard.RIGHT,
      fire      : Phaser.Keyboard.SPACEBAR,
      cooldown  : 0.3,
      frameNameDefault: "Spaceship2-Player.png",
      frameNameLeft   : "Spaceship2Left-Player.png",
      frameNameRight  : "Spaceship2Right-Player.png",
      health          : 1
    })
  );

  Nakama.players.push(
    new ShipType3Controller(400,400, {
      up        : Phaser.Keyboard.W,
      down      : Phaser.Keyboard.S,
      left      : Phaser.Keyboard.A,
      right     : Phaser.Keyboard.D,
      fire      : Phaser.Keyboard.SHIFT,
      cooldown  : 0.3,
      frameNameDefault: "Spaceship3-Player.png",
      frameNameLeft   : "Spaceship3Left-Partner.png",
      frameNameRight  : "Spaceship3Right-Partner.png",
      health          : 1
    })
  );

  Nakama.enemies = [];

  Nakama.enemies.push(
    new EnemyType3Controller(540, 100,{
      minX      : 100,
      maxX      : 540,
      tweenTime : 5,
      health    : 10,
      cooldown  : 1
    })
  );

}

// update game state each frame
var update = function(){
   Nakama.background.tilePosition.y += 5;
  for(var i=0;i<Nakama.players.length;i++){
    Nakama.players[i].update();
  }
  Nakama.timeSinceLastSpawn += Nakama.game.time.physicsElapsed;
  
  for(var i=0;i<Nakama.enemies.length;i++){
    Nakama.enemies[i].update();
  }

  Nakama.game.physics.arcade.overlap(Nakama.playerBulletGroup, Nakama.enemyGroup, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.enemyBulletGroup, Nakama.playerGroup, onBulletHitActor);
}

// before camera render (mostly for debug)
var render = function(){
  // Nakama.playerGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // })
}

var onBulletHitActor = function(bulletSprite, actorSprite){
  actorSprite.damage(1);
  bulletSprite.kill();
}
