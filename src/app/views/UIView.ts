import CounterComponent from "../components/CounterComponent";
import * as GAME from "../configs/Game";
import * as HUD from "../configs/Hud";

export class UIView extends Phaser.GameObjects.Container {
    private counter: CounterComponent;
    private gameEvents: Phaser.Events.EventEmitter;
    private startMoment = 0;

    public constructor(public scene, eventEmitter: Phaser.Events.EventEmitter) {
        super(scene);
        this.gameEvents = eventEmitter;
        this.init();
    }

    public setCounter(): void {
        this.counter.setInitialValue(GAME.CLOCK_TIME);
    }

    public updateCounter(): void {
        if (this.startMoment === 0) this.startMoment = Date.now();
        if (Date.now() >= this.startMoment + 1000 - HUD.COUNTER_LABEL.tweenTime) {
            this.counter.updateCounterTween();
        }
        if (Date.now() >= this.startMoment + 1000) this.startMoment += 1000;
    }

    private init(): void {
        this.initCounter();
        this.handleClicks();
    }

    private initCounter(): void {
        this.counter = new CounterComponent(this.scene);
        this.add(this.counter);
        this.setCounter();
    }

    // handles Clicks and Touches
    private handleClicks(): void {
        this.scene.input.on("pointerup", (pointer) => {
            if (pointer.leftButtonReleased()) this.gameEvents.emit(GAME.EVENT.CLICK);
        });
    }
}
