import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';

type CatatanItem = {
  id: number;
  nama: string;
  catatan: string;
  tanggal: string;
};

const Catatan = () => {
  const [nama, setNama] = useState('');
  const [catatan, setCatatan] = useState('');
  const [data, setData] = useState<CatatanItem[]>([]);

  const handleSimpan = () => {
    if (nama === '' || catatan === '') {
      Alert.alert('Error', 'Nama dan catatan tidak boleh kosong!');
      return;
    }

    axios.post('', { nama, catatan })
      .then((res) => {
        Alert.alert('Sukses', res.data.message);
        setNama('');
        setCatatan('');
        fetchData(); // ambil ulang data
      })
      .catch(() => {
        Alert.alert('Gagal', 'Gagal menyimpan catatan');
      });
  };

  const fetchData = () => {
    axios.get('192.168.0.22/pbb_rayhan/get.php')
      .then((res) => {
        console.log('ISI DARI GET.PHP:', res.data);
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch(() => {
        Alert.alert('Gagal', 'Gagal mengambil data');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: CatatanItem }) => (
    <View style={styles.item}>
      <Text style={styles.nama}>{item.nama}</Text>
      <Text style={styles.catatan}>{item.catatan}</Text>
      <Text style={styles.tanggal}>{item.tanggal}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CatatanKu</Text>
      <TextInput
        placeholder="Masukkan Nama"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
      />
      <TextInput
        placeholder="Masukkan Catatan"
        value={catatan}
        onChangeText={setCatatan}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <TouchableOpacity onPress={handleSimpan} style={styles.button}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default Catatan;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
  nama: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  catatan: {
    marginVertical: 5,
  },
  tanggal: {
    color: '#888',
    fontSize: 12,
  },
});
