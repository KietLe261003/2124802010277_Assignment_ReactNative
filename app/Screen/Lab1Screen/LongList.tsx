import React from 'react';
import { SectionList, Text, View, StyleSheet, SafeAreaView } from 'react-native';


type Person = {
  name: {
    first: string;
    last: string;
  };
};


type Section = {
  title: string;
  data: Person[];
};

const PEOPLE: Person[] = [
  { name: { first: "Maeva", last: "Scott" } },
  { name: { first: "Maëlle", last: "Henry" } },
  { name: { first: "Mohamoud", last: "Faaij" } }
];

const groupPeopleByLastName = (data: Person[]): Section[] => {
  const groupedData = data.reduce<Record<string, Section>>((acc, item) => {
    const group = item.name.last[0].toUpperCase();
    if (!acc[group]) acc[group] = { title: group, data: [] };
    acc[group].data.push(item);
    return acc;
  }, {});

  return Object.values(groupedData).sort((a, b) => a.title.localeCompare(b.title));
};

export default function LongList() {
  return (
    <SafeAreaView>
      <SectionList
        sections={groupPeopleByLastName(PEOPLE)}
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { padding: 10 },
  name: { fontSize: 16 },
  separator: { backgroundColor: "rgba(0,0,0,0.5)", height: 1 },
  sectionHeader: {
    padding: 10, backgroundColor: "rgb(170,170,170)"
  }
});
