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
  const navLinks = ['Home', 'Menu', 'Game Day', 'Weddings', 'Our Story', 'Contact Us'];

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

// Shared menu-style building blocks, used by both the Menu and Game Day pages.
const MenuCategory = ({ title, children, subtitle }) => (
    <div className="mb-12">
        <h3 className="text-3xl font-bold text-[#05412b] border-b-2 border-[#05412b]/30 pb-2 mb-2">{title}</h3>
        {subtitle && <p className="text-md text-gray-600 mb-6 italic">{subtitle}</p>}
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const MenuItem = ({ name, description, price, note, subItems }) => (
    <div>
        <div className="flex justify-between items-baseline">
            <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
            {price && <p className="text-lg font-medium text-gray-700 whitespace-nowrap pl-4">{price}</p>}
        </div>
        {description && <p className="text-md text-gray-600 mt-1" style={{ whiteSpace: 'pre-line' }}>{description}</p>}
        {note && <p className="text-md text-gray-500 italic mt-1">{note}</p>}
        {subItems && (
            <ul className="list-disc list-inside text-md text-gray-600 mt-2 sm:columns-2">
                {subItems.map(s => <li key={s}>{s}</li>)}
            </ul>
        )}
    </div>
);

// A section heading matching MenuCategory's title style, for content (like
// pricing tables) that isn't a list of MenuItems.
const SectionHeading = ({ children }) => (
    <h3 className="text-3xl font-bold text-[#05412b] border-b-2 border-[#05412b]/30 pb-2 mb-6">{children}</h3>
);

// Reusable pricing/serving-size table for package pages (Game Day, Weddings).
// `rows` is an array of arrays; each row's first cell is treated as the label.
const PricingTable = ({ columns, rows }) => (
    <div className="mb-10 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
                <tr className="border-b-2 border-[#05412b]/30">
                    {columns.map(col => (
                        <th key={col} className="py-2 pr-4 text-lg font-bold text-[#05412b]">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr key={row[0]} className="border-b border-gray-200 align-top">
                        {row.map((cell, i) => (
                            <td key={i} className={`py-3 pr-4 text-gray-600 ${i === 0 ? 'font-semibold text-gray-800 whitespace-nowrap' : ''}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const MenuPage = () => {
    // Menu Data Structure
    const menuData = {
        introduction: [
            "Maine has a rich history of agriculture. Pine Coast BBQ brings a bold, innovative twist to traditional barbecue, redefining what a Maine family restaurant can be. With a commitment to creativity and a fearless approach to flavor, our fusion-style menu blends hometown comfort with unexpected combinations that go beyond southern staples."
        ],
        dinnerPlates: {
            description: "all served with pickles, picked onions and jalapenos",
            options: [
                "Mini Platter – 3 meats, 3 sides, served with cornbread",
                "Family Platter – 5 meats, 5 sides, served with cornbread"
            ]
        },
        meats: [
            "Brisket", "Pulled Pork", "Pork Ribs", "Chicken Thighs", "Turkey Breast", "House Sausage", "Gouda & Poblano Sausage", "Lobster Tails (Mrkt availability)"
        ],
        sandwiches: {
            description: "all served with choice of 2 sides",
            items: [
                { name: "Pulled Pork Sandwich", description: "Slow-smoked pulled pork piled high on a toasted bun, topped with creamy coleslaw and crisp pickles" },
                { name: "Brisket Sandwich", description: "Thin sliced tender brisket piled high on a toasted bun, topped with creamy coleslaw and crisp pickles" }
            ]
        },
        sides: {
            note: "+$2 Cornbread with Maple Butter",
            items: [
                { name: "Smoked Mac 'n Cheese", description: "Classic macaroni bathed in a rich blend of melted cheeses, slow-smoked directly on the pit for deep, wood-fired flavor." },
                { name: "Classic Coleslaw", description: "Crisp cabbage and carrots tossed in a tangy, creamy dressing sweetened naturally" },
                { name: "Bean Hole Beans", description: "Slow-cooked in traditional Maine bean hole style, these rich, molasses-kissed beans are smoky, sweet, and deeply satisfying" },
                { name: "Classic Potato Salad", description: "Tender red potatoes mixed with eggs, onion, celery, and a creamy mustard dressing finished with fresh herbs" }
            ]
        },
        desserts: {
            items: [
                { name: "Maine Blueberry Sheet Cake", description: "A moist, tender sheet cake bursting with wild Maine blueberries and lightly dusted with maple sugar" },
                { name: "S’mores Slab Pie", description: "Layers of rich chocolate nestled in a graham cracker crust, baked to perfection and finished with homemade marshmallow fluff, torched golden and sprinkled with more graham for that fireside feel" },
                { name: "Key Lime Pie Jars", description: "Tangy key lime custard served in mini mason jars, topped with a cloud of toasted marshmallow meringue" },
                { name: "Maple Custard Pie", description: "Slab-style pie with a buttery crust and silky maple custard filling, drizzled with bourbon maple caramel and served warm with a scoop of vanilla ice cream" },
                { name: "Seasonal Hand Pies with Ice Cream", description: "Flaky, golden hand pies filled with the season’s best fruits, served warm with a scoop of creamy vanilla ice cream. Rustic, nostalgic, and always changing with the harvest" }
            ]
        }
    };

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-center text-5xl font-bold text-gray-800 mb-8 font-serif">Our Menu</h2>
                <div className="text-center text-gray-700 space-y-4 mb-12">
                    {menuData.introduction.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>

                {/* Meats */}
                <MenuCategory title="Meats">
                    <p className="columns-2 md:columns-3 gap-x-8 text-gray-700">
                        {menuData.meats.map(meat => <span key={meat} className="block mb-1">{meat}</span>)}
                    </p>
                </MenuCategory>

                {/* Sides */}
                <MenuCategory title="Sides">
                    {menuData.sides.items.map(item => <MenuItem key={item.name} {...item} />)}
                    <p className="text-md text-gray-700 font-medium pt-2">{menuData.sides.note}</p>
                </MenuCategory>

                {/* Dinner Plates */}
                <MenuCategory title="Dinner Plates" subtitle={menuData.dinnerPlates.description}>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        {menuData.dinnerPlates.options.map(option => (
                           <div key={option} className="bg-white p-4 rounded-lg shadow-sm">
                               <p className="font-semibold">{option}</p>
                           </div>
                        ))}
                    </div>
                </MenuCategory>

                {/* Sandwiches */}
                <MenuCategory title="Sandwiches" subtitle={menuData.sandwiches.description}>
                    {menuData.sandwiches.items.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                {/* Desserts */}
                <MenuCategory title="Desserts">
                    {menuData.desserts.items.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <p className="text-center text-2xl font-semibold text-[#05412b] mt-12 font-serif">Brunch coming soon!</p>

            </div>
        </div>
    );
};

const GameDayPage = () => {
    const packages = [
        ["The Backyard Feast", "Includes a choice of two smoked meats, two side platters, and choice of cornbread.", "$26 per person"],
        ["The Smokehouse Feast", "Includes a choice of three smoked meats, three side platters, and a choice of one small bite.", "$35 per person"],
        ["The Grazing Game Day Feast", "Designed for cocktail hours, open houses, or casual social gatherings. Includes your choice of 2 smoked meats, 2 side platters, and a selection of 3 small bites.", "$30 per person"],
        ["The Soup & Sandwich Bundle", "Includes a choice of bulk soup (Smoked Seafood Chowder or Cowboy Chili), a slider bundle with pulled pork or chicken, and one side salad.", "$22 per person"],
        ["The Sweet Finish Upgrade", "Add a dessert to any package.", "$6 per person"],
    ];

    const alaCarte = [
        ["Small Bite Platters", "Serves 10–12 guests (approx. 30–35 pieces total)", "$65 – $85 per platter, or $4.50 – $6.00 per piece (individual count)"],
        ["Meat Platters", "Serves 10–12 guests (approx. 4–5 lbs, served buffet style)", "$120 – $170 per platter, or $14 – $18 per person"],
        ["Side Platters", "Serves 12–15 guests (standard half-pan pans)", "$45 – $65 per half-pan"],
        ["Soups & Sandwich Platters", "Serves 10–12 guests. Bulk quart options of Smoked Seafood Chowder, Brisket Soup, Chili, or slider/sandwich bundles with buns.", "$75 – $110 per soup gallon / $90 per sandwich platter"],
        ["Desserts", "Serves 10–12 guests", "$40 – $60 per whole cake or sweet tray"],
    ];

    const smallBites = [
        { name: "Farmstand Veggie Dippers", description: "Crisp cucumbers, sweet bell peppers, crunchy carrots, and golden fried green beans served with a homemade, farmhouse ranch." },
        { name: "Lumberjack Jalapeños", description: "Smoked jalapeños stuffed with melty cheese and tender pulled pork, wrapped in crispy bacon, and finished with a bold and vibrant pepper sauce." },
        { name: "BBQ Shrimp Cocktail", description: "Chilled, smoked BBQ shrimp served with a zesty cocktail sauce." },
        { name: "Elote Corn Dip", description: "Creamy, cheesy street corn dip with a hint of spice and citrus, served warm alongside soft pretzel buns and crunchy tortilla chips." },
        { name: "Pinecone Poppers", description: "Our Maine take on the classic BBQ “shotgun shells” of stuffed pasta shells filled with brisket and cheese, wrapped in bacon and served with our classic BBQ sauce and cool ranch." },
        { name: "Smokestack Stuffers", description: "Golden-fried bites of our creamy, smoked mac and cheese stuffed with pulled pork, pickled jalapenos, and crispy bacon. Served with bold and vibrant pepper sauce and our classic BBQ sauce." },
        { name: "Smoked Buffalo Chicken Dip", description: "A spicy blend of smoked pulled chicken, rich cheese, and buffalo sauce, infused with a deep hardwood smoke flavor and served warm with tortilla chips and crudité." },
        { name: "BBQ Eggrolls", description: "Crispy, golden-fried wrappers packed with tender pulled pork, caramelized onions, cheese, and coleslaw, served with a side of our house BBQ sauce." },
        { name: "Smoked Chex Mix", description: "A classic crunchy cereal snack slow-smoked with our house BBQ seasoning for an addictive, BBQ twist on a party favorite." },
        { name: "Mac n Cheese Bombs", description: "Crispy deep-fried balls of creamy mac n cheese loaded with pulled pork, caramelized onions, and sweet-and-spicy candied jalapeños, served with a vibrant green Peruvian hot pepper sauce and our house BBQ sauce." },
        { name: "Mini Chicken & Waffle Bites", description: "Golden, bite-sized buttermilk blueberry waffles topped with a pile of pulled chicken, skewered and served with a chipotle maple drizzle." },
        { name: "Brisket Deviled Eggs", description: "Rich, smoky egg yolks crowned with tender smoked brisket, sweet-and-spicy candied jalapeños, and fresh chives." },
        { name: "Smoked Chipotle Queso", description: "Velvety, melted cheese dip spiced with smoky chipotle peppers, roasted poblanos, and aromatic herbs, served piping hot with house tortilla chips." },
        { name: "Smoked Lobster Fritters", description: "Smoked Old Bay seasoned lobster tail and claw meat inside a deep fried donut bite served with a vibrant green Peruvian hot pepper sauce." },
        { name: "Ranch Pickle Dip", description: "Cool, creamy ranch dip blended with zesty dill pickles and fresh herbs, served with crisp fresh vegetables and potato chips for ultimate dipping." },
        { name: "Reuben Bites", description: "Pretzel bites stuffed with smoked corned beef, tangy sauerkraut, and melted Swiss cheese, served with a side of zesty thousand island dressing." },
    ];

    const meats = [
        { name: "BBQ Smoked Chicken Wings", description: "Juicy chicken wings rubbed with our house seasoning, slow-smoked and served with our house BBQ sauce and homemade farmhouse ranch." },
        { name: "Texas-Style Brisket", description: "Prime beef brisket seasoned simply with salt and coarse black pepper, slow-smoked for up to 16 hours until melt-in-your-mouth tender with a rich, peppery bark.", note: "An award winning classic" },
        { name: "Pulled Pork", description: "Boston butt pork roast rubbed, smoked low and slow, and hand-shredded into tender, juicy ribbons of savory perfection." },
        { name: "Pork Ribs", description: "Rack of tender ribs featuring a sticky, caramelized maple glaze and sweet-and-savory rub." },
        { name: "Chicken Quarters", description: "Juicy, bone-in chicken legs infused with aromatic wood smoke and finished with a crisp, seasoned skin." },
        { name: "Smoked Lobster Tails", description: "Fresh coastal lobster tails gently kissed with wood smoke and basted in Old Bay butter." },
        { name: "Burnt Ends (Beef or Pork)", description: "The prized, heavily barked “candy of the barbecue,” cubed, re-seasoned, caramelized in our house BBQ sauce, and rendered to melt in your mouth." },
        { name: "House Made Sausage", description: "Custom-blended, artisan sausage stuffed in-house, slow-smoked, and loaded with flavor. A few examples:", subItems: ["House Sausage", "Gouda & Poblano", "Blueberry Breakfast", "Octoberfest", "Dilly Boy", "Apple Cheddar"] },
        { name: "Turkey Breast", description: "Juicy turkey breast rubbed with our house seasoning and smoked until tender and juicy." },
        { name: "Pulled Chicken", description: "Juicy whole-chicken meat slow-smoked and shredded into juicy, flavorful morsels tossed lightly in our signature BBQ sauce." },
        { name: "Brisket Meatballs", description: "Hand-rolled meatballs crafted from ground smoked brisket, charred to perfection, and simmered in a rich, savory glaze." },
    ];

    const sidePlatters = [
        { name: "Smoked Mac 'n Cheese", description: "Classic macaroni bathed in a rich blend of melted cheeses, slow-smoked directly on the pit for deep, wood-fired flavor and topped with buttered, cheesy breadcrumbs." },
        { name: "Classic Coleslaw", description: "Crisp cabbage and carrots tossed in a tangy, creamy dressing sweetened naturally." },
        { name: "BLT Pasta Salad", description: "A twist on a classic with pasta tossed with smoky bacon, juicy tomatoes, and herbs in a creamy homemade Ranch dressing." },
        { name: "Classic Potato Salad", description: "Tender red potatoes mixed with eggs, onion, celery, and a creamy mustard dressing finished with fresh herbs." },
        { name: "Bean Hole Beans", description: "Slow-cooked in traditional Maine bean hole style, these rich, molasses-kissed beans are smoky, sweet, and deeply satisfying." },
        { name: "Smoked Elote", description: "Smoked sweet corn tossed with creamy sauce, cotija cheese, jalapenos, red onion, and fresh herbs." },
        { name: "Chipotle Caesar", description: "Crisp romaine tossed in smoky chipotle Caesar dressing, topped with cheddar and crunchy cornbread croutons." },
        { name: "Farmhouse Salad", description: "Fresh greens and garden veggies served with homemade Ranch dressing." },
        { name: "Hand Cut Fries", description: "Fresh-cut and fried to golden perfection, seasoned with your choice of our signature BBQ rub or Salt & Vinegar." },
        { name: "Elote Pasta Salad", description: "Our famous smoked elote tossed with pasta for a refreshing take on the classic." },
        { name: "Red Coleslaw", description: "Crisp shredded red cabbage and carrots tossed in a tangy, creamy dressing for a bright, crunchy twist on a backyard classic." },
        { name: "Cornbread Duo", description: "Sweet Maple Butter – Soft, golden cornbread served with whipped maple butter\nSpicy Jalapeño Cheddar – A bold twist with melty cheddar and a kick of jalapeño" },
    ];

    const sandwiches = [
        { name: "Pulled Pork Sandwich", description: "Slow-smoked pulled pork piled high on a toasted bun, topped with creamy coleslaw and crisp pickles." },
        { name: "Brisket Sandwich", description: "Thin sliced tender brisket piled high on a toasted bun, topped with creamy coleslaw and crisp pickles." },
        { name: "Smoked BBQ Meatball Sub", description: "House-smoked meatballs drenched in our classic BBQ sauce, topped with melted cheese, pickled jalapenos, and fresh scallions, served on a toasted sub roll." },
        { name: "Smoked Brisket Cheesesteak", description: "Chopped, smoked brisket grilled with peppers and onions, smothered in melted cheese, and served on a toasted sub roll." },
        { name: "Taco Trio", description: "Tacos packed with pulled chicken, brisket, and pork on a homemade corn tortilla, topped with cilantro, cotija cheese, scallions, and chipotle salsa." },
        { name: "Smoked Lobster Roll", description: "Smoked Old Bay seasoned lobster tail and claw meat tossed with mayo and served warm on a homemade milk roll with chives." },
    ];

    const soups = [
        { name: "Smoked Maine Seafood Chowdah", description: "Rich, velvety chowder loaded with fresh coastal seafood of haddock, crab, and smoked lobster, gently infused with hardwood smoke, finished with scallions, house made bacon, and Old Bay butter seasoned oyster crackers.", note: "An award winning classic" },
        { name: "Andie's Cowboy Chili", description: "Hearty, slow-smoked brisket and bean chili packed with bold spices, peppers, tomatoes, and a kick of smoky heat, crowned with shredded cheddar and scallions.", note: "An award winning classic" },
        { name: "Loaded Baked Potato Soup", description: "Thick, comforting potato soup blended with rich cream and leeks, topped with tender smoked brisket, sharp cheddar, bacon bits, jalapenos, and green onions." },
    ];

    const desserts = [
        { name: "Maine Blueberry Sheet Cake", description: "A moist, tender sheet cake bursting with wild Maine blueberries and lightly dusted with maple sugar." },
        { name: "S’mores Slab Pie", description: "Layers of rich chocolate nestled in a graham cracker crust, baked to perfection and finished with homemade marshmallow fluff, torched golden and sprinkled with more graham for that fireside feel." },
        { name: "Key Lime Pie Jars", description: "Tangy key lime custard served in mini mason jars, topped with a cloud of toasted marshmallow meringue." },
        { name: "Maple Custard Pie", description: "Slab-style pie with a buttery crust and silky maple custard filling, drizzled with bourbon maple caramel and served warm with a scoop of vanilla ice cream." },
        { name: "Corn-Flower Cake", description: "A rustic, golden cake baked with stone-ground cornmeal and fresh corn puree, featuring a caramelized turbinado sugar crust on the bottom and a sweet syrup glaze, served with fresh maple whipped cream." },
        { name: "Seasonal Hand Pies with Ice Cream", description: "Flaky, golden hand pies filled with the season’s best fruits, served warm with a scoop of creamy vanilla ice cream. Rustic, nostalgic, and always changing with the harvest." },
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-center text-5xl font-bold text-gray-800 mb-4 font-serif">Game Day Packages</h2>
                <p className="text-center text-gray-700 mb-12">
                    Serving sizes and pricing below are starting guides — reach out and we’ll tailor a package to your headcount.
                </p>

                <SectionHeading>Package Options</SectionHeading>
                <PricingTable columns={["Package", "Details", "Pricing"]} rows={packages} />

                <SectionHeading>Ala Carte Options</SectionHeading>
                <PricingTable columns={["Platter", "Serving Size", "Pricing"]} rows={alaCarte} />

                <MenuCategory title="Small Bite Platters">
                    {smallBites.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Meat Platters">
                    {meats.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Side Platters">
                    {sidePlatters.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Sandwiches">
                    {sandwiches.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Soups">
                    {soups.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Desserts">
                    {desserts.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>
            </div>
        </div>
    );
};

const WeddingPage = () => {
    const packages = [
        ["The Bronze Wedding Package", "A complete buffet-style setup featuring 2 premium smoked meats, 3 sides, dinner rolls, and one dessert. Includes professional buffet attendants, heavy-duty eco-friendly disposables, and on-site food maintenance.", "$38 – $45 per person"],
        ["The Golden Wedding Package", "Starts with a cocktail hour featuring a small-bite display of 3 artisanal appetizers, followed by a 3-meat main spread, 3 sides, wedding cake, and one late night snack. Includes full-service staffing for setup, guest-facing buffet tending, and breakdown.", "$52 – $62 per person"],
        ["The Platinum Wedding Package", "This all-inclusive, luxury spread covers the entire event timeline from cocktail hour to late-night bites. Features a grand cocktail hour display of 4 small bite appetizers, followed by an extravagant 4-meat main buffet or family-style service, 3 gourmet side platters, cornbread of your choice, wedding cake, one additional dessert, and two late night snacks. Includes comprehensive full-service staffing, professional on-site chefs, complete dinner maintenance, and a built-in late-night slider station.", "$80 – $100 per person"],
        ["The Late-Night Celebration Munchies", "A casual, high-impact grazing platter of your choice to keep guests dancing through the end of the night.", "$14 – $18 per person"],
    ];

    const alaCarte = [
        ["Small Bite Platters", "6 to 8 large platters (~350–400 total pieces, calculating 4–5 pieces per guest)", "$450 – $650 total, or $4.50 – $6.00 per piece"],
        ["Meat Platters", "40 to 45 lbs cooked weight (~50–55 lbs raw bulk proteins across Brisket, Pork, Ribs)", "$1,100 – $1,500 total, or $14 – $18 per person"],
        ["Side Platters", "6 to 7 full-size hotel pans (serves 100+ guests with generous buffet margins)", "$350 – $500 total, or ~$55 per full pan"],
        ["Soups & Sandwich Platters", "8 to 9 gallons of chowder/chili or 100-pack slider platters with fresh buns", "$650 – $900 total"],
        ["Desserts", "9 to 10 whole Sweet Corn Pound Cakes (yielding ~110–120 slices with buffer)", "$360 – $540 total"],
        ["Late Night Snacks", "8 to 9 bulk bowls/pans (serves 100–120 portions for dancing guests)", "$300 – $550 total"],
    ];

    const smallBites = [
        { name: "Farmstand Veggie Dippers", description: "Crisp cucumbers, sweet bell peppers, crunchy carrots, and golden fried green beans served with a homemade, farmhouse ranch." },
        { name: "Lumberjack Jalapeños", description: "Smoked jalapeños stuffed with melty cheese and tender pulled pork, wrapped in crispy bacon, and finished with a bold and vibrant pepper sauce." },
        { name: "BBQ Shrimp Cocktail", description: "Chilled, smoked BBQ shrimp served with a zesty cocktail sauce." },
        { name: "Elote Corn Dip", description: "Creamy, cheesy street corn dip with a hint of spice and citrus, served warm alongside soft pretzel buns and crunchy tortilla chips." },
        { name: "Pinecone Poppers", description: "Our Maine take on the classic BBQ “shotgun shells” of stuffed pasta shells filled with brisket and cheese, wrapped in bacon and served with our classic BBQ sauce and cool ranch." },
        { name: "Smokestack Stuffers", description: "Golden-fried bites of our creamy, smoked mac and cheese stuffed with pulled pork, pickled jalapenos, and crispy bacon. Served with bold and vibrant pepper sauce and our classic BBQ sauce." },
        { name: "BBQ Eggrolls", description: "Crispy, golden-fried wrappers packed with tender pulled pork, caramelized onions, cheese, and coleslaw, served with a side of our house BBQ sauce." },
        { name: "Mac n Cheese Bombs", description: "Crispy deep-fried balls of creamy mac n cheese loaded with pulled pork, caramelized onions, and sweet-and-spicy candied jalapeños, served with a vibrant green Peruvian hot pepper sauce and our house BBQ sauce." },
        { name: "Mini Chicken & Waffle Bites", description: "Golden, bite-sized buttermilk blueberry waffles topped with a pile of pulled chicken, skewered and served with a chipotle maple drizzle." },
        { name: "Brisket Deviled Eggs", description: "Rich, smoky egg yolks crowned with tender smoked brisket, sweet-and-spicy candied jalapeños, and fresh chives." },
        { name: "Smoked Lobster Fritters", description: "Smoked Old Bay seasoned lobster tail and claw meat inside a deep fried donut bite served with a vibrant green Peruvian hot pepper sauce." },
        { name: "Smoked Bacon-Wrapped Dates", description: "Sweet medjool dates stuffed with jalapeño cream cheese, wrapped in crisp hardwood-smoked bacon, and finished with our house BBQ sauce." },
    ];

    const meats = [
        { name: "Texas-Style Brisket", description: "Prime beef brisket seasoned simply with salt and coarse black pepper, slow-smoked for up to 16 hours until melt-in-your-mouth tender with a rich, peppery bark.", note: "An award winning classic" },
        { name: "Pulled Pork", description: "Boston butt pork roast rubbed, smoked low and slow, and hand-shredded into tender, juicy ribbons of savory perfection." },
        { name: "Pork Ribs", description: "Rack of tender ribs featuring a sticky, caramelized maple glaze and sweet-and-savory rub." },
        { name: "Chicken Quarters", description: "Juicy, bone-in chicken legs infused with aromatic wood smoke and finished with a crisp, seasoned skin." },
        { name: "Smoked Lobster Tails", description: "Fresh coastal lobster tails gently kissed with wood smoke and basted in Old Bay butter." },
        { name: "Burnt Ends (Beef or Pork)", description: "The prized, heavily barked “candy of the barbecue,” cubed, re-seasoned, caramelized in our house BBQ sauce, and rendered to melt in your mouth." },
        { name: "House Made Sausage", description: "Custom-blended, artisan sausage stuffed in-house, slow-smoked, and loaded with flavor. A few examples:", subItems: ["House Sausage", "Gouda & Poblano", "Blueberry Breakfast", "Octoberfest", "Dilly Boy", "Apple Cheddar"] },
        { name: "Turkey Breast", description: "Juicy turkey breast rubbed with our house seasoning and smoked until tender and juicy." },
        { name: "Smoked Pork Belly", description: "Thick-cut, heritage-breed pork belly scored, rubbed with a savory spice blend, and slow-smoked until the fat melts completely and the exterior develops a sticky, caramelized bark." },
        { name: "Pork Crown Roast", description: "An impressive, show-stopping pork crown roast seasoned with rosemary and garlic, slow-roasted over indirect wood smoke to achieve a juicy, golden-brown centerpiece." },
        { name: "Smoked Salmon Filets", description: "Fresh Gulf of Maine salmon filets delicately kissed with smoke, brushed with a maple glaze, and flaking with rich, buttery tenderness." },
        { name: "Beef Ribs", description: "Massive, dinosaur-sized beef plate ribs featuring a heavy black pepper bark, deeply rendered intramuscular fat, and meat that pulls effortlessly off the bone." },
        { name: "Bacon Ribs", description: "Thick, meaty pork loin ribs cured and smoked just like traditional bacon, offering an intense, savory depth with a caramelized barbecue finish." },
    ];

    const sidePlatters = [
        { name: "Smoked Mac 'n Cheese", description: "Classic macaroni bathed in a rich blend of melted cheeses, slow-smoked directly on the pit for deep, wood-fired flavor and topped with buttered, cheesy breadcrumbs." },
        { name: "Classic Coleslaw", description: "Crisp cabbage and carrots tossed in a tangy, creamy dressing sweetened naturally." },
        { name: "BLT Pasta Salad", description: "A twist on a classic with pasta tossed with smoky bacon, juicy tomatoes, and herbs in a creamy homemade Ranch dressing." },
        { name: "Classic Potato Salad", description: "Tender red potatoes mixed with eggs, onion, celery, and a creamy mustard dressing finished with fresh herbs." },
        { name: "Bean Hole Beans", description: "Slow-cooked in traditional Maine bean hole style, these rich, molasses-kissed beans are smoky, sweet, and deeply satisfying." },
        { name: "Smoked Elote", description: "Smoked sweet corn tossed with creamy sauce, cotija cheese, jalapenos, red onion, and fresh herbs." },
        { name: "Chipotle Caesar", description: "Crisp romaine tossed in smoky chipotle Caesar dressing, topped with cheddar and crunchy cornbread croutons." },
        { name: "Farmhouse Salad", description: "Fresh greens and garden veggies served with homemade Ranch dressing." },
        { name: "Hand Cut Fries", description: "Fresh-cut and fried to golden perfection, seasoned with your choice of our signature BBQ rub or Salt & Vinegar." },
        { name: "Elote Pasta Salad", description: "Our famous smoked elote tossed with pasta for a refreshing take on the classic." },
        { name: "Red Coleslaw", description: "Crisp shredded red cabbage and carrots tossed in a tangy, creamy dressing for a bright, crunchy twist on a backyard classic." },
        { name: "Cornbread Duo", description: "Sweet Maple Butter – Soft, golden cornbread served with whipped maple butter\nSpicy Jalapeño Cheddar – A bold twist with melty cheddar and a kick of jalapeño" },
    ];

    const sandwiches = [
        { name: "Pulled Pork Sandwich", description: "Slow-smoked pulled pork piled high on a toasted bun, topped with creamy coleslaw and crisp pickles." },
        { name: "Brisket Sandwich", description: "Thin sliced tender brisket piled high on a toasted bun, topped with creamy coleslaw and crisp pickles." },
        { name: "Smoked BBQ Meatball Sub", description: "House-smoked meatballs drenched in our classic BBQ sauce, topped with melted cheese, pickled jalapenos, and fresh scallions, served on a toasted sub roll." },
        { name: "Smoked Brisket Cheesesteak", description: "Chopped, smoked brisket grilled with peppers and onions, smothered in melted cheese, and served on a toasted sub roll." },
        { name: "Taco Trio", description: "Tacos packed with pulled chicken, brisket, and pork on a homemade corn tortilla, topped with cilantro, cotija cheese, scallions, and chipotle salsa." },
        { name: "Smoked Lobster Roll", description: "Smoked Old Bay seasoned lobster tail and claw meat tossed with mayo and served warm on a homemade milk roll with chives." },
    ];

    const soups = [
        { name: "Smoked Maine Seafood Chowdah", description: "Rich, velvety chowder loaded with fresh coastal seafood of haddock, crab, and smoked lobster, gently infused with hardwood smoke, finished with scallions, house made bacon, and Old Bay butter seasoned oyster crackers.", note: "An award winning classic" },
        { name: "Andie's Cowboy Chili", description: "Hearty, slow-smoked brisket and bean chili packed with bold spices, peppers, tomatoes, and a kick of smoky heat, crowned with shredded cheddar and scallions.", note: "An award winning classic" },
        { name: "Loaded Baked Potato Soup", description: "Thick, comforting potato soup blended with rich cream and leeks, topped with tender smoked brisket, sharp cheddar, bacon bits, jalapenos, and green onions." },
    ];

    const desserts = [
        { name: "Maine Blueberry Sheet Cake", description: "A moist, tender sheet cake bursting with wild Maine blueberries and lightly dusted with maple sugar." },
        { name: "S’mores Slab Pie", description: "Layers of rich chocolate nestled in a graham cracker crust, baked to perfection and finished with homemade marshmallow fluff, torched golden and sprinkled with more graham for that fireside feel." },
        { name: "Key Lime Pie Jars", description: "Tangy key lime custard served in mini mason jars, topped with a cloud of toasted marshmallow meringue." },
        { name: "Maple Custard Pie", description: "Slab-style pie with a buttery crust and silky maple custard filling, drizzled with bourbon maple caramel and served warm with a scoop of vanilla ice cream." },
        { name: "Corn-Flower Cake", description: "A rustic, golden cake baked with stone-ground cornmeal and fresh corn puree, featuring a caramelized turbinado sugar crust on the bottom and a sweet syrup glaze, served with fresh maple whipped cream." },
        { name: "Seasonal Hand Pies with Ice Cream", description: "Flaky, golden hand pies filled with the season’s best fruits, served warm with a scoop of creamy vanilla ice cream. Rustic, nostalgic, and always changing with the harvest." },
    ];

    const lateNightSnacks = [
        { name: "BBQ Popcorn", description: "Freshly popped kernels tossed in rich, artisanal rendered beef tallow for a savory crunch, then generously dusted with our house BBQ seasoning." },
        { name: "Smoked Buffalo Chicken Dip", description: "A spicy blend of smoked pulled chicken, rich cheese, and buffalo sauce, infused with a deep hardwood smoke flavor and served warm with tortilla chips and crudité." },
        { name: "BBQ Eggrolls", description: "Crispy, golden-fried wrappers packed with tender pulled pork, caramelized onions, cheese, and coleslaw, served with a side of our house BBQ sauce." },
        { name: "Smoked Chex Mix", description: "A classic crunchy cereal snack slow-smoked with our house BBQ seasoning for an addictive, BBQ twist on a party favorite." },
        { name: "Smoked Chipotle Queso", description: "Velvety, melted cheese dip spiced with smoky chipotle peppers, roasted poblanos, and aromatic herbs, served piping hot with house tortilla chips and pretzel bites." },
        { name: "Ranch Pickle Dip", description: "Cool, creamy ranch dip blended with zesty dill pickles and fresh herbs, served with crisp fresh vegetables and potato chips for ultimate dipping." },
        { name: "Reuben Bites", description: "Pretzel bites stuffed with smoked corned beef, tangy sauerkraut, and melted Swiss cheese, served with a side of zesty thousand island dressing." },
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-center text-5xl font-bold text-gray-800 mb-4 font-serif">Wedding &amp; Special Events Packages</h2>
                <p className="text-center text-gray-700 mb-12">
                    Serving sizes and pricing below are starting guides — reach out and we’ll tailor a package to your headcount.
                </p>

                <SectionHeading>Package Options</SectionHeading>
                <PricingTable columns={["Package", "Details", "Pricing"]} rows={packages} />
                <p className="text-sm text-gray-500 italic -mt-6 mb-12">
                    *Packages including Lobster, Brisket, or local seafood are subject to market prices and are likely to increase cost and are included in a detailed quote.
                </p>

                <SectionHeading>Ala Carte Options</SectionHeading>
                <PricingTable columns={["Platter", "Serving Size", "Pricing"]} rows={alaCarte} />

                <MenuCategory title="Small Bite Platters">
                    {smallBites.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Meat Platters">
                    {meats.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Side Platters">
                    {sidePlatters.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Sandwiches">
                    {sandwiches.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Soups">
                    {soups.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Desserts" subtitle="Our wedding cakes are baked in partnership with Ivy Acres Bakery">
                    {desserts.map(item => <MenuItem key={item.name} {...item} />)}
                </MenuCategory>

                <MenuCategory title="Late Night Snacks">
                    {lateNightSnacks.map(item => <MenuItem key={item.name} {...item} />)}
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

// Web3Forms access key. Safe to ship in client-side code: it is meant to be
// public, is scopable to your domain, and submissions are spam-filtered on
// Web3Forms' side. Manage recipients and integrations at https://web3forms.com.
const WEB3FORMS_ACCESS_KEY = '5db7e407-19e0-49bb-ab55-bf7838fc226a';

const ContactUsPage = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: real users never see or check this field; bots that fill it get dropped.
    if (e.target.botcheck && e.target.botcheck.checked) {
      return;
    }

    setSubmitting(true);
    setStatus({ message: 'Sending...', type: 'info' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: 'Pine Coast BBQ Website',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ message: 'Success! We will get back to you soon.', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ message: `Error: ${data.message || 'Something went wrong.'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ message: 'Error: Could not connect to the server.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-center text-4xl font-bold text-[#05412b] mb-2 font-serif">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-6">Pine Coast BBQ offers catering and special options for events, weddings, family celebrations, and corporate functions with customizable menus, in person support, or delivery options. Have a question or a catering request? Drop us a line!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => setCurrentPage('game-day')}
              className="inline-block bg-[#bf9000] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#a67d00] transition-colors duration-300"
            >
              See our NEW Game Day Packages &rarr;
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('weddings')}
              className="inline-block bg-[#bf9000] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#a67d00] transition-colors duration-300"
            >
              See our NEW Wedding &amp; Special Event Packages &rarr;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Honeypot field for spam bots — hidden from real users */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />
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
            <button type="submit" disabled={submitting} className="w-full bg-[#6aa84f] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#5a9142] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6aa84f] disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? 'Sending...' : 'Send Message'}
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
      case 'game-day':
        return <GameDayPage />;
      case 'weddings':
        return <WeddingPage />;
      case 'our-story':
        return <OurStoryPage />;
      case 'contact-us':
        return <ContactUsPage setCurrentPage={setCurrentPage} />;
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