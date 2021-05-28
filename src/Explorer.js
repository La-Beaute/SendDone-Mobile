import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import * as fs from 'react-native-fs';
import Checkbox from '@react-native-community/checkbox';
import Path from './Path';
import TextButton from './TextButton';
import DirButton from './DirButton';

/**
 * 
 * @param {object} props
 * @param {function} props.setShowExplorer 
 * @param {{}} props.items
 * @param {function} props.setItems 
 * @param {boolean} props.selectPath
 * @returns 
 */
const Explorer = ({ setShowExplorer, items, setItems, selectPath }) => {
  const [curDir, setCurDir] = useState(fs.ExternalStorageDirectoryPath);
  const [curItems, setCurItems] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  /**
   * @type {[Object.<string, boolean>, function]} useState 
   */
  const [checkedItems, setCheckedItems] = useState({});

  const addSubItems = async (item) => {
    try {
      let itemStat = await fs.stat(item.path);
      if (itemStat.isDirectory()) {
        item.type = 'directory';
        item.items = {};
        for (let subItem of (await fs.readdir(item.path))) {
          item.items[subItem] = { path: Path.join(item.path, subItem), name: subItem, dir: Path.join(item.dir, item.name) };
          await addSubItems(item.items[subItem]);
        }
      }
      else {
        item.type = 'file';
        item.size = parseInt(itemStat.size);
      }
    } catch (err) {
      // Maybe No permission or file system error. Skip it.
    }
    return;
  }

  /**
   * 
   */
  const add = async () => {
    if (selectPath) {
      // Just set to the item path.
      // TODO flex.
      setItems(curDir);
      return;
    }
    let ret = {};
    for (let item in checkedItems) {
      ret[Path.basename(item)] = { path: item, name: Path.basename(item), dir: '.' };
      await addSubItems(ret[Path.basename(item)]);
    }
    setItems(() => Object.assign({}, ret, items));
    return;
  }

  const addAndExit = async () => {
    await add();
    setShowExplorer(false);
  }

  const updateCurItems = async () => {
    let tmp = await fs.readDir(curDir);
    if (selectPath) {
      tmp = tmp.filter((item) => (item.isDirectory()));
    }
    tmp.sort((a, b) => (a.name < b.name ? -1 : 1));
    setCurItems(() => tmp);
  }

  const getKeyFromItem = (item) => {
    return item.name;
  }

  /**
   * 
   * @param {string} path 
   */
  const handleCheck = (path) => {
    const value = !(path in checkedItems);
    if (value) {
      if (selectPath) {
        setCheckedItems(() => {
          const tmp = { ...checkedItems };
          tmp[path] = true;
          return tmp;
        });
      }
      else {
        setCheckedItems(() => {
          const tmp = {};
          tmp[path] = true;
          return tmp;
        });
      }
    }
    else {
      setCheckedItems(() => {
        const tmp = { ...checkedItems };
        delete tmp[path];
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
        const tmp = curItems.reduce((prev, cur) => {
          prev[cur.path] = true;
          return prev;
        }, {});
        return tmp;
      });
    }
    else {
      setCheckedItems({});
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (item.isDirectory())
            setCurDir(item.path);
        }}
      >
        <View style={styles.name} >
          <Text numberOfLines={1} ellipsizeMode='middle'>
            {(item.isDirectory() ? '📁' : '📄') + ' ' + item.name}
          </Text>
        </View>
        <View style={styles.checkbox}>
          {!selectPath &&
            <Checkbox
              tintColors={{ true: '#ff6900', false: 'grey' }}
              value={checkAll || checkedItems[item.path]}
              onValueChange={() => { handleCheck(item.path); }}
            />
          }
        </View>
      </TouchableOpacity>
    )
  }

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

  const showCurDir = () => {
    let ret = [<DirButton style={styles.dirButton} key='Home' title='Home' onPress={() => { setCurDir(fs.ExternalStorageDirectoryPath); }} />];
    if (curDir === fs.ExternalStorageDirectoryPath)
      return ret;
    let dirArray = curDir.replace(fs.ExternalStorageDirectoryPath + '/', '').split('/');
    let cumulativeDir = fs.ExternalStorageDirectoryPath;
    for (let i = 0; i < dirArray.length; ++i) {
      ret.push(<Text key={i}>{'>'}</Text>);
      cumulativeDir = cumulativeDir + '/' + dirArray[i];
      let tmp = cumulativeDir;
      ret.push(
        <DirButton
          style={styles.dirButton}
          key={tmp}
          title={dirArray[i]}
          onPress={() => { setCurDir(tmp); }} />);
    }
    return ret;
  }

  useEffect(async () => {
    await updateCurItems();
    setCheckedItems({});
  }, [curDir]);

  useEffect(() => {
    let numCheckedItems = Object.keys(checkedItems).length;
    let numItems = curItems.length;
    if (numItems > 0 && numCheckedItems === numItems)
      setCheckAll(true);
    else
      setCheckAll(false);
  }, [checkedItems]);

  return (
    <View style={styles.addItem}>
      <ScrollView
        horizontal
        style={styles.head}
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      >
        {showCurDir()}
      </ScrollView>
      <View style={styles.body}>
        <FlatList
          ListHeaderComponent={selectPath ? null : headerItem}
          stickyHeaderIndices={selectPath ? [] : [0]}
          keyExtractor={getKeyFromItem}
          data={curItems}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.foot}>
        <TextButton title='Exit' onPress={() => { setShowExplorer(false); }} />
        <TextButton title={selectPath ? 'Set' : 'Add'} onPress={addAndExit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addItem: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  head: {
    height: '10%',
    flexDirection: 'row',
    padding: 5
  },
  body: {
    width: '95%',
    height: '80%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden'
  },
  foot: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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

export default Explorer;