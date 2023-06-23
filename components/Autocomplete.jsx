import { Alert, Keyboard, View } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { COLORS } from "../constants/theme";

// import hashmap of room codes-coords
import { busStopCoords, roomCodeCoords } from "../data/venues";





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
    isDestination

  }) => {
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
                    let location;
                    if (roomCodeCoords.get(datum) != null) {
                      location = roomCodeCoords.get(datum)[2];
                      const markerLocation = {latitude: location.y, longitude: location.x}; 
                      console.log(markerLocation)
                      onSelectMarker(markerLocation, isDestination, datum);
                    } else if (busStopCoords.get(datum) != null) {
                      location = busStopCoords.get(datum); 
                      const markerLocation = {latitude: location.latitude, longitude: location.longitude}; 
                      console.log(markerLocation)
                      onSelectMarker(markerLocation, isDestination, datum);
                    } else {
                      return Alert.alert("Location Unavailable", "Sorry! We currently don't have enough data for this venue.", [{
                        text: "OK",
                        onPress: () => {},
                        style: 'cancel'                      
                      }])
                    }

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