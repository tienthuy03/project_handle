import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
//intergface
interface PropsPost {
   // userId: number,
   // Id: number,
   title: string,
   body: string
}


const Home = () => {

   const [posts, setPosts] = useState<PropsPost[]>([]);
   const navigation = useNavigation();

   //navigation
   const handleViewMore = () => {
      navigation.navigate("Post" as never)
   };
   //renderItem post
   const _itemPost = ({ item }: { item: PropsPost }) => {
      return (
         <View style={styles.containerPost}>
            <Text style={styles.txtTtile}> Title: {item.title}</Text>
            <Text style={styles.txtTtile}> Body: {item.body}</Text>
         </View>
      )
   }
   //call api
   // useEffect(() => {
   //    const fetchPosts = async () => {
   //       try {
   //          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
   //          const data = await response.json();
   //          setPosts(data);
   //       } catch (error) {
   //          console.error('Error fetching posts:', error);
   //       }
   //    };

   //    fetchPosts();
   // }, []);
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            // Lấy chỉ 3 bài viết đầu tiên
            const firstThreePosts = data.slice(0, 3);
            setPosts(firstThreePosts);
         } catch (error) {
            console.error('Error fetching posts:', error);
         }
      };
      fetchPosts();
   }, []);
   return (
      <View style={styles.container}>
         <Text style={styles.txtHome}>Home</Text>
         <FlatList
            data={posts}
            renderItem={_itemPost}
            showsVerticalScrollIndicator={false}
         />
         <Pressable style={styles.btnView}
            onPress={handleViewMore}>
            <Text style={styles.txtView}>View More</Text>
         </Pressable>
      </View>
   )
}

export default Home

const styles = StyleSheet.create({
   txtView: {
      fontSize: 16,
      color: 'black'
   },
   btnView: {
      width: 120,
      height: 48,
      borderRadius: 16,
      backgroundColor: '#50C4ED',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 120,
      marginTop: 16,
      marginBottom: 16
   },
   txtHome: {
      fontSize: 20,
      color: 'black',
      margin: 24,
      textAlign: 'center',
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
      height: 200,
      borderRadius: 32,
      backgroundColor: 'white',
      paddingHorizontal: 12
   },
   container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      paddingHorizontal: 16
   }
})