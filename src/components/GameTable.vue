<template>
  <div class="m-2">
    <v-card
        class="mx-auto"
        width="500"
        height="500"
        color="secondary"
    >
      <table class="table"
             :style="{transform: rotate ? 'rotate(180deg)' : ''}"
      >
        <tr
            v-for="row in rows"
            v-bind:key="row"
        >
          <td
              v-for="item in row"
              v-bind:key="item"
              :class="`cell ${item['class']} ${this.currentPos === item['pos'] ? 'bg-amber' : ''}`"
              :style="item['style']"
              v-on:click="item['pos'] !== undefined ? move(item['pos']) : null"
          >
            {{item["text"]}}
          </td>
        </tr>
      </table>
    </v-card>
  </div>
</template>

<script>
import requests from "@/requests";

export default {
  name: "GameTable",
  props: {
    rotate: Boolean,
    roomName: String,
    userId: -2
  },
  data() {
    return {
      rows: [],
      longPollInterval: null,
      currentPos: null
    }
  },
  methods: {
    getTexture(name) {
      if (name === "null"){
        return null;
      } else if (name === "fog") {
        return `/Images/fog.png`
      }
      const get = {
        castle: "lad",
        queen: "fer",
        bishop: "off",
        knight: "kon",
        king: "kor",
        pawn: "pes",
      }
      const colors = {
        White: "w",
        Black: "b"
      }
      const split = name.split(" ");
      return `/Images/${get[split[1]]}_${colors[split[0]]}.png`;
    },
    cell(clazz, text, style, pos) {
      style = style === undefined ? {} : style;
      if (this.rotate) {
        style["transform"] = "rotate(180deg)";
      }
      return {class: clazz, text: text, style: style, pos}
    },
    move(pos) {
      if (this.currentPos !== null) {
        const ctx = { c: this.currentPos, p: pos };
        requests.move(this.userId, this.roomName, this.currentPos, pos).then((json) => {
          console.log(`Move {from: ${ctx.c}, to: ${ctx.p}} is ${JSON.stringify(json)}`);
        });
        this.currentPos = null;
        this.updateTable();
      } else {
        this.currentPos = pos;
      }
    },
    updateTable() {
      requests.show(this.userId, this.roomName).then((json) => {
        let canvas = [];
        if (json["Canvas"] === 0) {
          this.$router.replace({ path: "/rooms" });
          clearInterval(this.longPollInterval);
          return;
        }
        const This = this;
        function alphabetRow(list) {
          const row = [];
          row.push(This.cell("greenCell", "-"));
          for (let i = 65; i < 65 + 8; i++) {
            row.push(This.cell("greenCell", String.fromCharCode(i)));
          }
          row.push(This.cell("greenCell", "-"));
          list.push(row);
        }
        alphabetRow(canvas)
        let odd = 0;
        canvas.push(...(json["Canvas"].map((row, index, arr) => {
          if (odd === 0) odd = 1;
          else odd = 0;
          return [
            this.cell("greenCell", String(arr.length - index)),
            ...row.map((peace, cellIndex) => {
              if (odd === 0) odd = 1;
              else odd = 0;
              const texture = this.getTexture(peace);
              const style = { };
              style["background-image"] = texture !== null ? "url(" + texture + ")" : undefined;
              const pos = String.fromCharCode(cellIndex + 1 + 64) + (arr.length - index);
              return this.cell(odd ? "whiteCell" : "blackCell", undefined, style, pos);
            }),
            this.cell("greenCell", String(arr.length - index))];
        })));
        alphabetRow(canvas);
        this.rows = canvas;
      }).catch(() => {
        this.$router.replace({path: "/rooms"})
      });
    }
  },
  created() {
    if (this.roomName === null || this.userId <= -1) {
      return;
    }
    console.log(`Table, room: ${this.roomName}`);
    this.longPollInterval = setInterval(this.updateTable, 2000);
  },
  beforeUnmount() {
    clearInterval(this.longPollInterval);
  }
}
</script>

<style scoped>
.table
{
  width: 500px;
  height: 500px;
  padding: 0;
  margin: 0;
}

.cell
{
  width: 30px;
  height: 30px;
  text-align: center;
  background-position: center;
  background-size: 85%;
  background-repeat: no-repeat;
}

.greenCell
{
  background-color: aquamarine;
}

.whiteCell
{
  background-color: rgb(247, 247, 100);
}

.blackCell
{
  background-color: rgb(180, 180, 180);
}
</style>