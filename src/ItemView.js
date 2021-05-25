import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';

const ItemView = () => {
  return (
    <View style={styles.itemView}>
      <FlatList style={styles.body}>
        
      </FlatList>
      <View style={styles.buttons}>
        
      </View>
    </View>
    );
};
const ItemView = ({items, /* curDir, setCurDir, */ checkedItems, setCheckedItems }) => {
    const [checkAll, setCheckAll] = useState(false);
    const [itemList, addItem] = useState([{dir_path : '', file_path:'/home/th/memo.txt',file_list:[],bool:true,dir:false},
    {
        dir_path : "home/th/",
        file_path : '',
        file_list : [{file_path : '/home/th/memo1.txt'},{file_path : '/home/th/memo2.txt'}],
        bool : true,
        dir : true
    }
    ]);

    const renderItem=({item})=>{
        return(<Row_File_Dir
            item = {item}
        />);   
    };
    console.log("Item View Return");
    return(
        <SafeAreaView style = {styles.itemview}>
            <FlatList
                data = {itemList}            
                renderItem = {renderItem}            
            />
        </SafeAreaView>
    );
};

const styles=StyleSheet.create({
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
  }
});

export default ItemView;