import React, { Component } from 'react';
import Wrap from '../../hoc/Wrap';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => this.setState({ingredients: response.data }))
            .catch( error => { this.setState({ error : true}) });
    }


    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'chinna',
                address: {
                    street: 'test street',
                    zipCode: '123456',
                    country: 'India'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', data)
            .then(response => {
                //console.log(response);
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                //console.log(error);
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        

        let burger = !this.state.error ? <Spinner/> : 'Ingredients cant be loaded.';
        let orderSummary = null;

        if( this.state.ingredients){
            burger = <Wrap>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                  />
                </Wrap>

 orderSummary = <OrderSummary 
                    purchaseCancel={this.purchaseCancelHandler} 
                    purchaseContinue={this.purchaseContinueHandler} 
                    ingredients={this.state.ingredients} 
                    totalPrice={this.state.totalPrice} />

if (this.state.loading) {
    orderSummary = <Spinner />
}
        }
        

        return (
            <Wrap>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Wrap>
        );
    }

}

export default BurgerBuilder;