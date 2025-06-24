export async function mergeCsvFiles(files) {
  const texts = await Promise.all(
    files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (evt) => resolve(evt.target.result);
          reader.readAsText(file);
        })
    )
  );
  let mergedCsv = "";
  texts.forEach((text, idx) => {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (idx === 0) {
      mergedCsv += lines.join("\n");
    } else {
      mergedCsv += "\n" + lines.slice(1).join("\n");
    }
  });
  return mergedCsv;
}
