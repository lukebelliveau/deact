export default class MountableString {
  constructor(element){
    if(!element.type) this.mount = () => {
      const node = document.createElement('span');
      node.innerHTML = element;
      return node;
    };
  }
};