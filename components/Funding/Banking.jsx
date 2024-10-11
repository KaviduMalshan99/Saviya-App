import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Linking, Dimensions, Animated } from 'react-native';
import axios from 'axios'; // Import Axios
import Fundheader from './Fundheader'; // Import Fundheader
import Fside from './Fside'; // Import Fside
import { LineChart } from 'react-native-chart-kit'; // Import LineChart

const Banking = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Banking'); // Active Tab State
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state
  const [exchangeRate, setExchangeRate] = useState(null); // State to hold exchange rate
  const [loadingRate, setLoadingRate] = useState(true); // Loading state for exchange rate
  const [error, setError] = useState(null); // Error state for API call
  const [exchangeHistory, setExchangeHistory] = useState([]); // State for holding historical exchange rate

   // Animation value
   const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for fade


  // Fetch exchange rate (USD to LKR)
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/c9ae364453ed0e526ec9df13/latest/USD'); // Use your API key
        const rate = response.data.conversion_rates.LKR; // Get LKR rate from API response
        setExchangeRate(rate);

        // Simulate historical data for the last few days
        const simulatedHistory = [rate - 3, rate - 2, rate - 1, rate, rate + 1, rate + 2];
        setExchangeHistory(simulatedHistory);

        setLoadingRate(false);
      } catch (error) {
        setError('Failed to fetch exchange rate.');
        setLoadingRate(false);
      }
    };

    fetchExchangeRate();
    // Trigger the fade-in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 2000, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  }, []);

  
  // Function to handle the bank website link click
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  // Function to handle phone call
  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Function to handle email
  const handleEmailPress = (email) => {
    const mailtoURL = `mailto:${email}`;
    Linking.openURL(mailtoURL);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible); // Toggle the side menu visibility
  };

  return (
    <View style={styles.scrollView}>
      
      {/* Header with toggleMenu function */}
      <Fundheader toggleMenu={toggleMenu} />
      

      {/* Side Menu */}
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <Fside visible={isMenuVisible} toggleMenu={toggleMenu} />
          <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </View>
      )}

      <ScrollView style={styles.container}>
        {/* Animated Description */}
        <Text style={styles.topicTitle}>Banking Help</Text>
        <Animated.View style={[styles.descriptionContainer, { opacity: fadeAnim }]}>
          <Text style={styles.descriptionText1}>
            "ඔබේ බැංකු කටයුතු වලට අවශ්‍ය තත්කාලීන සියලුම විස්තර ලබා ගෙන ලාභය වැඩි කර ගනිමු"
          </Text>
          <Text style={styles.descriptionText1}>
            "Stay updated with live rates and grow your financial knowledge!"
          </Text>
        </Animated.View>


        {/* Display live USD to LKR exchange rate */}
        <View style={styles.exchangeRateContainer}>
          <Text style={styles.exchangeRateTitle}>$ to රු live Exchange Rate</Text>
          {loadingRate ? (
            <Text style={styles.loadingText}>Loading rate...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.exchangeRateValue}>1 USD = {exchangeRate} LKR</Text>
          )}
        </View>


                {/* Line Chart to show exchange rate history */}
                {!loadingRate && exchangeHistory.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>USD to රු Exchange Rate Graph View</Text>
            <LineChart
              data={{
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Today'],
                datasets: [
                  {
                    data: exchangeHistory, // Use the historical data
                  },
                ],
              }}
              width={Dimensions.get('window').width - 50} // from react-native
              height={280}
              yAxisLabel=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#000',
                backgroundGradientTo: '#000',
                decimalPlaces: 2, // optional, defaults to 2 decimal places
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius:5,
                  marginTop:10,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#FF0000',
                },
              }}
              bezier
              style={{
                marginVertical: 16,
                borderRadius: 5,
                marginLeft:-5,
                marginTop:10,
              }}
            />
          </View>
        )}



        {/* Horizontal ScrollView for Bank Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      
          {/* Bank Card 1 */}
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/NSB.png')} // Update with your local image path
              style={styles.bankLogo1}
            />
            <Text style={styles.bankDetail}>Bank Name: NSB</Text>
            <Text style={styles.bankDetail}>Bank Email: nsb@gmail.com</Text>
            <Text style={styles.bankDetail}>Hot-line No: +94 11 257 3008</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.nsb.lk/lending-rates/')}>
              <Text style={styles.linkText}>Loan Rates : See Rates</Text>
            </TouchableOpacity>

            {/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.nsb.lk/')}>
              <Text style={styles.linkText}>Bank Site : Click to NSB Bank</Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEmailPress('nsb@gmail.com')}>
                <Image source={require('../../assets/images/gmail.png')} style={styles.realisticIcon1} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePhonePress('+94 11 257 3008')}>
                <Image source={require('../../assets/images/whatsapp.png')} style={styles.realisticIcon} />
              </TouchableOpacity>
            </View>
          </View>

          
          {/* Bank Card 3 */}
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/sampath.png')} // Update with your local image path
              style={styles.bankLogo}
            />
            <Text style={styles.bankDetail}>Bank Name: Sampath Bank</Text>
            <Text style={styles.bankDetail}>Bank Email: info@sampath.lk</Text>
            <Text style={styles.bankDetail}>Hot-line No: +94 11 230 3050</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.sampath.lk/corporate-banking/corporate-products/business-loans-and-other/Business-Loans-and-Other?category=corporate_banking')}>
              <Text style={styles.linkText}>Loan Rates : See Rates</Text>
            </TouchableOpacity>

            {/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.sampath.lk/')}>
              <Text style={styles.linkText}>Bank Site : Click to Sampath Bank</Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEmailPress('samapth@.lk')}>
                <Image source={require('../../assets/images/gmail.png')} style={styles.realisticIcon1} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePhonePress('+94 11 230 3050')}>
                <Image source={require('../../assets//images/whatsapp.png')} style={styles.realisticIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bank Card 2 */}
<View style={styles.card}>
            <Image
              source={require('../../assets/images/HSBC.png')} // Update with your local image path
              style={styles.bankLogo}
            />
            <Text style={styles.bankDetail}>Bank Name: HSBC Limited</Text>
            <Text style={styles.bankDetail}>Bank Email: hsbc@hsbc.com.</Text>
            <Text style={styles.bankDetail}>Hot-line No: +94 11 447 2200</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.business.hsbc.uk/en-gb/interest-rates')}>
              <Text style={styles.linkText}>Loan Rates : See Rates</Text>
            </TouchableOpacity>

            {/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.hsbc.lk/')}>
              <Text style={styles.linkText}>Bank Site : Click to HSBC</Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEmailPress('customerrelations@hsbc.com')}>
                <Image source={require('../../assets/images/gmail.png')} style={styles.realisticIcon1} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePhonePress('+94 11 447 2200')}>
                <Image source={require('../../assets//images/whatsapp.png')} style={styles.realisticIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bank Card 3 */}
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/boc.png')} // Update with your local image path
              style={styles.bankLogo}
            />
            <Text style={styles.bankDetail}>Bank Name:(Bank Of Ceylon)</Text>
            <Text style={styles.bankDetail}>Bank Email: boc@boc.lk</Text>
            <Text style={styles.bankDetail}>Hot-line No: +94 11 220 4444</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.boc.lk/personal-banking/loans')}>
              <Text style={styles.linkText}>Loan Rates : See Rates</Text>
            </TouchableOpacity>

            {/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.boc.lk/')}>
              <Text style={styles.linkText}>Bank Site : Click to BOC Bank</Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEmailPress('boc@boc.lk')}>
                <Image source={require('../../assets/images/gmail.png')} style={styles.realisticIcon1} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePhonePress('+94 11 220 4444')}>
                <Image source={require('../../assets//images/whatsapp.png')} style={styles.realisticIcon} />
              </TouchableOpacity>
            </View>
          </View>


          {/* Bank Card 2 */}
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/hnb.png')} // Update with your local image path
              style={styles.bankLogo}
            />
            <Text style={styles.bankDetail}>Bank Name: HNB Bank</Text>
          <Text style={styles.bankDetail}>Bank Email:  hnb.com.ph.</Text>
          <Text style={styles.bankDetail}>Hot-line No: +94 112 462 462</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.hnb.net/fixed-deposits-interest-rates')}>
            <Text style={styles.linkText}>Loan Rates :  See Rates</Text>
          </TouchableOpacity>

            {/* Website Link as clickable */}
{/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.hnb.lk/')}>
            <Text style={styles.linkText}>Bank Site :  Click to HNB Bank</Text>
          </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEmailPress('fosril@sltnet.lk')}>
                <Image source={require('../../assets/images/gmail.png')} style={styles.realisticIcon1} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePhonePress('+94 112 462 462')}>
                <Image source={require('../../assets//images/whatsapp.png')} style={styles.realisticIcon} />
              </TouchableOpacity>
            </View>
          </View>

          
          
        </ScrollView>
               
                <Animated.View style={[styles.descriptionContainer, { opacity: fadeAnim }]}>
          <Text style={styles.descriptionText1}>
            "පහසු බැංකු අශ්‍රිත දැනුම ලබා ගැනීමට වෙබ් පිටුවලට පහසුවෙන් ලගා වීමට සම්බන්ධ වීමට පහසුකම් සපයා ඇත."
          </Text>
          <Text style={styles.descriptionText1}>
          "Boost your profits by staying informed with up-to-date exchange rates and banking support."
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff', // Ensure the entire scroll view has a consistent background
  },
  container: {
    paddingHorizontal: 20,
  },
  descriptionContainer: {
    marginBottom: 25,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 23,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#004C00',
    marginBottom:40,
    marginTop:40,
    textAlign: 'center',
    marginVertical: 10,
  },
  descriptionText1: {
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#004C00',
    textAlign: 'center',
    marginVertical: 10,
  },
  menuOverlay: {
    position: 'absolute',  // Ensure it is positioned on top
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,  // High z-index to ensure it's on top of other elements
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  horizontalScroll: {
    marginTop: 20, // Adding some margin for better layout
  },


  exchangeRateContainer: {
    marginBottom: 20,
    marginTop:20,
    paddingBottom:12,
    paddingTop:12,
    alignItems: 'center',
    backgroundColor:'#E5E4E2',
    borderRadius:10,
    justifyContent: 'center',
  },
  exchangeRateTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  exchangeRateValue: {
    fontSize: 24,
    color: '#007BFF',
  },
 chartContainer: {
    marginBottom: 20,
    marginTop:10,
    marginLeft:10,
    marginRight:20,
  },
  chartTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },

  topicTitle: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#E5E4E2',
    padding: 20,
    borderRadius: 20,
    marginRight: 20, // Add margin between cards
    borderWidth: 2,
    marginBottom:20,
    borderColor: '#000',
    alignItems: 'center',
    width: 280, // Define a width to limit card size for horizontal scrolling
  },
  bankLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop: -30,
  },
  bankLogo1: {
    width: 180,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop: -3,
  },
  bankDetail: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF', // Blue color for link text
    marginBottom: 10,
    marginTop:10,
    textDecorationLine: 'underline',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 130,
  },
  realisticIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  realisticIcon1: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
});
export default Banking;
