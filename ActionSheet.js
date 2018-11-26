import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { BlurView } from 'expo';

export default class ActionSheet extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: new Animated.Value(0),
      viewTrans: new Animated.Value(50),
    }

    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 100,
      toValue: 1,
    }).start();
    Animated.timing(this.state.viewTrans, {
      duration: 100,
      toValue: 0,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.viewTrans, {
      duration: 100,
      toValue: 50,
    }).start();
    Animated.timing(this.state.opacity, {
      duration: 100,
      toValue: 0,
    }).start(Actions.pop);
  }

  actionModal = (action, close) => {
    if (close != false) {
      Animated.timing(this.state.opacity, {
        duration: 100,
        toValue: 0,
      }).start(Actions.pop);
    }

    if (action) {
      action()
    }
  }
  
  render() {
    const {
      options,
      title,
    } = this.props

    return <Animated.View style={[styles.BackView, {opacity: this.state.opacity}, StyleSheet.absoluteFill]} onPress={this.closeModal}>
        <Animated.View style={{
            transform: [{ translateY: this.state.viewTrans }]
            }}>
          <BlurView tint="light" intensity={100} style={styles.inner}>
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            {options.map((v,k) => {
              return !v.hide && <View key={k} style={styles.values} onPress={v.action}>
                <TouchableOpacity style={styles.valuesInner} onPress={() => this.actionModal(v.action, v.close)}>
                  <Text style={[styles.valueText, v.style && v.style]}>{v.value}</Text>
                </TouchableOpacity>
              </View>
            })}
          </BlurView>
          <TouchableOpacity style={styles.close} onPress={this.closeModal}>
            <Text style={styles.closeText}>閉じる</Text>
          </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  }
}

const styles = StyleSheet.create({
  BackView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  inner: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5
  },
  titleWrap: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  values: {
    borderTopColor: '#d1d1d1',
    borderTopWidth: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valuesInner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  valueText: {
    color: 'rgba(0, 122, 255, 1)',
    fontSize: 16
  },
  close: {
    margin: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5
  },
  closeText: {
    color: '#ce4844',
    fontSize: 18
  },
  titleText: {
    fontSize: 16,
    color: 'gray',
  }
});
