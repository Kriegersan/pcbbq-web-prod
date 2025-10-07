import React, { useState, useEffect } from 'react';
import FireImage from './assets/PXL_20251005_165652944~2.jpg';
import BrisketImage from './assets/PXL_20251005_190600955~2.jpg';
import FullPlateImage from './assets/20231104_184932.jpg';
import WingsImage from './assets/Copy of PXL_20220704_234728019.jpg';
import BreakfastImage from './assets/PXL_20220410_172128719.jpg';
import UsImage from './assets/20200626_130143.jpg';
import LogoImage from './assets/PCBLogo_nobak.png';

// SVG Icons for better visuals without image dependencies
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- Components ---

const Header = ({ setCurrentPage, isMenuOpen, setIsMenuOpen }) => {
  const navLinks = ['Home', 'Menu', 'Our Story', 'Contact Us'];

  return (
    <header className="bg-[#05412b] bg-opacity-90 backdrop-blur-md text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={LogoImage} alt="Pine Coast BBQ Logo" className="h-12 w-auto" />
          <h1 className="text-3xl font-bold text-[#bf9000] tracking-wider font-serif ml-3">Pine Coast BBQ</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <button key={link} onClick={() => setCurrentPage(link.toLowerCase().replace(' ', '-'))} className="hover:text-[#bf9000] transition-colors duration-300 text-lg">
              {link}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#05412b]">
          <nav className="flex flex-col items-center px-4 pt-2 pb-4 space-y-2">
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => {
                  setCurrentPage(link.toLowerCase().replace(' ', '-'));
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-2 hover:bg-green-800 rounded-md transition-colors duration-300"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const images = [
    FireImage,
    BrisketImage,
    FullPlateImage,
    WingsImage,
    BreakfastImage
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [images.length]);

  return (
    <div
      className="bg-cover bg-center h-[60vh] text-white flex items-center justify-center transition-all duration-1000"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${images[currentIndex]}')` }}>
      <div className="text-center px-4">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-xl font-serif">Authentic Maine BBQ</h2>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-lg">Slow-smoked perfection, crafted with passion and local hardwoods.</p>
      </div>
    </div>
  );
};

const HomePage = ({ setCurrentPage }) => (
  <div>
    <Hero />
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-4xl font-bold text-[#05412b] mb-8">Taste the Tradition</h3>
        <p className="text-lg text-[#2d2c2c] max-w-3xl mx-auto mb-10">
          Pine Coast BBQ is a budding business based in Maine founded by Keith and Laura Nelson. The mission and vision of Pine Coast BBQ is to serve bold, soulful barbecue inspired by Texas, Georgia, and Kansas City traditions—crafted with Maine-grown ingredients and coastal heritage—while creating a welcoming space that feeds connection, celebration, and local pride as a hub for locals and visitors alike
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div
            onClick={() => setCurrentPage('menu')}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
          >
            <h4 className="text-2xl font-semibold text-[#6aa84f] mb-3">Tender Brisket</h4>
            <p>12-hour smoked, hand-sliced, and served with our signature sauce.</p>
          </div>
          <div
            onClick={() => setCurrentPage('menu')}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
          >
            <h4 className="text-2xl font-semibold text-[#45818e] mb-3">Pulled Pork</h4>
            <p>Fall-apart tender pork shoulder, perfect in a sandwich or on its own.</p>
          </div>
          <div
            onClick={() => setCurrentPage('menu')}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
          >
            <h4 className="text-2xl font-semibold text-[#cc0000] mb-3">Savory Ribs</h4>
            <p>St. Louis style ribs, glazed with a sweet and tangy finish.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const MenuPage = () => {
    // Menu Data Structure
    const menuData = {
        introduction: [
            "The limited menu is selected with purpose, and remains traditional to classic southern bbq with Maine ingredients. Pine Coast BBQ is rooted in family and tradition, drawing influence beyond Maine to the co-founder's German-American heritage.",
            "Maine has a rich history of agriculture. Pine Coast BBQ brings a bold, innovative twist to traditional barbecue, redefining what a Maine family restaurant can be. With a commitment to creativity and a fearless approach to flavor, our fusion-style menu blends hometown comfort with unexpected combinations that go beyond southern staples."
        ],
        smallBites: {
            price: "$9",
            items: [
                { name: "Farmstand Veggie Dippers", description: "Crisp cucumbers, sweet bell peppers, crunchy carrots, and golden fried green beans served with creamy farmhouse ranch" },
                { name: "Lumberjack Jalapeños", description: "Smoked jalapeños stuffed with melty cheese and tender pulled pork, wrapped in crispy bacon, and finished with a bold and vibrant pepper sauce" },
                { name: "BBQ Shrimp Cocktail", description: "Chilled, smoked BBQ shrimp served with a zesty cocktail sauce" },
                { name: "Elote Corn Dip", description: "Creamy, cheesy street corn dip with a hint of spice and citrus, served warm alongside soft pretzel buns and crunchy tortilla chips" },
                { name: "Pinecone Poppers", description: "Our Maine take on the classic BBQ “shotgun shells” of stuffed pasta shells filled with brisket and cheese, wrapped in bacon and served with our classic BBQ sauce and cool ranch" },
                { name: "Smokestack Stuffers", description: "Golden-fried bites of our creamy, smoked mac and cheese stuffed with pulled pork, pickled jalapenos, and crispy bacon. Served with bold and vibrant pepper sauce and our classic BBQ sauce" }
            ]
        },
        dinnerPlates: {
            description: "all served with Pickles, Picked onions and jalapenos",
            options: [
                "1 meat, 1 side", "2 meats, 2 sides", "3 meats, 3 sides", "4 meats, 4 sides", "Family platter - 5 meats, 5 sides"
            ]
        },
        meats: [
            "Brisket", "Pulled Pork", "Pork Ribs", "Chicken quarters", "Chicken legs", "Chicken thighs", "Chicken wings", "Beef ribs", "Burnt ends: beef or pork", "Sausage (Chorizo sausage, Jalapeno cheddar sausage, and Veggie Sausage)", "Pulled turkey or sliced turkey breast", "Lobster tails (Mrkt availability)"
        ],
        sandwiches: {
            description: "served with 2 sides",
            items: [
                { name: "Pulled Pork Sandwich", description: "Slow-smoked pulled pork piled high on a toasted bun, topped with creamy coleslaw and crisp pickles" },
                { name: "Brisket Sandwich", description: "Thin sliced tender brisket piled high on a toasted bun, topped with creamy coleslaw and crisp pickles" },
                { name: "Chicken Sandwich", description: "Slow-smoked pulled chicken piled high on a toasted bun, topped with creamy coleslaw and crisp pickles" },
                { name: "Smoked BBQ Meatball Sub", description: "House-smoked meatballs drenched in our classic BBQ sauce, topped with melted cheese, pickled jalapenos, and fresh scallions, served on a toasted sub roll" },
                { name: "Smoked Brisket Cheesesteak", description: "Chopped, smoked brisket grilled with peppers and onions, smothered in melted cheese, and served on a toasted sub roll" }
            ]
        },
        sides: {
            price: "$4 for small, $5 for large",
            items: [
                { name: "Smoked Mac 'n Cheese", description: "Classic macaroni bathed in a rich blend of melted cheeses, slow-smoked directly on the pit for deep, wood-fired flavor." },
                { name: "Classic Coleslaw", description: "Crisp cabbage and carrots tossed in a tangy, creamy dressing sweetened naturally" },
                { name: "Cornbread Duo: Choose your flavor", description: "Sweet Maple Butter – Soft, golden cornbread served with whipped maple butter\nSpicy Jalapeño Cheddar – A bold twist with melty cheddar and a kick of jalapeño" },
                { name: "BLT Pasta Salad", description: "A twist on a classic with pasta tossed with smoky bacon, juicy tomatoes, and herbs in a creamy homemade Ranch dressing" },
                { name: "Bean Hole Beans", description: "Slow-cooked in traditional Maine bean hole style, these rich, molasses-kissed beans are smoky, sweet, and deeply satisfying" },
                { name: "Classic Potato Salad", description: "Tender red potatoes mixed with eggs, onion, celery, and a creamy mustard dressing finished with fresh herbs" },
                { name: "Smoked Elote", description: "Smoked sweet corn on the cob tossed with spices, creamy sauce, cotija cheese, and fresh herbs" },
                { name: "Farmhouse Salad", description: "Fresh greens and garden veggies served with homemade Ranch dressing" },
                { name: "Chipotle Caesar", description: "Crisp romaine tossed in smoky chipotle Caesar dressing, topped with cheddar and crunchy cornbread croutons" },
                { name: "Hand Cut Fries", description: "Fresh-cut and fried to golden perfection, seasoned with your choice of our signature BBQ rub or Salt & Vinegar." }
            ]
        },
        desserts: {
            price: "$8",
            items: [
                { name: "Maine Blueberry Sheet Cake", description: "A moist, tender sheet cake bursting with wild Maine blueberries and lightly dusted with maple sugar" },
                { name: "S’mores Slab Pie", description: "Layers of rich chocolate nestled in a graham cracker crust, baked to perfection and finished with homemade marshmallow fluff, torched golden and sprinkled with more graham for that fireside feel" },
                { name: "Key Lime Pie Jars", description: "Tangy key lime custard served in mini mason jars, topped with a cloud of toasted marshmallow meringue" },
                { name: "Maple Custard Pie", description: "Slab-style pie with a buttery crust and silky maple custard filling, drizzled with bourbon maple caramel and served warm with a scoop of vanilla ice cream" },
                { name: "Seasonal Hand Pies with Ice Cream", description: "Flaky, golden hand pies filled with the season’s best fruits, served warm with a scoop of creamy vanilla ice cream. Rustic, nostalgic, and always changing with the harvest" }
            ]
        }
    };

    const MenuCategory = ({ title, children, subtitle }) => (
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-[#05412b] border-b-2 border-[#05412b]/30 pb-2 mb-2">{title}</h3>
            {subtitle && <p className="text-md text-gray-600 mb-6 italic">{subtitle}</p>}
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );

    const MenuItem = ({ name, description, price }) => (
        <div>
            <div className="flex justify-between items-baseline">
                <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
                {price && <p className="text-lg font-medium text-gray-700 whitespace-nowrap pl-4">{price}</p>}
            </div>
            <p className="text-md text-gray-600 mt-1" style={{ whiteSpace: 'pre-line' }}>{description}</p>
        </div>
    );

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-center text-5xl font-bold text-gray-800 mb-8 font-serif">Our Menu</h2>
                <div className="text-center text-gray-700 space-y-4 mb-12">
                    {menuData.introduction.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>

                {/* Small Bites */}
                <MenuCategory title="Small Bites" subtitle={menuData.smallBites.price}>
                    {menuData.smallBites.items.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                {/* Dinner Plates */}
                <MenuCategory title="Dinner Plates" subtitle={menuData.dinnerPlates.description}>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {menuData.dinnerPlates.options.map(option => (
                           <div key={option} className="bg-white p-3 rounded-lg shadow-sm">
                               <p className="font-semibold">{option}</p>
                           </div>
                        ))}
                    </div>
                </MenuCategory>

                {/* Meats */}
                 <MenuCategory title="Meats">
                    <p className="columns-2 md:columns-3 gap-x-8 text-gray-700">
                        {menuData.meats.map(meat => <span key={meat} className="block mb-1">{meat}</span>)}
                    </p>
                </MenuCategory>

                {/* Sandwiches */}
                <MenuCategory title="Sandwiches" subtitle={menuData.sandwiches.description}>
                    {menuData.sandwiches.items.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>
                
                {/* Sides */}
                <MenuCategory title="Sides" subtitle={menuData.sides.price}>
                    {menuData.sides.items.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>
                
                {/* Desserts */}
                <MenuCategory title="Desserts" subtitle={menuData.desserts.price}>
                    {menuData.desserts.items.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

            </div>
        </div>
    );
};
const OurStoryPage = () => (
    <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-center text-5xl font-bold text-gray-800 mb-12 font-serif">Our Story</h2>
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                    <img src={UsImage} alt="Our Smoker" className="rounded-lg shadow-xl w-full h-auto"/>
                </div>
                <div className="md:w-1/2 text-lg text-gray-700 space-y-4">
                     <p>
                        Pine Coast BBQ was born from a simple idea: that Maine deserves its own style of barbecue, one that respects the traditions of the American South while celebrating the unique character of our state. It all started in a backyard in Lisbon with a small smoker, a family recipe for BBQ sauce, and a business plan built on passion.
                    </p>
                    <p>
                        Pine Coast BBQ is a budding business based in Maine founded by Keith and Laura Nelson. The mission and vision of Pine Coast BBQ is to serve bold, soulful barbecue inspired by Texas, Georgia, and Kansas City traditions—crafted with Maine-grown ingredients and coastal heritage—while creating a welcoming space that feeds connection, celebration, and local pride as a hub for locals and visitors alike. 
                    </p>
                    <p>
                        Our community and experiential services are designed to foster connection, creativity, and local pride. At Pine Coast BBQ, our culture is rooted in family values and a shared commitment to quality, integrity, teamwork, growth, and heart. We believe in making good food—and making it the right way.
                    </p>
                    <p>
                        We didn't have much money, but we had a dedication to the craft. We spent countless hours perfecting our smoking techniques, using locally sourced oak and maple to give our meats a flavor you won't find anywhere else. Our journey began with small catering gigs and pop-ups at local breweries, building our reputation one satisfied customer at a time.
                    </p>
                    <p>
                        Keith brings more than 15 years of professional expertise in the technology field, achieving innovative solutions to technical problems as an Engineer while working for impact-oriented organizations. Laura brings 12 years of health care quality improvement, project management, and operational community health experience, achieving high-impact results for health systems across the globe to improve better care for older adults. Our vision is to be Maine’s go-to destination for authentic, regionally inspired barbecue—fusing Southern smoke with local produce and hospitality, and growing a business that gives back to the community it calls home.
                    </p>
                </div>
            </div>
        </div>
    </div>
);
const apiUrl = process.env.REACT_APP_API_URL || '';
const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Sending...', type: 'info' });

    try {
        const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ message: 'Success! We will get back to you soon.', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus({ message: `Error: ${errorData.error || 'Something went wrong.'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ message: 'Error: Could not connect to the server.', type: 'error' });
    }
  };

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-center text-4xl font-bold text-[#05412b] mb-2 font-serif">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-8">Pine Coast BBQ offers catering and special options for events, weddings, family celebrations, and corporate functions with customizable menus, in person support, or delivery options. Have a question or a catering request? Drop us a line!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6aa84f] focus:border-[#6aa84f]" placeholder="John Doe" required />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6aa84f] focus:border-[#6aa84f]" placeholder="you@example.com" required />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6aa84f] focus:border-[#6aa84f]" placeholder="Your message here..." required></textarea>
            </div>
            <button type="submit" className="w-full bg-[#6aa84f] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#5a9142] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6aa84f]">
              Send Message
            </button>
          </form>
          {status.message && (
            <div className={`mt-4 text-center p-3 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-800' : ''} ${status.type === 'error' ? 'bg-red-100 text-red-800' : ''} ${status.type === 'info' ? 'bg-blue-100 text-blue-800' : ''}`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const InstagramIcon = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = () => (
  <footer className="bg-[#2d2c2c] text-white">
    <div className="container mx-auto px-6 py-8 text-center">
      <p>&copy; {new Date().getFullYear()} Pine Coast BBQ. All Rights Reserved.</p>
      <p className="text-sm text-gray-400 mt-2">Lisbon, Maine</p>
      <div className="flex justify-center mt-4">
        <a href="https://www.instagram.com/pinecoastbbq?igsh=M3BwMmN3eHYwZzhw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
          <InstagramIcon />
        </a>
      </div>
    </div>
  </footer>
);


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <MenuPage />;
      case 'our-story':
        return <OurStoryPage />;
      case 'contact-us':
        return <ContactUsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="font-sans bg-gray-50">
      <Header setCurrentPage={setCurrentPage} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;