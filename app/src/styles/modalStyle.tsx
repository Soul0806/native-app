import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const align: "center" = "center";

const baseModalStyle = {
  backgroundColor: "white",
  padding: 20,
  margin: 20,
  borderRadius: 20,
  width: screenWidth * 0.8,
  alignSelf: align,
};

export { baseModalStyle };
