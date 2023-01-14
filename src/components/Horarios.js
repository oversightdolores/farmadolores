import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import moment from 'moment'
import {app} from './firebaseConfig'
import {getFirestore, collection, query, where, doc, getDocs, onSnapshot} from 'firebase/firestore'
import {
    Box,
    Text,
    Avatar,
    Heading,
    Stack,   
    HStack, 
    Pressable,
    Link,
  } from "native-base";
  



  const Horarios = () => {

    const cols = () => {
      return 'danger.600'
    }

    const [hor, setHor] = useState([])
    const [aper, setAper] = useState('')
    const db = getFirestore(app)
    const open = "#3cb371";
    const close = "#d5303e";
    const caseClosed = "#e5be01";
    
     const [hora, setHora] = useState(moment().format("LT"));
    
     const getAllData = () => {
        const q = query(collection(db, "farmacias"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const far = [];
          querySnapshot.forEach((doc) => {
              far.push(doc.data());
          });
          
    
          setHor(far) 
          //setLoading(false)
    
        });
        console.log(hor)
      
        return () => unsubscribe()
    
    }; 
    
      useEffect(() => {
        getAllData()
       
      }, []) 


      /* for (let i = 0; i < hor.length; i++) {
        for (let j = 0; j < hor[j].horario.length; i++) {
          if(hor[i].horario[j] === hora) {
            console.log('es la hora')
          }
          else {
            console.log('no es la hora')
          }
          
        }
        
      } */
    
    
  return <Div style={styles.abierto} />
    
  
  
  }
  export default Horarios;




  const styles = StyleSheet.create({
    abierto: {
      backgroundColor: 'danger.500'
    }
  })