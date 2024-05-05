const url = window.location.origin + "/api";

module.exports = {
    async login(nick, pass) {
        const response = await fetch(url + "/login", {
            headers: {
                nick: nick,
                pass: pass,
                platform: "web-0.1"
            }
        })
        return await response.json();
    },
    async register(nick, pass) {
        const response = await fetch(url + "/register", {
            headers: {
                nick: nick,
                pass: pass,
                platform: "web-0.1"
            }
        })
        return await response.json();
    },
    async rooms() {
        const response = await fetch(url + "/rooms", {
            headers: { platform: "web-0.1" }
        });
        return await response.json();
    },
    async room(name) {
        const response = await fetch(url + "/room", {
            headers: {
                roomname: name,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async show(id, name, color) {
        const response = await fetch(url + "/show/common", {
            headers: {
                id: id,
                roomname: name,
                color: color,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async move(id, roomName, startPos, endPos) {
        const response = await fetch(url + "/move", {
            headers: {
                id: id,
                roomname: roomName,
                startpos: startPos,
                endpos: endPos,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async chatHistory(roomName) {
        const response = await fetch(url + "/chat/get", {
            headers: {
                roomname: roomName,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async chat(id, roomName, message) {
        const response = await fetch(url + "/chat/send", {
            headers: {
                id: id,
                roomname: roomName,
                message: message,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async color(id, roomName) {
        const response = await fetch(url + "/room/color", {
            headers: {
                id: id,
                roomname: roomName,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async isWaitPlayer(id, roomName) {
        const response = await fetch(url + "/room/iswaitplayer", {
            headers: {
                id: id,
                roomname: roomName,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async create(id, roomName, antiCheat, random, fog) {
        const response = await fetch(url + "/create", {
            headers: {
                id: id,
                roomname: roomName,
                free: antiCheat,
                random: random,
                fog: fog,
                platform: "web-0.1"
            }
        });
        return await response.json();
    },
    async join(id, roomName) {
        const response = await fetch(url + "/join", {
            headers: {
                id: id,
                roomname: roomName,
                platform: "web-0.1"
            }
        });
        return await response.json();
    }
}