export function reportYoungestAgeAndTotalSalary(people) {
  let youngest = people[0] ? people[0].age : Infinity;
  let totalSalary = 0;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
    totalSalary += p.salary;
  }

  return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}

//개선
export function reportYoungestAgeAndTotalSalary2(people) {
  if (people.length === 0) return "no data";

  return `youngestAge: ${getYoungest(
    people.map((p) => p.age)
  )}, totalSalary: ${getTotalSalary(people.map((p) => p.salary))}`;
}

function getYoungest(peopleAges) {
  return peopleAges.length > 0 ? Math.min(peopleAges) : Infinity;
}

function getTotalSalary(peopleSalaries) {
  return peopleSalaries.length > 0 ? peopleSalaries.reduce((a, b) => a + b) : 0;
}
