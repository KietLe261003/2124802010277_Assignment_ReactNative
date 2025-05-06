import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


const DetailListItem = ({icon = '', title = '', subtitle = ''}: any) => {
  return (
    <View style={styles.borderContainer}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {icon && (
            <MaterialIcons
              name={icon}
              size={24}
              style={{
                color: '#000000',
                marginRight: 20,
              }}
            />
          )}
          <View style={styles.contentContainer}>
            <Text style={[styles.title]}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    paddingLeft: 24,
  },
  wrapper: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#3498db',
    fontSize: 15,
    marginTop: 4,
  },
});

export default DetailListItem;