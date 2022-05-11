class StoryFrame {
  links;
  location;
  characters;
  dialogue;
  constructor({ name, links, location, characters, dialogue }) {
    this.links = links;
    this.location = location;
    this.characters = characters;
    this.dialogue = dialogue;
  }
}

export default StoryFrame;
