import { COLOR_FORMATS, Color } from "./color-game";

describe("Create Color class and read value", () => {
  test("read rgb", () => {
    const redValue = 255,
      greenValue = 25,
      blueValue = 120;
    const color = new Color(redValue, greenValue, blueValue);
    expect(color.getColor(COLOR_FORMATS.RGB)).toEqual({
      red: redValue,
      green: greenValue,
      blue: blueValue,
    });
  });
  test("read hex", () => {
    const redValue = 255,
      greenValue = 25,
      blueValue = 120;
    const color = new Color(redValue, greenValue, blueValue);
    expect(color.getColor(COLOR_FORMATS.HEX)).toEqual({
      hex: "#ff1978",
    });
  });
  test("read hsl", () => {
    const redValue = 255,
      greenValue = 25,
      blueValue = 120;
    const color = new Color(redValue, greenValue, blueValue);
    expect(color.getColor(COLOR_FORMATS.HSL)).toEqual({
      hue: 335,
      sat: 100,
      light: 55,
    });
  });
  test("invalid input", () => {
    const redValue = 255,
      greenValue = 25,
      blueValue = 120;
    const color = new Color(redValue, greenValue, blueValue);
    expect(color.getColor("amogus")).toEqual({ error: "wrong format" });
  });
  test("input out of range", () => {
    const redValue = 512,
      greenValue = -25,
      blueValue = 666;
    const color = new Color(redValue, greenValue, blueValue);
    expect(color.getColor(COLOR_FORMATS.RGB)).toEqual({
      red: 255,
      green: 0,
      blue: 255,
    });
  });
});
