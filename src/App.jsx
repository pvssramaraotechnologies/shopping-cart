import React, { createContext } from 'react';
import './App.css';
import { BrowserRouter,Routes,Route, Outlet,Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignIn from './SignIn';

let id=1;
export default function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="link1" element={<Link1></Link1>}/>               
                <Route path="link2" element={<Link2></Link2>}/>
                <Route path="link3" element={<Link3></Link3>}/>
                <Route path="link4" element={<Link4></Link4>}/>
                <Route path="link51" element={<Link51></Link51>}/>
                <Route path="link52" element={<Link52></Link52>}/>
                <Route path="link53" element={<Link53></Link53>}/>
                <Route path="link6" element={<Link6></Link6>}/>
            </Route>
            <Route path="/signIn" element={<SignIn></SignIn>}/>
            <Route path="/signOut" element={<SignIn></SignIn>}/>
        </Routes>
     </BrowserRouter>
  )
}

function Header({children}) {
  return <header>
        {children}
     </header>
}

function Button({onClick,children}) {
   return <button onClick={onClick}>{children}</button>

}

function Search() {
    return <input type="search"></input>
}

function CartIcon({cartObj}) {

  const {cartData,setCartData} = cartObj;

  const [show,setShow] = useState();

  function handleClick() {
      setShow(!show);  
  }

  function handleRemove(id1) {
      setCartData(
          cartData.filter(el => el.id!==id1)
      );
      id--;
  }

  function handleClose() {
    setShow(!show);
  }

  let tprice = 0;
  const display = cartData.map((el) => {

        tprice = tprice + el.price;
        return <tr>
                  <td>{el.id}</td>
                  <td>{el.vname}</td>
                  <td>{el.quantity}Kg</td>
                  <td>{el.price}</td>
                  <td>{el.quantity*el.price}</td>
                  <td><button onClick={() => handleRemove(el.id)}>Remove</button></td>
                  </tr>
  });

  return (
    <>
       <span className="cartLength">{cartData.length}</span>
       <a onClick={handleClick}><img src="../src/assets/images/shopping_cart.png"/></a>
       { show && <div id="model" className="model">
          <div id="overlay" className="overlay">
            <div id="modelContent" className="modelContent">
                <table>
                    <caption><h3>Shopping Cart Items</h3></caption>
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>VName</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {display}
                    </tbody>
                    <tfoot>
                       <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>GrandTotal</td>
                          <td>{tprice}</td>
                       </tr>
                    </tfoot>
                </table>
                <button className="close" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
        }
    </>
  )
}

function NavBar() {
    return <nav>
              <Link to="/link1">Link1</Link>
              <Link to="/link2">Link2</Link>
              <Link to="/link3">Link3</Link>
              <Link to="/link4">Link4</Link>
              <a className="dropdown" href="#">Link5
              <div className="dropdownContent">
                   <Link to={"/link51"}>Link51</Link>
                   <Link to={"/link52"}>Link52</Link>
                   <Link to={"/link53"}>Link53</Link>
              </div>
              </a>
          </nav>
}

function Aside() {
   return <aside>
        <p><Link to="/link6">TextTextTextText</Link></p>
        <p>TextTextTextText</p>
        <p>TextTextTextText</p>
        <p>TextTextTextText</p>
        <p>TextTextTextText</p>
        <p>TextTextTextText</p>
   </aside>
}

function Main({children}) {
  return <main>{children}</main>
}

function Footer({children}) {
   return <footer>
            {children}
   </footer>
}

function Content() {
  return <div className="content">
  TextTextTextTextText<br></br>
  TextTextTextTextText<br></br>
  TextTextTextTextText<br></br>
  TextTextTextTextText<br></br>
  TextTextTextTextText<br></br>
  TextTextTextTextText
  </div>
}

function Layout() {

  const [cartData,setCartData] = useState([]);
  const  cartObj = {cartData,setCartData};
  const navigate = useNavigate();

  console.log(cartData);

  function handleSignIn() {
      navigate("/signIn");
  }

  function handleSignOut() {
    navigate("/signIn");
  }

  return <div className="layout">
  <Header>
        <Button>Sample Text Sample Text</Button>
        <Search></Search>
        <Button onClick={handleSignIn}>SignIn</Button>
        <Button onClick={handleSignOut}>SignOut</Button>
        <CartIcon cartObj={cartObj}></CartIcon>
  </Header>
  <NavBar></NavBar>
  <div className="asideMain">
    <Aside></Aside>
    <Main>
         <Vegitables data={data} cartObj={cartObj}></Vegitables>
    </Main>
    <Main><Outlet></Outlet></Main>
  </div>
  <Footer>
     <Content></Content>
     <Content></Content>
     <Content></Content>
  </Footer>
</div>
}

function Vegitables({data,cartObj}) {

  const display = data.map(el => {
    return <Vegitable el={el} cartObj={cartObj}></Vegitable>
});

  return(
     <div>
         {display}
     </div>
  );

}

function Vegitable({el,cartObj}) {
    
    const {cartData,setCartData} = cartObj;
    
    function handleAdd(vname,quantity,price) {
        setCartData(
          [
            ...cartData,
            {
              id:id++,
              vname:vname,
              quantity:quantity,
              price:price
            }
          ]
        )
    }
    console.log(cartData);
    return (
          <>
            <div className="card">
            <img className="image" src={el.vimage}></img>
            <h3>Name:{el.vname}</h3>
            <h3>Quantity:{el.quantity}</h3>
            <h3>Price:{el.price}</h3>
              <div className="button" onClick={(vname,quantity,price) => handleAdd(el.vname,el.quantity,el.price)}><Button>ADD</Button></div>
            </div>
          </>
    )

}

function Home() {
  return <p>Home Page</p>
}

const data = [
    {id:1,vimage:"../src/assets/images/cabbage.JPG",vname:"Cabbage",quantity:1,price:30},
    {id:2,vimage:"../src/assets/images/capsicum.JPG",vname:"Capsicum",quantity:1,price:30},
    {id:3,vimage:"../src/assets/images/carrot.JPG",vname:"Carrot",quantity:1,price:30},
    {id:4,vimage:"../src/assets/images/cauliflower.JPG",vname:"Cauliflower",quantity:1,price:30},
    {id:5,vimage:"../src/assets/images/garlic.JPG",vname:"Garlic",quantity:1,price:30},
    {id:6,vimage:"../src/assets/images/onion.JPG",vname:"Onion",quantity:1,price:30},
    {id:7,vimage:"../src/assets/images/potato.JPG",vname:"Potato",quantity:1,price:30},
    {id:8,vimage:"../src/assets/images/spinach.JPG",vname:"Spinach",quantity:1,price:30},
    {id:9,vimage:"../src/assets/images/tomato.JPG",vname:"Tamato",quantity:1,price:30}
];

function Link1() {
  return "Link1 Page";
}

function Link2() {
  return "Link2 Page";
}

function Link3() {
  return "Link3 Page";
}

function Link4() {
  return "Link4 Page";
}

function Link51() {
  return "Link51 Page";
}

function Link52() {
  return "Link52 Page";
}

function Link53() {
  return "Link53 Page";
}

function Link6() {
  return "Link6 Page";
}

const CartDataContext = createContext();
