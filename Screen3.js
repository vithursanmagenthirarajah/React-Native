import React, {useState, useRef} from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput, ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
export default function Screen3(props) {
    const { item } = props;
    const details = props.route.params.item;
    console.log("s3",details)
    const dropdownRef = useRef({});

    const [source, setSource] = useState('');
    const [factor, setFactor] = useState('');
    const [lb, setLb] = useState('');
    const [ub, setUb] = useState('');

    const handleAdd = async () => {

        if(source!=='' && factor !=='' && lb !== '' && ub !== '') {

            details[6].push({
                "name": source,
                "ef": parseFloat(factor),
                "min": parseFloat(lb),
                "max": parseFloat(ub)
            })
            console.log("successfully added!")
            console.log("after", details);
            setSource('')
            setFactor('')
            setUb('')
            setLb('')
        }
        dropdownRef.current.reset()
    }

    const handleSubmit = async () => {
        let output = {
            "optimization_name":details[0],
            "optimization_cap":parseFloat(details[1]),
            "organization_id":details[2],
            "date":details[3],
            "type":details[4],
            "unit":details[5],
            "emissions":details[6]
        }
        console.log("successfully added!")
        console.log("out",output);
        setSource('')
        setFactor('')
        setUb('')
        setLb('')

        axios.post('http://192.168.8.179:5000/create',output).then((res)=>{
            console.log("added",res)
            props.navigation.navigate("S4", {item:res})
        }).catch((err)=>{
            console.log("err",err)
        })




    }

    const factors = [0.3, 0.4, 1.5, 0.75]
    const sources = ["Audi Car- CA 2001", "Mitsubishi Van- BA 3542", "BMW Car-AD 3342"]

    return (
        <SafeAreaView style={styles.container}>
            {/* https://docs.expo.io/versions/latest/sdk/status-bar */}
            <StatusBar style="light" />

            <View style={{ paddingHorizontal: 30,flex:1,flexDirection:"column"}}>
                <View style={{alignItems:"center", flex:1}}>
                <Text style={{fontSize:35, fontWeight:"bold",marginTop:20}}>Create Optimization</Text>
                </View>
                <View style={{alignItems:"center",marginTop:20, flex:7}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Emission source</Text>
                            <SelectDropdown buttonStyle={{backgroundColor:'white', height:30, alignItems:'flex-start'}}
                                            buttonTextStyle={{marginLeft:-150,alignItems:'flex-start'}}
                                            data={sources}
                                            ref={dropdownRef}
                                            onSelect={async (selectedItem, index) => {
                                                console.log(selectedItem, index)
                                                await setSource(selectedItem)
                                                selectedItem=null
                                            }}

                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                // text represented after item is selected
                                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                // text represented for each item in dropdown
                                                // if data array is an array of objects then return item.property to represent item in dropdown
                                                return item
                                            }}
                            />
                        </View>

                        <View style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Emission factor</Text>
                            <SelectDropdown buttonStyle={{backgroundColor:'white', height:30, alignItems:'flex-start'}}
                                            buttonTextStyle={{marginLeft:-150,alignItems:'flex-start'}}
                                            data={factors}
                                            ref={dropdownRef}
                                            onSelect={async (selectedItem, index) => {
                                                console.log(selectedItem, index)
                                                await setFactor(selectedItem)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                // text represented after item is selected
                                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                // text represented for each item in dropdown
                                                // if data array is an array of objects then return item.property to represent item in dropdown
                                                return item
                                            }}
                            />
                        </View>

                        <View style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Lower bound</Text>
                            <TextInput Number onChangeText={async (e) => {
                                await setLb(e.replace(/[^0-9]/g, ''))
                            }} value={lb} style={{fontSize:18, color:'#000000'}}/>
                        </View>

                        <View style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Upper bound</Text>
                            <TextInput onChangeText={async (e) => {
                                await setUb(e.replace(/[^0-9]/g, ''))
                            }} value={ub} style={{fontSize:18, color:'#000000'}}/>
                        </View>
                    </ScrollView>

                </View>
<View style={{flex:2,alignItems:'center'}}>
    <View style={{borderRadius:5,borderColor:"#0F9500", border:1, borderWidth:1, padding:15,  backgroundColor:"white",marginBottom:10, minWidth:"100%",alignItems:'center'}}>
        <Text
            onPress={handleAdd} style={{fontSize:20, color:'#0F9500', fontWeight:'bold'}}> Add new emission source</Text>
    </View>

    <TouchableOpacity
        onPress={handleSubmit}
        style={{borderRadius:5,  padding:25,  backgroundColor:"#0F9500",marginBottom:10, minWidth:"100%",alignItems:'center'}}>
        <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}> Create </Text>
    </TouchableOpacity>
</View>
            </View>
        </SafeAreaView>
    );
}

const TEXT = {
    color: "#fff",
    textAlign: "center",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: Constants.statusBarHeight,
    },
    content: {
        paddingHorizontal: 30,
    },
    textWrapper: {
        marginTop: 60,
        marginBottom: 30,
    },
    hiText: {
        ...TEXT,
        fontSize: 20,
        lineHeight: 50,
        fontWeight: "bold",
    },
    userText: {
        ...TEXT,
        fontSize: 15,
        lineHeight: 30,
    },
    form: {
        marginBottom: 30,
    },
    iconLock: {
        color: "#929292",
        position: "absolute",
        fontSize: 16,
        top: 22,
        left: 22,
        zIndex: 10,
    },
    inputPassword: {
        height: 60,
        borderRadius: 30,
        paddingHorizontal: 30,
        fontSize: 20,
        color: "#929292",
        backgroundColor: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
    },
    buttonLogin: {
        height: 50,
        borderRadius: 25,
        backgroundColor: "#8d015a",
        justifyContent: "center",
        marginTop: 15,
    },
    buttonLoginText: {
        ...TEXT,
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
