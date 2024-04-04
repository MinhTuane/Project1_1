import firestore from '@react-native-firebase/firestore';
import { useEffect,useState } from 'react';
import Handle_infor from './HandleInfor';
import { FlatList, View , ScrollView, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { Text} from 'react-native-paper';
import Handle_infor_labour from './HandleInforLabour';



const Information_Product=({route,navigation})=>{

    const{data} = route.params;
    const{name} = data;
    
    const [quantity,setQuatity] = useState('');

    const [DirectMaterial,setDirectMaterial] = useState([]);

    const [MOH,setMOH] = useState([]);
    
    const [Labour,setLabour] = useState([]);

    
    useEffect(()=>{
        handleInfor();
    },[navigation])
    const handleInfor=()=>{
        firestore().collection('chainManufacture').doc(name).get()
        .then(docSnapshot=>{
            setQuatity(docSnapshot.data().quantity)
        });

        setDirectMaterial([])
        firestore().collection('chainManufacture').doc(name).collection('DicrectMaterial').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setDirectMaterial(oldArray=>[...oldArray,{
                    nameProduct: name,
                    collection : 'DicrectMaterial',
                    id : docSnapshot.id,
                    data : docSnapshot.data()
                }])
            })
        })

        setMOH([])
        firestore().collection('chainManufacture').doc(name).collection('ManufactureOverhead').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setMOH(oldArray=>[...oldArray,{
                    nameProduct: name,
                    collection : "ManufactureOverhead",
                    id : docSnapshot.id,
                    data : docSnapshot.data()
                }])
            })
        })

        setLabour([])
        firestore().collection('chainManufacture').doc(name).collection('Labour').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setLabour(oldArray=>[...oldArray,{
                    nameProduct: name,
                    collection : 'Labour',
                    id : docSnapshot.id,
                    data : docSnapshot.data()
                }])
                console.log(docSnapshot.id);
            })
        })
    }
    const handleUpdate=(item)=>{
        navigation.navigate('Update',({dataa:item}))
        
    }
    const handleAdd=(item)=>{
        navigation.navigate('Add_Element',({dataa:item}))
    }

    const handleAddLabour=(item)=>{
        navigation.navigate('Add_Element_Labour',({dataa:item}))
    }
    const handleAddProductDay=(item)=>{
        navigation.navigate('Add_Product_Day',({dataa:item}))
    }
    const renderitem=({item})=>{
        const {nameProduct,collection,id,data} = item
        const {name,quantity,price} =data;
        if(collection=='ManufactureOverhead'){
            return<Handle_infor nameProduct={nameProduct} name={name}
             quantity={quantity} price={price} id={id} collection={collection} hook={setMOH} 
             onpress={()=> handleUpdate(item)}/>
        } else {
            return<Handle_infor nameProduct={nameProduct} name={name}
             quantity={quantity} price={price} id={id} collection={collection} hook={setDirectMaterial}
             onpress={()=> handleUpdate(item)}/>
        }
        
    }
    const renderItemLabour=({item})=>{
        
        const {nameProduct,id,data} = item
        const {position,quantity,salary} =data;
        
        return<Handle_infor_labour nameProduct={nameProduct} position={position} quantity={quantity}
         salary={salary} id={id} setLabour={setLabour} 
         onpress={()=>navigation.navigate('UpdateLabour',({dataa:item}))}/>
    }
    const VirtualizedList = ({children}) => {
        return (
            <FlatList
                data={[]}
                keyExtractor={() => "key"}
                renderItem={null}
                ListHeaderComponent={
                    <>{children}</>
                }
            />
        )
    }

    return(
        <VirtualizedList>
        <ScrollView style={styles.totalcontainer}>
            <View style ={styles.select}>
                <View>
                    <Text style={styles.titleProduct}>Name Product : {name}</Text>
                    <Text style={styles.titleProduct}>Quantity : {quantity}</Text>
                </View>
                <View >
                    <TouchableOpacity onPress={()=>handleAddProductDay({nameProduct:name})}>
                        <Text style={[styles.textFind,styles.add]}>Add or Update Product</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View style ={styles.select}>
                <View>
                    <Text style={styles.title}>Direct</Text>
                </View>
                <View >
                    <TouchableOpacity onPress={()=>handleAdd({nameProduct:name,collection:'DicrectMaterial'})}>
                        <Text style={[styles.textFind,styles.add]}>Add DM</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            <FlatList
            data={DirectMaterial}
            extraData={DirectMaterial}
            renderItem={renderitem}
            />
            <View style ={styles.select}>
                <View>
                    <Text style={styles.title}>Manufacture Overhead</Text>
                </View>
                <View >
                    <TouchableOpacity onPress={()=>handleAdd({nameProduct:name,collection:'ManufactureOverhead'})}>
                        <Text style={[styles.textFind,styles.add]}>Add MOH</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            <FlatList
            data={MOH}
            extraData={MOH}
            renderItem={renderitem}
            />
            <View style ={styles.select}>
                <View>
                    <Text style={styles.title}>Labour</Text>
                </View>
                <View >
                    <TouchableOpacity onPress={()=>handleAddLabour({nameProduct:name,collection:'Labour'})}>
                        <Text style={[styles.textFind,styles.add]}>Add Labour</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            <FlatList
            data={Labour}
            extraData={Labour}
            renderItem={renderItemLabour}
            />
        
        </ScrollView>
        </VirtualizedList>
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
    textFind:{
        fontWeight:'bold',
        fontSize:16,
        color:'red'
    },
    add:{
         
        paddingRight:20, 
    },
    buttonDelete: {
        paddingTop:20,
    },
    textDecor:{
        fontWeight:'bold',
        fontSize:15,
    },
    totalcontainer:{
        margin:5,
        
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
    },
    titleProduct:{
        fontWeight:'bold',
        fontSize:20,
    },
    select:{
        paddingTop: 10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
})
export default Information_Product;