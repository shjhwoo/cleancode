for (const p of people) {
  if (!found) {
    if (p === "Don") {
      sendAlert();
      found = true;
    }
  }
}

for (const p of people) {
  if (p === "Don") {
    sendAlert();
    return;
  }
}
