const { faker } = require("@faker-js/faker");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Generate fake data
const generateFakeData = (numRecords) => {
  const data = [];
  const brands = ["Apple", "Samsung", "Vivo", "OnePlus", "iphone", "Oppo"];
  const osTypes = ["iOS", "Android"];
  const colors = ["Black", "White", "Blue", "Red", "Green", "Purple", "Silver"];

  for (let i = 0; i < numRecords; i++) {
    const brand = faker.helpers.arrayElement(brands);
    const model = faker.commerce.productName();
    const releaseYear = faker.number.int({ min: 2000, max: 2024 });
    const color = faker.helpers.arrayElement(colors);
    const price = faker.number.int({ min: 200, max: 5500 }); // Adjusted to a more realistic range for mobile prices
    const storage = faker.number.int({ min: 22, max: 512 }); // Storage in GB
    const os = faker.helpers.arrayElement(osTypes);
    data.push({
      Brand: brand,
      Model: model,
      ReleaseYear: releaseYear,
      Color: color,
      Price: price,
      Storage: storage,
      OS: os,
    });
  }

  return data;
};

// Write data to CSV file
const writeDataToCsv = (data) => {
  const csvWriter = createCsvWriter({
    path: "example_mobile_data.csv",
    header: [
      { id: "Brand", title: "Brand" },
      { id: "Model", title: "Model" },
      { id: "ReleaseYear", title: "ReleaseYear" },
      { id: "Color", title: "Color" },
      { id: "Price", title: "Price" },
      { id: "Storage", title: "Storage" },
      { id: "OS", title: "OS" },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log("CSV file created successfully"))
    .catch((err) => console.error("Error writing CSV file:", err));
};

const numRecords = 100000; // Number of records to generate
const fakeData = generateFakeData(numRecords);
writeDataToCsv(fakeData);
