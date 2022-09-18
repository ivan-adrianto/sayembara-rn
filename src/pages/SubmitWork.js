import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/Text';
import React, {useState} from 'react';
import {IconDelete, IconPlus} from '../assets/icons';
import Button from '../components/Button';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as SubmissionActions} from '../redux/SubmissionRedux';
import {Creators as ContestActions} from '../redux/ContestRedux';
import {useEffect} from 'react';

const SubmitWork = ({route, navigation}) => {
  const dispatch = useDispatch();
  const postSubmission = data =>
    dispatch(SubmissionActions.postSubmissionRequest(data));
  const resetState = () => dispatch(SubmissionActions.resetSubmissionState());
  const getContestDetail = data =>
  dispatch(ContestActions.getContestDetailRequest(data));

  const loading = useSelector(
    state => state.submission.isLoadingPostSubmission,
  );
  const success = useSelector(state => state.submission.dataPostSubmission);
  const error = useSelector(state => state.submission.errorPostSubmission);

  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (success) {
      showToast('Successfully submit your work!');
      resetState();
      getContestDetail(route.params.id)
      navigation.navigate('contest-detail', {id: route.params.id});
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      showToast(error || 'Something went wrong');
      resetState();
    }
  }, [error]);

  const showToast = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const uploadPhoto = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: 'image/*',
      });
      if (pickerResult.size > 5000000) {
        showToast('Image size too large');
      } else {
        RNFS.readFile(pickerResult.uri, 'base64').then(res => {
          setImages([...images, `data:image/jpeg;base64,${res}`]);
        });
      }
    } catch (error) {
      DocumentPicker.isCancel(() => {});
    }
  };

  const changePhoto = async index => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: 'image/*',
      });
      if (pickerResult.size > 5000000) {
        showToast('Image size too large');
      } else {
        let data = images;
        RNFS.readFile(pickerResult.uri, 'base64').then(res => {
          data[index] = `data:image/jpeg;base64,${res}`;
          setImages([...data]);
        });
      }
    } catch (error) {
      DocumentPicker.isCancel(() => {});
    }
  };

  const deleteImage = uri => {
    let data = images;
    let filteredData = data.filter(item => item !== uri);
    setImages([...filteredData]);
  };

  const validate = () => {
    if (images.length === 0) {
      showToast('You must upload an image');
      return false;
    }
    if (!description) {
      showToast('You must fill the description');
      return;
    }
    if (!title) {
      showToast('You must fill the title');
    }
    return true;
  };

  const submit = () => {
    if (validate()) {
      const data = {
        contest_id: route.params.id,
        description,
        images,
        title,
      };
      postSubmission(data);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <Text fontSize={28} bold>
          Upload Your Files
        </Text>
      </View>
      <View style={styles.imageUploadContainer}>
        {images.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => changePhoto(index)}>
            <Image source={{uri: photo}} style={styles.uploadedImage} />
            <TouchableOpacity
              onPress={() => deleteImage(photo)}
              style={styles.deleteContainer}>
              <Image source={IconDelete} style={styles.iconDelete} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        {images.length < 3 && (
          <TouchableOpacity
            onPress={uploadPhoto}
            style={styles.uploadIconContainer}>
            <IconPlus style={styles.iconPlus} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputTitleContainer}>
        <Text fontSize={16} bold>
          Title
        </Text>
        <TextInput
          style={styles.inputTitle}
          onChangeText={value => setTitle(value)}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text fontSize={16} bold>
          Description
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.descriptionBox}
          textAlignVertical={'top'}
          onChangeText={value => setDescription(value)}
        />
        <Button onPress={submit}>
          {loading ? <ActivityIndicator color={"white"} /> : 'Submit'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default SubmitWork;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 100,
  },
  titleContainer: {
    textAlign: 'center',
    marginTop: 55,
    marginBottom: 46,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 9,
    width: 314,
    marginBottom: 22,
  },
  uploadedImage: {
    height: 92,
    width: 92,
    marginLeft: 9,
  },
  deleteContainer: {
    position: 'absolute',
    right: 3,
    top: 3,
    backgroundColor: 'red',
    padding: 3,
    borderRadius: 50,
  },
  iconDelete: {
    maxHeight: 20,
    maxWidth: 20,
  },
  uploadIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 92,
    width: 92,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
    borderColor: 'black',
    marginLeft: 9,
  },
  descriptionBox: {
    height: 108,
    width: 314,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    marginTop: 7,
    marginBottom: 23,
    paddingHorizontal: 10,
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    width: 314,
    height: 30,
    marginBottom: 20,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
