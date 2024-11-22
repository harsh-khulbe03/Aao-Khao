import Cart from "../models/cart.model.js";

export async function fetchCartItems(req, res) {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(200).json({
        message: "Cart is empty",
        cartItems: [],
      });
    }

    return res.status(200).json({
      message: "Successfully fetched cart items",
      userId,
      cartItems: cart.cartItems,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function addToCart(req, res) {
  try {
    const userId = req.user._id;
    const { itemId, name, description, imageId, price, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        cartItems: [{ itemId, name, description, imageId, price, quantity }],
      });
    } else {
      const existingItemIndex = cart.cartItems.findIndex(
        (item) => item.itemId === itemId
      );

      if (existingItemIndex !== -1) {
        cart.cartItems[existingItemIndex].quantity += 1;
      } else {
        cart.cartItems.push({
          itemId,
          name,
          description,
          imageId,
          price,
          quantity,
        });
      }
    }

    await cart.save();

    return res
      .status(200)
      .json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function increaseItemQuantity(req, res) {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.itemId === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    if (cart.cartItems[itemIndex].quantity >= 1) {
      cart.cartItems[itemIndex].quantity += 1;
    } else {
      return res.status(400).json({
        message: "Please add the item in the card",
      });
    }

    await cart.save();

    return res.status(200).json({
      message: "Item removed from cart",
      quantity: cart.cartItems[itemIndex].quantity,
    });
  } catch (error) {
    z;
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function decreaseItemQuantity(req, res) {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.itemId === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    if (cart.cartItems[itemIndex].quantity > 1) {
      cart.cartItems[itemIndex].quantity -= 1;
    } else {
      cart.cartItems.splice(itemIndex, 1);
    }

    await cart.save();

    return res.status(200).json({
      message: "Item removed from cart",
      quantity: cart.cartItems[itemIndex].quantity,
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function clearCart(req, res) {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.cartItems.splice(0, cart.cartItems.length);
    await cart.save();

    return res.status(200).json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
