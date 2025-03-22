import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Import hình ảnh từ thư mục assets
import successIllustration from '../assets/images/success_illustration.png';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.illustration}>
        <Image
          source={successIllustration} // Sử dụng hình ảnh đã import
          style={styles.image}
        />
      </View>

      {/* Success Message */}
      <Text style={styles.title}>Payment Success, YAYY!</Text>
      <Text style={styles.subtitle}>
        We will send order details and invoice in your contact no. and registered email
      </Text>

      {/* Check Details Button */}
      <TouchableOpacity style={styles.checkButton}>
        <Text style={styles.checkButtonText}>Check Details</Text>
      </TouchableOpacity>

      {/* Download Invoice Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  illustration: {
    marginVertical: 40,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkButtonText: {
    fontSize: 18,
    color: '#1E88E5',
    fontWeight: 'bold',
    marginRight: 5,
  },
  downloadButton: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  downloadButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SuccessScreen;