/**
* @file Animated and customizable switch component.
* @author Mihaela Mesarosiu
*
* @copyright (C) Copyright 2020, Capital Rx - All Rights Reserved
*/

import React, { useMemo, useState, useRef } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'native-base';

const ANIMATION_DURATION = 100;

const commonSwitchStyle = {
  borderWidth: 1,
  borderRadius: 12,
  height: 24,
  width: 44,
  marginHorizontal: 5,
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
};

const wrapperStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
};

const Switch = (props) => {
  const { lhsLabel, rhsLabel, value, onValueChange, color, full } = props;
  const [status, setStatus] = useState(value);
  const animatedPosition = useRef(new Animated.Value(status ? 0 : 1));
  const switchStyle = useMemo(() => ({
    ...commonSwitchStyle,
    borderColor: color,
    backgroundColor: full ? color : '#fff'
  }), [color, full]);

  const onPress = () => {
    const updated = !status;
    setStatus(updated);
    onValueChange(updated);
    Animated.timing(animatedPosition.current, {
      duration: ANIMATION_DURATION,
      toValue: updated ? 0 : 1,
    }).start();
  };

  const thumbStyle = {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: full ? '#fff' : color,
    left: animatedPosition.current.interpolate({
      inputRange: [0, 1],
      outputRange: [5, 23],
    }),
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={wrapperStyle}>
        <Text>{lhsLabel}</Text>
        <View style={switchStyle}>
          <Animated.View style={thumbStyle} />
        </View>
        <Text>{rhsLabel}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
};

Switch.defaultProps = {
  full: true,
  onValueChange: () => {},
};

export default Switch;
