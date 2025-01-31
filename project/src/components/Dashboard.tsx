import React, { useState } from 'react';
import { PlusCircle, Trash2, ExternalLink, CreditCard, ShoppingCart } from 'lucide-react';
import { X } from 'lucide-react';

interface Card {
  id: string;
  nameOnCard: string;
  bankName: string;
  cardType: 'Credit' | 'Debit';
  maxAmount: number;
}

interface OrderRequest {
  id: string;
  productName: string;
  ecommerceWebsite: string;
  selectedCard: string;
  productLink: string;
  address: string;
  totalAmount: number;
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [orders, setOrders] = useState<OrderRequest[]>([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newCard, setNewCard] = useState({
    nameOnCard: '',
    bankName: '',
    cardType: 'Credit',
    maxAmount: 0,
  });
  const [newOrder, setNewOrder] = useState({
    productName: '',
    ecommerceWebsite: '',
    selectedCard: '',
    productLink: '',
    address: '',
    totalAmount: 0,
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const card: Card = {
      id: Date.now().toString(),
    nameOnCard: newCard.nameOnCard,
    bankName: newCard.bankName,
    cardType: newCard.cardType as 'Credit' | 'Debit', // Explicitly cast the type
    maxAmount: newCard.maxAmount,
    };
    setCards([...cards, card]);
    setNewCard({
      nameOnCard: '',
      bankName: '',
      cardType: 'Credit',
      maxAmount: 0,
    });
    setShowCardForm(false);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order: OrderRequest = {
      id: Date.now().toString(),
      ...newOrder,
    };
    setOrders([...orders, order]);
    setNewOrder({
      productName: '',
      ecommerceWebsite: '',
      selectedCard: '',
      productLink: '',
      address: '',
      totalAmount: 0,
    });
    setShowOrderForm(false);
  };

  return (
    <div className="min-h-screen bg-[#fffff0]">
      {/* Main Actions */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setShowCardForm(true)}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center space-y-4"
          >
            <CreditCard className="w-16 h-16 text-[#663046]" />
            <h2 className="text-2xl font-bold text-[#663046]">Card Management</h2>
            <p className="text-gray-600 text-center">
              Add and manage your bank cards with special offers
            </p>
          </button>

          <button
            onClick={() => setShowOrderForm(true)}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center space-y-4"
          >
            <ShoppingCart className="w-16 h-16 text-[#663046]" />
            <h2 className="text-2xl font-bold text-[#663046]">Product Order Request</h2>
            <p className="text-gray-600 text-center">
              Submit new product order requests
            </p>
          </button>
        </div>

        {/* Cards List */}
        {cards.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#663046] mb-4">Your Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold">{card.nameOnCard}</h3>
                    <p className="text-sm text-gray-600">
                      {card.bankName} • {card.cardType}
                    </p>
                    <p className="text-sm text-gray-600">
                      Max Amount: ₹{card.maxAmount.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#663046] mb-4">Your Orders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow p-4"
                >
                  <h3 className="font-semibold">{order.productName}</h3>
                  <p className="text-sm text-gray-600">
                    {order.ecommerceWebsite}
                  </p>
                  <p className="text-sm text-gray-600">
                    Amount: ₹{order.totalAmount.toLocaleString()}
                  </p>
                  <a
                    href={order.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#663046] hover:underline text-sm flex items-center mt-2"
                  >
                    View Product
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Management Modal */}
      {showCardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto mt-20">
            <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowCardForm(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#663046] mb-6">Add New Card</h2>
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={newCard.nameOnCard}
                    onChange={(e) => setNewCard({ ...newCard, cardType: e.target.value as 'Credit' | 'Debit' })}

                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={newCard.bankName}
                    onChange={(e) => setNewCard({ ...newCard, bankName: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Type
                  </label>
                  <select
                    value={newCard.cardType}
                    onChange={(e) => setNewCard({ ...newCard, cardType: e.target.value as 'Credit' | 'Debit' })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    required
                  >
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Order Amount
                  </label>
                  <input
                    type="number"
                    value={newCard.maxAmount}
                    onChange={(e) => setNewCard({ ...newCard, maxAmount: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#663046] text-white py-2 rounded-lg hover:bg-opacity-90 flex items-center justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Card
                </button>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* Order Request Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowOrderForm(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#663046] mb-6">New Order Request</h2>
              <form onSubmit={handleAddOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newOrder.productName}
                    onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-commerce Website
                  </label>
                  <input
                    type="text"
                    value={newOrder.ecommerceWebsite}
                    onChange={(e) => setNewOrder({ ...newOrder, ecommerceWebsite: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Card with Offer
                  </label>
                  <select
                    value={newOrder.selectedCard}
                    onChange={(e) => setNewOrder({ ...newOrder, selectedCard: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    required
                  >
                    <option value="">Select a card</option>
                    {cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.bankName} - {card.nameOnCard}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Link
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={newOrder.productLink}
                      onChange={(e) => setNewOrder({ ...newOrder, productLink: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent pr-10"
                      required
                    />
                    <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipping Address
                  </label>
                  <textarea
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    value={newOrder.totalAmount}
                    onChange={(e) => setNewOrder({ ...newOrder, totalAmount: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#663046] focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#663046] text-white py-2 rounded-lg hover:bg-opacity-90 flex items-center justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;