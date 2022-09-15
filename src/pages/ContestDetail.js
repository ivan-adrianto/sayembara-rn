import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import Button from '../components/Button';

const ContestDetail = () => {
  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <Text fontSize={28} bold style={styles.title}>
          Logo Design Contest
        </Text>
      </View>
      <View style={styles.contestInfo}>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Status: </Text>
          <Text fontSize={16} bold>
            Open
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Winner Prize: </Text>
          <Text fontSize={16} bold>
            IDR 15.000.000
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Due Date: </Text>
          <Text fontSize={16} bold>
            Sunday, 28 July 2020
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Announcement: </Text>
          <Text fontSize={16} bold>
            Sunday, 5 August 2020
          </Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text color={'#666666'} fontSize={16}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          dolorum reprehenderit eveniet, id tempore omnis facere quia ullam quod
          vel dolores exercitationem molestiae ut quisquam, optio minus eaque
          quasi molestias quae. Eum quis odio porro quo perspiciatis repudiandae
          dolor fugit amet, veniam necessitatibus unde harum labore at
          accusantium repellat minima natus blanditiis sed culpa, quia
          laboriosam vitae aut reprehenderit sequi? Deleniti a praesentium
          quidem nulla nobis dolores culpa corrupti iure, perspiciatis,
          accusamus itaque velit nam quae quis dolorem aliquid architecto
          pariatur doloribus enim quasi molestiae? Ut distinctio fugit
          blanditiis atque est perspiciatis explicabo voluptatibus rem vero,
          eligendi culpa illo labore.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button}>Submit Your Work</Button>
      </View>
      <View style={styles.submissionsContainer}>
        <Text fontSize={28} bold style={styles.submissionTitle}>
          Submissions
        </Text>
        {[1, 2, 3, 4].map((submission, index) => (
          <View style={styles.submissionItem} key={index}>
            <Image
              source={{uri: 'https://picsum.photos/400'}}
              style={styles.thumbnail}
            />
            <View style={styles.itemContent}>
              <Text
                fontSize={16}
                bold
                color={'#1DD1A1'}
                style={styles.contentTitle}>
                Logo design of XYZ restaurant
              </Text>
              <Text color={'#C0C0C0'}>
                lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem
                ipsum...
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ContestDetail;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 100,
    flex: 1,
  },
  titleContainer: {
    marginBottom: 39,
  },
  title: {
    textAlign: 'center',
  },
  contestInfo: {
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  description: {
    marginBottom: 38,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 52,
  },
  button: {
    width: 176,
  },
  submissionsContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  submissionTitle: {
    marginBottom: 25,
  },
  itemContent: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: 300,
    height: 120,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 25
  },
  thumbnail: {
    height: 180,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  contentTitle: {
    marginBottom: 13,
  },
});
