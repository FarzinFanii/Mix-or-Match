// set new name
export function manageId(inputValue) {
  let id = localStorage.getItem("id");
  if (!id) {
    id = 1;
  }
  localStorage.setItem(`${id}`, inputValue);
  id++;
  localStorage.setItem("id", id);
}
// get id
export function getAllSavesItem(id) {
  let divArray = [];
  for (let i = 1; i < id; i++) {
    const name = localStorage.getItem(`${i}`);
    let score = localStorage.getItem(`${i}_score`);
    score = score ?? 0;
    divArray.push({ name, score });
  }
  return divArray;
}
