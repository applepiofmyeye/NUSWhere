import { Keyboard, View } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { Marker } from "react-native-maps";
import { useRouter } from "expo-router";



const Autocomplete = ({
    value: origValue,
    label,
    data,
    containerStyle,
    onChange: origOnChange,
    icon = 'bike',
    style = {},
    menuStyle = {},
    right = () => {},
    left = () => {},
    usage,
    menuThenGoTo,
    selectedMarker,
    onSelectMarker,
  }) => {
    const router = useRouter();
    const [value, setValue] = useState(origValue);
    const [menuVisible, setMenuVisible] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
  
    const filterData = (text) => {
      return data.filter(
        (val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
      );
    };
    return (
      <View style={[containerStyle]}>
        <TextInput
          onFocus={() => {
            if (value.length === 0) {
              setMenuVisible(true);
            }
          }}
          // onBlur={() => setMenuVisible(false)}
          placeholder={label}
          right={right}
          left={left}
          style={style}
          onChangeText={(text) => {
            origOnChange(text);
            if (text && text.length > 0) {
              setFilteredData(filterData(text));
            } else if (text && text.length === 0) {
              setFilteredData(data);
            }
            setMenuVisible(true);
            setValue(text);
          }}
          value={value}
        />
        {menuVisible && filteredData && (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.background,
              borderWidth: 1,
              flexDirection: 'column',
              borderColor: COLORS.text,
            }}
          >
            {filteredData.map((datum, i) => (
              <Menu.Item
                key={i}
                style={[{ width: '100%' }, menuStyle]}
                icon={icon}
                onPress={() => {
                  // to allow for other uses: eg searching bus stops
                  if (usage === 'mappage') {
                    const markerLocation = { latitude: 0, longitude: 0 }; // Replace with the actual coordinates of the selected location
                    onSelectMarker(markerLocation);
                    setValue(datum);
                    setMenuVisible(false);
                    Keyboard.dismiss();
                    
                  }
                }}
                title={datum}
              />
            ))}
          </View>
        )}
      </View>
    );
  };
  
  export default Autocomplete;