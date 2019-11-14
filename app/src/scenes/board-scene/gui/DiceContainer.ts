import { GameConstants } from "../../../GameConstants";
import { GameVars } from "../../../GameVars";
import { BoardScene } from "../BoardScene";
import { BoardManager } from "../BoardManager";

export class DiceContainer extends Phaser.GameObjects.Container {

    private dice: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene) {

        super(scene);

        this.dice = new Phaser.GameObjects.Sprite(this.scene, GameConstants.GAME_WIDTH - 115 * GameVars.scaleX, 300, "texture_atlas_1", "dice2_red_01");
        this.dice.setScale(.5);
        BoardScene.currentInstance.add.existing(this.dice);
        this.dice.visible = false;
        this.add(this.dice);

        this.dice.on("animationcomplete", this.onAnimationComplete, this);
    }

    public roll(i: number): void {
       
        this.dice.visible = true;

        this.dice.play("dice_red_" + i);
    }

    public matchOver(): void {

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 300
        });
    }

    private onAnimationComplete(): void {

        BoardManager.onDiceResultAvailable();
    }
}
