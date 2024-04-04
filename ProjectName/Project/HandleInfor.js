import React, { useState } from "react";
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { Menu, MenuItem } from 'react-native-material-menu';
import firestore from '@react-native-firebase/firestore';


const Handle_infor=({nameProduct,name,quantity,price,id,collection,hook,onpress})=>{
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);
    
    const hanldeDelete=async ()=>{
        const res = await firestore().collection('chainManufacture').doc(nameProduct).collection(collection).doc(id).delete()
        .then(() => {
            console.log("Document successfully deleted!");
            hook(l=> l.filter(item => item.id!=id ))
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        hideMenu()
    }

    return(
        <View style={[styles.container,{flexDirection:'row'}]}>
            <View style={{flex:9}}>
                <Text style={styles.textDecor}>Name : {name}</Text>
                <Text style={styles.textDecor}>Quantity : {quantity}</Text>
                <Text style={styles.textDecor}>Price : {price}</Text>
            </View>
            <View style={{flex:1}}>
                <Menu
                    visible={visible}
                    anchor={<Text onPress={showMenu} style={{fontSize:30}}>...</Text>}
                    onRequestClose={hideMenu}
                >
                    <MenuItem onPress={()=>hanldeDelete()}>Delete</MenuItem>
                    <MenuItem onPress={onpress}>Update</MenuItem>
                    
                </Menu>
            </View>
        </View>
    )
};
const styles=StyleSheet.create({
    container:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'lightgreen',
        padding:10,
        margin:10,
    },
    buttonDelete: {
        paddingTop:20,
    },
    textDecor:{
        fontWeight:'bold',
        fontSize:15,
    }
})
export default Handle_infor;