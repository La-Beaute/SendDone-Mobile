import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  VirtualizedList,
  Text
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';

const getItem = (data, index) => {
  return data[Object.keys(data)[index]];
}

const getItemCount = (data) => {
  return Object.keys(data).length;
}

const getKeyFromItem = (item) => {
  return item.name;
}

/**
 * 
 * @param {object} props 
 * @param {Object.<string, {path:string, name:string, dir:string, type:string, size:number}>} props.items 
 * @param {{string}} props.checkedItems 
 * @param {Function} props.setCheckedItems 
 */
const ItemView = ({ items, checkedItems, setCheckedItems }) => {
  const [checkAll, setCheckAll] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.name} >
          <Text numberOfLines={1}>
            {(item.type === 'directory' ? '📁' : '📄') + ' ' + item.name}
          </Text>
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            tintColors={{ true: '#ff6900', false: 'grey' }}
            value={checkAll || checkedItems[item.name]}
            onValueChange={() => { handleCheck(item.name); }}
          />
        </View>
      </View>
    )
  };

  const headerItem = () => {
    return (
      <View style={styles.headerItem}>
        <View style={styles.name} >
        </View>
        <View style={styles.checkbox}>
          <Checkbox
            tintColors={{ true: '#ff6900', false: 'grey' }}
            value={checkAll}
            onValueChange={(value) => { handleCheckAll(value); }}
          />
        </View>
      </View>
    );
  }
  /**
   * 
   * @param {string} name 
   */
  const handleCheck = (name) => {
    const value = !(name in checkedItems);
    if (value) {
      setCheckedItems(() => {
        const tmp = { ...checkedItems };
        tmp[name] = true;
        return tmp;
      });
    }
    else {
      setCheckedItems(() => {
        const tmp = { ...checkedItems };
        delete tmp[name];
        return tmp;
      });
    }
  }

  /**
   * 
   * @param {boolean} value 
   */
  const handleCheckAll = (value) => {
    setCheckAll(value);
    if (value) {
      setCheckedItems(() => {
        const tmp = Object.keys(items).reduce((prev, cur) => {
          prev[cur] = true;
          return prev;
        }, {});
        return tmp;
      });
    }
    else {
      setCheckedItems({});
    }
  }

  useEffect(() => {
    let numCheckedItems = Object.keys(checkedItems).length;
    let numItems = Object.keys(items).length;
    if (numItems > 0 && numCheckedItems === numItems)
      setCheckAll(true);
    else
      setCheckAll(false);
  }, [checkedItems]);

  return (
    <View style={styles.itemView}>
      <VirtualizedList
        ListHeaderComponent={headerItem}
        stickyHeaderIndices={[0]}
        keyExtractor={getKeyFromItem}
        data={items}
        renderItem={renderItem}
        getItem={getItem}
        getItemCount={getItemCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    width: '95%',
    height: '80%',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'darkgrey',
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    flex: 8
  },
  item: {
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    borderColor: 'darkgrey',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  headerItem: {
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    borderColor: 'darkgrey',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'orange'
  },
  name: {
    flex: 9,
  },
  checkbox: {
    flex: 1
  }
});

export default ItemView;