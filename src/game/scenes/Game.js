import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    
   createPlatforms() {
        const platforms = this.physics.add.staticGroup();


        //Ground_Platform
        platforms.create(512, 768, 'ground').setScale(3).refreshBody();


        //Side_Platform
        platforms.create(100, 260, 'ground');
        platforms.create(100, 520, 'ground');
        platforms.create(900, 520, 'ground');
        platforms.create(900, 260, 'ground');


        //Center_Platform
        platforms.create(512, 384, 'ground').setScale(.5).refreshBody();

        platforms.create(512, 84, 'ground').setScale(.3).refreshBody();

        return platforms;
    };

    createPlayer()
    {
        const player = this.physics.add.sprite(100, 650, 'dude');
        player.setBounce(0.15);
        player.setCollideWorldBounds(true);
 
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
 
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
 
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1

            
        });

         return player;
    }

    createStars()
    {
        const stars = this.physics.add.group({
            key: 'star',
            repeat: 26,
            setXY: { x: 13, y: 0, stepX: 45 }
        });
 
        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.1));
        });
 
        return stars;
    }
    
    create ()
    {

        this.cameras.main.setBackgroundColor(0x002200);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        const platforms = this.createPlatforms();

        this.player = this.createPlayer();

        const stars = this.createStars();

        this.physics.add.collider(this.player, platforms);

        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(this.player, stars, this.collectStar, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        //Next_scene
        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    collectStar(player, star)
    {
        star.disableBody(true, true);
    }

    update() {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-360);
 
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(360);
 
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0)
 
            this.player.anims.play('turn');
        }
 
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-700);
    }
}
}
