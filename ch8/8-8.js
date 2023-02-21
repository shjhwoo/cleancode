export function acquireData(input) {
  const lines = input.split("\n");
  //let firstLine = true;
  const result = [];
  for (const line of lines) {
    // if (firstLine) {
    //   firstLine = false;
    //   continue;
    // }
    if (line.trim() === "") continue;
    const record = line.split(",");
    if (record[1].trim() === "India") {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}

const input = `office, country, telephone\n
Chicago, USA, +1 312 373 1000\n
Beijing, China, +86 4008 900 505\n
Bangalore, India, +91 80 4064 9570\n
Porto Alegre, Brazil, +55 51 3079 3550\n
Chennai, India, +91 44 660 44766`;
const result = acquireData(input);
console.log(result);

function acquireData(input) {
  const lines = input.split("\n").slice(1);
  const india = lines.filter((line) => isIndia(line)).split(",");

  return [{ city: india[0].trim(), phone: india[2].trim() }];
}

function isIndia(line) {
  return line.split(",")[1].trim() === "India";
}
