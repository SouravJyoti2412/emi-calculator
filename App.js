import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, Button, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [months, setMonths] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);
  const [extraPay, setExtraPay] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interest) / 12 / 100;
    const n = parseInt(months);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const extra = total - P;

    setEmi(emi.toFixed(2));
    setTotalPayable(total.toFixed(2));
    setExtraPay(extra.toFixed(2));
  };

  const isButtonDisabled = !principal || !interest || !months;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>EMI Calculator</Text>
      <Card style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Principal Amount"
          keyboardType="numeric"
          value={principal}
          onChangeText={setPrincipal}
        />
        <TextInput
          style={styles.input}
          placeholder="Interest Percentage"
          keyboardType="numeric"
          value={interest}
          onChangeText={setInterest}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration (Months)"
          keyboardType="numeric"
          value={months}
          onChangeText={setMonths}
        />
        <Button title="Calculate EMI" onPress={calculateEMI} disabled={isButtonDisabled} />
        {emi && (
          <View style={styles.result}>
            <Text style={styles.resultText}>EMI: ₹{emi}</Text>
            <Text style={styles.resultText}>Total Payable Amount: ₹{totalPayable}</Text>
            <Text style={styles.resultText}>Extra Amount Paid: ₹{extraPay}</Text>
          </View>
        )}
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 16,
    margin: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 13
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
});
