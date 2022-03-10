const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const emailsEnding = [
  "@gmail.com",
  "@yahoo.com",
  "@walla.co.il",
  "@hotmail.ru",
  "@walla.com",
  "@gmail.com",
  "@yahoo.com",
  "@walla.co.il",
  "@hotmail.ru",
  "@rapid7.com",
];
const streets = [
  "Remez David",
  "Sokolov",
  "Bar Ilan",
  "Itzhak Sade",
  "Yoseftal",
  "Weizman",
  "Hagefen",
  "Hazait",
  "Herzel",
  "Balfur",
];

const cities = ["Bat-Yam", "Tel Aviv", "Rishon Lezion", "Holon", "Haifa"];
const generateAddress = () => {
  let address = "";
  address += streets[Math.floor(Math.random() * 6)];
  address += " ";
  address += (Math.floor(Math.random() * 10) + 1).toString();
  address += " ";
  address += cities[Math.floor(Math.random() * 5)];
  return address;
};
const generatePhoneNumber = () => {
  let numberSTR = "05";
  for (let i = 0; i < 8; i++) {
    numberSTR += Math.floor(Math.random() * 10).toString();
  }
  return numberSTR;
};

const generateEmail = (fullName) => {
  const nameNoSpaces = fullName.replace(/\s/g, "");
  const mailRnd = emailsEnding[Math.floor(Math.random() * 10)];
  const email = nameNoSpaces + mailRnd;
  return email;
};

const password = "1";
let address = generateAddress();
const getGeocode = async () => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA0PnKw6ClT_i8_c4ePtiXRLg7MjyC4VCA`,
    { method: "GET" }
  );
  const data = await res.json();

  if (!data.results[0]?.geometry)
    return {
      error: {
        message: "Emotional Damage",
      },
    };

  return {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng,
  };
};

const generateUser = async (fullName) => {
  address = generateAddress();
  return {
    name: fullName,
    email: generateEmail(fullName),
    phoneNumber: generatePhoneNumber(),
    password,
    geocode: await getGeocode(),
    address,
  };
};

module.exports = {
  generateUser,
};
