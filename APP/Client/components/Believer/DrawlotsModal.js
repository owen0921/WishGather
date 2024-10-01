import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DrawlotsModal = () => {
  const navigation = useNavigation();
  const [randomNumber, setRandomNumber] = useState(null);
  const [message, setMessage] = useState('');
  const [showGif, setShowGif] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 定義六十甲子籤文
  const stickMessages = [
'第六十籤 癸亥 屬水利冬　宜其北方 月出光輝本清吉， 浮雲總是蔽陰色， 戶內用心再作福， 當官分理便有益。',
      '第五十九籤 癸酉 屬金利秋　宜其西方 有心作福莫遲疑， 求名清吉正當時， 此事必能成會合， 財寶自然喜相隨。',
      '第五十八籤 癸未 屬木利春　宜其東方 蛇身意欲變成龍， 只恐命內運未通， 久病且作寬心坐， 言語雖多不可從。',
      '第五十七籤 癸已 屬水利冬　宜其北方 勸君把定心莫虛， 前途清吉得運時， 到底中間無大事， 又遇神仙守安居。',
      '第五十六籤 癸卯 屬金利秋　宜其西方 病中若得苦心勞， 到底完全總未遭， 去後不須回頭問， 心中事務盡消磨。',
      '第五十五籤 癸丑 屬木利春　宜其東方 須知進退總虛言， 看看發暗未必全， 珠玉深藏還未變， 心中但得枉徒然。',
      '第五十四籤 壬戌 屬水利冬　宜其北方 孤燈寂寂夜沉沉， 萬事清吉萬事成， 若逢陰中有善果， 燒得好香達神明。',
      '第五十三籤 壬申 屬金利秋　宜其西方 看君來問心中事， 積善之家慶有餘， 運亨財子雙雙全， 指日喜氣溢門閭。',
      '第五十二籤 壬午 屬木利春　宜其東方 功名事業本由天， 不須掛念意懸懸， 若問中間遲與速， 風雲際會在眼前。',
      '第五十一籤 壬辰 屬水利冬　宜其北方 東西南北不堪行， 前途此事正可當， 勸君把定莫煩惱， 家門自有保安康。',
      '第五十籤 壬寅 屬金利秋　宜其西方 佛前發誓無異心， 且看前途得好音， 此物原來本是鐵， 也能變化得成金。',
      '第四十九籤 壬子 屬木利春　宜其東方 言語雖多不可從， 風雲靜處未行龍， 暗中終得明消息， 君爾何須問重重。',
      '第四十八籤 辛亥 屬金利秋　宜其西方 陽世作事未和同， 雲遮月色正朦朧， 心中意欲前途去， 只恐命內運未通。',
      '第四十七籤 辛酉 屬木利春　宜其東方 君爾何須問聖跡， 自己心中皆有益， 於今且看月中旬， 凶事脫出化成吉。',
      '第四十六籤 辛未 屬土利年　四方皆宜 功名得位與君顯， 前途富貴喜安然， 若遇一輪明月照， 十五團圓照滿天。',
      '第四十五籤 辛巳 屬金利秋　宜其西方 花開今已結成果， 富貴榮華終到老， 君子小人相會合， 萬事清吉莫煩惱。',
      '第四十四籤 辛卯 屬木利春　宜其東方 客到前途多得利， 君爾何故兩相疑， 雖是中間逢進退， 月出光輝得運時。',
      '第四十三籤 辛丑 屬土利年　四方皆宜 一年作事急如飛， 君爾寬心莫遲疑， 貴人還在千里外， 音信月中漸漸知。',
      '第四十二籤 庚戌 屬金利秋　宜其西方 一重江水一重山， 誰知此去路又難， 任他改救終不過， 是非終久未得安。',
      '第四十一籤 庚申 屬木利春　宜其東方 今行到手實難推， 歌歌暢飲自徘徊， 雞犬相聞消息近， 婚姻夙世結成雙。',
      '第四十籤 庚午 屬土利年　四方皆宜 平生富貴成祿位， 君家門戶定光輝， 此中必定無損失， 夫妻百歲喜相隨。',
      '第三十九籤 庚辰 屬金利秋　宜其西方 意中若問神仙路， 勸爾且退望高樓， 寬心且守寬心坐， 必然遇得貴人扶。',
      '第三十八籤 庚寅 屬木利春　宜其東方 名顯有意在中間， 不須祈禱心自安， 看看早晚日過後， 即時得意在其間。',
      '第三十七籤 庚子 屬土利年　四方皆宜 運逢得意身顯變， 君爾身中皆有益， 一向前途無難事， 決意之中保清吉。',
      '第三十六籤 己亥 屬木利春　宜其東方 福如東海壽如山， 君爾何須嘆苦難， 命內自然逢大吉， 祈保分明得平安。',
      '第三十五籤 己酉 屬土利年　四方皆宜 此事何須用心機， 前途變怪自然知， 看看此去得和合， 漸漸脫出見太平。',
      '第三十四籤 己未 屬火利夏　宜其南方 危險高山行過盡， 莫嫌此路有重重， 若見蘭桂漸漸發， 長蛇反轉變成龍。',
      '第三十三籤 己巳 屬木利春　宜其東方 欲去長江水闊茫， 行船把定未遭風， 戶內用心再作福， 看看魚水得相逢。',
      '第三十二籤 己卯 屬土利年　四方皆宜 龍虎相交在門前， 此事必定兩相連， 黃金忽然變成鐵， 何用作福問神仙。',
      '第三十一籤 己丑 屬火利夏　宜其西方 綠柳蒼蒼正當時， 任君此去作乾坤， 花果結實無殘謝， 福祿自有慶家門。',
      '第三十籤 戊戌 屬木利春 宜其東方 漸漸看此月中和， 過後須防未得高， 改變顏色前途去， 凡事必定見重勞。',
      '第二十九籤 戊申 屬土利年 四方皆宜 枯木可惜逢春時， 如今還在暗中藏， 寬心且守風霜退， 還君依舊作乾坤。',
      '第二十八籤 戊午 屬火利夏 宜其南方 於今莫作此當時， 虎落平陽被犬欺， 世間凡事何難定， 千山萬水也遲疑。',
      '第二十七籤 戊辰 屬木利春 宜其東方 君爾寬心且自由， 門庭清吉家無憂， 財寶自然終吉利， 凡事無傷不用求。',
      '第二十六籤 戊寅 屬土利年 四方皆宜 選出牡丹第一枝， 勸君折取莫遲疑， 世間若問相知處， 萬事逢春正及時。',
      '第二十五籤 戊子 屬火利夏 宜其南方 總是前途莫心勞， 求神問聖枉是多， 但看雞犬日過後， 不須作福事如何。',
      '第二十四籤 丁亥 屬土利年　四方皆宜 月出光輝四海明， 前途祿位見太平， 浮雲掃退終無事， 可保禍患不臨身。',
      '第二十三籤 丁酉 屬火利夏　宜其南方 欲去長江水濶茫， 前途未遂運未通， 如今絲綸常在手， 只恐魚水不相逢。',
      '第二十二籤 丁未 屬水利冬　宜其北方 太公家業八十成， 月出光輝四海明， 命內自然逢大吉， 茅屋中間百事亨。',
      '第二十一籤 丁巳 屬土利年 四方皆宜 十方佛法有靈通， 大難禍患不相同， 紅日當空常照耀， 還有貴人到家堂。',
      '第二十籤 丁卯 屬火利夏 宜其南方 前途功名未得意， 只恐命內有交加， 兩家必定防損失， 勸君且退莫咨嗟。',
      '第十九籤 丁丑 屬水利冬 宜其北方 富貴由命天註定， 心高必然誤君期， 不然且回依舊路， 雲開月出自分明。',
      '第十八籤 丙戌 屬土利年 四方皆宜 君問中間此言因， 看看祿馬拱前程， 若得貴人多得利， 和合自有兩分明。',
      '第十七籤 丙申 屬火利夏 宜其南方 舊恨重重未改為， 家中禍患不臨身， 須當謹防宜作福， 龍蛇交會得和合。',
      '第十六籤 丙午 屬水利冬 宜其北方 不須作福不須求， 用盡心機總未休， 陽世不知陰世事， 官法如爐不自由。',
      '第十五籤 丙辰 屬土利年 四方皆宜 八十原來是太公， 看看晚景遇文王， 目下緊事休相問， 勸君且守待運通。',
      '第十四籤 丙寅 屬火利夏 宜其南方 財中漸漸見分明， 花開花謝結子成， 寬心且看月中桂， 郎君即便見太平。',
      '第十三籤 丙子 屬水利冬 宜其北方 命中正逢羅孛關， 用盡心機總未休， 作福問神難得過， 恰是行船上高灘。',
      '第十二籤 乙亥 屬火利夏 宜其南方 長江風浪漸漸靜， 于今得進可安寧， 必有貴人相扶助， 凶事脫出見太平。',
      '第十一籤 乙酉 屬水利冬 宜其北方 靈雞漸漸見分明， 凡事且看子丑寅， 雲開月出照天下， 郎君即便見太平。',
      '第十籤 乙未 屬金利秋　宜其西方 花開結子一半枯， 可惜今年汝虛度， 漸漸日落西山去， 勸君不用向前途。',
      '第九籤 乙巳 屬火利夏　宜其南方 龍虎相隨在深山， 君爾何須背後看， 不知此去相愛愉， 他日與我卻無干。',
      '第八籤 乙卯 屬水利冬 宜其北方 禾稻看看結成完， 此事必定兩相全， 回到家中寬心坐， 妻兒鼓舞樂團圓。',
      '第七籤 乙丑 屬金利秋 宜其西方 雲開月出見分明， 不須進退向前程， 婚姻皆由天註定， 和合清吉萬事成。',
      '第六籤 甲戌 屬火利夏 宜其南方 風雲致雨落洋洋， 天災時氣必有傷， 命內此事難和合， 更逢一足出外鄉。',
      '第五籤 甲申 屬水利冬 宜其北方 只恐前途明有變， 勸君作急可宜先， 且守長江無大事， 命逢太白守身邊。',
      '第四籤 甲午 屬金利秋 宜其西方 風恬浪靜可行船， 恰是中秋月一輪， 凡事不須多憂慮， 福祿自有慶家門。',
      '第三籤 甲辰 屬火利夏 宜其南方 勸君把定心莫虛， 天註姻緣自有餘， 和合重重常吉慶， 時來終遇得明珠。',
      '第二籤 甲寅 屬水利冬 宜其北方 於今此景正當時， 看看欲吐百花魁， 若能遇得春色到， 一洒清吉脫塵埃，',
      '第一籤 甲子 屬金利秋　宜其西方 日出便見風雲散， 光明清靜照世間， 一向前途通大道， 萬事清吉保平安。',
  ];

  const handlePress = () => {
    setShowGif(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * stickMessages.length);
      setRandomNumber(60 - randomIndex);
      setMessage(stickMessages[randomIndex]);
      setShowGif(false);
      setShowResult(true);
    }, 2000);
  };

  const handleInterpret = () => {
    navigation.navigate('Chatbox', {
      lotNumber: randomNumber,
      lotMessage: message
    });
  };

  return (
    <View style={styles.container}>
      {!showGif && !showResult && (
        <View>
           <Image
              source={require('../../assets/drawlots.png')}
              style={styles.image}
            />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>開始求籤</Text>
          </TouchableOpacity>
        </View>
      )}
      {showGif && (
        <Image
          source={require('../../assets/drawlots.gif')}
          style={styles.gif}
        />
      )}
      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>籤號: 第{randomNumber}籤</Text>
          <Text style={styles.messageText}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.interpretButton} onPress={handleInterpret}>
              <Text style={styles.interpretButtonText}>前往解籤</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,

    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image:{
    width:150,
    height: 150,
    resizeMode: 'contain',
  },
  gif: {
    width:300,
    height: 300,
    resizeMode: 'contain',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    color :"orange",
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    color :"#4F4F4F",
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
  buttonContainer: {
    marginTop: 25,
  },
  icon: {
    marginLeft: 5, 
  },
  interpretButton: {
    flexDirection:'row',
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  interpretButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DrawlotsModal;