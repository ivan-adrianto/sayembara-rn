import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Text from '../Text';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {uriFormatter} from '../../helpers/uri';

const ModalSubmissionDetail = ({visible, onHide}) => {
  const loading = useSelector(state => state.submission.isLoadingGetSubmission);
  const data = useSelector(
    state => state.submission.dataGetSubmission,
  );

  const sliderRef = useRef();

  const renderCarousel = ({item}) => {
    return (
      <Image source={{uri: uriFormatter(item?.image)}} style={styles.image} />
    );
  };

  const [activeSlider, setActiveSlider] = useState(1);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={onHide}></TouchableOpacity>
        <View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={'#1DD1A1'} size={40} />
            </View>
          ) : (
            <View style={styles.modalBox}>
              {data?.images?.length > 1 ? (
                <View>
                  <Carousel
                    data={data?.images}
                    renderItem={renderCarousel}
                    itemWidth={329}
                    sliderWidth={329}
                    itemHeight={329}
                    sliderHeight={329}
                    ref={sliderRef}
                    onSnapToItem={index => setActiveSlider(index)}
                  />
                  <Pagination
                    dotsLength={data?.images?.length}
                    activeDotIndex={activeSlider}
                    containerStyle={styles.paginationContainer}
                    dotColor={'white'}
                    dotStyle={styles.paginationDot}
                    dotContainerStyle={styles.dotContainer}
                    inactiveDotColor={'white'}
                    inactiveDotOpacity={0.5}
                    inactiveDotScale={1}
                    carouselRef={sliderRef}
                    tappableDots={!!sliderRef}
                  />
                </View>
              ) : (
                <Image
                  source={{
                    uri: uriFormatter(data?.images[0]?.image),
                  }}
                  style={styles.image}
                />
              )}
              <View style={styles.contentContainer(data?.images?.length)}>
                <Text color={'#1DD1A1'} fontSize={24} bold>
                  by {data?.participant?.fullname}
                </Text>
                <Text fontSize={16} style={styles.description}>
                  {data?.description}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalSubmissionDetail;

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: 85,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    backgroundColor: 'white',
    width: 329,
    borderRadius: 5,
    height: 550,
    justifyContent: 'center',
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
  contentContainer: (length) => ({
    paddingHorizontal: 15,
    paddingBottom: 25,
    marginTop: length > 1 ? -80 : 20,
  }),
  description: {
    marginTop: 20,
  },
  dotContainer: {
    top: -80,
    padding: 20,
    marginHorizontal: -5,
  },
});
