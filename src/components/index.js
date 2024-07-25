import { Textinput } from "./inputtext";
import { Inputpassword } from "./inputpassword";
import { Forms } from "./form";
import { Top } from "./top";
import { Bottom } from "./bottom";
import { Dropdown2 } from "./dropdown";
import { Button } from "./button";
import Header from "./header";
import TeacherCard from "./teachercard";
import CardComponent from "./cardcomponent";
import {renewToken} from "./useTokenRenewal";
import { Mainmodal } from "./allmodal";
const importAll = (requireContext) => {
  let images = {};
  requireContext.keys().forEach((item, index) => {
    images[item.replace("./", "")] = requireContext(item);
  });
  return images;
};

const images = importAll(
  require.context("./img/teachers", false, /\.(png|jpe?g|svg)$/)
);
export default images;
export {
  Textinput,
  Inputpassword,
  Forms,
  Top,
  Bottom,
  Dropdown2,
  Button,
  Header,
  TeacherCard,
  Mainmodal,
  CardComponent,
  renewToken
};
