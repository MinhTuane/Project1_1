import React, { useEffect, useState }  from "react";
import { Alert, StyleSheet, View } from "react-native";
import {  Text, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from 'react-native-date-picker'

const Add_Product_Each_Day=({route,navigation})=>{
        const {dataa} = route.params
        const {nameProduct} = dataa

        const [date, setDate] = useState(new Date())
        const [newQuantity,setNewQuantity] = useState()
        
        const handleAdd=async ()=>{
            
            
            
            await firestore().collection('chainManufacture').doc(nameProduct).collection("Product").doc(moment(date).format("YYYY-MM-DD"))
            .set({
                quantity : newQuantity,
                date : moment(date).format("YYYY-MM-DD")
            })
            .then(()=>{
                Alert.alert('Add successfully')
                setNewQuantity("")
            })
            
        }
        return(
            <View>
                <Text style={styles.title}>Quantity</Text>
                <TextInput style={styles.input} value={newQuantity} onChangeText={(text) => setNewQuantity(text)} keyboardType="numeric"/>
                <Text style={styles.title}>Date</Text>
                <DatePicker minimumDate={new Date("1990-01-01")} maximumDate={new Date()} mode="date" date={date} onDateChange={setDate} />

                <TouchableOpacity style={styles.button} onPress={()=>handleAdd()}>
                    <Text style={styles.textButton}>Add</Text>
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
export default Add_Product_Each_Day