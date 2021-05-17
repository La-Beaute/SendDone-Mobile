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
const Row = ({item}) =>{
    return(
    <View>
        <Text>
    { item.dir ? '📁' :'📄' }{'       '}{item.path}</Text>
    </View>
    );
};
const ItemView = ({items, /* curDir, setCurDir, */ checkedItems, setCheckedItems }) => {
    const [checkAll, setCheckAll] = useState(false);
    const [itemList, addItem] = useState([{path:'/home/th/memo.txt',bool:true,dir:false}]);

    const renderItem=({item})=>{
        return(<Row
            item = {item}
        />);   
    };
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