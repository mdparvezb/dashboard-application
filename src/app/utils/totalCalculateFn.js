// Total Calculation Function
export function totalCalculateFn(aray, columnName) {
  if(aray) {
  const total = aray.reduce(
    (acc, value) => (Number(acc) || 0) + Number(value[columnName] || 0),
    0
  );
  return total;
}
}
