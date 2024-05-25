const mysqlDateString = "2024-03-27T23:00:00.000Z";
const mysqlDate = new Date(mysqlDateString);

// Convert MySQL date to UTC format
const utcYear = mysqlDate.getUTCFullYear();
const utcMonth = String(mysqlDate.getUTCMonth() + 1).padStart(2, "0");
const utcDay = String(mysqlDate.getUTCDate()).padStart(2, "0");

const formattedUTCDate = `${utcYear}/${utcMonth}/${utcDay}`;
// console.log(formattedUTCDate); // Output: 2024/03/27

bcrypt.hash("1234", 10).then((result) => {
  console.log(result);
});
