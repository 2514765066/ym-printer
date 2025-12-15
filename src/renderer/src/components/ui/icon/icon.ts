import print from "@iconify/icons-fluent/print-20-regular";
import loading from "@iconify/icons-fluent/spinner-ios-20-filled";
import add from "@iconify/icons-fluent/add-20-filled";
import subtract from "@iconify/icons-fluent/subtract-20-filled";
import sun from "@iconify/icons-fluent/weather-moon-off-20-regular";
import moon from "@iconify/icons-fluent/weather-moon-20-regular";
import settings from "@iconify/icons-fluent/settings-20-regular";
import queue from "@iconify/icons-fluent/document-queue-20-regular";
import home from "@iconify/icons-fluent/home-20-regular";
import file from "@iconify/icons-fluent/document-multiple-20-regular";
import remove from "@iconify/icons-fluent/delete-20-regular";
import play from "@iconify/icons-fluent/play-20-regular";
import price from "@iconify/icons-fluent/currency-dollar-euro-20-regular";
import theme from "@iconify/icons-fluent/dark-theme-20-regular";
import about from "@iconify/icons-fluent/error-circle-20-regular";
import update from "@iconify/icons-fluent/arrow-circle-up-20-regular";
import globe from "@iconify/icons-fluent/globe-20-regular";
import check from "@iconify/icons-fluent/checkmark-20-filled";
import sort from "@iconify/icons-fluent/arrow-sort-20-regular";
import time from "@iconify/icons-fluent/clock-20-regular";
import bug from "@iconify/icons-fluent/bug-20-regular";

export const iconPacks = {
  bug,
  time,
  sort,
  check,
  loading,
  print,
  add,
  subtract,
  sun,
  moon,
  settings,
  queue,
  home,
  file,
  remove,
  play,
  price,
  theme,
  about,
  update,
  globe,
};

export type IconName = keyof typeof iconPacks;
