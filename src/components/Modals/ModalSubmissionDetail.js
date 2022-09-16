import {Image, Modal, ScrollView, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Text from '../Text';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const ModalSubmissionDetail = ({visible}) => {
  const data = [
    'https://picsum.photos/145',
    'https://picsum.photos/146',
    'https://picsum.photos/147',
  ];

  const sliderRef = useRef();

  const renderCarousel = ({item}) => {
    return <Image source={{uri: item}} style={styles.image} />;
  };

  const [activeSlider, setActiveSlider] = useState(1);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Carousel
            data={data}
            renderItem={renderCarousel}
            itemWidth={329}
            sliderWidth={329}
            itemHeight={329}
            sliderHeight={329}
            ref={sliderRef}
            onSnapToItem={index => setActiveSlider(index)}
            autoplayInterval={5000}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlider}
            containerStyle={styles.paginationContainer}
            dotColor={'white'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={'white'}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
            carouselRef={sliderRef}
            tappableDots={!!sliderRef}
          />
          <View style={styles.contentContainer}>
            <Text color={'#1DD1A1'} fontSize={24} bold>
              by John Doe
            </Text>
            <Text fontSize={16} style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
              natus temporibus animi exercitationem dolore fugit officia libero
              sunt cupiditate sapiente incidunt maxime amet tempora mollitia!
              Soluta in ullam odit laboriosam.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalSubmissionDetail;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 85,
    flex: 1,
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: 329,
    borderRadius: 5,
  },
  image: {
    height: 329,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    resizeMode: 'cover',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 25,
    marginTop: -40,
  },
  description: {
    marginTop: 20,
  },
  paginationDot: {
    top: -50
  },
});
