import { KeyboardAvoidingView ,Image,StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
// import { useNavigation } from '@react-navigation/native';
import {dataBase} from '../../firebase';
const LoginScreen = ({navigation}) => {
  const[email, setEmail]= useState('')
  const[password, setPassword]= useState('')
   
  //const navigation = useNavigation()
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user){
        navigation.navigate("AdminHomePage")
      }
    })
    return unsubscribe
  })

  const handleSignUp= () => {
    auth
      .createUserWithEmailAndPassword(email , password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        addUser(user);
    })
      .catch(error =>alert(error.message))

  }
 async function addUser(user) {
    let db = dataBase.collection("Users");
      db.add({
        email: user.email,
        uid:user.uid,
        First_name: this.state.name,
        Last_Name: this.state.name,
        address: this.state.address,
        languages: this.state.languages,
        phone_number: this.state.phone_number,
      }).then((res) => {
        this.setState({
          name: '',
          address: '',
          languages:'',
          phone_number:'',
          isLoading: false,
        });
        this.props.navigation.navigate('Home')
      })
      .catch((err) => {
        console.error("Error occured: ", err);
        this.setState({
          isLoading: false,
        });
      });
    
  }
  const handleLogin = ()=>{
    auth
      .signInWithEmailAndPassword(email , password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        console.log(dataBase.collection('Admins').doc('first').get());
    })
      .catch(error =>alert(error.message))
  }

    return (
    <KeyboardAvoidingView style={styles.container}
    behavior="padding">
      <View>
        <Image
          style={styles.bigLogoStyle} 
          source={require('../assets/AbuJobsBigLogo.jpeg')} />
        <Text style ={[styles.adminText]}>Welcome Admin</Text>

      </View>
      <View style={styles.inputContainer}> 
        <TextInput
          placeholder='Email'
          placeholderTextColor="#899499"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor="#899499"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
            <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button , styles.buttonOutLine]}
        >
            <Text style={styles.buttonOutLineText}>Register</Text>

        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex :1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',

  },
  inputContainer:{
    width: '80%',
    
  },
  input: {
    backgroundColor: '#ffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#2885A6',
    borderWidth: 1,
  },
  buttonContainer:{
      width:'60%',
      justifyContent:'center',
      alignItems: 'center',
      marginTop: 40,
  },
  button: {
    backgroundColor: '#A8D173',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutLine:{
    backgroundColor : 'white',
    marginTop: 10,
    borderColor: '#2885A6',
    borderWidth: 3,
  },
  buttonOutLineText:{
    color: '#2885A6',
    fontWeight: '700',
    fontSize: 16,
  },
  adminText:{
    padding: '20%',
    marginTop: '-20%',
    fontSize: 25,
    fontWeight: '800',
    color: '#2885A6',
  },
  bigLogoStyle:{
    resizeMode:'contain',
    width:300,
    height: 150,
    padding : 20,
    
    justifyContent: 'center',
    alignItems: 'center',
  }

})
//#0782f9 blue 