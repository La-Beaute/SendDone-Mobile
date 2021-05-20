import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import * as fs from 'react-native-fs';
import TextButton from './TextButton';
import DirButton from './DirButton';

const AddItem = ({ setShowAddItem, items, setItems }) => {
  let [curDir, setCurDir] = useState(fs.ExternalStorageDirectoryPath);
  let [curItems, setCurItems] = useState([]);
  let [checkedItems, setCheckedItems] = useState({});

  const addSubItems = async (item) => {
    try {
      let itemStat = await fs.stat(item.path);
      if (itemStat.isDirectory()) {
        item.type = 'directory';
        item.items = {};
        for (let subItem of (await fs.readdir(item.path))) {
          item.items[subItem] = { path: path.join(item.path, subItem), name: subItem, dir: path.join(item.dir, item.name) };
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
   * @param {{*}} tmpItems 
   */
  const add = async () => {
    for(let item of checkedItems){
      await addSubItems(item);
    }
    setItems(items => Object.assign({}, ret, items));
  }

  const updateCurItems= async ()=>{
    let tmp=await fs.readDir(curDir);
    setCurItems(()=>tmp);
  }

  const renderItem=({index, item})=>{
    return (
      <TouchableOpacity style={styles.item} onPress={ ()=>{setCurDir(item.path);} }>
        <Text numberOfLines={1}>{(item.isDirectory() ? '📁' : '📄') + item.name}</Text>
      </TouchableOpacity>
    )
  }
  
  const showCurDir = () => {
    let ret = [<DirButton style={styles.dirButton} key='Home' title='Home' onPress={ ()=>{setCurDir(fs.ExternalStorageDirectoryPath);} } />];
    if (curDir===fs.ExternalStorageDirectoryPath)
      return ret;
    let dirArray = curDir.replace(fs.ExternalStorageDirectoryPath+'/', '').split('/');
    let cumulativeDir = fs.ExternalStorageDirectoryPath;
    for (let i = 0; i < dirArray.length; ++i) {
      ret.push(<Text key={i}>{'>'}</Text>);
      cumulativeDir = cumulativeDir+'/'+dirArray[i];
      let tmp = cumulativeDir;
      ret.push(<DirButton style={styles.dirButton} key={tmp} title={dirArray[i]} onPress={() => { setCurDir(tmp); }} />);
    }
    console.log(ret);
    return ret;
  }
  
  useEffect( async ()=>{
    await updateCurItems();
  }, [curDir]);

  return (
    <View style={styles.addItem}>
      <ScrollView horizontal style={styles.head} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        {showCurDir()}
      </ScrollView>
      <View style={styles.body}>
        <FlatList
          keyExtractor={ (item)=>item.name }
          data={curItems}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.foot}>
        <TextButton title='Exit' onPress={() => { setShowAddItem(false); }}></TextButton>
        <TextButton title='Add' onPress={add}></TextButton>
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
    alignItems: 'center'
  },
  head: {
    height: '10%',
    flexDirection: 'row',
    padding: 5
  },
  body: {
    width: '95%',
    height: '80%'
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
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
});

export default AddItem;