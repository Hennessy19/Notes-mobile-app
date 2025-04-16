import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: "#f4511e",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerTitleAlign: "center",
      contentStyle:{
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "#fff",
      }
    }}
  >
    <Stack.Screen name="index" options={{title: "Home"}} />
    <Stack.Screen name="notes" options={{headerTitle: "Notes"}} /> 
  </Stack>
  // A stack navigator is used to manage the navigation between screens in the app.
  // It is what you would typically use to create a stack-based navigation structure.
  // Its default behavior is to push new screens onto the stack when navigating to them,
  // and pop them off when going back.
  // This is useful for creating a typical mobile app navigation experience.
  // if you want to have a single screen, you can use the Slop component instead.
  // The Slop component is a simple wrapper that allows you to create a single screen app
  // without the need for a stack navigator.
  // It is useful for creating simple apps or prototypes that do not require complex navigation.
  // The Slop component is a simple wrapper that allows you to create a single screen app
  //headerTitle is the title of the screen that will be displayed in the header. It is for screens that are not the home screen.


  

}

export default RootLayout;
