import { Alert, Keyboard, View, ScrollView } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { roomCodeCoords, buildingCoords } from "../data/venues";

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
    try {
      return (
        <View style={[containerStyle]}>
          <TextInput
            onFocus={() => {
              if (value.length === 0) {
                setMenuVisible(true);
              }
            }}
            placeholder={label}
            right={right}
            left={left}
            style={style}
            onChangeText={(text) => {
              origOnChange(text);
              if (text.length > 0) {
                if (filterData(text).length === 0 && filterData.length === 0) {
                  setFilteredData([]);
                  setMenuVisible(false);
                } else if (filterData(text).length === 0) {
                  setFilteredData(['No such venue.']);
                  setMenuVisible(true);
                } else {
                  setFilteredData(filterData(text));
                  setMenuVisible(true);
                }
              } else if (text.length === 0) {
                setFilteredData([]);
                setMenuVisible(false);
              }
              setValue(text);
            }}
            value={value}
          />
          {menuVisible && filteredData && (
            <ScrollView
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
                    if (datum === 'No such venue.') {
                      setValue('');
                      setFilteredData([]);
                      Alert.alert('No venue', 'Please re-enter another venue.')
                    }
                    if (usage === 'mappage') {
                      let location;
                      if (roomCodeCoords.get(datum) != null) {
                        location = roomCodeCoords.get(datum)[2];
                        if (location != null) {
                          setValue(datum);
                          const markerLocation = {latitude: location.y, longitude: location.x}; 
                          onSelectMarker(markerLocation, isDestination, datum);
                        }
                      } 
                      else if (buildingCoords.get(datum) != null) {
                        location = buildingCoords.get(datum);
                        if (location != null) {
                          setValue(datum);
                          const markerLocation = {latitude: location.x, longitude: location.y}; 
                          onSelectMarker(markerLocation, isDestination, datum);
                        }
                      } 
                      setMenuVisible(false);
                      Keyboard.dismiss();
                    }
                  }}
                  title={datum}
                />
              ))}
            </ScrollView>
          )}
        </View>
      );
    } catch (error) {
      return Alert.alert("Location Unavailable", "Sorry! We currently don't have enough data for this venue.", [{
        text: "OK",
        onPress: () => {},
        style: 'cancel'                      
      }])
    }
  }

export default Autocomplete;