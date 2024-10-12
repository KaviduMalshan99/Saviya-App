import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const FundAgrements = ({ navigation }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const handleDonePress = () => {
    if (termsAccepted && agreementAccepted) {
      // If both radio buttons are selected, navigate to "News"
      navigation.navigate('News');
    } else {
      // Show alert if not both radio buttons are selected
      Alert.alert("Incomplete Agreement !", "Please accept all terms and agreements before proceeding.");
    }
  };

  const renderRadioButton = (selected, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Agreement</Text>

      {/* Agreement Text */}
      <View style={styles.agreementBox}>
        <Text style={styles.agreementText}>
          "Our Project Is Responsible For Facilitating The Connection Between The Fundraiser 
          And The Self-Employed Individuals We Support. However, All Financial Transactions, 
          Including The Provision Of Monetary Donations Or Equipment, Are The Sole Responsibility Of The Fundraiser.
        </Text>
        <Text style={styles.agreementText}>
          These Transactions Must Adhere To The Project's Terms And Conditions, Ensuring Full Transparency 
          Under The Supervision Of Our Administration. Fundraisers Are Required To Submit All Agreements, 
          Bank Receipts, And Related Documentation To Our Administrators For Verification And Record-Keeping Purposes."
        </Text>
      </View>

      {/* Radio button for General Terms */}
      <View style={styles.radioButtonGroup}>
        {renderRadioButton(termsAccepted, () => setTermsAccepted(!termsAccepted))}
        <Text style={styles.radioText}>
          I accept the all Terms & Conditions of use.
        </Text>
      </View>

      {/* Radio button for Agreement Conditions */}
      <View style={styles.radioButtonGroup}>
        {renderRadioButton(agreementAccepted, () => setAgreementAccepted(!agreementAccepted))}
        <Text style={styles.radioText}>
          I accept the above Agreement Conditions.
        </Text>
      </View>

      {/* Done Button */}
      <TouchableOpacity 
        style={styles.doneButton}
        onPress={handleDonePress}
      >
        <Text style={styles.doneButtonText}>ACCEPT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Matches the blue gradient
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight:'450',
    marginBottom: 40,
    color: '#000',
  },
  agreementBox: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 25,
    marginBottom: 40,
  },
  agreementText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  radioButtonContainer: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButton: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: 'transparent', // Default to transparent if not selected
  },
  radioButtonSelected: {
    backgroundColor: '#000',
    
  },
  radioText: {
    fontSize: 16,
    color: '#000',
    flex: 1, // Ensure the text takes up full width of the available space
    textAlign: 'left', // Align text to the left
  },

  doneButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginTop: 40,
  },
  doneButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default FundAgrements;
