export function sortByMonthFn(arr, column) {
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return arr.sort((a, b) => {
    const aIndex = monthOrder.indexOf(a[column]);
    const bIndex = monthOrder.indexOf(b[column]);
    return aIndex - bIndex;
  });
}
