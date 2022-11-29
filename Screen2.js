import React, {useState} from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput, ScrollView
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function Screen2(props) {
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [name, setName] = useState('');
    const [cap, setCap] = useState('');
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [unit, setUnit] = useState('');
    const [em, setEm] = useState([]);
    const [active, setActive] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };


    //dropdown data
    const types = ["Electricity", "Transport"]
    const units =  type === 'Transport' ? ["km", "m", "cm", "mm"] : ["watts", "volts"]
    const getDate = () => {
        let tempDate = date.toString().split(' ');
        return date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };
   let arr=[1,2,3];

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
                            <Text style={{fontSize:12, color:'#626262', }}> Optimization Name</Text>
                            <TextInput value={name} onChangeText={async (e) => {
                                await setName(e)
                            }} style={{fontSize:18, color:'#000000'}}/>
                        </View>

                        <View style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Optimization Cap</Text>
                            <TextInput value={cap} onChangeText={async (e) => {
                                await setCap(e.replace(/[^0-9]/g, ''))
                            }} style={{fontSize:18, color:'#000000'}}/>
                        </View>

                        <TouchableOpacity onPress={showDatePicker}  style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Date</Text>
                            <Text style={{fontSize:18,height:20, color:'#000000'}}>{date.toString().substring(0,16)}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <View style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Organization ID</Text>
                           <TouchableOpacity onPress={showDatePicker}>
                               <TextInput onChangeText={async (e) => {
                                   await setId(e)
                               }} style={{fontSize:18, color:'#000000'}}/>
                           </TouchableOpacity>
                        </View>

                        <View style={{borderRadius:5, border:2, padding:10, borderWidth:1, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%"}}>
                            <Text style={{fontSize:12, color:'#626262', }}> Type</Text>
                            <SelectDropdown buttonStyle={{backgroundColor:'white', height:30}}
                                            buttonTextStyle={{marginLeft:-100}}
                                data={types}
                                onSelect={async (selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    await setType(selectedItem)
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
                            <Text style={{fontSize:12, color:'#626262', }}> Unit</Text>
                            <SelectDropdown buttonStyle={{backgroundColor:'white', height:30}}
                                            buttonTextStyle={{marginLeft:-160}}
                                            data={units}
                                            onSelect={async (selectedItem, index) => {
                                                console.log(selectedItem, index)
                                                await setUnit(selectedItem)
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

                    </ScrollView>

                </View>
<View style={{flex:1,alignItems:'center'}}>
    <TouchableOpacity
        onPress={async () => {

            if( name!=='' && cap!=='' && id !== '' && date !=='' && type !== '' && unit !== ''){

            let item = []
            await item.push(name);
            await item.push(cap);
            await item.push(id);
            await item.push(date);
            await item.push(type);
            await item.push(unit);
            await item.push(em);
            await console.log("item",item)
            props.navigation.navigate("S3", {item: item})}
        }
        }
        style={{borderRadius:5,  padding:15, backgroundColor:"#0F9500",marginBottom:10, minWidth:"100%",alignItems:'center'}}>

        <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}> Create Optimization</Text>
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
