import { COLOR_FORMATS, Color, clamp } from "./color-game";

describe("Create Color class and read value", () => {
  test("read values", () => {
    const redValue = 255,
      greenValue = 25,
      blueValue = 120;
    const color = new Color(redValue, greenValue, blueValue);
    expect(color.getColors()).toEqual({
      hex: "#ff1978",
      hsl: { hue: 335, sat: 100, light: 55 },
      rgb: {
        red: redValue,
        green: greenValue,
        blue: blueValue,
      },
    });
  });
  test("input out of range", () => {
    const redValue = 512,
      greenValue = -25,
      blueValue = 666;
    const color = new Color(redValue, greenValue, blueValue);
    expect(color.getColors()).toEqual({
      hex: "#ff00ff",
      hsl: { hue: 300, sat: 100, light: 50 },
      rgb: {
        red: 255,
        green: 0,
        blue: 255,
      },
    });
  });
});

describe("#clamp", () => {
  test("clamping", () => {
    expect(clamp(0, 50, 25)).toBe(25);
    expect(clamp(0, 50, 53)).toBe(50);
    expect(clamp(0, 50, -3)).toBe(0);
    expect(clamp(0, 50, 99999999999)).toBe(50);
    expect(clamp(0, 50, -99999999999)).toBe(0);
  });
});
