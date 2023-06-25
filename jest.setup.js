jest.mock('react-native/Libraries/Performance/Systrace', () => ({
    install: () => {},
    uninstall: () => {},
  }));
  
  