import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as reduxConnect } from 'react-redux';
import isEqual from 'lodash/isEqual';

/**
 * Connects a components to the store that takes care about the current route.
 * The component will only be updated when the current route matches the route
 * where it was initially mounted.
 * @param {function} mapStateToProps The map state to props callback.
 * @param {function} mapDispatchToProps The map dispatch to props callback.
 * @param {function} mergeProps The merge props callback.
 * @param {Object} options The connect options.
 * @return {function} The connected component.
 */
const connect = (
  mapStateToProps = null,
  mapDispatchToProps = null,
  mergeProps = null,
  options = {}
) => {
  /**
   * The local map state to props callback. Appends the pathname from history.
   * @param {Object} state The state.
   * @param {Object} props The component properties.
   * @return {Object} The new component props.
   */
  const localMapStateToProps = (state, props) => {
    const realMappedProps = (mapStateToProps
      ? mapStateToProps(state, props)
      : {}
    );

    return {
      ...realMappedProps,
      routedConnectPathname: state.history ? state.history.pathname : '',
    };
  };

  const localOptions = {
    ...options,
    withRef: true,
  };

  // Wrap the real connect method with the local map state to props callback.
  const realConnect = reduxConnect(
    localMapStateToProps,
    mapDispatchToProps,
    mergeProps,
    localOptions
  );

  /**
   * Creates a wrapping component that takes care about the current path.
   * @param {Component} WrappedComponent The component to wrap.
   * @return {Component} The component wrapper.
   */
  const componentWrapper = WrappedComponent => class extends Component {
    static propTypes = {
      routedConnectPathname: PropTypes.string.isRequired,
    };

    static contextTypes = {
      routePath: PropTypes.string,
    };

    static displayName = 'SGConnect';

    /**
     * Only allows component updates when the current route matches the components mounting route.
     * @param {props} nextProps The new properties.
     * @return {boolean} Whether to update the component.
     */
    shouldComponentUpdate(nextProps) {
      // Only render if the next route matches the mounted route and the props changed.
      if (this.context.routePath === nextProps.routedConnectPathname) {
        const havePropsChanged = !isEqual(
          {
            ...this.props,
            routedConnectPathname: null,
            dispatch: null,
          },
          {
            ...nextProps,
            routedConnectPathname: null,
            dispatch: null,
          }
        );

        return havePropsChanged;
      }

      return false;
    }

    /**
     * Returns the actual wrapped component.
     * @returns {Object}
     */
    getWrappedInstance() {
      return this.myRef;
    }

    setRef = (element) => {
      this.myRef = element;
    }

    /**
     * Renders the component.
     * @return {Node} The rendered component.
     */
    render() {
      return (
        <WrappedComponent {...this.props} ref={this.setRef} />
      );
    }
  };

  // Return the connected wrapper.
  return RealComponent => realConnect(componentWrapper(RealComponent));
};

export default connect;
