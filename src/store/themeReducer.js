const SET_THEME = "SET_THEME";

export const setTheme = (mainTheme, subTheme) => ({
  type: SET_THEME,
  mainTheme,
  subTheme,
});

const initialState = { mainTheme: "#357EC7", subTheme: "primary" };

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        mainTheme: action.mainTheme,
        subTheme: action.subTheme,
      };
    default:
      return state;
  }
};

export default themeReducer;
