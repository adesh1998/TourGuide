import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image, Button } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GOOGLE_MAPS_API_KEY } from "@env";
import * as Linking from 'expo-linking';

const BottomSheets = ({ destination }) => {
  const sheetRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const fetchNearbyPlaces = async () => {
    if (!destination) return;

    const { latitude, longitude } = destination;
    const radius = 1000; // in meters
    const types = ["tourist_attraction", "park", "museum", "art_gallery", "zoo"];

    try {
      const allPlaces = [];
      for (const type of types) {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          allPlaces.push(...data.results);
        }
      }

      const uniquePlaces = Array.from(new Set(allPlaces.map(p => p.place_id)))
        .map(id => allPlaces.find(p => p.place_id === id));

      const sortedPlaces = uniquePlaces.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setPlaces(sortedPlaces);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  useEffect(() => {
    fetchNearbyPlaces();
  }, [destination]);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleDirectionsPress = (place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.itemImage}
        source={{
          uri: item.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}` : 'https://via.placeholder.com/400',
        }}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemAddress}>{item.vicinity}</Text>
        {item.rating && (
          <Text style={styles.itemRating}>Rating: {item.rating} ⭐</Text>
        )}
        <Button
          title="Get Directions"
          onPress={() => handleDirectionsPress(item)}
        />
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
    >
      <Text style={styles.listTitle}>Over {places.length} places</Text>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.place_id}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
  itemAddress: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  itemRating: {
    fontSize: 14,
    color: "#ffa500",
    marginBottom: 8,
  },
});

export default BottomSheets;
