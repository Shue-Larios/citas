import React from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { formatearFecha } from '../helpers'

export const InformacionPaciente = ({ paciente, setModalPaciente,setPaciente }) => {

    formatearFecha
    return (
        <SafeAreaView
            style={styles.contenedor}
        >


            <Text style={styles.titulo}>Informacion {''}
                <Text style={styles.tituloBold}> Paciente</Text>
            </Text>

            <View>
                <Pressable
                    style={styles.btnCerrar}
                    onLongPress={() => {
                        setPaciente({})
                        setModalPaciente(false);
                    }}>
                    <Text
                        style={styles.btnCerrarTexto}
                    >X Cerrar</Text>
                </Pressable>
            </View>

            <View
                style={styles.contenido}
            >
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.valor}>{paciente.paciente} </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Propietario:</Text>
                    <Text style={styles.valor}>{paciente.propietario} </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.valor}>{paciente.email} </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Telefono:</Text>
                    <Text style={styles.valor}>{paciente.telefono} </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha de alta:</Text>
                    <Text style={styles.valor}>{formatearFecha(paciente.fecha)} </Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Sintomas:</Text>
                    <Text style={styles.valor}>{paciente.sintomas} </Text>
                </View>
            </View>



        </SafeAreaView>
    )
}



// el estilo se pone aca abajo como una variable
// create es un metodo que crea el estilo
const styles = StyleSheet.create({
    // todo lo que esta dentro de las llaves es lo que se le va aplicar
    contenedor: {
        backgroundColor: '#F59E0B',
        flex: 1 // toma todo el espacio disponible 
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 25,
        color: '#FFF',
        fontWeight: '600'
    },
    tituloBold: {
        color: '#FFF',
        fontWeight: '900'
    },
    btnCerrar: {
        marginVertical: 25,
        backgroundColor: '#E06900',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 20,
        //    para dar un tipo de borde
        borderWidth: 2, // esto dice un pixel
        borderColor: '#FFF'
    },
    btnCerrarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: 30,
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 6.27,

        elevation: 10,
    },
    campo: {
        marginBottom: 10,

    },
    label: {
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
        fontSize: 12
    },
    valor: {
        fontWeight: '700',
        fontSize: 20,
        color: '#334155'
    },
})
