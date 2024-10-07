import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Pressable, Linking, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const Banking = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Banking'); // Active Tab State

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

  // Line chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [6.5, 7.2, 7.8, 8.0, 8.5, 9.0], // Sample interest rates data
        strokeWidth: 2, // Optional: set stroke width
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
      },
    ],
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Tab Container */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'Post' && styles.activeTab]}
            onPress={() => navigation.navigate('Posting')}
          >
            <Text style={[styles.tabText, activeTab === 'Post' && styles.activeTabText]}>Post</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'News' && styles.activeTab]}
            onPress={() => navigation.navigate('News')}
          >
            <Text style={[styles.tabText, activeTab === 'News' && styles.activeTabText]}>News</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Banking' && styles.activeTab]}
            onPress={() => setActiveTab('Banking')}
          >
            <Text style={[styles.tabText, activeTab === 'Banking' && styles.activeTabText]}>Banking</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Fund' && styles.activeTab]}
            onPress={() => navigation.navigate('Fund')}
          >
            <Text style={[styles.tabText, activeTab === 'Fund' && styles.activeTabText]}>Funding</Text>
          </Pressable>
        </View>

        {/* Line Chart above the bank cards */}
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40} // Width from window dimensions
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#e0f8fc',
            backgroundGradientTo: '#e0f8fc',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        {/* Horizontal ScrollView for Bank Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {/* Bank Card 1 */}
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/NSB.png')} // Update with your local image path
              style={styles.bankLogo1}
            />
            <Text style={styles.bankDetail}>Bank Name: National Savings Bank (NSB)</Text>
            <Text style={styles.bankDetail}>Bank Email: nsb@gmail.com</Text>
            <Text style={styles.bankDetail}>Hot-line No: +94 11 257 3008</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.nsb.lk/lending-rates/')}>
              <Text style={styles.linkText}>Loan Rates : See Rates</Text>
            </TouchableOpacity>

            {/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.nsb.lk/')}>
              <Text style={styles.linkText}>Bank Website : Click to NSB Bank</Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleEmailPress('nsb@gmail.com')}>
                <Image source={require('../../assets/images/gmail.png')} style={styles.realisticIcon1} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePhonePress('+94 11 257 3008')}>
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
            <Text style={styles.bankDetail}>Bank Name: HSBC Limited Bank</Text>
            <Text style={styles.bankDetail}>Bank Email: hsbc@hsbc.com.ph</Text>
            <Text style={styles.bankDetail}>Hot-line No: +94 11 447 2200</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.business.hsbc.uk/en-gb/interest-rates')}>
              <Text style={styles.linkText}>Loan Rates : See Rates</Text>
            </TouchableOpacity>

            {/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.hsbc.lk/')}>
              <Text style={styles.linkText}>Bank Website : Click to HSBC Bank</Text>
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
            <Text style={styles.bankDetail}>Bank Name: BOC (Bank Of Ceylon)</Text>
            <Text style={styles.bankDetail}>Bank Email: boc@boc.lk</Text>
            <Text style={styles.bankDetail}>Hot-line No: +94 11 220 4444</Text>

            {/* Website rates as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.boc.lk/personal-banking/loans')}>
              <Text style={styles.linkText}>Loan Rates : See Rates</Text>
            </TouchableOpacity>

            {/* Website Link as clickable */}
            <TouchableOpacity onPress={() => handleLinkPress('https://www.boc.lk/')}>
              <Text style={styles.linkText}>Bank Website : Click to BOC Bank</Text>
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
            <Text style={styles.linkText}>Bank Website :  Click to HNB Bank</Text>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#e0f8fc', // Ensure the entire scroll view has a consistent background
  },
  container: {
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 25,
    marginVertical: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  tabText: {
    fontSize: 18,
    color: '#fff',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  horizontalScroll: {
    marginTop: 20, // Adding some margin for better layout
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginRight: 20, // Add margin between cards
    borderWidth: 2,
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
    marginTop: -30,
  },
  bankDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF', // Blue color for link text
    marginBottom: 10,
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
