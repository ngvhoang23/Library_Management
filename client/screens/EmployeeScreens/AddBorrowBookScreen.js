import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Keyboard, TouchableOpacity, unstable_batchedUpdates } from "react-native";
import { Formik } from "formik";
import FlatButton from "../../shared/FlatButton.js";
import * as yup from "yup";
import InputItem from "../../components/InputItem.js";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import MyDateTimePicker from "../../components/MyDateTimePicker.js";
import LoadingModal from "../../components/LoadingModal.js";
import AlertModal from "../../components/AlertModal.js";
import { _retrieveData, addDays, normalize } from "../../defined_function/index.js";
import { useIsFocused } from "@react-navigation/native";
import BriefBookInfoPreview from "../../components/BriefBookInfoPreview.js";
import BriefUserInfoPreview from "../../components/BriefUserInfoPreview.js";
import PickerBtn from "../../components/PickerBtn.js";
import PreviewInfoItem from "../../components/PreviewInfoItem.js";
import { Fontisto } from "@expo/vector-icons";
import PickerModal from "../../components/PickerModal.js";

const formSchema = yup.object({});

function AddBorrowBookScreen({ route, navigation }) {
  const { reader_info, book_info } = route.params;
  const { user_id: reader_id, reader_type, full_name, phone_num, user_avatar } = reader_info;
  const { book_id } = book_info;

  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState({ isSuccess: false, visible: false });
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(book_info);
  const [selectedReader, setSelectedReader] = useState(reader_info);
  const [selectedId, setSelectedId] = useState();
  const [searchResult, setSearchResult] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _retrieveData("USER_INFO")
        .then((user_info) => {
          setUserInfo(JSON.parse(user_info));
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
            .get(`http://10.0.2.2:5000/books/book-groups`, config)
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
    if (selectedId) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            params: {
              book_detail_id: selectedId,
            },
            headers: { Authorization: `Bearer ${access_token}` },
          };
          axios
            .get(`http://10.0.2.2:5000/books/book-groups/${selectedId}`, config)
            .then((result) => {
              setSelectedBook(result.data[0]);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedId]);

  const handleSubmit = ({ borrow_date, return_date }) => {
    setIsLoading(true);

    const data = {
      emp_id: userInfo?.user_id,
      reader_id: reader_id,
      book_id: book_id,
      borrow_date: borrow_date,
      return_date: return_date,
    };

    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const configurations = {
          method: "POST",
          url: `http://10.0.2.2:5000/borrowed-books/`,
          data: data,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        axios(configurations)
          .then((result) => {
            setResultStatus({ isSuccess: 1, visible: true });
            // navigation.goBack();
          })
          .catch((err) => {
            if (err?.response?.data?.code === "UNAVAILABLE_BOOK") {
              alert("This book is unavailable");
            }
            setResultStatus({ isSuccess: 0, visible: true });
            console.log("err", err);
          })
          .finally((result) => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (search_value) => {
    if (search_value) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            params: {
              search_value,
            },
            headers: { Authorization: `Bearer ${access_token}` },
          };
          axios
            .get(`http://10.0.2.2:5000/books/book-groups/searching/${search_value}`, config)
            .then((result) => {
              const books = result.data;
              setSearchResult(
                books.map((book) => {
                  return {
                    id: book?.book_detail_id,
                    photo: `http://10.0.2.2:5000${book?.cover_photo}`,
                    title: book?.book_name,
                    description: book?.author_name,
                  };
                }),
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.wrapper}>
      <BriefUserInfoPreview
        _styles={styles.userInfoContainer}
        full_name={full_name}
        phone_num={phone_num}
        avatar={`http://10.0.2.2:5000${user_avatar}`}
      />

      {selectedBook ? (
        <BriefBookInfoPreview
          book_name={selectedBook?.book_name}
          author_name={selectedBook?.author_name}
          position={selectedBook?.position}
          cover_photo={`http://10.0.2.2:5000${selectedBook?.cover_photo}`}
          onPress={() => setShowModal(true)}
        />
      ) : (
        <PickerBtn _styles={styles.selectBookBtn} title={"Select Book"} onPress={() => setShowModal(true)} />
      )}

      <Formik
        initialValues={{
          borrow_date: new Date().toISOString().split("T")[0],
          return_date: addDays(new Date(), 7).toISOString().split("T")[0],
        }}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          handleSubmit(values);
        }}
      >
        {(props) => (
          <TouchableOpacity style={styles.formWrapper} activeOpacity={1.0} onPress={Keyboard.dismiss}>
            <ScrollView
              style={styles.formContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <PreviewInfoItem
                _styles={[styles.input]}
                textStyles={{ color: "#676768" }}
                lableTitle="Borrow Date"
                value={props.values.borrow_date}
                icon={<Fontisto name="date" size={normalize(16)} color="#949498" />}
                read_only
              />

              <PreviewInfoItem
                _styles={[styles.input]}
                textStyles={{ color: "#676768" }}
                lableTitle="Return Date"
                value={props.values.return_date}
                icon={<Fontisto name="date" size={normalize(16)} color="#949498" />}
                read_only
              />
            </ScrollView>
            <FlatButton
              _styles={styles.submitBtn}
              onPress={props.handleSubmit}
              text="submit"
              fontSize={normalize(12)}
            />
          </TouchableOpacity>
        )}
      </Formik>
      <PickerModal
        visible={showModal}
        setVisible={setShowModal}
        setValue={setSelectedId}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        onSearch={handleSearch}
        options={books.map((book) => {
          return {
            id: book?.book_detail_id,
            photo: `http://10.0.2.2:5000${book?.cover_photo}`,
            title: book?.book_name,
            description: book?.author_name,
          };
        })}
      />
      <LoadingModal visible={isLoading} />
      <AlertModal
        onClose={() => setResultStatus({ isSuccess: 0, visible: false })}
        isSuccess={resultStatus?.isSuccess}
        visible={resultStatus?.visible ? true : false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  headerTitle: {
    fontFamily: "nunito-medium",
    fontSize: normalize(18),
    width: "100%",
    marginLeft: normalize(40),
  },

  formWrapper: {
    width: "100%",
    marginTop: normalize(20),
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  formContainer: {
    width: "90%",
    height: normalize(640),
    flex: 1,
  },

  input: {
    marginBottom: normalize(20),
    width: "100%",
  },

  submitBtn: {
    width: "90%",
    height: normalize(32),

    marginBottom: normalize(16),
    paddingVertical: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
  },

  positionValidate: {
    marginBottom: normalize(6),
    marginLeft: normalize(6),
    color: "#f02849",
    fontSize: normalize(10),
  },

  position: {
    marginRight: normalize(20),
    width: "20%",
  },

  selectBookBtn: {
    borderRadius: 0,
    height: normalize(100),
  },

  userInfoContainer: {
    marginBottom: normalize(20),
  },
});

export default AddBorrowBookScreen;
