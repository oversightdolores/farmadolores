import {useState} from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { auth } from '../components/firebaseConfig';
import firestore from  '@react-native-firebase/firestore'

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  input: {
    width: "100%",
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4
  },
  button: {
    backgroundColor: "#4287f5",
    padding: 12,
    borderRadius: 4
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
}); */

const Reportar = ({route}) => {
    const {uid} = route.params
    const[report, setReport] =useState({
        title: '',
        description: ''
    })
  const handleReportSubmit = async (event) => {
    event.preventDefault();
    try {
      
      await firestore().collection("reportes").add({
        title: report.title,
        description: report.description,
        userId: uid,
        timestamp: new Date()
      });
      alert("Se ha enviado tu reporte.");
      // Limpiar los campos del formulario
      report.title = "";
      report.description = "";
    } catch (error) {
      console.log(error);
      alert("Hubo un error al enviar tu reporte.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholderTextColor={'gray'}
        style={styles.input}
        placeholder="Título del reporte"
        name="title"
        onChangeText={(text) => setReport({...report, title: text})}
        />
        <TextInput 
          placeholderTextColor={'gray'}
             style={styles.input}
             placeholder="Descripción del reporte"
             name="description"
             multiline={true}
        onChangeText={(text) => setReport({...report, description: text})}

           />
        <Button
             style={styles.button}
             title="Enviar reporte"
             onPress={handleReportSubmit}
           />
        </View>
        );
        };
        



        const styles = StyleSheet.create({
          container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
          },
          input: {
            width: '100%',
            padding: 10,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            color: 'black'
          },
          button: {
            width: '100%',
            padding: 10,
            marginVertical: 10,
            backgroundColor: 'blue',
            borderRadius: 10,
            color: 'white'
          }
        });
        
        export default Reportar;
