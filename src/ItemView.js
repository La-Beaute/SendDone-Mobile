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
import AddItem from './AddItem';
import TextButton from './TextButton';
const Row_File = ({item}) =>{
    console.log("Row_File");
    console.log(item.file_path);
    return(
        <Text>  { '📄' }{'       '}{item.file_path}</Text>
    );
};
const Row_Dir = ({item_list}) =>{
    console.log("Row_Dir");
    console.log(item_list.dir_path);
    console.log(item_list.file_list);
    const renderItem_Dir = ({item}) =>
    {
        console.log("renderItem");
        console.log(item.file_path);
        return(
            <Text>  {'       '}{ '📄' }{'       '}{item.file_path}</Text>
        );
    }
    return(
        <SafeAreaView>
        <Text>  { '📁' }{'       '}{item_list.dir_path}</Text>
        <FlatList
            data = {item_list.file_list}
            renderItem = {renderItem_Dir}
        />
        </SafeAreaView>
    );
};
const Row_File_Dir = ({item}) =>{
    console.log('Row_FIle_Dir');
    console.log(item.dir_path);
    console.log(item.dir);
    return(
        <View>
    { item.dir && 
        <Row_Dir 
            item_list = {item}/>
    }
    { !item.dir && 
        <Row_File
            item = {item} />
    }
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
const styles = StyleSheet.create({
 itemview :{
        backgroundColor : "#fff44f",
        height : 200,
        marginTop : 40
      }    
});

export default ItemView;