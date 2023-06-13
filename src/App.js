import Home from "./router/home/home.component";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "./router/navigations/navigation.component";
import Authentication from "./router/authentication/authentication.component";
import Shop from "./router/shop/shop.component.jsx";
import Checkout from "./router/checkout/checkout.component";
import { useEffect } from "react";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
