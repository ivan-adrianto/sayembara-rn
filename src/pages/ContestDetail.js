import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../components/Text';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as ContestActions} from '../redux/ContestRedux';
import {Creators as SubmissionActions} from '../redux/SubmissionRedux';
import {useEffect} from 'react';
import ModalSubmissionDetail from '../components/Modals/ModalSubmissionDetail';
import {uriFormatter} from '../helpers/uri';
import { useIsFocused } from '@react-navigation/native';

const ContestDetail = ({route, navigation}) => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch();
  const getContestDetail = data =>
    dispatch(ContestActions.getContestDetailRequest(data));
  const getSubmission = data =>
    dispatch(SubmissionActions.getSubmissionRequest(data));

  const data = useSelector(state => state.contest.dataContestDetail);

  const [showModalSubmission, setShowModalSubmission] = useState(false);

  useEffect(() => {
    isFocused && getContestDetail(route.params.id);
  }, [isFocused]);

  const openModalSubmission = submission => {
    getSubmission(submission.id);
    setShowModalSubmission(true);
  };

  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <Text fontSize={28} bold style={styles.title}>
          {data?.title}
        </Text>
      </View>
      <View style={styles.contestInfo}>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Status: </Text>
          <Text fontSize={16} bold>
            {data?.status}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Winner Prize: </Text>
          <Text fontSize={16} bold>
            IDR {data?.prize_text}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Due Date: </Text>
          <Text fontSize={16} bold>
            {data?.due_date}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text fontSize={16}>Announcement: </Text>
          <Text fontSize={16} bold>
            {data?.announcement_date}
          </Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text color={'#666666'} fontSize={16}>
          {data?.description}
        </Text>
      </View>
      {data?.join_status === 'not join' && (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() =>
              navigation.navigate('submit-work', {id: route.params.id})
            }>
            Submit Your Work
          </Button>
        </View>
      )}
      {data?.join_status === 'winner' && (
        <Text fontSize={32} bold style={styles.winner} >
          Congratulations! you are the winner!
        </Text>
      )}
      <View style={styles.submissionsContainer}>
        <Text fontSize={28} bold style={styles.submissionTitle}>
          {data?.submissions?.length > 0
            ? 'Submissions'
            : 'No submissions yet...'}
        </Text>
        {data?.submissions?.map((submission, index) => (
          <TouchableOpacity
            onPress={() => openModalSubmission(submission)}
            style={styles.submissionItem}
            key={index}>
            <Image
              source={{uri: uriFormatter(submission?.thumbnail)}}
              style={styles.thumbnail}
            />
            <View style={styles.itemContent}>
              <Text
                fontSize={16}
                bold
                color={'#1DD1A1'}
                style={styles.contentTitle}>
                {submission?.title}
              </Text>
              <Text color={'#C0C0C0'} numberOfLines={2}>
                {submission?.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ModalSubmissionDetail
        visible={showModalSubmission}
        onHide={() => setShowModalSubmission(false)}
      />
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
    backgroundColor: 'white',
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
    marginBottom: 25,
  },
  thumbnail: {
    height: 180,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  contentTitle: {
    marginBottom: 13,
  },
  winner: {
    textAlign: "center",
    marginBottom: 30
  }
});
