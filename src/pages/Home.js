import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as ContestActions} from '../redux/ContestRedux';
import {IconArrowDown} from '../assets/icons';

const Home = () => {
  const dispatch = useDispatch();
  const getCategories = () => dispatch(ContestActions.getCategoriesRequest());
  const getContests = data => dispatch(ContestActions.getContestsRequest(data));

  const categories = useSelector(state => state.contest.dataCategories);
  const contests = useSelector(state => state.contest.dataContests);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getCategories();
    getContests();
  }, []);

  const onSelectCategory = item => {
    if (item === 'all') {
      setCategory('');
      setOpenDropdown(false);
      getContests();
    } else {
      setCategory(item);
      setOpenDropdown(false);
      getContests({category_id: item.id});
    }
  };

  return (
    <ScrollView style={styles.page}>
      <View>
        <TouchableOpacity
          onPress={() => setOpenDropdown(!openDropdown)}
          style={styles.dropdown}>
          <Text color={'#C0C0C0'}>{category ? category.name : 'Category'}</Text>
          <IconArrowDown style={styles.dropdownArrow} />
        </TouchableOpacity>
        {openDropdown && (
          <View style={styles.dropdownOptions}>
            <Text
              style={styles.dropdownItem}
              onPress={() => onSelectCategory('all')}>
              All Categories
            </Text>
            {categories.map(item => (
              <Text
                onPress={() => onSelectCategory(item)}
                style={styles.dropdownItem}
                key={item.id}>
                {item.name}
              </Text>
            ))}
          </View>
        )}
        <TextInput style={styles.input} placeholder="Find Contest" />
        <Button>Search</Button>
      </View>
      {false ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {contests.map((contest, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <View style={styles.postedAt}>
                  <Text fontSize={12}>Posted</Text>
                  <Text fontSize={12} bold>{` ${contest.posted_since}`}</Text>
                </View>
                <View>
                  <Text style={styles.dueDate} fontSize={12} color={'#FF6B6B'}>
                    Due Date:
                  </Text>
                  <Text
                    style={styles.dueDate}
                    fontSize={12}
                    bold
                    color={'#FF6B6B'}>
                    {contest.due_date}
                  </Text>
                </View>
              </View>
              <View style={styles.itemContent}>
                <Text fontSize={22} bold color={'#1DD1A1'} style={styles.title}>
                  {contest.title}
                </Text>
                <View style={styles.subtitle}>
                  <Text fontSize={12} color={'#666666'}>
                    by
                  </Text>
                  <Text
                    fontSize={12}
                    bold
                    color={'#666666'}>{` ${contest.provider?.fullname}`}</Text>
                </View>
                <Text fontSize={12} color={'#666666'}>
                  IDR {contest.prize_text}
                </Text>
                <Text
                  fontSize={12}
                  color={'#666666'}
                  style={styles.description}>
                  {contest.description}
                </Text>
              </View>
              <View
                style={[styles.itemFooter(contest.footer_background_color)]}>
                <TouchableOpacity>
                  <Text fontSize={20} color={contest.footer_text_color} bold>
                    {contest.footer_text}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 45,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  dropdownArrow: {
    marginTop: 3,
    marginRight: 3,
  },
  dropdownOptions: {
    position: 'absolute',
    top: 40,
    zIndex: 4,
    width: '100%',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#C0C0C0',
  },
  dropdownItem: {
    paddingVertical: 9,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'white',
  },
  input: {
    marginTop: 17,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#C0C0C0',
    paddingHorizontal: 10,
    fontFamily: 'Lato-Regular',
    marginBottom: 17,
  },
  contentContainer: {
    paddingHorizontal: 3,
    marginTop: 30,
    marginBottom: 30,
  },
  itemContainer: {
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 19,
    marginBottom: 19,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 18,
  },
  itemContent: {
    paddingHorizontal: 18,
  },
  postedAt: {
    flexDirection: 'row',
  },
  dueDate: {
    textAlign: 'right',
  },
  title: {
    marginBottom: 3,
  },
  subtitle: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  description: {
    marginTop: 10,
  },
  itemFooter: backgroundColor => ({
    backgroundColor: backgroundColor,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 18,
  }),
});
