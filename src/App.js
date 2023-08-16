import React, { Component } from "react";
import "./App.css";
import Messages from "./Components/Messages";
import Input from "./Components/Input";

function randomName() {
  const firstNames = [
    "Abbe",
    "Bobine",
    "Caty",
    "Daphene",
    "Eddie",
    "Floria",
    "Goldie",
    "Harmonie",
    "Jacinda",
    "Karolina",
    "Leonora",
    "Mandy",
    "Nelly",
    "Pepita",
    "Raquel",
    "Sean",
    "Tamiko",
    "Valenka",
    "Yasmeen",
    "Zorana",
    "Abbey",
    "Brooke",
    "Christiano",
    "Darb",
    "Early",
    "Ferguson",
    "Galvan",
    "Harper",
    "Ives",
    "Jack",
    "Kevan",
    "Leeland",
    "Manuel",
    "Nikola",
    "Osmund",
    "Pepito",
    "Rad",
    "Sander",
    "Tabby",
    "Vladimir",
    "Wain",
    "Yurik",
    "Zebadiah",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];

  return firstName;
}

function avatarColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: avatarColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("IhmnUuRZcH1qwbyo", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = [...this.state.messages];
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
