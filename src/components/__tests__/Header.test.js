import { render } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";

test("Logo should be load on rendering header", () => {
  //Load Header
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const logo = header.getAllByTestId("logo");
  console.log(logo);
  expect(logo[0].src).toBe("http://localhost/dummy.jpg");
});

// check Online status

test("Online Status should be green on rendering header", () => {
  //Load Header
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const onlineStatus = header.getByTestId("online-status");
  const computedStyle = window.getComputedStyle(onlineStatus);
  const backgroundColor = computedStyle.getPropertyValue("background-color");
  //   console.log(onlineStatus);
  expect(backgroundColor).toBe("green");
});

//Cart should have 0 items on rendering header

test("Online Status should be green on rendering header", () => {
  //Load Header
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const cart = header.getByTestId("cart");

  //   console.log(onlineStatus);
  expect(cart.innerHTML).toBe("Cart(0)");
});
