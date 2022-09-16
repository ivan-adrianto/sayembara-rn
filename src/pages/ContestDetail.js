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
import {useEffect} from 'react';
import ModalSubmissionDetail from '../components/Modals/ModalSubmissionDetail';

const ContestDetail = ({route, navigation}) => {
  const dispatch = useDispatch();
  const getContestDetail = data =>
    dispatch(ContestActions.getContestDetailRequest(data));

  const data = useSelector(state => state.contest.dataContestDetail);

  const [showModalSubmission, setShowModalSubmission] = useState(false);

  useEffect(() => {
    getContestDetail(route.params.id);
  }, []);

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
      <View style={styles.buttonContainer}>
        <Button style={styles.button}>Submit Your Work</Button>
      </View>
      <View style={styles.submissionsContainer}>
        <Text fontSize={28} bold style={styles.submissionTitle}>
          Submissions
        </Text>
        {data?.submissions?.map((submission, index) => (
          <TouchableOpacity
            onPress={() => setShowModalSubmission(true)}
            style={styles.submissionItem}
            key={index}>
            <Image
              source={{uri: submission?.thumbnail}}
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
              <Text color={'#C0C0C0'}>{submission?.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ModalSubmissionDetail visible={showModalSubmission} />
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
    backgroundColor: "white"
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
});
