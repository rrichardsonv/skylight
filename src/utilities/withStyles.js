import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const spacing = ['m', 'ml', 'mr', 'mt', 'mb', 'mx', 'my', 'p', 'pl', 'pr', 'pt', 'pb', 'px', 'py'];

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withStyles = WrappedComponent => {
  class Styled extends PureComponent {
    static displayName = `Styled(${getDisplayName(WrappedComponent)})`;
    render() {
      const {
        children,
        className,
        justifyContent,
        fill,
        flexShrink,
        alignItems,
        alignSelf,
        style,
        shadow,
        flex,
        inline,
        border,
        column,
        row,
      } = this.props;

      // gather classnames for spacing
      const spacingMap = spacing.reduce((acc, obj) => {
        const value = this.props[obj];
        if (value) {
          acc[`${obj}-${value}`] = value;
        }
        return acc;
      }, {});

      // classes for flex utils
      const flexMap = {
        flex: flex === true || row,
        [`flex-${flex}`]: flex && flex !== true,
        'inline-flex': inline,
        'flex-row': row,
        'flex-column': column,
        'flex-shrink-0': flexShrink === '0',
        'flex-shrink-1': flexShrink === '1',
        'flex-fill': fill,
        [`justify-content-${justifyContent}`]: justifyContent,
        [`align-self-${alignSelf}`]: alignSelf,
        [`align-items-${alignItems}`]: alignItems,
      };

      // misc styles
      const styleMap = {
        border: border === true,
        [`border-${border}`]: border && border !== true,
        'box-shadow': shadow,
      };

      const classes = classNames(flexMap, spacingMap, styleMap, className);

      return (
        <WrappedComponent {...this.props} className={classes} style={style}>
          {children}
        </WrappedComponent>
      );
    }
  }

  Styled.propTypes = {
    fill: PropTypes.bool,
    flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    inline: PropTypes.bool,
    column: PropTypes.bool,
    row: PropTypes.bool,
    shadow: PropTypes.bool,
    flexShrink: PropTypes.oneOf(['0', '1']),
    border: PropTypes.oneOf([true, 'left', 'right', 'top', 'bottom', '0']),
    justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around']),
    alignSelf: PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
    alignItems: PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
  };

  return Styled;
};

export default withStyles;
