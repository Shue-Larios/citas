import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'; // en la version web esto no lo ocupa pero aca si
import {
  SafeAreaView, // esta ayuda con el area de los iphone la parte de arriba q esta como cortada la pantalla
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert
} from 'react-native';
import { Formulario } from './src/components/Formulario';
import { InformacionPaciente } from './src/components/InformacionPaciente';
import { Paciente } from './src/components/Paciente';




const App = () => {
  const [citas, setCitas] = useState([]);

  // los hook se colocan en la parte superior
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  //  console.log('pacientes', pacientes);

  useEffect(() => {

    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if (citasStorage) {
          setPacientes(JSON.parse(citasStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCitasStorage();
  }, [])



  // para editar el paciente
  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id);
    setPaciente(pacienteEditar);
    guardarCitasStorage(JSON.stringify(pacienteEditar))

  }


  // para eliminar el paciente
  const pacienteEliminar = id => {

    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        // funcion que se ejecuta al presionar el boton
        {
          text: 'Si, Eliminar', onPress: () => {
            const pacientesActualizados = pacientes.filter(
              pacientesState => pacientesState.id !== id);
            setPacientes(pacientesActualizados);
            guardarCitasStorage(JSON.stringify(pacientesActualizados))
          }
        }
      ]
    )
  }

  const cerrarModal = () => {
    setModalVisible(false)
  }

  // guardar las citas en el storage recibiendo datos como json
  const guardarCitasStorage = async (citasJson) => {
    try {
      await AsyncStorage.setItem('citas', citasJson);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}> Administrador de citas  {''} {/* esto es un espacio en blanco */}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => (setModalVisible(true))}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {/* comprobamos */}
      {/* {console.log('pacientes',pacientes)} */}
      {pacientes.length === 0
        ? <Text style={styles.noPacientes}>No hay Pacientes</Text>
        // :  <Text style={styles.noPacientes}>{pacientes.id} </Text>
        : <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                // paso la funcion para la otra
                pacienteEditar={pacienteEditar}
                setPaciente={setPaciente}
                // para eliminar
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
              />
            )
          }}
        />
      }
      <Formulario
        modalVisible={modalVisible}
        cerrarModal={cerrarModal}
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
        guardarCitasStorage={guardarCitasStorage}
      />

      <Modal
        visible={modalPaciente}
        animationType='fade'
      >
        <InformacionPaciente
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
};

// el estilo se pone aca abajo como una variable
// create es un metodo que crea el estilo
const styles = StyleSheet.create({
  // todo lo que esta dentro de las llaves es lo que se le va aplicar
  contenedor: {
    backgroundColor: '#D6D2D1',
    flex: 1 // toma todo el espacio disponible 
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151', // utilizar asi siempre los colores
    fontWeight: '500'
  },
  tituloBold: {
    color: '#6d28d9',
    fontWeight: '900'
  },
  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 50, // da el margin a los dos lados
    borderRadius: 50
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})

export default App;
