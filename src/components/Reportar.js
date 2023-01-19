import firestore from '@react-native-firebase/firestore';
import {useState} from "react";
import {Button,StyleSheet,TextInput,View} from "react-native";


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
      
      alert("Hubo un error al enviar tu reporte, vuelva a intentarlo");
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
