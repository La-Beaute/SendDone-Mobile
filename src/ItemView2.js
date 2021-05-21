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

const indent = '   ';

const Row_File = ({item}) =>{
    return(
    <Text>  {indent.repeat(item.deep)}{ '📄' }{'       '}{item.path}</Text>
    );
};
const Row_File_Dir = ({item}) =>{
    var dir = item['type'] == 'directory';
    const renderItem = ({item}) =>
    {
        return(
            <Row_File_Dir
            item = {item}
            />
        );
    };
    if(!dir)
        return(
            <Row_File
            item = {item}/>
        );
    else
        return(
            <SafeAreaView>
            <Text>  {indent.repeat(item.deep)}{ '📁' }{'       '}{item.path}</Text>
            <FlatList
                data = {item.item_list}
                renderItem = {renderItem}
            />
            </SafeAreaView>
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
                    "file_4": {
                        "path": "/home/user_1/directory_1/directory_2/file_4",
                        "name": "file_4",
                        "dir": "directory_2",
                        "type": "file",
                        "size": 2223      
                    },
                    "file_5": {
                        "path": "/home/user_1/directory_1/directory_2/file_5",
                        "name": "file_5",
                        "dir": "directory_2",
                        "type": "file",
                        "size": 222      
                    },
                    "directory_3" : {
                        "path": "/home/user_1/directory_1/directory_2/directory_3",
                        "name": "directory_3",
                        "dir": "directory_2",
                        "type": "directory",
                        "items" : 
                        {
                            "file_6": {
                                "path": "/home/user_1/directory_1/directory_2/directory_3/file_6",
                                "name": "file_6",
                                "dir": "directory_3",
                                "type": "file",
                                "size": 111
                            },
                            "file_7": {
                                "path": "/home/user_1/directory_1/directory_2/directory_3/file_7",
                                "name": "file_7",
                                "dir": "directory_3",
                                "type": "file",
                                "size": 111
                            }
                        }                            
                    }
                }
              }
            }
          }
        }
      }
      );
    const renderItem=({item})=>{
        return(
            <Text>{items.path}</Text>
        );
    };
    const object2Item=({item})=>{
        return(
            <Row_File_Dir
                item = {item}
                />
        );
    };
    function retEle(ele,deep)
    {
        var ret_obj = Object.assign({},ele);
        ret_obj['send'] = true;
        ret_obj['deep'] = deep;
        if(ret_obj["type"]=="file")
        {
            return ret_obj;
        }
        else{
            if(Object.keys(ret_obj.items).length != 0)
            {
                ret_obj['empty'] = false;
                ret_obj['item_list'] = [];                
                for (const [key, value] of Object.entries(ret_obj.items)) {
                    ret_obj['item_list'].push(retEle(value,deep+1));
                };  
            }
            else
            {
                ret_obj['empty'] = true;
            }
            return ret_obj;
        }
    }
    function dict2list(values)
    {
        var ret = [];
        for (const [key, value] of Object.entries(values)) {
            ret.push(retEle(value,0));
          };
        return ret;       
    }
    function showEle(ele)
    {
        if(ele.type=="file")
        {
            console.log(ele);
        }
        else{
            console.log(ele);
            for (const x of ele.item_list)
            {
                showEle(x);
            }            
        }
    }
    var final_item = Object.assign({},items_tmp);
    var item_list = dict2list(items_tmp['items']);

    // console.log("item_list");
    // for (const x of item_list) { 
    //     showEle(x);
    // }
    // console.log(indent.repeat(4)+'indent');
    return(
        <SafeAreaView style = {styles.itemview}>
            <FlatList
                data = {item_list}            
                renderItem = {object2Item}            
                contentContainerStyle={{
                    flexGrow: 1,
                    }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
 itemview :{
        backgroundColor : "#fff44f",
        height : 400,
        marginTop : 40
      }    
});

export default ItemView2;