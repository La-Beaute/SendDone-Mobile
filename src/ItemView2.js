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
        if(item.dir)
        {
            return(
                <Text>  {'       '}{ '📄' }{'       '}{item.file_path}</Text>
            );
        }
        return(
            <Row_Dir
                item_list = {item.item_list}
            />
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
    </View>
    );
};

const ItemView2 = ({items}) => {
    const [items_tmp, setItems] = useState({
        "items": {
          "file_1": {
            "path": "/home/user_1/file_1",
            "name": "file_1",
            "dir": ".",
            "type": "file",
            "size": 1024
          },
          "file_2": {
            "path": "/home/user_1/file_2",
            "name": "file_2",
            "dir": ".",
            "type": "file",
            "size": 1000
          },
          "directory_1": {
            "path": "/home/user_1/directory_1",
            "name": "directory_1",
            "dir": ".",
            "type": "directory",
            "items": {
              "file_3": {
                "path": "/home/user_1/directory_1/file_3",
                "name": "file_3",
                "dir": "directory_1",
                "type": "file",
                "size": 123
              },
              "directory_2" : {
                "path": "/home/user_1/directory_1/directory_2",
                "name": "directory_2",
                "dir": "directory_1",
                "type": "directory",
                "items" : 
                {

                }
              }
            }
          }
        }
      }
      );
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
        console.log("In Itemsview2 renderItem");
        console.log(item.path);
        return(
            <Text>{items.path}</Text>
        );
        // return(<Row_File_Dir
        //     item = {item}
        // />);   
    };
    function retEle(ele)
    {
        console.log("retEle");
        console.log(ele);
        if(ele["type"]=="file")
        {
            return ele["name"];
        }
        else{
            var ret = [ele["name"]];            
            console.log("Directory");            
            console.log(ele["name"]);
            if(Object.keys(ele.items).length != 0)
            {
                for (const [key, value] of Object.entries(ele.items)) {
                    ret.push(retEle(value));
                };  
                console.log(ele["name"]+" retELe return");
                console.log(ret);
                return ret;
            }
            else
            {
                console.log([ele["name"],["Empty"]]);
                return [ele["name"],["Empty"]];
            }
        }
    }
    function dict2list(values)
    {
        console.log("dict2list");
        var ret = [];
        for (const [key, value] of Object.entries(values)) {
            ret.push(retEle(value));
          };
        console.log("ret");
        console.log(ret);
        return ret;       
    }
    var item_list = dict2list(items_tmp['items']);
    return(
        <SafeAreaView style = {styles.itemview}>
            <FlatList
                data = {items_tmp}            
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

export default ItemView2;