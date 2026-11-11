import { Component } from 'react';

// If WebGL is unavailable or the scene throws, show the plain fallback instead of a blank page.
export default class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('3D scene disabled:', error?.message);
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

export const webglAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
};
