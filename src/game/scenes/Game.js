import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x002200);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.image(512, 384, 'star');

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
