import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.number()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

function App() {
  const [password, setPassword] = React.useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = React.useState(false);
  const [lowerCase, setLowerCase] = React.useState(false);
  const [upperCase, setUpperCase] = React.useState(false);
  const [numbers, setNumbers] = React.useState(false);
  const [specialCharacters, setSpecialCharacters] = React.useState(false);

  const generatePassword = passwordLength => {
    let characters = '';
    if (lowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characters += '0123456789';
    if (specialCharacters) characters += '!@#$%^&*()_+';
    setPassword(createPassword(characters, passwordLength));
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSpecialCharacters(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.bgColor}>
      <SafeAreaView>
        <View>
          <Text style={styles.heading}>Password Generator</Text>
          <View>
            <Formik
              initialValues={{password: ''}}
              validationSchema={validationSchema}
              onSubmit={values => {
                generatePassword(parseInt(values.password, 10));
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleReset,
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <Text>Password Length</Text>
                    <View style={styles.inputColumn}>
                      <TextInput
                        style={styles.input}
                        placeholder="Eg. 8"
                        keyboardType="numeric"
                        onChangeText={handleChange('password')}
                        value={values.password}
                      />
                      {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={isChecked => setLowerCase(isChecked)}
                      fillColor="blue"
                      text="Include Lowercase"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={isChecked => setUpperCase(isChecked)}
                      fillColor="green"
                      text="Include Uppercase"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={isChecked => setNumbers(isChecked)}
                      fillColor="red"
                      text="Include Numbers"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={specialCharacters}
                      onPress={isChecked => setSpecialCharacters(isChecked)}
                      fillColor="orange"
                      text="Include Special Characters"
                    />
                  </View>

                  <View style={styles.formAction}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}>
                      <Text>Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        handleReset();
                        resetPassword();
                      }}>
                      <Text>Reset</Text>
                    </TouchableOpacity>
                  </View>

                  {isPasswordGenerated && (
                    <View style={styles.result}>
                      <Text>Your Generated Password:</Text>
                      <Text style={styles.password}>{password}</Text>
                    </View>
                  )}
                </>
              )}
            </Formik>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputWrapper: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  inputColumn: {
    flexDirection: 'column',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  password: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default App;
