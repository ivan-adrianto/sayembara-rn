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
import React, {useEffect, useState} from 'react';
import {IconDelete, IconProfile} from '../assets/icons';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {Creators as ProfileActions} from '../redux/ProfileRedux';
import {uriFormatter} from '../helpers/uri';

const Profile = () => {
  const dispatch = useDispatch();
  const updateProfile = data =>
    dispatch(ProfileActions.updateProfileRequest(data));
  const resetState = () => dispatch(ProfileActions.resetProfileState());
  const getProfile = () => dispatch(ProfileActions.getProfileRequest());

  const data = useSelector(state => state.profile.dataGetProfile);
  const isLoading = useSelector(state => state.profile.isLoadingUpdateProfile);
  const errorGetProfile = useSelector(state => state.profile.errorGetProfile);
  const errorUpdateProfile = useSelector(
    state => state.profile.errorUpdateProfile,
  );
  const success = useSelector(state => state.profile.dataUpdateProfile);

  const [fullname, setFullname] = useState('');
  const [location, setLocation] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [photo, setPhoto] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setFullname(data?.fullname);
    setLocation(data?.location);
    setBank(data?.bank);
    setAccountNumber(data?.account_number?.toString());
    setPhoto(data?.avatar);
  }, []);

  useEffect(() => {
    if (errorGetProfile || errorUpdateProfile) {
      showToast(
        errorGetProfile || errorUpdateProfile || 'Something went wrong',
      );
      resetState();
    }
  }, [errorGetProfile, errorUpdateProfile]);

  useEffect(() => {
    if (success) {
      setIsUpdating(false);
      showToast('Profile updated');
      getProfile();
      resetState();
    }
  }, [success]);

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
          setPhoto(`data:image/jpeg;base64,${res}`);
        });
      }
    } catch (error) {
      DocumentPicker.isCancel(() => {});
    }
  };

  const submit = () => {
    if (!fullname) {
      return showToast('Fullname must be filled');
    }
    const data = {
      fullname,
      location,
      avatar: photo,
      bank,
      account_number: parseInt(accountNumber),
    };
    updateProfile(data);
  };

  const inputAccountNumber = text => {
    setAccountNumber(text.replace(/[^0-9]/g, ''));
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <TouchableOpacity
        onPress={
          isUpdating
            ? uploadPhoto
            : () =>
                showToast("Click button 'Update' to edit your profile photo")
        }
        style={styles.photoProfileContainer}>
        {photo ? (
          <View>
            <Image source={{uri: uriFormatter(photo)}} style={styles.image} />
            {isUpdating && (
              <TouchableOpacity
                onPress={() => setPhoto('')}
                style={styles.deleteContainer}>
                <Image source={IconDelete} style={styles.iconDelete} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <IconProfile width={100} height={100} />
        )}
      </TouchableOpacity>
      <View style={styles.contentSection}>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            Full Name
          </Text>
          <TextInput
            style={styles.input}
            value={fullname}
            editable={isUpdating}
            onChangeText={value => setFullname(value)}
          />
        </View>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            Location
          </Text>
          <TextInput
            style={styles.input}
            value={location}
            editable={isUpdating}
            onChangeText={value => setLocation(value)}
          />
        </View>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            Bank
          </Text>
          <TextInput
            style={styles.input}
            value={bank}
            editable={isUpdating}
            onChangeText={value => setBank(value)}
          />
        </View>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            Account Number
          </Text>
          <TextInput
            style={styles.input}
            value={accountNumber}
            editable={isUpdating}
            onChangeText={value => inputAccountNumber(value)}
            keyboardType={'number-pad'}
          />
        </View>
        {isUpdating ? (
          <Button style={styles.button} onPress={submit}>
            {isLoading ? <ActivityIndicator color={'white'} /> : 'Save'}
          </Button>
        ) : (
          <Button style={styles.button} onPress={() => setIsUpdating(true)}>
            Update
          </Button>
        )}
        <Button backgroundColor={'#FF6B6B'}>Logout</Button>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexGrow: 1,
    paddingVertical: 38,
  },
  photoProfileContainer: {
    borderRadius: 200,
    height: 159,
    width: 159,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 38,
  },
  image: {
    height: 159,
    width: 159,
    borderRadius: 100,
  },
  deleteContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'red',
    padding: 3,
    borderRadius: 50,
  },
  iconDelete: {
    maxHeight: 20,
    maxWidth: 20,
  },
  contentSection: {
    width: 277,
  },
  contentItem: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 7,
  },
  button: {
    marginTop: 23,
    marginBottom: 25,
  },
});
