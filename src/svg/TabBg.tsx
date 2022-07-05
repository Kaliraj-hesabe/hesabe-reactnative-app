import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg";
import { StyleSheet, TouchableOpacity, View,ImageBackground } from 'react-native';

type Props = SvgProps & {
  color?: string;
};

export const TabBg: React.FC<Props> = ({
  color = '#FFFFFF',
  ...props
}) => {
  return (


    /* <Svg
      width={75}
      height={61}
      viewBox="0 0 75 61"
      {...props}
    >
      <Path
        d="M75.2 0v61H0V0c4.1 00 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
      //  d = "M0 0h114.093c15.38 0 30.247 5.54 41.878 15.604C163.98 22.534 171.99 26 180 26c8.01 0 16.02-3.465 24.03-10.396A63.992 63.992 0 01245.906 0H360v64H0V0z"
        fill={color}
      />
    </Svg>*/
    <Svg width={75} height={64} viewBox="0 0 75 64" {...props}>

     <Path

       //d="M0 0h114.093c15.38 0 30.247 5.54 41.878 15.604C163.98 22.534 171.99 26 180 26c8.01 0 16.02-3.465 24.03-10.396A63.992 63.992 0 01245.906 0H360v64H0V0z"
      // fill="#190865"

       fillRule="evenodd"

     />
   </Svg>
  )
};
