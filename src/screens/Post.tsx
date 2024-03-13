import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';


//intergface
interface PropsPost {
   // userId: number,
   Id: number,
   title: string,
   body: string
}
const App = () => {
   const [posts, setPosts] = useState<PropsPost[]>([]);
   const [originalPosts, setOriginalPosts] = useState([]);
   const [searchKey, setSearchKey] = useState<string>('');

   //loading start
   const [isLoading, setIsLoading] = useState(true);

   //state set background
   const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
   //reloading
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [visiblePosts, setVisiblePosts] = useState<PropsPost[]>([]);

   //load more
   const [loadingMore, setLoadingMore] = useState(false);
   //page
   const [startIndex, setStartIndex] = useState(0);
   const itemsPerPage = 5;
   //navi
   const navigation = useNavigation();




   //renderItem post
   const _itemPost = ({ item, index }: { item: PropsPost, index: number }) => {

      const handleBookmark = (postId: number) => {
         console.log("Bookmark clicked for item with ID:", postId);
         // Implement your bookmark logic here
      };
      return (
         <TouchableOpacity
            style={[styles.containerPost,
            selectedItemIndex === index ? { backgroundColor: 'green' } : null]}
            onPress={() => {
               setSelectedItemIndex(index); // Lưu ID của item được chọn
               console.log(selectedItemIndex);

            }}>
            <Text style={styles.txtTtile}> Title: {item.title}</Text>
            <Text style={styles.txtTtile}> Body: {item.body}</Text>
            <Pressable
               onPress={() => handleBookmark(item.Id)}
            >
               <Text style={[styles.txtTtile, { textAlign: 'center' }]}> Bookmark </Text>
            </Pressable>
         </TouchableOpacity>
      )
   }
   //call api
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setOriginalPosts(data);
            setSearchKey(data)
            setPosts(data);
            setIsLoading(false);
         } catch (error) {
            console.error('Error fetching posts:', error);
         }
      };
      fetchPosts();
   }, []);

   //search
   const handleSearch = (query: string) => {
      setSearchKey(query);
      const filteredData = originalPosts.filter((post: PropsPost) => {
         return (
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.body.toLowerCase().includes(query.toLowerCase())
         );
      });
      setPosts(filteredData);
      console.log("resul: ", filteredData);
   };
   //fillter
   const handleSortAZ = () => {
      const sortedPosts = [...posts].sort((a, b) => a.title.localeCompare(b.title));
      setPosts(sortedPosts);
   };

   //refresh
   const handleRefresh = () => {
      setIsRefreshing(true);
      setTimeout(() => {
         setIsRefreshing(false);
         setPosts(originalPosts);
      }, 1000); // Thời gian mô phỏng việc tải dữ liệu mới
   };

   //load more
   const loadMoreItems = () => {
      setLoadingMore(true);
      setTimeout(() => {
         const newStartIndex = startIndex + itemsPerPage;
         const newVisiblePosts = [...visiblePosts, ...posts.slice(newStartIndex, newStartIndex + itemsPerPage)];
         setVisiblePosts(newVisiblePosts);
         setStartIndex(newStartIndex);
         setLoadingMore(false);
      }, 1000); // Thời gian mô phỏng việc tải thêm dữ liệu
   };
   useEffect(() => {
      const initialVisiblePosts = posts.slice(0, itemsPerPage);
      setVisiblePosts(initialVisiblePosts);
   }, [posts]);



   const handleBookmark = () => {
      navigation.navigate("Bookmark" as never)
   };
   return (
      <View style={styles.container}>
         {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
         ) : (
            <>
               <Text style={styles.txtPost}>Post List</Text>
               <Pressable onPress={handleBookmark}>
                  <Text style={styles.txtPost}>Bookmark</Text>

               </Pressable>

               <View style={styles.inputContainer}>
                  <Image
                     style={styles.iconSeach}
                     source={require('../../assests/images/search.png')} />

                  <TextInput
                     onChangeText={text => handleSearch(text)}
                     style={styles.textInput}
                     value={searchKey}
                     placeholder='Enter your infomation' />
               </View>

               <Pressable style={styles.btnFilter}
                  onPress={handleSortAZ}>
                  <Text style={styles.txtFilter}>Fillter: A-Z</Text>
               </Pressable>

               <FlatList
                  data={visiblePosts}
                  renderItem={_itemPost}
                  showsVerticalScrollIndicator={false}
                  onEndReached={loadMoreItems}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                  onRefresh={handleRefresh}
                  refreshing={isRefreshing}

               />
            </>
         )}
      </View>
   )
}

export default App

const styles = StyleSheet.create({
   txtFilter: {
      fontSize: 14,
      color: 'black',
      textAlign: 'center'
   },
   btnFilter: {
      width: 100,
      height: 32,
      backgroundColor: '#50C4ED',
      borderRadius: 10,
      marginBottom: 16,
      justifyContent: 'center'
   },
   iconSeach: {
      marginLeft: 24
   },
   textInput: {
      marginLeft: 12
   },
   inputContainer: {
      marginTop: 24,
      width: '100%',
      height: 48,
      marginBottom: 24,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: 'gray',
      flexDirection: 'row',
      alignItems: 'center'
   },
   txtTtile: {
      fontSize: 16,
      color: 'black',
      padding: 8
   },
   txtUserId: {
      fontSize: 14,
      color: 'black',
      marginBottom: 6
   },
   txtPost: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 16,
   },
   containerPost: {
      marginBottom: 16,
      width: '100%',
      height: 220,
      borderRadius: 32,
      backgroundColor: 'white',
      paddingHorizontal: 12
   },
   container: {
      flex: 1,
      marginHorizontal: 16,
      backgroundColor: 'f1f1f1'
   },
})