import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { _retrieveData, normalize } from "../../defined_function";
import FlatButton from "../../shared/FlatButton";
import SearchBox from "../../components/SearchBox";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useUserInfoContext } from "../../context/userInfoContext";
import BookGroupVertical from "../../components/BookGroupVertical";
import { ScrollView } from "react-native-gesture-handler";
import AppIntroSlider from "react-native-app-intro-slider";
import BookBorrowedVertical from "../../components/BookBorrowedVertical";

function HomeScreen({ navigation }) {
  const { user, setUser } = useUserInfoContext();

  const [books, setBooks] = useState([]);
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [popularBooks, setPopularBooks] = useState([]);
  const [borrowingBooks, setBorrowingBooks] = useState([]);

  const navigate = useNavigation();

  useEffect(() => {
    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { reader_type: user?.reader_type },
          };
          axios
            .get(`http://10.0.2.2:5000/books/book-groups-by-reader`, config)
            .then((result) => {
              setBooks([...result.data]);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
          };
          axios
            .get(`http://10.0.2.2:5000/books/categories`, config)
            .then((result) => {
              const categories = result.data.map((category) => {
                return { ...category, key: category.category_id };
              });
              setCategories(categories);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
          };
          axios
            .get(`http://10.0.2.2:5000/borrowed-books/popular-books`, config)
            .then((result) => {
              setPopularBooks(result.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  useEffect(() => {
    setSearchValue("");

    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { borrower_id: user?.user_id },
          };
          axios
            .get(`http://10.0.2.2:5000/borrowed-books/borrowing-books/${user.user_id}`, config)
            .then((result) => {
              console.log(result.data);
              setBorrowingBooks(result.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      setSearchValue("");
    }
  }, [isFocused]);

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() =>
          navigation.navigate("Book By Category", { category_id: item.category_id, category_name: item.category_name })
        }
      >
        <Image source={{ uri: `http://10.0.2.2:5000${item?.background}` }} style={styles.categoryBg}></Image>
        <Text style={styles.categoryTitle}>{item?.category_name}</Text>
      </TouchableOpacity>
    );
  };

  const onSearch = () => {
    navigation.navigate("Book Search Result", {
      search_value: searchValue,
      placeholder: "Search for Books...",
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/page_bg1.jpg")}
      style={{ flex: 1, backgroundColor: "red", marginTop: normalize(-50) }}
    >
      <ScrollView style={{}}>
        <View source={require("../../assets/images/page_bg1.jpg")} style={styles.wrapper}>
          <View style={styles.introContainer}>
            <View style={styles.intoText}>
              <Text style={styles.welcom}>Good Afternoon,</Text>
              <Text style={styles.userName}>Viet Hoang</Text>
            </View>
            <View style={styles.intoImgContainer}>
              <Image source={require("../../assets/images/reading_img.png")} style={styles.introImg} />
            </View>
          </View>
          <SearchBox _styles={styles.searchBox} value={searchValue} setValue={setSearchValue} onSearch={onSearch} />

          <View style={[styles.popularBooksContainer]}>
            <View style={styles.contentHeader}>
              <Text style={styles.headerTitle}>Sách được mượn nhiều nhất</Text>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{}}
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
              horizontal={true}
            >
              <View style={styles.content}>
                {popularBooks.map((book) => {
                  return (
                    <BookGroupVertical
                      key={book.book_detail_id}
                      _styles={styles.popularBookItem}
                      cover_photo={book.cover_photo}
                      author_name={book.author_name}
                      book_name={book.book_name}
                      onPress={() =>
                        navigation.navigate("Book Detail", {
                          book_detail_id: book.book_detail_id,
                        })
                      }
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={[styles.categoriesContainer]}>
            <View style={styles.contentHeader}>
              <Text style={styles.headerTitle}>Danh mục</Text>
            </View>

            <AppIntroSlider
              showNextButton={false}
              showDoneButton={false}
              activeDotStyle={{ backgroundColor: "#fff" }}
              style={styles.slider}
              renderItem={renderCategoryItem}
              data={categories}
            />
          </View>

          <View style={[styles.borrowingBooksContainer]}>
            <View style={styles.contentHeader}>
              <Text style={styles.headerTitle}>Sách đang mượn</Text>
              <FlatButton
                _styles={styles.viewAllBtn}
                text={"View all"}
                textColor={"#5b4cfd"}
                fontSize={normalize(12)}
                onPress={() => navigation.navigate("Book Borrowing")}
              >
                <Entypo name="chevron-small-right" size={normalize(20)} color="#5b4cfd" />
              </FlatButton>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{}}
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
              horizontal={true}
            >
              <View style={styles.content}>
                {borrowingBooks.map((book) => {
                  return (
                    <BookBorrowedVertical
                      key={book.borrow_id}
                      _styles={styles.popularBookItem}
                      cover_photo={book.cover_photo}
                      author_name={book.author_name}
                      book_name={book.book_name}
                      return_date={book.return_date}
                      onPress={() =>
                        navigation.navigate("Borrowed Book Detail", {
                          borrow_id: book.borrow_id,
                        })
                      }
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  introContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(26),
  },

  intoText: {
    elevation: 2,
    shadowColor: "#52006A",
  },
  welcom: {
    fontFamily: "nunito-bold",
    fontSize: normalize(20),
    color: "#5b4cfd",
  },
  userName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    color: "#3c3c3c",
  },
  intoImgContainer: {
    paddingTop: normalize(30),
  },
  introImg: {
    height: normalize(120),
    aspectRatio: 4 / 5.2,
    backgroundColor: "transparent",
  },

  searchBox: {
    marginBottom: normalize(10),
  },

  popularBooksContainer: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(16),
    flex: 1,
  },

  categoriesContainer: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(16),
    flex: 1,
  },

  borrowingBooksContainer: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(16),
    flex: 1,
  },

  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: normalize(6),
    marginBottom: normalize(10),
  },

  headerTitle: {
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    color: "#333",
  },

  viewAllBtn: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },

  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  popularBookItem: {
    paddingHorizontal: normalize(10),
  },
  categoryItem: {
    flex: 1,
    height: normalize(130),
    borderRadius: normalize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginHorizontal: normalize(8),
  },

  categoryBg: {
    height: normalize(130),
    width: "100%",
    borderRadius: normalize(10),
    position: "absolute",
    opacity: 0.5,
  },

  categoryTitle: {
    fontFamily: "nunito-bold",
    fontSize: normalize(24),
    color: "#5b4cfd",
    opacity: 1,
  },
});

export default HomeScreen;
