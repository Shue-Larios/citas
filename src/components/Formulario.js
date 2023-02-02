import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import DatePicker from 'react-native-date-picker'

export const Formulario = ({ modalVisible, cerrarModal, pacientes, setPacientes, paciente: pacienteObj,
    setPaciente: setPacienteApp, guardarCitasStorage }) => {
    const [id, setId] = useState('');
    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [sintomas, setSintomas] = useState('');

    //  console.log('probanod', pacienteObj);
    useEffect(() => {
        if (Object.keys(pacienteObj).length > 0) {
            setId(pacienteObj.id);
            setPaciente(pacienteObj.paciente);
            setPropietario(pacienteObj.propietario);
            setEmail(pacienteObj.email);
            setTelefono(pacienteObj.telefono);
            setFecha(pacienteObj.fecha);
            setSintomas(pacienteObj.sintomas);
        }
    }, [pacienteObj])


    const handleCita = async () => {
        // Validar campos
        if ([paciente,
            propietario,
            email,
            fecha,
            sintomas].includes('')) {
            Alert.alert('Error', 'Los Campos son obligatorios')
            // el orden de botones siempre sera asi el neutral seria como algo q tenga q usar yo los otros son tal cual indican
            // ,[{text:'Neutral'},
            // {text:'Cancelar'},
            // {text:'Ok'}] )
            return
        }

        const nuevoPaciente = {
            // como los voy a llamar igual no basta igualarlos
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        }

        // revisar si es un registro nuevo o edicion
        if (id) {
            nuevoPaciente.id = id;
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === nuevoPaciente.id
                ? nuevoPaciente
                : pacienteState
            )
            setPacientes(pacientesActualizados);
            setPacienteApp({});
        } else {
            nuevoPaciente.id = Date.now();
            // pasamos el arreglo lleno a App.js
            // agregamos una copia del paciente y agregamos el nuevo arreglo
            const citasNuevas = ([...pacientes, nuevoPaciente]);
            //  setPacientes(JSON.stringify(citasNuevas));
            // pasar las nuevas citas a storage
            guardarCitasStorage(JSON.stringify(citasNuevas));
            // console.log('guardarCitasStorage', guardarCitasStorage);
        }

        // cerramos el modal
        cerrarModal();
        // reseteamos los valores
        setId('');
        setPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setFecha(new Date());
        setSintomas('');
    }


    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
        >
            <SafeAreaView style={styles.contenido}>
                <ScrollView>

                    <Text
                        style={styles.titulo}>
                        {pacienteObj.id ? 'Editar' : 'Nueva'} {''}
                        <Text style={styles.tituloBold}>Cita</Text>
                    </Text>
                    {/* Boton para cerrar  */}
                    <Pressable style={styles.btnCancelar}
                        // esto dice que va hacer diferente de lo q tiene modalVisible
                        onPress={() => {
                            cerrarModal();
                            setId('');
                            setPacienteApp({});
                            setPaciente('');
                            setPropietario('');
                            setEmail('');
                            setTelefono('');
                            setFecha(new Date());
                            setSintomas('');

                        }}
                    >
                        <Text style={styles.btnCancelarTexto}
                        >X Cancelar</Text>
                    </Pressable>
                    {/* es como un contenedor */}
                    {/* NOMBRE MASCOTA */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Paciente</Text>
                        {/* para el texto */}
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre Paciente'
                            placeholderTextColor={'#666'}
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>
                    {/* NOMBRE */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Propietario</Text>
                        {/* para el texto */}
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre Propietario'
                            placeholderTextColor={'#666'}
                            value={propietario}
                            onChangeText={setPropietario} />
                    </View>
                    {/* EMAIL */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Email Propietario</Text>
                        {/* para el texto */}
                        <TextInput
                            style={styles.input}
                            // para el estilo del teclado
                            keyboardType='email-address'
                            placeholder='Email Propietario'
                            placeholderTextColor={'#666'}
                            value={email}
                            onChangeText={setEmail} />
                    </View>
                    {/* TELEFONO */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Telefono Propietario</Text>
                        {/* para el texto */}
                        <TextInput
                            style={styles.input}
                            // para el estilo del teclado
                            keyboardType='number-pad'
                            placeholder='Telefono Propietario'
                            placeholderTextColor={'#666'}
                            value={telefono}
                            onChangeText={setTelefono}
                            // para tener numero maximo de numeros
                            maxLength={8}
                        />
                    </View>
                    {/* DatePicker */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha Alta</Text>
                        {/* como al DatePicker no se le puede dar estilo lo hago asi */}
                        <View style={styles.fechaContenedor}>
                            <DatePicker
                                date={fecha}
                                locale='es'
                                mode='date' // para q sea solo una fecha
                                onDateChange={(date) => setFecha(date)}
                            />
                        </View>

                    </View>

                    {/* SINTOMAS */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Sintomas</Text>
                        {/* para el texto */}
                        <TextInput
                            style={[styles.sintomasInput]}
                            // para el estilo del teclado
                            placeholder='Sintomas del paciente'
                            placeholderTextColor={'#666'}
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true} // para tener mas lineas de escritura
                            numberOfLines={4} //cantidad de lineas
                        />
                    </View>
                    <Pressable style={styles.btnNuevaCita}
                        onPress={handleCita}
                    >
                        <Text style={styles.btnNuevaCitaTexto}
                        > {pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
                    </Pressable>

                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}


// el estilo se pone aca abajo como una variable
// create es un metodo que crea el estilo
const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6d28d9',
        flex: 1,
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
    btnCancelar: {
        marginVertical: 25,
        backgroundColor: '#5827a4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 20,
        //    para dar un tipo de borde
        borderWidth: 2, // esto dice un pixel
        borderColor: '#FFF'
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,

    },
    label: {
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,

    },
    sintomasInput: {
        // height: 100,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#f59e0b',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 20,
        //    para dar un tipo de borde
        borderWidth: 2, // esto dice un pixel
        borderColor: '#FFF'
    },
    btnNuevaCitaTexto: {
        textAlign: 'center',
        color: '#5827a4',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },

})
