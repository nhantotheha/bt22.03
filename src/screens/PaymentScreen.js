import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Giả sử bạn đã thêm các biểu tượng vào thư mục assets
import mastercardIcon from '../assets/images/mastercard_icon.png';
import questionIcon from '../assets/images/question_icon.png';

const PaymentScreen = () => {
  const navigation = useNavigation();

  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Định dạng số thẻ (thêm dấu cách sau mỗi 4 chữ số)
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned
      .replace(/(\d{4})/g, '$1 ')
      .trim();
    setCardNumber(formatted);
  };

  // Định dạng ngày hết hạn (MM/YYYY)
  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) {
      setExpiryDate(cleaned);
    } else {
      const month = cleaned.slice(0, 2);
      const year = cleaned.slice(2, 6);
      setExpiryDate(`${month}/${year}`);
    }
  };

  const handlePayment = () => {
    if (cardNumber && cardholderName && expiryDate && cvv) {
      navigation.navigate('Success');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 50}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Phần top */}
        <View style={styles.topContainer}>
          {/* Nút Back */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.checkoutText}>Checkout 💳</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>₹ 1,527</Text>
              <Text style={styles.gst}>Including GST (18%)</Text>
            </View>
          </View>

          {/* Payment Method Tabs */}
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={styles.tabText}>Credit card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Apple Pay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <Text style={styles.label}>Card number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter card number"
              placeholderTextColor="#888888"
              value={cardNumber}
              onChangeText={formatCardNumber}
              keyboardType="numeric"
              maxLength={19}
            />
            <Image source={mastercardIcon} style={styles.icon} />
          </View>

          <Text style={styles.label}>Cardholder name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter cardholder name"
              placeholderTextColor="#888888"
              value={cardholderName}
              onChangeText={setCardholderName}
              keyboardType="default"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Expiry date</Text>
              <View style={styles.inputContainerSmall}>
                <TextInput
                  style={styles.input}
                  placeholder="MM / YYYY"
                  placeholderTextColor="#888888"
                  value={expiryDate}
                  onChangeText={formatExpiryDate}
                  keyboardType="numeric"
                  maxLength={7}
                />
              </View>
            </View>
            <View style={styles.halfInput}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>CVV / CVC</Text>
                <TouchableOpacity>
                  <Image source={questionIcon} style={styles.questionIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainerSmall}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter CVV"
                  placeholderTextColor="#888888"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Footer Note */}
        <Text style={styles.footerNote}>
          We will send you an order details to your email after the successful payment
        </Text>

        {/* Pay Button */}
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay for the order</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Background màu trắng cho toàn bộ màn hình
  },
  scrollContainer: {
    paddingBottom: 40,
    backgroundColor: '#FFFFFF', // Đảm bảo ScrollView cũng có background trắng
  },
  topContainer: {
    width: '100%',
    height: 230,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#FFFFFF', // Background trắng cho topContainer
    shadowColor: '#01763F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 27,
    elevation: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 57,
    left: 20,
    width: 45,
    height: 44,
    borderRadius: 9,
    backgroundColor: '#F8F8FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#00C853',
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  checkoutText: {
    width: 130,
    height: 32,
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 22,
    letterSpacing: 0.03 * 22,
    color: '#000',
    alignSelf: 'flex-start',
  },
  amountContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00C853',
  },
  gst: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5,
  },
  paymentMethods: {
    width: 331,
    height: 69,
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 14,
  },
  tab: {
    width: 170,
    height: 69,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#00C853',
  },
  tabText: {
    fontSize: 16,
    color: '#000000',
  },
  cardDetails: {
    width: 335,
    marginTop: 59, // Điều chỉnh để top: 344px (344px - 285px)
    marginLeft: 20, // left: 20px
    backgroundColor: '#FFFFFF', // Đảm bảo cardDetails có background trắng
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  inputContainer: {
    width: 335,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F8FB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10, // Giảm khoảng cách giữa các input
  },
  inputContainerSmall: {
    width: 156, // Width cho Expiry date và CVV
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F8FB', // Background #F8F8FB
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10, // Giảm khoảng cách giữa các input
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    width: 30,
    height: 20,
    marginLeft: 10,
  },
  questionIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0, // Giảm marginTop để sát với các trường phía trên
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  footerNote: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF', // Đảm bảo footerNote có background trắng
  },
  payButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    height: 50,
  },
  payButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;