import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { formatearFecha } from '../helpers';

export const Paciente = ({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
  setModalPaciente,
  setPaciente}) => {


  const { paciente, fecha, id } = item.item;

  return (
    <Pressable
      onLongPress={() => {
        setModalPaciente(true);
        setPaciente(item.item)
      }}
    >

      <View style={styles.contenedor} >
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{paciente}</Text>
        <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

        <View style={styles.contenedorBotones} >
          {/* boton editar */}
          {/* <Pressable
            style={[styles.btn, styles.btnEditar]}
            onPress={() => {
              setModalVisible(true)
              pacienteEditar(id)
            }}
          >
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable> */}
          {/* boton eliminar */}
          <Pressable style={[styles.btn, styles.btnEliminar]}
            onPress={() => {
              pacienteEliminar(id)
            }}
          >
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}


// el estilo se pone aca abajo como una variable
// create es un metodo que crea el estilo
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94a3B8',
    borderBottomWidth: 2
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10
  },
  texto: {
    color: '#6d28d9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10
  },
  fecha: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'row', // para ponerlos en linea sin display:flex
    justifyContent: 'space-between', // coloca uno de lado derecho y el otro lado izquierdo
    marginTop: 20
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  btnEditar: {
    backgroundColor: '#F59e0b',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',

  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 15,
    color: '#FFF'

  }
})
