import { s } from "framer-motion/client";
import { useState } from "react";

function posibleStrings(data) {
  return [
    data.slice(0, -data.length + data.length / 2),
    data.slice(0, -1),
    data,
  ];
}

export async function checkItemesWith({
  checkingFrom,
  checkingFor,
}) {
  const element = posibleStrings(checkingFor);
  const items_found = [];

  checkingFrom.forEach((item) => {
    const matchFound = element.some(
      (searchString) =>
        (item.category &&
          item.category.toLowerCase().includes(searchString.toLowerCase())) ||
        (item.name &&
          item.name.toLowerCase().includes(searchString.toLowerCase())) ||
        (item.brand &&
          item.brand.toLowerCase().includes(searchString.toLowerCase()))
    );
    if (matchFound) {
        items_found.push(item)
    }
  });
  return items_found;
}
