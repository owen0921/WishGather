import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import drawLotsData from "../../assets/drawLotsData.json";
import { OPENAI_API_KEY } from "@env";

const WishGatherChatbot = ({ route }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [currentLot, setCurrentLot] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

// 當用戶手動開始拖動時
const handleScrollBeginDrag = () => {
  setIsUserScrolling(true);
};

// 當用戶結束手動拖動時
const handleScrollEndDrag = () => {
  setIsUserScrolling(false);
};
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    console.log("Full drawLotsData:", JSON.stringify(drawLotsData, null, 2));
    const { lotNumber, lotMessage } = route.params || {};
    console.log("Route params:", { lotNumber, lotMessage });

    if (lotNumber && lotMessage) {
      const matchedLot = drawLotsData.find(
        (lot) => lot.number === `第${lotNumber}籤`
      );
      console.log("Full matched lot:", JSON.stringify(matchedLot, null, 2));

      if (matchedLot) {
        setCurrentLot(matchedLot);
        setMessages([
          { type: "bot", text: "歡迎來到解籤！您抽到的籤是：" },
          { type: "bot", text: `籤號: ${matchedLot.number}` },
          { type: "bot", text: matchedLot.content },
          {
            type: "bot",
            text: "您可以詢問任何問題，我會根據這支籤為您提供綜合解答。",
          },
        ]);
      } else {
        console.error(`未找到匹配的籤: 第${lotNumber}籤`);
        setMessages([
          { type: "bot", text: "抱歉，未找到匹配的籤。請重新抽籤。" },
        ]);
      }
    } else {
      setMessages([{ type: "bot", text: "歡迎來到解籤！請先抽一支籤。" }]);
    }
  }, [route.params]);

  const addMessage = (content, type) => {
    setMessages((prevMessages) => [...prevMessages, { type, text: content }]);
    
    setTimeout(() => {
      if (!isUserScrolling) {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const handleSend = async () => {
    if (userMessage.trim() === "") return;

    addMessage(userMessage, "user");
    setUserMessage("");

    // 檢查當前是否有籤詩
    if (!currentLot) {
      // 若沒有籤詩，直接回應預設訊息
      addMessage("抱歉，您還未抽籤或發生了錯誤。請先抽一支籤。", "bot");
      return;
    }

    console.log("Current lot being used:", JSON.stringify(currentLot, null, 2));

    // 判斷是否包含籤詩相關的詞彙
    const aspects = ["運勢", "事業", "愛情", "健康", "財務"];
    const detectedAspect = aspects.find((aspect) =>
      userMessage.toLowerCase().includes(aspect.toLowerCase())
    );

    // 若訊息與籤詩無關
    if (!detectedAspect) {
      addMessage("您問的問題與籤詩無關，我會嘗試以一般方式解答。", "bot");
      try {
        const generalResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "你是專業的助理，根據用戶問題給出回答。",
              },
              { role: "user", content: userMessage },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          },
          {
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const botMessage =
          generalResponse.data.choices?.[0]?.message?.content ||
          "對不起，我目前無法處理您的請求。";
        addMessage(botMessage, "bot");
      } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        const errorMessage = error.response
          ? `錯誤：服務器響應異常 (狀態碼: ${error.response.status})`
          : "錯誤：無法連接到服務器。";
        addMessage(errorMessage, "bot");
      }
      return;
    }

    // 若訊息與籤詩相關，進行籤詩解釋
    let contextPrompt = `用戶抽到的籤：
    籤號：${currentLot.number}
    內容：${currentLot.content}
    解釋：${currentLot.interpretation}
    關鍵詞：${currentLot.keywords.join(", ")}
    運勢：${currentLot.aspects.fortune}
    事業：${currentLot.aspects.career}
    愛情：${currentLot.aspects.love}
    健康：${currentLot.aspects.health}
    財務：${currentLot.aspects.finance}
    建議：${currentLot.advice}
    
    用戶問題：${userMessage}
    
    回答指南：
    0. 如果問「感情」、「愛情」，請根據籤詩的感情狀況回答
    1. 首先，判斷用戶的問題是否針對特定方面（運勢、事業、感情、健康、財務）。
    2. 如果問題針對特定方面：
       - 主要集中在該方面的解讀和建議。
       - 詳細闡述籤詩中與該方面相關的內容。
       - 提供具體、實用的建議。
       - 簡要提及其他可能相關的方面，但不要深入討論。
    3. 如果問題是廣泛的或不針對特定方面：
       - 提供全面的籤詩解讀，涵蓋所有相關方面。
       - 平衡討論各個方面，確保整體性。
       - 強調籤詩的核心信息和整體意涵。
    4. 無論哪種情況，都要：
       - 保持積極正面的語調。
       - 給出具體、可行的建議。
       - 鼓勵用戶根據籤詩的指引採取行動。
    5.字數不用多 精準即可
    
    ###回應格式化指南：
    contextPrompt += '請注意，籤詩解釋應該考慮到求籤者的具體情況和問題。解釋應該給出積極、有建設性的建議。\n\n';
1. **標題：** 使用 \`###\` 來區分不同的方面（如「愛情」、「事業」、「健康」等）。
2. **關鍵建議：** 以 \`⭐️\` 符號來強調重要建議或籤詩的核心內容。
3. **鼓勵語句：** 使用溫暖正面的語調，如「保持信心」、「展望未來」。
請根據以上指南，格式化回應用戶的問題：`;
    
    
    ;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "你是專業的解籤人員，根據籤詩資訊回答" },
            { role: "user", content: contextPrompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage =
        response.data.choices?.[0]?.message?.content ||
        "對不起，我目前無法處理您的請求。";
      addMessage(botMessage, "bot");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      const errorMessage = error.response
        ? `錯誤：服務器響應異常 (狀態碼: ${error.response.status})`
        : "錯誤：無法連接到服務器。";
      addMessage(errorMessage, "bot");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>你好</Text>
            <Text style={styles.subtitle}>歡迎使用WishGather解籤功能</Text>
          </View>

          <ScrollView
  ref={scrollViewRef}
  style={styles.messagesArea}
  contentContainerStyle={{
    paddingBottom: isKeyboardVisible ? 90 : 10,
  }}
  onScrollBeginDrag={handleScrollBeginDrag}  // 當用戶開始拖動時觸發
  onScrollEndDrag={handleScrollEndDrag}      // 當用戶停止拖動時觸發
  onContentSizeChange={() => {
    if (!isUserScrolling) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }}
  removeClippedSubviews={true}
  keyboardShouldPersistTaps="handled"
>
  {messages.map((msg, index) => (
    <View
      key={index}
      style={[
        styles.messageBox,
        msg.type === "user"
          ? styles.userMessageBox
          : styles.botMessageBox,
      ]}
    >
      <Text
        style={
          msg.type === "user" ? styles.userMessage : styles.botMessage
        }
      >
        {msg.text}
      </Text>
    </View>
  ))}
</ScrollView>


          <View style={styles.typingArea}>
            <TextInput
              style={styles.input}
              value={userMessage}
              onChangeText={setUserMessage}
              placeholder="請輸入您的問題"
              placeholderTextColor="#a9a9a9"
              onFocus={() => setKeyboardVisible(true)} // 鍵盤彈出時
              onBlur={() => setKeyboardVisible(false)} // 鍵盤隱藏時
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  messagesArea: {
    flex: 1,
    marginBottom: 10,
  },
  messageBox: {
    maxWidth: "80%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  userMessageBox: {
    alignSelf: "flex-end",
    backgroundColor: "rgb(135,24,68)",
  },
  botMessageBox: {
    alignSelf: "flex-start",
    backgroundColor: "rgb(237,225,217)",
  },
  userMessage: {
    color: "rgb(237,225,217)",
  },
  botMessage: {
    color: "#000",
  },
  typingArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    // borderTopWidth: 1.5,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    position: "absolute", // 固定位置
    bottom: 0, // 固定在底部
    left: 0,
    right: 0,
    paddingHorizontal: 10, // 讓左右有些邊距
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#E8E9EB",
  },
  sendButton: {
    backgroundColor: "#F89880",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default WishGatherChatbot;
