import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   SectionList,
   StatusBar,
   Button,
   TouchableOpacity,
} from 'react-native';

interface Section {
   title: string;
   data: string[];
}

const DATA = [
   {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
   },
   {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
   },
   {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
   },
   {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
   },
];

const App = () => {
   const [selectedItems, setSelectedItems] = useState<string[]>([]);
   const [data, setData] = useState<Section[]>(DATA);
   const [showCheckboxes, setShowCheckboxes] = useState(false);


   //change state of item in sectionlist
   const toggleItemSelection = (item: string): void => {
      const selectedIndex = selectedItems.indexOf(item);
      if (selectedIndex > -1) {
         const updatedSelection = selectedItems.filter((selectedItem) => selectedItem !== item);
         setSelectedItems(updatedSelection);
      } else {
         setSelectedItems([...selectedItems, item]);
      }
   };

   const deleteSelectedItems = (): void => {
      const updatedData = data.map((section) => ({
         ...section,
         data: section.data.filter((item) => !selectedItems.includes(item)),
      }));
      setData(updatedData);
      setSelectedItems([]);
      setShowCheckboxes(false);
   };

   const renderCheckbox = (item: string): JSX.Element | null => {
      if (!showCheckboxes) {
         return null;
      }

      const isSelected = selectedItems.includes(item);
      return (
         <TouchableOpacity onPress={() => toggleItemSelection(item)} style={styles.checkboxContainer}>
            {isSelected && <View style={styles.checkboxChecked} />}
            {!isSelected && <View style={styles.checkboxUnchecked} />}
         </TouchableOpacity>
      );
   };

   return (
      <SafeAreaView style={styles.container}>
         {!showCheckboxes && (
            <Button title="Delete" onPress={() => setShowCheckboxes(true)} />
         )}
         {showCheckboxes && (
            <>
               {/* <Button title="Cancel" onPress={() => setShowCheckboxes(false)} /> */}
               <Button title="Delete" onPress={deleteSelectedItems} />
            </>
         )}
         <SectionList
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
               <View style={styles.item}>
                  {renderCheckbox(item)}
                  <Text style={styles.title}>{item}</Text>
               </View>
            )}
            renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
   },
   item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
   },
   header: {
      fontSize: 32,
      backgroundColor: '#fff',
   },
   title: {
      fontSize: 24,
   },
   checkboxContainer: {
      width: 24,
      height: 24,
      marginRight: 10,
      borderWidth: 2,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
   },
   checkboxChecked: {
      width: 12,
      height: 12,
      backgroundColor: '#000',
   },
   checkboxUnchecked: {
      width: 12,
      height: 12,
      backgroundColor: '#fff',
   },
});

export default App;