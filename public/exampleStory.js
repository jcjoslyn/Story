import StoryManager from "./scripts/Story/StoryManager.js";

const speakerStyles = {
  Bruno: {
    color: "red",
    fontFamily: "Courier New",
    fontSize: "18pt",
  },
};

const stateData = {
  default: {
    links: [
      {
        target: "1A",
        event: "1A",
      },
    ],
    location: {
      src:
        "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
    },
    characters: [
      {
        src:
          "https://preview.redd.it/xyqo6hx42sn51.png?width=440&format=png&auto=webp&s=3bf357e64a68883aee1618a1abdadc16d9ceee73",
      },
      {
        src:
          "https://preview.redd.it/xyqo6hx42sn51.png?width=440&format=png&auto=webp&s=3bf357e64a68883aee1618a1abdadc16d9ceee73",
        position: "right",
      },
    ],
    dialogue: {
      background: {},
      typeFunction: "none",
      text: {
        speaker: {
          name: "Bruno",
          styles: speakerStyles.Bruno,
        },
        dialogue: { text: "How are you today?", styles: {} },
      },
      delay: 0,
    },
  },
  "1A": {
    links: [
      {
        target: "default",
        event: "What? No.",
      },
    ],
    location: {
      src:
        "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
    },
    characters: [
      {
        src:
          "https://preview.redd.it/xyqo6hx42sn51.png?width=440&format=png&auto=webp&s=3bf357e64a68883aee1618a1abdadc16d9ceee73",
      },
      {
        src:
          "https://preview.redd.it/xyqo6hx42sn51.png?width=440&format=png&auto=webp&s=3bf357e64a68883aee1618a1abdadc16d9ceee73",
        position: "right",
      },
    ],
    dialogue: {
      background: {},
      typeFunction: "none",
      text: {
        speaker: {
          name: "Bruno",
          styles: speakerStyles.Bruno,
        },
        dialogue: { text: "That's an odd response.", styles: {} },
      },
      delay: 0,
    },
  },
};

const parent = document.getElementById("root");

const testStory = new StoryManager({
  stateData,
  parent,
});
