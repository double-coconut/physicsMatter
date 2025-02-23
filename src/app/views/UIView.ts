import CounterComponent from "../components/CounterComponent";
import MessageComponent from "../components/MessageComponent";
import * as HUD from "../configs/Hud";

export class UIView extends Phaser.GameObjects.Container {
    private counter: CounterComponent;
    private readonly gameEvents: Phaser.Events.EventEmitter;
    private messageStart: MessageComponent;
    private messageEditCounter: MessageComponent;

    public constructor(public scene, eventEmitter: Phaser.Events.EventEmitter) {
        super(scene);
        this.gameEvents = eventEmitter;
        this.init();
    }

    public setCounter(value: number): void {
        this.counter.setInitialValue(value);
    }

    public updateCounter(): void {
        this.counter.updateCounter();
    }

    public startCounter(): void {
        this.counter.startCounter();
    }

    public showEditTimerHelp(): void {
        this.messageStart.close();
        this.messageEditCounter.show();
    }

    public closeEditTimerHelp(): void {
        this.messageEditCounter.close();
    }

    public closeStartHelp(): void {
        this.messageStart.close();
    }

    private init(): void {
        this.initCounter();
        //this.handleClicks();
        this.initMessages();
        //this.messageStart.show();
    }

    private initMessages(): void {
        this.messageStart = new MessageComponent(this.scene, HUD.MESSAGE_TEXT_START);
        this.add(this.messageStart);
        this.messageStart.show();
        this.messageEditCounter = new MessageComponent(this.scene, HUD.MESSAGE_TEXT_EDIT_COUNTER);
        this.add(this.messageEditCounter);
    }

    private initCounter(): void {
        this.counter = new CounterComponent(this.scene, this.gameEvents);
        this.add(this.counter);
    }
}
