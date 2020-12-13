export class Component {
  parent: string | HTMLElement | Element;
  component: HTMLElement;
  constructor(parentSelector: string | HTMLElement | Element, tagName: string = "div") {
    if (typeof parentSelector === "string") {
      this.parent = document.querySelector(parentSelector)!;
    } else {
      this.parent = parentSelector;
    }
    this.component = document.createElement(tagName);
  }

  hide() {
    this.component.style.display = "none";
  }

  show() {
    this.component.style.display = "";
  }

  render() {
    (this.parent as HTMLElement).append(this.component);
    return this.component;
  }
}