export const COLOR_FORMATS = {
  RGB: "rgb",
  HEX: "hex",
  HSL: "hsl",
};
export const DIFFICULTIES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export class Color {
  constructor(red: number, green: number, blue: number) {
    this.red = this.clamp(0, 255, red);
    this.green = this.clamp(0, 255, green);
    this.blue = this.clamp(0, 255, blue);
  }

  private red: number;
  private green: number;
  private blue: number;

  public getColor(format: string) {
    switch (format) {
      case COLOR_FORMATS.HEX:
        return RGBToHEX(this.red, this.green, this.blue);
      case COLOR_FORMATS.HSL:
        return RGBToHSL(this.red, this.green, this.blue);
      case COLOR_FORMATS.RGB:
        return { red: this.red, green: this.green, blue: this.blue };
      default:
        return { error: "wrong format" };
    }
  }

  private clamp(min: number, max: number, x: number) {
    return Math.min(Math.max(x, min), max);
  }
}

function RGBToHSL(red: number, green: number, blue: number) {
  // Make r, g, and b fractions of 1
  red /= 255;
  green /= 255;
  blue /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(red, green, blue),
    cmax = Math.max(red, green, blue),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == red) h = ((green - blue) / delta) % 6;
  // Green is max
  else if (cmax == green) h = (blue - red) / delta + 2;
  // Blue is max
  else h = (red - green) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { hue: h, sat: Math.round(s), light: Math.round(l) };
}

function RGBToHEX(red: number, green: number, blue: number) {
  let red_part = red.toString(16);
  let green_part = green.toString(16);
  let blue_part = blue.toString(16);

  if (red_part.length == 1) red_part = "0" + red_part;
  if (green_part.length == 1) green_part = "0" + green_part;
  if (blue_part.length == 1) blue_part = "0" + blue_part;

  return { hex: "#" + red_part + green_part + blue_part };
}
