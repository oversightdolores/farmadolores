import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { DateTime } from "luxon";

const Horarios = ({ horarios }) => {
  const [estado, setEstado] = useState("Cerrado");

  useEffect(() => {
    const checkHorario = () => {
      try {
        const currentDate = DateTime.local();

        if (!Array.isArray(horarios) || horarios.length !== 4) {
          throw new Error("Horarios inválidos");
        }

        // Convierte los objetos de timestamp a objetos DateTime y ajusta la zona horaria.
        const [morningStart, morningEnd, afternoonStart, afternoonEnd] = horarios.map(
          (timestamp) =>
            DateTime.fromMillis(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000, {
              zone: "UTC-3", // Ajusta la zona horaria según tus datos.
            }).setZone('local')
        );

        const currentHourMinute = currentDate.hour * 60 + currentDate.minute;

        const morningStartHourMinute = morningStart.hour * 60 + morningStart.minute;
        const morningEndHourMinute = morningEnd.hour * 60 + morningEnd.minute;
        const afternoonStartHourMinute = afternoonStart.hour * 60 + afternoonStart.minute;
        const afternoonEndHourMinute = afternoonEnd.hour * 60 + afternoonEnd.minute;

        if (
          (currentHourMinute >= morningStartHourMinute && currentHourMinute < morningEndHourMinute) ||
          (currentHourMinute >= afternoonStartHourMinute && currentHourMinute < afternoonEndHourMinute)
        ) {
          setEstado("Abierto");
        } else if (
          (currentHourMinute >= morningEndHourMinute - 10 && currentHourMinute < morningEndHourMinute) ||
          (currentHourMinute >= afternoonEndHourMinute - 10 && currentHourMinute < afternoonEndHourMinute)
        ) {
          setEstado("Cierra pronto");
        } else {
          setEstado("Cerrado");
        }
      } catch (error) {
        console.error("Error en la verificación de horarios:", error);
        setEstado("Desconocido"); // Puedes manejar el estado de error de acuerdo a tus necesidades.
      }
    };

    const interval = setInterval(checkHorario, 60000); // Revisar el estado cada minuto
    checkHorario(); // Verificar el estado al cargar el componente

    return () => clearInterval(interval); // Limpieza del intervalo al desmontar el componente
  }, [horarios]);

  const estadoColor = {
    Abierto: "#2bac83ff",
    "Cierra pronto": "#df6529",
    Cerrado: "tomato",
    Desconocido: "gray", // Puedes definir un color para el estado de error.
  };

  return (
    <View
      style={{
        backgroundColor: estadoColor[estado],
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        width: 100,
      }}
    >
      <Text style={{ fontWeight: "bold", color: "#fff", padding: 2, fontSize: 10 }}>
        {estado}
      </Text>
    </View>
  );
};

export default Horarios;
