import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';
import Text from '../components/Text';

const Home = () => {
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([
    {label: 'UI/UX design', value: 1},
    {label: 'Category', value: 2},
    {label: 'Poror', value: 3},
  ]);
  return (
    <ScrollView style={styles.page}>
      <View>
        <DropDownPicker
          open={openCategoryDropdown}
          value={category}
          items={categories}
          setOpen={setOpenCategoryDropdown}
          setValue={setCategory}
          setItems={setCategories}
          style={styles.dropdown}
          placeholder={'Category'}
          placeholderStyle={{color: 'grey', fontFamily: 'Lato-Regular'}}
          dropDownContainerStyle={{borderColor: '#C0C0C0'}}
          listItemLabelStyle={{fontFamily: 'Lato-Regular'}}
        />
        <TextInput style={styles.input} placeholder="Find Contest" />
        <Button>Search</Button>
      </View>
      <View style={styles.contentContainer}>
        {[1, 2, 3, 4].map((contest, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <View style={styles.postedAt}>
                <Text fontSize={12}>Posted</Text>
                <Text fontSize={12} bold>{` 5 min ago`}</Text>
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
                  Sunday, 28 July 2022
                </Text>
              </View>
            </View>
            <View style={styles.itemContent}>
              <Text fontSize={22} bold color={'#1DD1A1'} style={styles.title}>
                Logo Design Content
              </Text>
              <View style={styles.subtitle}>
                <Text fontSize={12} color={'#666666'}>
                  by
                </Text>
                <Text fontSize={12} bold color={'#666666'}>{` Pertamina`}</Text>
              </View>
              <Text fontSize={12} color={'#666666'}>
                IDR 5.000.000.000
              </Text>
              <Text fontSize={12} color={'#666666'} style={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus, molestiae. Nostrum quam perferendis labore velit?
              </Text>
            </View>
            <View style={styles.itemFooter}>
              <TouchableOpacity>
                <Text fontSize={20} color={'white'} bold>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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
    borderRadius: 3,
    borderColor: '#C0C0C0',
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
  itemFooter: {
    backgroundColor: '#1DD1A1',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 18,
  },
});
