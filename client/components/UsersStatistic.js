import { StyleSheet, Text, View } from "react-native";
import { _retrieveData, normalize } from "../defined_function";
import StatisticProgressItem from "./StatisticProgressItem";
import { useEffect, useState } from "react";
import axios from "axios";

function UsersStatistic() {
  const [readerQuantity, setReaderQuantity] = useState(undefined);
  const [bookStatusData, setBookStatusData] = useState(undefined);

  useEffect(() => {
    _retrieveData("ACCESS_TOKEN").then((access_token) => {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      axios
        .get(`http://10.0.2.2:5000/users/reader-quantity`, config)
        .then((result) => {
          setReaderQuantity(result.data[0].count || 0);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  useEffect(() => {
    _retrieveData("ACCESS_TOKEN").then((access_token) => {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      axios
        .get(`http://10.0.2.2:5000/borrowed-books/statistic/book-status`, config)
        .then((result) => {
          const data = { available: 0, unavailable: 0 };

          result.data.forEach((item) => {
            if (item.status) {
              data.available = item.count;
            } else {
              data.unavailable = item.count;
            }
          });
          console.log(data);
          setBookStatusData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thống kê hệ thống</Text>
      </View>
      <View style={styles.container}>
        {readerQuantity != undefined && (
          <View style={styles.statisticItem}>
            <StatisticProgressItem
              value={readerQuantity}
              maxValue={readerQuantity}
              title={"Độc giả"}
              activeColor={"#6ec531"}
            />
            <View style={styles.statisticTitle}>
              <Text style={styles.statisticText}>{readerQuantity}</Text>
              <Text style={styles.subStatisticText}>Độc giả</Text>
            </View>
          </View>
        )}

        {bookStatusData != undefined && (
          <View style={styles.statisticItem}>
            <StatisticProgressItem
              value={bookStatusData.unavailable}
              maxValue={bookStatusData.available + bookStatusData.unavailable}
              title={"Sách"}
              activeColor={"#5b4cfd"}
            />
            <View style={styles.statisticTitle}>
              <Text style={styles.statisticText}>{bookStatusData.unavailable}</Text>
              <Text style={styles.subStatisticText}>Sách đã cho mượn</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#ced0d4",
    borderRadius: normalize(10),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(14),
  },
  headerTitle: {
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    color: "#3c3c3c",
  },
  container: {},
  statisticItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
  },
  statisticTitle: {
    marginLeft: normalize(16),
  },
  statisticText: {
    fontFamily: "nunito-bold",
    fontSize: normalize(18),
    color: "#3c3c3c",
  },
  subStatisticText: {
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    color: "#8c8c8d",
  },
});

export default UsersStatistic;
