import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeItem } from '../redux/cartRedux';

import {mobile} from '../responsive'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom"


// import {PayPalButtons} from "@paypal/react-paypal-js";


const Container = styled.div`
    background-color: #f5fbfd;
`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px"})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};

`


const TopTexts = styled.div`
    ${mobile({ display: "none" })}

`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;

`


const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 50%;
    border-radius: 10px;
    margin-bottom: 50px;

`

const Details = styled.div`
    padding: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span`
    font-size: 20px;
`

const ProductId = styled.span`
`

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`

const ProductSize = styled.span`
`

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}

`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })};

`


const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;

`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`
`

const SummaryItemPrice = styled.span`
`

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: orange;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const Remove = styled.div`
    display: flex;
    align-items: center;
    color: red;
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 20px;
    margin-right: 20px;
`


const Cart = () => {
    const cart = useSelector((state)=>state.cart);

    const dispatch = useDispatch();

    const handleRemoveItem = (index) => {
        dispatch(removeItem(index));
    }

    // console.log(cart.products)
    return (
        <Container>
            <Navbar></Navbar>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <RouterLink to="/">
                        <TopButton >CONTINUE SHOPPING</TopButton>                    
                    </RouterLink>
                    {/* <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts> */}
                    <TopButton>CHECKOUT NOW</TopButton>
                </Top>


                <Bottom>
                    <Info>

                    {cart.products && cart.products.map((product, index) => (
                        <Product key={index}>
                            <ProductDetail>
                                <Image src={product.img}></Image>
                                <Details>
                                    <ProductName><b>Product:</b>{product.title}</ProductName>
                                    <ProductId><b>ID:</b>{product.id}</ProductId>
                                    <ProductColor color={product.color}></ProductColor>
                                    <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                </Details>
                            </ProductDetail>

                            <PriceDetail>
                                <ProductAmountContainer>
                                    <AddIcon></AddIcon>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <RemoveIcon></RemoveIcon>
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                            </PriceDetail>

                            {/* REMOVE ITEMS FROM THE CART LIST  */}

                            <Remove onClick={() => handleRemoveItem(index)}>
                                <DeleteIcon></DeleteIcon>
                            </Remove>
                            
                        </Product>
                    ))}

                    <Hr/>

                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping Fee</SummaryItemText>
                            <SummaryItemPrice>$ 5</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ 5</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem type = "total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>



                        <Button>CHECKOUT</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer></Footer>
        </Container>
  )
}

export default Cart


                        {/* <PayPalButtons
                            createOrder={(data, actions) => {
                                // Define your createOrder function here
                                return actions.order.create({
                                // Include order details (e.g., items, total) here
                                });
                            }}
                            onApprove={(data, actions) => {
                                // Define your onApprove function here
                                return actions.order.capture().then((details) => {
                                // Handle successful payment confirmation here
                                console.log("Payment successful", details);
                                // You may want to update your database and display a confirmation to the user
                                });
                            }}
                            onError={(err) => {
                                // Handle errors that occur during the payment process
                                console.error("Payment error", err);
                            }}
                            >
                            CHECKOUT NOW
                        </PayPalButtons> */}
      