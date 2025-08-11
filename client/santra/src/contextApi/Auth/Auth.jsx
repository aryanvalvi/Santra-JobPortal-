import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  user: [],
};
const initialState2 = {
  input1: "",
  toggle: false,
  searchone: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        user: action.payload,
      };

    case "Fail":
      return {
        user: [],
      };
  }
};

const reducer2 = (state, action) => {
  switch (action.type) {
    case "input1Change":
      return {
        ...state,
        input1: action.payload,
      };
    case "ToggleHit":
      return {
        toggle: true,
      };
    case "searchData":
      return {
        searchone: action.payload,
      };
  }
};
export const CartUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [State2, dispatch2] = useReducer(reducer2, initialState2);

  const isAuth = async () => {
    fetch("http://localhost:5000/isAuth", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resObj) => {
        dispatch({ type: "success", payload: resObj.user });
      });
  };

  const getsearchData = async (e) => {
    setToggle(true);
    // setInput1(e.target.value);
    const res = await fetch(`http://localhost:5000/search?query=${input1}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await res.json();
    console.log(data.suggestions);
    dispatch2({ type: "searchData", payload: data.suggestions });
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{ state, State2Dispatch: dispatch2, state2State: State2 }}
    >
      {children}
    </UserContext.Provider>
  );
};
