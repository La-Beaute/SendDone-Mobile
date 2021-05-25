import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AddItem from './AddItem';
import TextButton from './TextButton';
const indent = ' ';
const ItemView2 = ({items, setItems, th_items, set_th_items}) => {
    const [checkAll, setCheckAll] = useState(false);
    const [th_items_list_view, set_TH_LV] = useState([]);
    function convert_obj_to_items(th_items)
    {
        var dict = {};
        dict['items'] = list_2_kv(th_items);
        return dict;
    }   
    function list_2_kv(input_list)
    {
        var dict = {};
        for(const obj of input_list)
        {
            if(obj.type == "file")
            {
                var obj_cp = Object.assign({},obj);                
                delete(obj_cp["deep"]);
                delete(obj_cp["delete"]);
                dict[obj_cp['name']] = obj_cp;
            }
            else
            {
                var obj_cp = Object.assign({},obj);                
                delete(obj_cp["deep"]);
                delete(obj_cp["delete"]);
                delete(obj_cp['items']);
                obj_cp['items'] = list_2_kv(obj_cp['item_list']);
                delete(obj_cp['item_list']);
                if(Object.keys(obj_cp['items']).length!=0)
                    dict[obj_cp['name']] = obj_cp;
            }
        }
        return dict;
    }
    const object2Item=({item})=>{
        return(
            <Row_File_Dir
                item = {item}
                />
        );
    };
    const Row_File = ({item}) =>{
        const [row_check,set_row_check] = useState(false);
        return(
            <View style = {styles.row_file_view}>
        <Text style = {{fontSize: 10}}>  {indent.repeat(item.deep)}{ '📄' }{' '}{item.path}</Text> 
         <CheckBox style = {{size:3}}
            value = {row_check || checkAll}
            onChange = {() => {
                set_row_check(row_check => !row_check);
                if(row_check)
                    item.delete = false;
                else
                    item.delete = true;
            }}
        /> 
        </View>
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
                <Text style = {{fontSize: 10}}>  {indent.repeat(item.deep)}{ '📁' }{' '}{item.path}</Text>
                <FlatList
                    data = {item.item_list}
                    renderItem = {renderItem}
                />
                </SafeAreaView>
        );    
    };

    return(
        <SafeAreaView style = {styles.itemview}>
            <View style = {styles.singleview}>
            <Text style={{ fontSize: 20 }} >{"Components        "}</Text>
            <CheckBox style={{ size : 5, backgroundColor : '#000000' }}
            value = {checkAll}
            onChange = {() => {
                console.log("before call set function ",checkAll);
                setCheckAll(checkAll => !checkAll);
                console.log("check All Toggeled", checkAll);
                var call_bool = !checkAll;
                for(const item of th_items)
                    checkAlldeleted(item,call_bool);
            }}
            />
            <TextButton title='Upload'
                        onPress={() => {
                        console.log("Upload : ", items);
                        set_th_items(dict2list(items['items']));
                    }}
                    />
            <TextButton title='Delete'
                        onPress={() => {
                        console.log("Delete");
                        setCheckAll(false);
                        // set_th_items(deleteNreturn(th_items));
                        // setItems(convert_obj_to_items(th_items));
                        // set_th_items(dict2list(items['items']));
                        var next_th_items = deleteNreturn(th_items);
                        console.log("first next_th_items : ",next_th_items);
                        var next_items = convert_obj_to_items(next_th_items);
                        // next_th_items = dict2list(next_items['items']);
                        console.log("second next_th_items : ",next_th_items);
                        set_th_items(next_th_items);
                        setItems(next_items);
                    }}
                    />
            </View>
            <FlatList
                data = {th_items}
                renderItem = {object2Item}            
                contentContainerStyle={{
                    flexGrow: 1,
                    }}
            />
        </SafeAreaView>
    );
};

function retEle(ele,deep)
{
    var ret_obj = Object.assign({},ele);
    ret_obj['delete'] = false;
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
};
function dict2list(values)
{
    var ret = [];
    for (const [key, value] of Object.entries(values)) {
        ret.push(retEle(value,0));
      };
    return ret;       
};
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
};
function checkAlldeleted(ele, check_bool)
{
    console.log("upper : ",ele);
    console.log(ele.delete, check_bool);
    if(ele.type=='file')
        ele.delete = check_bool;
    else{
        for(const e of ele.item_list)
            checkAlldeleted(e,check_bool);
    }
    console.log("down : ",ele);
    console.log(ele.delete, check_bool);
};
function deleteNreturn(obj_list)
{
    var ret = [];
    for(const obj of obj_list)
    {
        if(obj.type == 'file')
        {
            if(!obj.delete)
                ret.push(obj);
            else
            {
                // console.log("Delete file : ",obj);
                // console.log(obj);
            }
        }
        else{
            if(!obj.delete)
            {
                if(!obj.empty)
                {
                    obj.item_list = deleteNreturn(obj.item_list);
                    if(obj.item_list.length !=0)
                        ret.push(obj)
                }
            }
        }
    }
    console.log("Delete N Return : ",ret);
    return ret;
};

const styles = StyleSheet.create({
 itemview :{
        backgroundColor : "#fff44f",
        height : '60%',
        width : '100%',
        marginTop : 40,
        alignSelf : 'center'
    },    
 singleview :{
     flexDirection : "row",
     alignItems: "center",
     justifyContent: "center", },
 row_file_view :{
     flexDirection : "row"
 }
});

export default ItemView2;