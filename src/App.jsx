import { MantineProvider} from "@mantine/core";
import Valentine from "./components/Valentine";

function App() {
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Valentine />
      </MantineProvider>
  );
}

export default App;