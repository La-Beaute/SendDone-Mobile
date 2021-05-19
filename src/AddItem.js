import React from 'react';
import { PermissionsAndroid } from 'react-native';
import * as fs from 'react-native-fs';

const AddItem = async () => {
  try{
    const granted=await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);
    const readPermission=await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    const writePermission=await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if(!readPermission || !writePermission){
      console.log('Permission not granted');
      return;
    }
    else{
      console.log('permission granted!');
    }
    console.log(await fs.getAllExternalFilesDirs());
    console.log(fs.ExternalStorageDirectoryPath);
  }
  catch(err){
    console.log(err);
  }
}

export default AddItem;