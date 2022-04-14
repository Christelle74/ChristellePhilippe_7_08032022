class CreateTags {
  constructor(item) {
    this.item = item;
    console.log(this.item);
  }

  buildTagsList() {
    const tag = document.createElement("li");
    const tagColor = this.item.dataset.color;
    console.log(tagColor);
    const tagName = this.item.innerHTML;
    tag.classList.add(
      `${tagColor}`,
      "newTag",
      "mb-1",
      "me-2",
      `bg-${tagColor}`,
      "px-3",
      "py-2",
      "pe-5",
      "d-flex",
      "flex-row",
      "align-items-center",
      "rounded"
    );

    tag.innerHTML = `${tagName}
  <img id="close" src="assets/times-circle-regular.svg" alt=""
/>`;
    tag.setAttribute("data-item", tagName);
    console.log(tag);
    return tag;
  }
}
