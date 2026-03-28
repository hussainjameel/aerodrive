import Terminal from "~/components/apps/Terminal";
import Bear from "~/components/apps/Bear";
import VSCode from "~/components/apps/VSCode";
import Finder from "~/components/apps/Finder";
import Calculator from "../components/apps/Calculator";
import MyCalendar from "../components/apps/MyCalendar";

const apps = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/apps.png",
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    show: false,
    img: "img/icons/vscode.png",
    content: <VSCode />,
  },

  {
    id: "fileFinder",
    title: "File Finder",
    desktop: true,
    width: 860,
    height: 500,
    img: "img/icons/filefinder.png",
    content: <Finder />,
  },
  {
    id: "calculator",
    title: "Calcuator",
    desktop: true,
    width: 402,
    height: 526,
    img: "img/icons/calculator1.png",
    content: <Calculator />,
  },
  {
    id: "email",
    title: "Mail",
    desktop: false,
    img: "img/icons/mail.png",
    link: "mailto:aerodrive@gmail.com",
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    show: false,
    img: "img/icons/terminal.png",
    content: <Terminal />,
  },
  {
    id: "calendar",
    title: "Calendar",
    desktop: true,
    width: 700,
    height: 550,
    img: "img/icons/calender1.png",
    content: <MyCalendar />,
  },
  {
    id: "about",
    title: "About Us",
    desktop: true,
    show: false,
    width: 900,
    height: 500,
    img: "img/icons/info.png",
    content: <Bear />,
  },
];

export default apps;
