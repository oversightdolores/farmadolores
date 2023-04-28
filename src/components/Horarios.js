import {useEffect} from "react";
import {Text,View} from "react-native";


export const Horarios = ({ horarios }) => {

  useEffect(() => {
  
  }, [horarios])

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  const openingMorning = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), horarios[0].split(':')[0], horarios[0].split(':')[1]);
  const closingMorning = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), horarios[1].split(':')[0], horarios[1].split(':')[1]);
  const openingAfternoon = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), horarios[2].split(':')[0], horarios[2].split(':')[1]);
  const closingAfternoon = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), horarios[3].split(':')[0], horarios[3].split(':')[1]);

  if (currentDate >= openingMorning && currentDate < closingMorning) {
    return <View style={{backgroundColor: '#2bac83ff', justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
      <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>Abierto</Text></View>;
  } else if (currentDate >= closingMorning && currentDate < openingAfternoon) {
    return <View style={{backgroundColor: '	#df6529', justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
      <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>Cierra pronto</Text></View>;;
  } else if (currentDate >= openingAfternoon && currentDate < closingAfternoon) {
    return <View style={{backgroundColor: '#2bac83ff', justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
      <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>Abierto</Text></View>;
  } else {
    return <View style={{backgroundColor: 'tomato', justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
      <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>Cerrado</Text></View>;
  }
};

/* export const Horarios = ({horarios}) => {
  const currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  const currentDate = currentTime.getDate();
  const currentMonth = currentTime.getMonth();
  const currentYear = currentTime.getFullYear();
  console.log('currentDate',currentDate)
  //open time
  let openHour = horarios[0].split(" ")[0].split(":")[0];
  let openMinutes = horarios[0].split(" ")[0].split(":")[1];
  let openAmPm = horarios[0].split(" ")[1];
  //closing time
  let closingHour = horarios[1].split(" ")[0].split(":")[0];
  let closingMinutes = horarios[1].split(" ")[0].split(":")[1];
  let closingAmPm = horarios[1].split(" ")[1];
  
  if(openAmPm === "PM" && openHour!=="12"){
    openHour = parseInt(openHour) + 12;
  }
  if(openAmPm === "AM" && openHour==="12"){
    openHour = "00";
  }
  
  if(closingAmPm === "PM" && closingHour!=="12"){
    closingHour = parseInt(closingHour) + 12;
  }
  if(closingAmPm === "AM" && closingHour==="12"){
    closingHour = "00";
  }
  
  //create date object with the open and closing time
  const openTime = new Date(currentYear, currentMonth, currentDate, openHour, openMinutes);
  const closingTime = new Date(currentYear, currentMonth, currentDate, closingHour, closingMinutes);
  //create date object with current time
  const current = new Date(currentYear, currentMonth, currentDate, currentHour, currentMinutes);
  

  //console.log(`${currentHour}:${currentMinutes}`)

  if (current >= openTime && current < closingTime) {
    return <View style={{backgroundColor: '#2bac83ff', justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
      <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>Abierto</Text></View>;
    } else if (current >= closingTime - 30 * 60 * 1000 && current < closingTime) {
    return <View style={{backgroundColor: '	#df6529', justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
      <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>Cierra pronto</Text></View>;;
    } else {
    return <View style={{backgroundColor: 'tomato', justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
      <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>Cerrado</Text></View>;
    }
    } */