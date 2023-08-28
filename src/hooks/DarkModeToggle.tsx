/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {toggleDarkMode} from "../redux/darkModeSlice";
import {RootState} from "../Redux/store";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Text } from 'react-native';

const DarkModeToggle = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkmode.darkmode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    //@ts-ignore
    dispatch(toggleDarkMode(isDarkMode ? false : true));
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      <Ionicons
        name={isDarkMode ? "sunny-outline" : "moon-outline"}
        size={30}
        color={isDarkMode ? "white" : "black"}
      />
      <Text
        style={{
          color: "red",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        ghh
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </Text>

    </TouchableOpacity>
  
  );
};

export default DarkModeToggle;
