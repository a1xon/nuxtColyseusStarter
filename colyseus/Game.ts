import { Room, Delayed, Client } from "colyseus";
import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";

class Player extends Schema {
    @type("string") username: string;
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();
    createPlayer(id: string, username: string) {
        this.players[id] = new Player();
        this.players[id].username = username;
    }
    removePlayer(id: string) {
        delete this.players[id];
    }
}

export class GameRoom extends Room<State> {
    maxClients = 10;
    roundTimeout!: Delayed;
    onCreate(options : any) {
        this.setState(new State());
        this.onMessage("command", (client : Client, data : any) => {
            /// reaction to players input
            /// e.g. answering specific client
            /// client.send("command", {});
        });
    }

    onJoin(client: Client, options: any) {
        this.state.createPlayer(client.sessionId, options.username);
    }

    onLeave(client: Client) {
        this.state.removePlayer(client.sessionId);
    }

    onDispose() {
        console.log("Dispose Room");
    }
}
