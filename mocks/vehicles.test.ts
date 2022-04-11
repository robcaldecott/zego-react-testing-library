import { describe, test, expect } from "vitest";
import { colors, fuelTypes, manufacturers } from ".";

describe("Vehicle mocks", () => {
  test("colors", () => {
    expect(colors()).toMatchInlineSnapshot(`
      [
        "azure",
        "black",
        "blue",
        "cyan",
        "fuchsia",
        "gold",
        "green",
        "grey",
        "indigo",
        "ivory",
        "lavender",
        "magenta",
        "maroon",
        "olive",
        "orange",
        "orchid",
        "pink",
        "plum",
        "purple",
        "red",
        "salmon",
        "silver",
        "sky blue",
        "tan",
        "teal",
        "turquoise",
        "violet",
        "white",
        "yellow",
      ]
    `);
  });

  test("fuelTypes", () => {
    expect(fuelTypes()).toMatchInlineSnapshot(`
      [
        "Diesel",
        "Electric",
        "Gasoline",
        "Hybrid",
      ]
    `);
  });

  test("manufacturers", () => {
    expect(manufacturers()).toMatchInlineSnapshot(`
      [
        "Aston Martin",
        "Audi",
        "Bentley",
        "BMW",
        "Bugatti",
        "Cadillac",
        "Chevrolet",
        "Chrysler",
        "Ferrari",
        "Fiat",
        "Ford",
        "Honda",
        "Hyundai",
        "Jaguar",
        "Jeep",
        "Kia",
        "Lamborghini",
        "Land Rover",
        "Maserati",
        "Mazda",
        "Mercedes Benz",
        "Mini",
        "Nissan",
        "Polestar",
        "Porsche",
        "Rolls Royce",
        "Tesla",
        "Toyota",
        "Volkswagen",
        "Volvo",
      ]
    `);
  });
});
