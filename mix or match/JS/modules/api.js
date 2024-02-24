// background image function for both game.js and script.js pages
export default async function backgroundRandomImage() {
  const backgroundImageAccessKey =
    "H0lXm8vh97KcBe0LomQkNrzAE-fet84c6Z6Y-98vx6s";
  const theme = "animations , dark";
  fetch(
    `https://api.unsplash.com/photos/random?query=${theme}&client_id=${backgroundImageAccessKey}`
  )
    .then((Response) => Response.json())
    .then((data) => {
      const imgURL = data.urls.regular;
      document.body.style.backgroundImage = `url('${imgURL}')`;
      return imgURL;
    })
    .catch((error) => {
      return null;
    });
}
