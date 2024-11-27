import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        default: {
          "50": "#fefae8",
          "100": "#fef2c3",
          "200": "#fee78a",
          "300": "#fdd847",
          "400": "#facc15",
          "500": "#eabd08",
          "600": "#caa204",
          "700": "#a18207",
          "800": "#856d0e",
          "900": "#715e12",
          "950": "#423606",
        },
        yellow: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde68a",
          "300": "#fcd34d",
          "400": "#fbbf24",
          "500": "#f59e0b",
          "600": "#d97706",
          "700": "#b45309",
          "800": "#92400e",
          "900": "#78350f",
          "950": "#451a03",
        },
      },
    },
  },
};
