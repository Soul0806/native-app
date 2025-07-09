import React, { RefObject } from "react";
import { SectionList, StyleSheet, Text } from "react-native";

type Section = {
  title: string;
  data: string[];
};

type TProps = {
  data: Section[]; // ✅ 這裡是整個 sections 陣列
  ref: RefObject<SectionList<string, Section>>;
};

const Sections = ({ data, ref }: TProps) => {
  return (
    <SectionList
      //   ref={ref}
      sections={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.section_header}>{title}</Text>
      )}
      ListEmptyComponent={<Text>No data</Text>}
      stickySectionHeadersEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Sections;

const styles = StyleSheet.create({
  section_header: {
    width: "100%",
    backgroundColor: "gray",
    color: "white",
  },
  item: {
    marginLeft: 15,
  },
});
