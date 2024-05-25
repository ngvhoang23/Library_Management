import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, SwitchComponent, Text, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function";
import axios from "axios";
import AppIntroSlider from "react-native-app-intro-slider";
import FlatButton from "../../shared/FlatButton";
import { ScrollView } from "react-native-gesture-handler";

function BookDetailScreen({ route, navigation }) {
  const { book_detail_id } = route.params;

  const [bookInfo, setBookInfo] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { book_detail_id },
          };
          axios
            .get(`http://10.0.2.2:5000/books/book-groups/${book_detail_id}`, config)
            .then((result) => {
              setBookInfo(result.data[0]);
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

  const renderInfoItem = ({ item }) => {
    if (item.key == 1) {
      return (
        <View style={styles.sliderItem}>
          <Text style={styles.sliderTitle}>{"Mô tả"}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sliderContent}>{description}</Text>
          </ScrollView>
        </View>
      );
    } else if (item.key == 2) {
      return (
        <View style={styles.sliderItem2}>
          <View style={styles.sliderItem2Container}>
            <Image source={require("../../assets/images/author_icon.png")} style={styles.sliderItemIcon} />
            <View>
              <Text style={styles.sliderTitle2}>{"Tác giả"}</Text>
              <Text style={styles.sliderContent2}>{author_name}</Text>
            </View>
          </View>

          <View style={styles.sliderItem2Container}>
            <Image source={require("../../assets/images/category_icon.png")} style={styles.sliderItemIcon} />
            <View>
              <Text style={styles.sliderTitle2}>{"Danh mục"}</Text>
              <Text style={styles.sliderContent2}>{category_name}</Text>
            </View>
          </View>

          <View style={styles.sliderItem2Container}>
            <Image source={require("../../assets/images/company_icon.png")} style={styles.sliderItemIcon} />
            <View>
              <Text style={styles.sliderTitle2}>{"Nhà xuất bản"}</Text>
              <Text style={styles.sliderContent2}>{publish_com}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  const {
    book_name,
    cover_photo,
    author_name,
    total_book,
    _reads,
    available,
    description,
    category_name,
    publish_com,
    published_date,
  } = bookInfo;

  const data = [
    {
      key: 1,
    },
    {
      key: 2,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={require("../../assets/images/page_bg.jpg")} style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.bookName} numberOfLines={3}>
            {book_name}
          </Text>
          <Text style={styles.authorName}>by {author_name}</Text>
        </View>
        <Image source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} style={styles.coverPhoto} />
      </ImageBackground>

      <View style={styles.container}>
        <AppIntroSlider
          activeDotStyle={{ backgroundColor: "#5b4cfd" }}
          style={styles.slider}
          renderItem={renderInfoItem}
          data={data}
        />
      </View>

      <View style={styles.subInfoContainer}>
        <View style={styles.subInfo}>
          <Text style={styles.title}>{total_book}</Text>
          <Text style={styles.subTitle}>{total_book} total</Text>
        </View>

        <View style={styles.subInfo}>
          <Text style={styles.title}>{_reads}</Text>
          <Text style={styles.subTitle}>{_reads} read</Text>
        </View>

        <View style={[styles.subInfo, { borderColor: "transparent" }]}>
          <Text style={[styles.title, { color: available > 0 ? "#6ec531" : "#f03958" }]}>{available}</Text>
          <Text style={[styles.subTitle, { color: available > 0 ? "#6ec531" : "#f03958" }]}>{available} remaining</Text>
        </View>
      </View>

      <FlatButton
        _styles={styles.seeAvailableBooks}
        text="Sách có sẵn"
        fontSize={normalize(12)}
        onPress={() => {
          navigation.navigate("Available Books", { book_detail_id, book_name: book_name, cover_photo: cover_photo });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    flex: 1,
  },

  header: {
    height: SCREEN_HEIGHT / 3,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    position: "relative",
    marginBottom: normalize(20),
  },

  headerTitle: {
    marginBottom: normalize(10),
    width: normalize(130),
    paddingLeft: normalize(20),
  },

  bookName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(16),
    color: "#12152d",
    marginBottom: normalize(6),
  },

  authorName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(10),
    color: "#6c60ff",
  },

  coverPhoto: {
    height: normalize(160),
    width: normalize(110),
    position: "absolute",
    right: normalize(20),
    top: normalize(40),
  },

  subInfoContainer: {
    width: "100%",
    height: normalize(40),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize(6),
  },

  subInfo: {
    width: "30%",
    borderRightWidth: 1,
    borderColor: "#ced0d4",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: normalize(16),
  },

  title: {
    fontFamily: "nunito-bold",
    fontSize: normalize(14),
    color: "#292929",
  },
  subTitle: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    color: "#8c8c8d",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  slider: {
    width: SCREEN_WIDTH,
  },

  seeAvailableBooks: {
    width: "80%",
    backgroundColor: "#6c60ff",
    marginVertical: normalize(20),
    paddingVertical: normalize(8),
    borderRadius: normalize(1000),
  },

  sliderItem: {
    flexDirection: "column",
    paddingHorizontal: normalize(20),
  },
  sliderItem2: {
    flexDirection: "column",
    paddingHorizontal: normalize(20),
    marginTop: normalize(10),
  },
  sliderTitle: {
    fontFamily: "nunito-bold",
    fontSize: normalize(14),
    color: "#292929",
    marginBottom: normalize(10),
  },
  sliderContent: {
    fontFamily: "nunito-medium",
    fontSize: normalize(12),
    color: "#8c8c8d",
  },
  sliderItem2Container: {
    marginBottom: normalize(20),
    marginLeft: normalize(10),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sliderTitle2: { fontFamily: "nunito-bold", fontSize: normalize(12), color: "#292929", marginBottom: normalize(2) },
  sliderContent2: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    color: "#8c8c8d",
  },

  sliderItemIcon: {
    width: normalize(30),
    height: normalize(30),
    marginRight: normalize(20),
  },
});

export default BookDetailScreen;
