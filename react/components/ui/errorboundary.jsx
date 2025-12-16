/*
 * ErrorBoundary - Catches errors in components and displays a fallback message
 */
import { Component } from "react";
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Oops! Något gick fel.</h2>;
    }
    return this.props.children;
  }
}

