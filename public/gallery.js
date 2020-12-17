const getdata = async () => {
  const response = await fetch("http://localhost:3000/images");
  const data = await response.json();
  console.log(data);
  return data;
};

getdata().then((data) => {
  for (var i = 0; i < data.length; i++) {
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    image.src = "./photo-gallery/" + data[i].imageFileName;
    imageContainer.appendChild(image);
    const caption = document.createElement("p");
    caption.innerText = data[i].caption;
    imageContainer.appendChild(caption);
    const gallery = document.querySelector(".gallery");
    gallery.appendChild(imageContainer);
  }
});
