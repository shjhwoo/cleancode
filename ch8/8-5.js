let appliesToMass = false;
for (const s of states) {
  if (s === "MA") appliesToMass = true;
}

//
function checkState(states) {
  return states.includes("MA");
}
