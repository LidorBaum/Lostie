const dogNames = require("dog-names");
const dogBreeds = require("dog-breeds");
const loremIpsum = require("lorem-ipsum").loremIpsum;
const genders = ["Male", "Female"];
const tagStyles = [
  "622cce6554ee07a3aabbb304",
  "622cce5a54ee07a3aabbb302",
  "622cce4d54ee07a3aabbb300",
  "622cce4154ee07a3aabbb2fe",
  "622cce3254ee07a3aabbb2fc",
  "622cce1c54ee07a3aabbb2fa",
  "622cca6954ee07a3aabbb2f3",
  "6224a82aef31edf41e0a721c",
  "6224a81def31edf41e0a721a",
  "6224a810ef31edf41e0a7218",
  "62208d3d7c032f318f6e06fb",
  "62208d2c7c032f318f6e06f9",
  "621fe6a57610b4ce25312130"
];
const users = [
  '622de3d8fde44f218033ffaf'
  // "6227c161401e36bdc873d882",
  // "6227c238ebafd9ea923a3406",
  // "6227c06fa344398d59800c97",
  // "6227c1e6ebafd9ea923a33f6",
  // "6227c296ebafd9ea923a340e",
  // "6217c6f6ec536f0ae022ec58",
  // "6227c204ebafd9ea923a33fa",
  // "6227bf59f8eb7449e10ec209",
  // "622cf2f3dd87fbbb4d59d2d1",
  // "622cf2c7dd87fbbb4d59d2c9",
  // "6227c24aebafd9ea923a340a",
  // "6227c21debafd9ea923a3402",
  // "622cf2e5dd87fbbb4d59d2cd",
  // "6227c210ebafd9ea923a33fe"
];
const statuses = ["Active", "Active", "Active", "Pending", "Lost", "Lost"];

const generateTags = (numOfTags) =>{
    users.forEach(userId=>{
      for(let i=0; i<numOfTags; i++){
        generatedTagsArray.push(generateTag(userId))
      }
    })
  return generatedTagsArray
}
let generatedTagsArray = []

const generateTag = (userId) => {
  let breedObj = dogBreeds.random();
  while (breedObj?.imageURL === "") breedObj = dogBreeds.random();
  return {
    petName: dogNames.allRandom(),
    description: loremIpsum(),
    status: statuses[Math.floor(Math.random() * (statuses.length - 1))],
    productId: tagStyles[Math.floor(Math.random() * (tagStyles.length - 1))],
    image: breedObj.imageURL,
    breed: breedObj.name,
    gender: genders[Math.floor(Math.random() * 2)],
    userId,
  };
};
module.exports = {
  generateTags,
};
