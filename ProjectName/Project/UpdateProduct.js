import React, { useState }  from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const UpdateProduct=({route,navigation})=>{
        const {dataa} = route.params
        const {nameProduct,collection,id,data} = dataa
        const {name,quantity,price} =data;

        const [newName,setNewName] = useState(name)
        const [newQuantiry,setNewQuantity] = useState(quantity)
        const [newPrice,setNewPrice] = useState(price)
        console.log(nameProduct,name,quantity,price,id,collection);
        const handleUpdate=async ()=>{
            await firestore().collection('chainManufacture').doc(nameProduct).collection(collection).doc(id)
            .update({
                name : newName,
                quantity : newQuantiry,
                price : newPrice,
            })
            .then(()=>{
                Alert.alert('Update successfully')
            })
        }
        return(
            <View>
                <Text style={styles.title}>Name</Text>
                <TextInput style={styles.input} defaultValue={newName} onChangeText={(text)=> setNewName(text)}/>
                <Text style={styles.title}>Quantity</Text>
                <TextInput style={styles.input} defaultValue={newQuantiry} onChangeText={(text) => setNewQuantity(text)} keyboardType="numeric"/>
                <Text style={styles.title}>Price</Text>
                <TextInput style={styles.input} defaultValue={newPrice} onChangeText={(text) => setNewPrice(text)} keyboardType="numeric"/>
                <TouchableOpacity style={styles.button} onPress={()=>handleUpdate()}>
                    <Text style={styles.textButton}>Update</Text>
                </TouchableOpacity>
            </View>
        )
}
const styles = StyleSheet.create({
    title: {
        fontFamily :"Times New Roman",
        fontSize:20,
        padding : 5,
    },
    input : {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#89ECDA',
        width: '95%',
        margin : 5,
        backgroundColor:'white',
        marginBottom:20
    },
    button: {
        backgroundColor: '#89ECDA',
        marginVertical: 10,
        padding: 10,
        width: 120,
        borderRadius: 10,
        shadowColor: '#333',
        shadowOffset: { width: 1, height: -1 },
        shadowRadius: 10,
        shadowOpacity: 20,
        alignItems: 'center',
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
})
export default UpdateProduct