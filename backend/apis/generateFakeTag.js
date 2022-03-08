const dogNames = require("dog-names");
const dogBreeds = require("dog-breeds");
const loremIpsum = require("lorem-ipsum").loremIpsum;

const genders = ["Male", "Female"];
const tagStyles = [
  "621fe6a57610b4ce25312130",
  "62208d2c7c032f318f6e06f9",
  "62208d3d7c032f318f6e06fb",
  "6224a810ef31edf41e0a7218",
  "6224a81def31edf41e0a721a",
  "6224a82aef31edf41e0a721c",
];
const users = [
  "6227c161401e36bdc873d882",
  "6227c238ebafd9ea923a3406",
  "6227c06fa344398d59800c97",
  "6227c1e6ebafd9ea923a33f6",
  "6227c296ebafd9ea923a340e",
  "6217c6f6ec536f0ae022ec58",
  "6227c204ebafd9ea923a33fa",
  "6227bf59f8eb7449e10ec209",
  "6227c24aebafd9ea923a340a",
  "6227c21debafd9ea923a3402",
  "6227c210ebafd9ea923a33fe",
];

const statuses = ["Active", "Active", "Active", "Pending", "Lost", "Lost"];

// console.log(loremIpsum()); // generates one sentence
const generateTag = () => {
  let breedObj = dogBreeds.random();
  console.log(breedObj);
  while (breedObj?.imageURL === "") breedObj = dogBreeds.random();
  return {
    petName: dogNames.allRandom(),
    description: loremIpsum(),
    status: statuses[Math.floor(Math.random() * (statuses.length - 1))],
    productId: tagStyles[Math.floor(Math.random() * (tagStyles.length - 1))],
    image: breedObj.imageURL,
    breed: breedObj.name,
    gender: genders[Math.floor(Math.random() * 2)],
    userId: users[Math.floor(Math.random() * (tagStyles.length - 1))],
  };
};
module.exports = {
  generateTag,
};
