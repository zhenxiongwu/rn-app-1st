/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    ScrollView,
    ListView,
    RefreshControl,
    TouchableHighlight,
    Alert,
    Dimensions,
    Platform
} from 'react-native';

import Detail from './detail'

const windowWidth = Dimensions.get('window').width;
const advertisementHeight = 180;
const circleSize = 8;
const circleMargin = 5;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            currentPage: 0,
            advertisements: [
                {
                    title: '广告1',
                    backgroundColor: 'gray',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    image: require('./images/advertisement-image-01.jpg')
                },
                {
                    title: '广告2',
                    backgroundColor: 'orange',
                    url: 'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg',
                    image: require('./images/advertisement-image-02.jpg')
                },
                {
                    title: '广告3',
                    backgroundColor: 'yellow',
                    url: 'https://coding.net/u/learnreactnative/p/learnreactnative-sourcecode/git/blob/master/ch04/ch04/images/advertisement-image-02.jpg',
                    image: require('./images/advertisement-image-03.jpg')
                }
            ],
            dataSource: ds.cloneWithRows([
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
                {
                    image: require('./images/product-image-01.jpg'),
                    title: '商品1',
                    introduction: '描述1'
                },
            ]),
            isRefreshing: false
        };
    }

    componentDidMount() {
        this._startTimer();
    }

    render() {

        const advertisementCount = this.state.advertisements.length;
        const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2;
        const indicatorSetOff = (windowWidth - indicatorWidth) / 2;

        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="搜索商品"
                        onChangeText={(text) => {
                            this.setState({searchText: text});
                        }}
                    >
                    </TextInput>

                    <Button
                        style={styles.searchButton}
                        title="搜索"
                        onPress={() => {
                            Alert.alert('搜索' + this.state.searchText, null, null);
                        }}
                    >
                    </Button>
                </View>
                <View style={styles.advertisements}>
                    <ScrollView
                        ref="advScrollView"
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        pagingEnable={true}
                    >
                        {
                            this.state.advertisements.map(
                                (advertisement, index) => {
                                    return (
                                        <TouchableHighlight key={index}
                                                            onPress={() => Alert.alert(`你点击了广告${index + 1}`, null, null)}>
                                            <Image
                                                style={
                                                    [styles.advertisementContent]
                                                }
                                                source={advertisement.image}
                                            >
                                            </Image>
                                        </TouchableHighlight>
                                    );
                                }
                            )
                        }
                    </ScrollView>
                </View>

                <View ref='indicator' style={[styles.indicator, {left: indicatorSetOff}]}>
                    {
                        this.state.advertisements.map((advertisement, index) => {
                            return (
                                <View key={index}
                                      style={
                                          [styles.circle, (index === this.state.currentPage ? styles.circleSelected : {})]
                                      }>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.products}>
                    <ListView dataSource={this.state.dataSource}
                              renderRow={this._renderRow}
                              renderSeparator={this._renderSeparator}
                              refreshControl={this._renderRefreshControl()}
                    />
                </View>
            </View>
        );
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableHighlight onPress={
                ()=>{
                    const {navigator} = this.props;
                    if(navigator){
                        navigator.push({name:'detail',component:Detail})
                    }
                }
            }>
                <View style={styles.productItem}>
                    <Image style={styles.productImage} source={rowData.image}/>
                    <View style={styles.productText}>
                        <Text style={styles.productTitle}>{rowData.title}</Text>
                        <Text style={styles.productIntroduction}>{rowData.introduction}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };


    _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.separator}>
            </View>
        )
    };

    _renderRefreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                tintColor={'#ff0000'}
                title={'正在刷新数据，请稍候...'}
                titleColor={'#0000ff'}>
            </RefreshControl>
        )
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _startTimer() {
        this.interval = setInterval(() => {
            let nextPage = this.state.currentPage + 1;
            this.setState(nextPage >= 3 ? {currentPage: 0} : {currentPage: nextPage});
            const offSetX = this.state.currentPage * windowWidth;
            this.refs.advScrollView.scrollResponderScrollTo({
                x: offSetX,
                animated: true
            });


        }, 2000);
    }
}


const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => {
        console.log(r1, "   r2: ", r2);
        return r1 !== r2;
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBar: {
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'blue'
    },
    searchInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    searchButton: {
        flex: 1
    },

    advertisement: {
        // flex:1,
        height: 180
    },

    advertisementContent: {
        // flex:1,
        width: windowWidth,
        height: 180
    },

    indicator: {
        position: 'absolute',
        top: advertisementHeight + 20,
        flexDirection: 'row'
    },

    circle: {
        width: circleSize,
        height: circleSize,
        backgroundColor: 'gray',
        borderRadius: circleSize / 2,
        marginHorizontal: circleMargin
    },

    circleSelected: {
        backgroundColor: 'white',
    },

    products: {
        flex: 1
    },

    productItem: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        // borderWidth:2,
    },

    separator: {

        height: 1,
        backgroundColor: 'lightgray'
    },

    productImage: {
        width: 40,
        height: 40,
        margin: 10
    },

    productText: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },

    productTitle: {
        fontSize: 16,
        flex: 3,
        color: 'black'
    },

    productIntroduction: {
        fontSize: 14,
        flex: 2
    }
});
