import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Book } from '@/app/Type/BookType';
import { KEY_IMAGEURL } from '@/env';

interface DetailBookRouteParams {
  book: Book;
}
const ImageURL=KEY_IMAGEURL;

const DetailScreen = () => {
  const route =
    useRoute<RouteProp<{ DetailBook: DetailBookRouteParams }, 'DetailBook'>>();
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Book Detail</Text>
      </View>

      {/* Book Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: ImageURL+book.imageUrl[0] }} style={styles.bookImage} />
      </View>

      {/* Title and Author */}
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>

      {/* Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoValue}>{book.rating}</Text>
          <Text style={styles.infoLabel}>Rating</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoValue}>{book.numberOfPage}</Text>
          <Text style={styles.infoLabel}>Number of Page</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoValue}>{book.language}</Text>
          <Text style={styles.infoLabel}>Language</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descTitle}>Description</Text>
        <Text style={styles.descText}>{book.description}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Text style={styles.iconText}>🔖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Reading</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 12,
    alignItems: 'center',
    backgroundColor: '#111',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  author: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ccc',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2a2a2a',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  descriptionContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  descTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descText: {
    color: '#aaa',
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    alignItems: 'center',
  },
  bookmarkButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
  },
  startButton: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#FF7F50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetailScreen;
