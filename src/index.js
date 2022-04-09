const fs = require("fs");

const countVowerAndConsonants = (str) => {
  const vowers = ["a", "e", "i", "o", "u"];
  let count = 0;
  const strValue = str.toLowerCase();
  for (let letter of strValue) {
    if (vowers.includes(letter)) {
      count++;
    }
  }
  return {
    length: str.length,
    vowels: count,
    consonants: str.length - count,
  };
};

const AssignDriverToAddress = (driversWithAddress) => {
  return driversWithAddress
    .sort((a, b) => b.ss - a.ss)
    .reduce((acc, curr) => {
      const { driver, address, ss } = curr;
      if (acc.length === 0) {
        acc.push({
          driver,
          address,
          ss,
        });
      } else {
        const exist = acc.find(
          (item) => item.driver === driver || item.address === address
        );
        if (!exist) {
          acc.push({
            driver,
            address,
            ss,
          });
        }
      }

      return acc;
    }, []);
};

function Assign(drivers, address) {
  const driversWithAddress = [];
  let ss = 0;
  for (let i = 0; i < drivers.length; i++) {
    for (let x = 0; x < address.length; x++) {
      const driversValues = countVowerAndConsonants(
        drivers[i].split(" ").join("")
      );
      const addressValues = countVowerAndConsonants(
        address[x].split(" ").join("")
      );
      if (addressValues.length % 2 === 0) {
        ss = driversValues.vowels * 1.5;
      } else {
        ss = driversValues.consonants * 1;
      }

      if (addressValues.length === driversValues.length) {
        ss = ss + ss * 0.5;
      }

      driversWithAddress.push({
        driver: drivers[i],
        address: address[x],
        ss,
      });
    }
  }

  return AssignDriverToAddress(driversWithAddress);
}

const Init = () => {
  const address = fs.readFileSync("./input/address.txt").toString().split(",");
  const drivers = fs.readFileSync("./input/drivers.txt").toString().split(",");
  const assigns = Assign(drivers, address);

  console.log(assigns);

  try {
    fs.writeFileSync("./output/assigns.txt", JSON.stringify(assigns))
    console.log('File assigns.txt was created successfully.');
  } catch (err) {
    console.error(err)
  }
};

Init();
