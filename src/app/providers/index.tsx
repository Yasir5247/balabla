import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FlashMessage from 'react-native-flash-message';
import { observer } from 'mobx-react-lite';
import { StoresProvider, useStores } from '@/stores';
import { SafeAreaView } from 'react-native-safe-area-context';

const ThemedApp = observer(({ children }: { children: React.ReactNode }) => {
  
  return (
    <BottomSheetModalProvider>
      {children}
      <FlashMessage position="top" />
    </BottomSheetModalProvider>
  );
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={styles.container}>
        <StoresProvider>
          <ThemedApp>
            {children}
          </ThemedApp>
        </StoresProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});