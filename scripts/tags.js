


//tags
/*function displayTags() {
  selectedTags.forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectItem = e.target.textContent;
      if (!selectedTags.includes(selectItem)) {
        tagsArray.push(selectItem);
      }
      createTags(selectedTags);
    });
  });
}
displayTags();*/

// fermeture du tag par la croix
//export { displayTags, createTags };

/*
function closeTag(e) {
  const tagBtns = [...document.querySelectorAll("li")];
  console.log(tagBtns);
  const [container] = tagBtns.filter((btn) => btn.contains(e.target));
  console.log([container]);
  container.remove();
}
